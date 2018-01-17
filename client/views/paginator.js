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

var negativeDelta = 'li > button[data-delta^="-"]';
var positiveDelta = 'li > button:not([data-delta^="-"])';

module.exports = View.extend({
	template: templates.includes.paginator,
	props: {
		prevpages: 'array',
		nextpages: 'array'
	},
	events: {
		'click [data-hook~=fetchPage]': 'paginate',
	},
	bindings: {
		'prevpages': {type: function (el, value, previousValue) {
			el = this.buildPagerLinks(el, value, false);

			if (el.querySelectorAll(negativeDelta).length != 0 && this.currentPage != 1) {
				var childLink = document.createElement('button');
				var childSpan = document.createElement('span');
				dom.addClass(childLink, ['btn','btn-info']);
				dom.setAttribute(childLink, 'type', 'button');
				dom.setAttribute(childLink, 'data-hook', 'fetchPage');

				var prevButton = el.querySelector('li > button[data-delta="-1"]');
				childLink.dataset.startKey = prevButton.dataset.startKey;
				childLink.dataset.startKeyDocid = prevButton.dataset.startKeyDocid;
				childLink.dataset.delta = prevButton.dataset.delta;
				dom.addClass(childSpan, ['fas', 'fa-chevron-left']);
				childLink.appendChild(childSpan);

				var childItem = document.createElement('li');
				dom.addClass(childItem, ['page-item', 'mr-1']);
				childItem.appendChild(childLink);
				el.insertBefore(childItem, el.firstChild);
			} else {
				if (this.currentPage === 1) {
					this.unset('prevpages', {silent: true});
				}
			}
		}, hook: 'page-links'},
		'nextpages': {type: function (el, value, previousValue) {
			el = this.buildPagerLinks(el, value, true);

			if (el.querySelectorAll(positiveDelta).length != 0) {
				var childLink = document.createElement('button');
				var childSpan = document.createElement('span');
				dom.addClass(childLink, ['btn','btn-info']);
				dom.setAttribute(childLink, 'type', 'button');
				dom.setAttribute(childLink, 'data-hook', 'fetchPage');

				var nextButton = el.querySelector('li > button[data-delta="1"]');
				childLink.dataset.startKey = nextButton.dataset.startKey;
				childLink.dataset.startKeyDocid = nextButton.dataset.startKeyDocid;
				childLink.dataset.delta = nextButton.dataset.delta;
				dom.addClass(childSpan, ['fas', 'fa-chevron-right']);
				childLink.appendChild(childSpan);

				var childItem = document.createElement('li');
				dom.addClass(childItem, ['page-item', 'mr-1']);
				childItem.appendChild(childLink);
				el.appendChild(childItem);
			}
		}, hook: 'page-links'}
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

			if (options.data.mode === modes[1]) {
				if (response.prevpages) {
					self.prevpages = response.prevpages;
				} else {
					self.unset("prevpages");
				}

				if (response.nextpages) {
					self.nextpages = response.nextpages;
				} else {
					self.unset("nextpages");
				}
			}
		});
	},
	paginate: function (e) {
		var buttonTarget = e.target.closest('[data-hook~=fetchPage]');

		this.currentPage += parseInt(buttonTarget.dataset.delta);
		this.collection.fetchPage(_.merge({}, defaultFetchOptions, {
			data:{
				startkey: buttonTarget.dataset.startKey,
				startkey_docid: buttonTarget.dataset.startKeyDocid
			}
		}));
	},
	buildPagerLinks: function (el, pages, isNext) {

		if (isNext) {
			while (el.querySelectorAll(positiveDelta).length != 0) {
				el.removeChild(el.lastChild);
			}
		} else {
			while (el.querySelectorAll(negativeDelta).length != 0) {
				el.removeChild(el.firstChild);
			}
		}

		if (!pages) {
			return el;
		}

		var childItem;
		var childLink;
		var view = this;

		pages.forEach(function (x, i, origArray) {
			if (i <= 4) {
				childLink = document.createElement('button');
				dom.text(childLink, isNext ? view.currentPage + i + 1 : view.currentPage - origArray.length  + i );
				dom.addClass(childLink, ['btn','btn-info']);
				dom.setAttribute(childLink, 'type', 'button');
				dom.setAttribute(childLink, 'data-hook', 'fetchPage');

				if (x.skip) {
					dom.setAttribute(childLink, 'data-skip', x.skip);
				} else {
					dom.setAttribute(childLink, 'data-start-key', x.startkey);
					dom.setAttribute(childLink, 'data-start-key-docid', x.startkey_docid);
					dom.setAttribute(childLink, 'data-delta', (isNext ?  i + 1 : i - origArray.length));
				}

				childItem = document.createElement('li');
				dom.addClass(childItem, ['page-item', 'mr-1']);
				childItem.appendChild(childLink);

				if (isNext) {
					el.appendChild(childItem);
				} else {
					el.insertBefore(childItem, el.firstChild);
				}
			}
		});

		return el;
	}
});
