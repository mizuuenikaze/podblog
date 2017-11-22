var AmpersandModel = require('ampersand-model');
var app = require('ampersand-app');


module.exports = AmpersandModel.extend({
	props: {
		id: ['string', 'true', ''],
		key: ['number', 'true', ''],
		value: ['string', 'true', '']
	},
	initialize: function (attrs) {
		this.ajaxConfig = app.configureAjax.bind(app);
		this.urlRoot = app.apiBaseUri + '/v1/blog';
	}
});
