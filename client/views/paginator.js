var View = require('ampersand-view');
var templates = require('../templates');
var _ = require('lodash');
var dom = require('ampersand-dom');

var defaultFetchOptions = {
	remove: true,
	merge: false,
	add: true,
	data: {mode: 'linkedlist'}
};

module.exports = View.extend({
	template: templates.includes.paginator,
	events: {
		'click [data-hook=prev_0]': 'fetchPrev0',
		'click [data-hook=prev_1]': 'fetchPrev1',
		'click [data-hook=prev_2]': 'fetchPrev2',
		'click [data-hook=prev_3]': 'fetchPrev3',
		'click [data-hook=prev_4]': 'fetchPrev4',
		'click [data-hook=next_0]': 'fetchNext0',
		'click [data-hook=next_1]': 'fetchNext1',
		'click [data-hook=next_2]': 'fetchNext2',
		'click [data-hook=next_3]': 'fetchNext3',
		'click [data-hook=next_4]': 'fetchNext4'
	},
	bindings: {
		'prevpages': {type: function (el, value, previousValue) {
			el = this.buildPagerLinks(el, value, false);

			if (el.hasChildNodes()) {
				var childLink = document.createElement('button');
				var childSpan = document.createElement('span');
				dom.addClass(childLink, ['btn','btn-default']);
				dom.addAttribute(childLink, 'type', 'button');
				dom.addAttribute(childLink, 'data-hook', 'prev_arrow');
				childLink.dataset.startKey = el.lastChild.dataset.startKey;
				childLink.dataset.startKeyDocid = el.lastChild.dataset.startKeyDocid;
				dom.addClass(span, ['glyphicon glyphicon-chevron-left']);
				childLink.appendChild(childSpan);
				el.insertBefore(childLink, el.firstChild);
			} else {
				dom.addClass(el, 'hidden');
			}
		}, hook: 'prev-links'},
		'nextpages': {type: function (el, value, previousValue) {
			el = this.buildPagerLinks(el, value, true);

			if (el.hasChildNodes()) {
				var childLink = document.createElement('button');
				var childSpan = document.createElement('span');
				dom.addClass(childLink, ['btn','btn-default']);
				dom.addAttribute(childLink, 'type', 'button');
				dom.addAttribute(childLink, 'data-hook', 'next_arrow');
				childLink.dataset.startKey = el.firstChild.dataset.startKey;
				childLink.dataset.startKeyDocid = el.firstChild.dataset.startKeyDocid;
				dom.addClass(span, ['glyphicon glyphicon-chevron-right']);
				childLink.appendChild(childSpan);
				el.appendChild(childLink);
			} else {
				dom.addClass(el, 'hidden');
			}
		}, hook: 'next-links'}
	},
	initialize: function (viewOptions) {
		var self = this;
		this.currentPage = 1;

		/*
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
		viewOptions.collection.on('sync', function(collection, response, options) {
			var modes = ['offset', 'linkedlist'];

			if (options.data.mode === modes[0]) {
				self.prevpages = [{skip: response.offset > 0 ? response.offset-collection.data.limit : 0}];
				self.nextpages = [{skip: response.rows.length >= collection.data.limit ? response.offset+collection.data.limit : 0}];
			} else if (options.data.mode === modes[1]) {
				if (response.prevpages) {
					self.prevpages = JSON.parse(response.prevpages);
				}

				if (response.nextpages) {
					self.nextpages = JSON.parse(response.nextpages);
				}
			}
		});
	},
	paginate: function (startKey, startKeyDocid) {
		this.collection.fetchPage(_.assign({}, defaultFetchOptions, {
			startkey: startKey,
			startkey_docid: startKeyDocid
		}));
	},
	fetchNext0: function (e) {
		this.curentPage += 1;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchNext1: function (e) {
		this.curentPage += 2;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchNext2: function (e) {
		this.curentPage += 3;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchNext3: function (e) {
		this.curentPage += 4;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchNext4: function (e) {
		this.curentPage += 5;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchPrev0: function (e) {
		this.curentPage -= 1;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchPrev1: function (e) {
		this.curentPage -= 2;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchPrev2: function (e) {
		this.curentPage -= 3;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchPrev3: function (e) {
		this.curentPage -= 4;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	fetchPrev4: function (e) {
		this.curentPage -= 5;
		this.paginate(e.target.dataset.startKey, e.target.dataset.startKeyDocid);
	},
	buildPagerLinks: function (el, pages, isNext) {
		var hookPrefix = isNext ? 'next_' : 'prev_';

		if (!pages) {
			return el;
		}

		dom.removeClass(el, 'hidden');
		while (el.hasChildNodes()) {
			el.removeChild(el.lastChild);
		}

		var childLink;

		pages.forEach(function (x, i) {
			if (i <= 4) {
				childLink = document.createElement('button');
				dom.text(childLink, isNext ? this.currentPage + i + 1 : this.currentPage - 5 + i );
				dom.addClass(childLink, ['btn','btn-default']);
				dom.addAttribute(childLink, 'type', 'button');
				dom.addAttribute(childLink, 'data-hook', hookPrefix + i);

				if (x.skip) {
					dom.addAttribute(childLink, 'data-skip', x.skip);
				} else {
					dom.addAttribute(childLink, 'data-start-key', x.startkey);
					dom.addAttribute(childLink, 'data-start-key-docid', x.startkey_docid);
				}

				el.appendChild(childLink);
			}
		});

		return el;
	}
});
