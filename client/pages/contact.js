var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
	pageTitle: 'contact',
	template: templates.pages.contact,
	cmsId:'fad1d96880cd4d359e48e937127dd2ef',
	bindings: {
		'model.cms.page.a.a': {type: 'text', hook: 'outl-a.a'},
		'model.cms.page.a.b': {type: 'text', hook: 'outl-a.b'},
		'model.cms.page.a.c': {type: 'text', hook: 'outl-a.c'},
		'model.cms.page.a.d[0]': {type: 'text', hook: 'outl-a.d.0'},
		'model.cms.page.a.d[1]': {type: 'text', hook: 'outl-a.d.1'},
		'model.cms.page.a.d[2]': {type: 'text', hook: 'outl-a.d.2'},
		'model.cms.page.b.a': {type: 'text', hook: 'outl-b.a'},
		'model.cms.page.b.b': {type: 'text', hook: 'outl-b.b'},
		'model.cms.page.b.c': {type: 'text', hook: 'outl-b.c'},
		'model.cms.page.c.a': {type: 'text', hook: 'outl-c.a'},
		'model.cms.page.c.b': {type: 'text', hook: 'outl-c.b'},
		'model.cms.page.c.c': {type: 'text', hook: 'outl-c.c'},
		'model.cms.page.c.d': {type: 'attribute', hook: 'outl-c.d', name: 'data-srcset'},
		'model.cms.page.c.e': {type: 'attribute', hook: 'outl-c.e', name: 'data-srcset'},
		'model.cms.page.d.a': {type: 'text', hook: 'outl-d.a'},
		'model.cms.page.d.b': {type: 'text', hook: 'outl-d.b'},
		'model.cms.page.e.a': {type: 'text', hook: 'outl-e.a'},
		'model.cms.page.e.b': [
			{type: function (el, value, previousValue) { el.href='mailto:' + value;}, hook: 'outl-e.b'},
			{type: 'text', hook: 'outl-e.b'}
		],
		'model.cms.page.e.c': {type: 'text', hook: 'outl-e.c'},
		'model.cms.page.e.d': {type: 'text', hook: 'outl-e.d'}
	}
});

