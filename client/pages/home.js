var PageView = require('./base');
var templates = require('../templates');
var ListView = require('../views/list');
var BlogPagingCollection = require('../models/blogEntryCollection');
var _ = require('lodash');


module.exports = PageView.extend({
	pageTitle: 'podblog',
	template: templates.pages.home,
	cmsId:'9a92deb8ed6443b498f3062043e39302',
	bindings: _.extend({}, PageView.prototype.bindings, {
		'model.cms.page.a.a': {type: 'text', hook: 'outl-a.a'},
		'model.cms.page.a.b': {type: 'text', hook: 'outl-a.b'},
	}),
	render: function () {
		if (!this.collection) {
			this.fetchCollection();
		}

		this.renderWithTemplate();
		this.renderCollection(this.collection, ListView, this.queryByHook('pod-list'));
	},
	fetchCollection: function () {
		this.collection = new BlogPagingCollection();
		this.collection.fetchPage({
			remove: true,
			merge: false,
			add: true,
			stepNext: true,
			step: 0,
			data: {mode: 'linkedlist'}
		});
	}
});
