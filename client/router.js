var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var JournalPage = require('./pages/journal');
var ContactPage = require('./pages/contact');


module.exports = Router.extend({
	routes: {
		'podblog/': 'home',
		'podblog/journal': 'journal',
		'podblog/contact': 'contact',
		'(*path)': 'catchAll'
	},

	// ------- ROUTE HANDLERS ---------
	home: function () {
		app.trigger('page', new HomePage({
			model: app.pageContext
		}));
	},

	journal: function () {
		app.trigger('page', new JournalPage({
			model: app.pageContext
		}));
	},

	contact: function () {
		app.trigger('page', new ContactPage({
			model: app.pageContext
		}));
	},

	catchAll: function () {
		this.redirectTo(app.contextPath + '');
	}
});
