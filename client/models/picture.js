/*
 * Picture - <picture><source>...<img></picture>
 * Composite model consiting of:
 * 	1. Source - images sources
 * 	2. dataSrc - the lazysizes src value
 */

var AmpersandModel = require('ampersand-model');
var State = require('ampersand-state');
var Collection = require('ampersand-collection');

var Source = State.extend({
	props: {
		dataSrcset: ['string', true, ''],
		media: 'string'
	}
});

var SourceCollection = Collection.extend({
	model: Source
});

module.exports = AmpersandModel.extend({
	props: {
		dataSrc: ['string', 'true', '']
	},
	collections: {
		sources : SourceCollection
	}
});
