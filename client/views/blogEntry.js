var View = require('ampersand-view');
var PictureView = require('../views/picture');
var templates = require('../templates');
var _ = require('lodash');

module.exports = View.extend({
	template: templates.includes.entryFull,
	props: {
		hasImage: ['boolean', false, false]
	},
	bindings: {
		'model.timestamp': {type: 'text', hook: 'timestamp'},
		'model.keywords': {type: 'text', hook: 'keywords'},
		'model.subtitle': {type: 'text', hook: 'subtitle'},
		'model.title': {type: 'text', hook: 'title'},
		'model.body': {type: function (el, value, previousValue) {
			var model = this.model;

			_.forEach(value, function (text) {
				var paragraph = document.createElement('p');

				if (model.hasHtml) {
					paragraph.innerHTML = text;
				} else {
					paragraph.textContent = text;
				}

				el.appendChild(paragraph);
			});
		}, hook: 'content'},
		'model.image': {type: function (el, value, previousValue) {
			if (value.dataSrc && value.dataSrc !== '') {
				this.hasImage = true;
			}
		}, hook: 'pic'}
	},
	subviews: {
		entryPic: {
			hook: 'pic',
			waitFor: 'hasImage',
			prepareView: function (el) {
				return new PictureView({
					el: el,
					model: this.model.image
				});
			}
		}
	}
});
