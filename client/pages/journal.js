var PageView = require('./base');
var templates = require('../templates');
var BlogEntryView = require('../views/blogEntry');
var BlogEntry = require('../models/entryFull');

module.exports = PageView.extend({
	pageTitle: 'entries',
	template: templates.pages.journal,
	cmsId:'657d93bf8ef045049dc9a5dd8b13f95c',
	props: {
		entryData: 'state'
	},
	bindings: {
		'model.cms.page.a.a': {type: 'text', hook: 'outl-a.a'}
	},
	initialize: function (options) {
		var queryParam = new URLSearchParams(window.location.search.substring(1));
		this.entryData = new BlogEntry({id: queryParam.get('id')});
		this.entryData.fetch();
	},
	subviews: {
		notes: {
			hook: 'blog-entry',
			waitFor: 'entryData',
			prepareView: function (el) {
				return new BlogEntryView({
					el: el,
					model: this.entryData
				});
			}
		}
	},
});
