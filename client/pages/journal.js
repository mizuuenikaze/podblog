var PageView = require('./base');
var templates = require('../templates');
var _ = require('lodash');
var BlogEntryView = require('../views/blogEntry');
var BlogEntry = require('../models/entryFull');

module.exports = PageView.extend({
	pageTitle: 'entries',
	template: templates.pages.journal,
	cmsId:'657d93bf8ef045049dc9a5dd8b13f95c',
	bindings: _.extend({}, PageView.prototype.bindings, {
		'model.cms.page.a.a': {type: 'text', hook: 'outl-a.a'}
	}),
	subviews: {
		notes: {
			hook: 'blog-entry',
			waitFor: 'model',
			prepareView: function (el) {
				var queryParam = new URLSearchParams(window.location.search.substring(1));
				var model = new BlogEntry({id: queryParam.get('id')});
				model.fetch();

				return new BlogEntryView({
					el: el,
					model: model
				});
			}
		}
	},
});
