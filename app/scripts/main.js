$(function() {
	window.debug = location.hash === '#debug' ? true : false;

	var bus = _.extend({}, Backbone.Events),
		orgSelect = new OrgSelect({el: '#orgselect', bus: bus});
});