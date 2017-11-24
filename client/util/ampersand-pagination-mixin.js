var _ = require('lodash');

module.exports = {
	/**
	 * Function to make a paginated REST request against couchdb.
	 *
	 * 
	 * @param {Object}  options     - A set of valid options as follow
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
		options || (options = {remove: true, merge: false, add: true, data: {mode: 'linkedlist'}});
		options.data = options.data || {};

		var modes = ['offset', 'linkedlist'];

		if (options.data.mode === modes[0]) {
			options.data.limit = options.data.limit ? options.data.limit : 5;
		} else if (options.data.mode === modes[1]) {
			options.data.limit = options.data.limit ? options.data.limit : 6;
		}

		this.fetch(options);
	},

	parse: function(apiResponse, options) {
		return apiResponse.rows;
	}
};
