var PageView = require('./base');
var templates = require('../templates');
var ListView = require('../views/list');
var BlogPagingCollection = require('../models/blogEntryCollection');
var PaginatorView = require('../views/paginator');


module.exports = PageView.extend({
	pageTitle: 'podblog',
	template: templates.pages.home,
	cmsId:'9a92deb8ed6443b498f3062043e39302',
	bindings: {
		'model.cms.page.a.a': {type: 'text', hook: 'outl-a.a'},
		'model.cms.page.a.b': {type: 'text', hook: 'outl-a.b'},
	},
	render: function () {
		PageView.prototype.render.apply(this, arguments);

		if (!this.collection) {
			this.fetchCollection();
		}
		this.renderCollection(this.collection, ListView, this.queryByHook('pod-list'));
	},
	fetchCollection: function () {
		this.collection = new BlogPagingCollection();

		this.collection.fetchPage({
			remove: true,
			merge: false,
			add: true,
			data: {mode: 'linkedlist'}
		});
	},
	subviews: {
		paginator: {
			hook: 'paginator',
			waitFor: 'collection',
			prepareView: function (el) {
				return new PaginatorView({
					el: el,
					collection: this.collection
				});
			}
		}
	}
});
