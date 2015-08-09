$(function() {
	window.debug = location.hash === '#debug' ? true : false;

	var bus = _.extend({}, Backbone.Events),
		repoItems = new RepoItems();

	repoItems.fetch({
		success: function() {
			if (debug) {
				console.log('DEBUG: Repos data:', repoItems);
			}
			var reposView = new ReposView({model: repoItems, bus: bus});
			$('#container').prepend(reposView.render().$el);
		}
	});

	var commitsView = new CommitsView({bus: bus});
	commitsView.render();

});