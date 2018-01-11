var View = require('ampersand-view');

var SourceView = View.extend({
	template: '<source data-hook="picsrc">',
	bindings: {
		'model.dataSrcset': {type: 'attribute', hook: 'picsrc', name: 'data-srcset'},
		'model.media': {type: 'attribute', hook: 'picsrc', name: 'media'}
	}
});

var ImageView = View.extend({
	template: '<img data-hook="picimg" class="card-img-top lazyload" data-sizes="auto">',
	bindings: {
		'model.dataSrc': {type: 'attribute', hook: 'picimg', name: 'data-src'},
	}
});

module.exports = View.extend({
	template: '<picture data-hook="pic"></pic>',
	render: function () {
		this.renderWithTemplate(this);
		
		if (!this.collection) {
			this.fetchCollection();
		}
		var sources = this.renderCollection(this.collection, SourceView);

		this.renderSubview( new ImageView({
			model: this.model
		}));
	},
	fetchCollection: function () {
		this.collection = this.model.sources;
	}
});
