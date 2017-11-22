var BlogCollection = require('ampersand-rest-collection');
var PaginationMixin = require('../util/ampersand-pagination-mixin');
var Entry = require('./entry');
var app = require('ampersand-app');

module.exports = BlogCollection.extend(PaginationMixin, {
	model: Entry,
	initialize: function (models, options) {
		this.ajaxConfig = app.configureAjax.bind(app);
		this.url = app.apiBaseUri + '/v1/blog';
	}
});
