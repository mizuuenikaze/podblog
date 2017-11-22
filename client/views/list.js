var View = require('ampersand-view');
var templates = require('../templates');
var _ = require('lodash');

module.exports = View.extend({
	template: templates.includes.entry,
	bindings: {
		'model.key': {type: function (el, value, previousValue) {
			var ts = new Date();
			ts.setTime(value);
			el.textContent = ts.toLocaleString('en-US', {hour12: false, timeZone: 'UTC'});
		}, hook: 'timestamp'},
		'model.id': {type: function (el, value, previousValue) { el.href='journal?id=' + value;}, hook: 'title'},
		'model.value': {type: 'text', hook: 'title'}
	}
});
