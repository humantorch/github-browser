$(function() {
	window.debug = location.hash === '#debug' ? true : false;

	var bus = _.extend({}, Backbone.Events),
		orgSelect = new OrgSelect({el: '#orgselect', bus: bus});

	$('input').keyup(function(e){
		if(e.keyCode === 13){
			$(this).trigger('enter');
		}
	}).trigger('enter').val('humantorch');
});