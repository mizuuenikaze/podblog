var _ = require('lodash');

module.exports = {
	/**
	 * Function to make a paginated REST request against couchdb.
	 *
	 * 
	 * @param {Object}  options     - A set of valid options as follow
	 *                    .reset    - Sets the skip value for 0
	 *                    .stepNext - Direction forward or back, boolean
	 *                    .step     - Index in persisted next/prev structures (i.e what page are we going to)
	 *                    .data     - An object containing
	 *                      . mode  - offset|linkedlist
	 *                      .skip   - The number of docs to skip
	 *                      .limit  - The limit of docs to  get
	 *                      .startkey - Sorted key to begin
	 *                      .startkey_docid - docid for duplicate startkeys
	 *                      .stale  - ok|update_after modified view update behavior
	 *                      (...)   - Other options to pass in the query
	 *                                string as stated in `ampersand-sync`
	 *                    (...)     - Other options valid fot the `ampersand-fetch-collection`
	*/
	fetchPage: function (options) {
		// Defaults so the requested collections stays small
		options || (options = {remove: true, merge: false, add: true, stepNext: true, step: 0, data: {mode: 'linkedlist'}});
		options.data = options.data || {};
		var data = this.data;

		if (!data) {
			data = {};
		}

		var modes = ['offset', 'linkedlist'];

		if (options.reset) {
			options = {};
			data.skip = 0;
			data.startkey = null;
			data.startkey_docid = null;
			_.unset(this,'prevpages');
			_.unset(this, 'nextpages');
		}

		_.assign(data, options.data);

		if (options.data.mode === modes[0]) {
			data.limit = data.limit ? data.limit : 5;

			if (options.stepNext) {
				data.skip += (options.step + 1) * data.limit;
			} else {
				data.skip -= (options.step + 1) * data.limit;
			}
		} else if (options.data.mode === modes[1]) {
			data.limit = data.limit ? data.limit : 6;

			if (options.stepNext) {
				if (this.nextpages) {
					data.startkey = this.nextpages[options.step].startkey;
					data.startkey_docid = this.nextpages[options.step].startkey_docid;
				}
			} else {
				if (this.prevpages) {
					data.startkey = this.prevpages[options.step].startkey;
					data.startkey_docid = this.prevpages[options.step].startkey_docid;
				}
			}
		}

		options.data = data;
		options.sucess = this.paginate;
		this.fetch(options);

		this.data = data;
	},

	parse: function(apiResponse, options) {
		return apiResponse.rows;
	},

	/**
	 * Fetch success function to setup pagination data.
	 *
	 * linkedlist mode logic
	 * structure looks like : {
	 * 	prevpages: [{"startkey":"xxxx", "startkey_docid": "xxxxx"},...],
	 * 	nextpages: [{same..},...],
	 * 	rows: [{"id":"xxx", "key":"xxx", "value":"xxx"}, ...]
	 * }
	 *
	 * offset mode logic
	 * structure looks like : {"offset":x, rows: [...]}
	 */
	paginate: function(collection, response, options) {
		var modes = ['offset', 'linkedlist'];

		if (options.data.mode === modes[0]) {
			collection.prevpages = [{skip: response.offset-collection.data.limit}];
		} else if (options.data.mode === modes[1]) {
			collection.prevpages = JSON.parse(response.prevpages);
			collection.nextpages = JSON.parse(response.nextpages);
		}
	}
};
