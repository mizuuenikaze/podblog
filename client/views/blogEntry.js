var View = require('ampersand-view');
var templates = require('../templates');
var _ = require('lodash');

module.exports = View.extend({
	template: templates.includes.entryFull,
	bindings: {
		'model.timestamp': {type: 'text', hook: 'timestamp'},
		'model.keywords': {type: 'text', hook: 'keywords'},
		'model.subtitle': {type: 'text', hook: 'subtitle'},
		'model.title': {type: 'text', hook: 'title'},
		'model.body': {type: function (el, value, previousValue) {
			console.log(typeof(el));
			_.forEach(value, function (text) {
				var paragraph = document.createElement('p');
				paragraph.textContent = text;
				el.appendChild(paragraph);
			});
		}, hook: 'content'}

	}
});
