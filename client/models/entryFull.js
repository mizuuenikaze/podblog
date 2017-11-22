var AmpersandModel = require('ampersand-model');
var app = require('ampersand-app');


module.exports = AmpersandModel.extend({
	props: {
		id: ['string', 'true', ''],
		timestamp: ['string', 'true', ''],
		keywords: ['string', 'true', ''],
		title: ['string', 'true', ''],
		subtitle: ['string', 'true', ''],
		body: 'array'
	},
	initialize: function (attrs) {
		this.ajaxConfig = app.configureAjax.bind(app);
		this.urlRoot = app.apiBaseUri + '/v1/blog/entries';
	}
});
