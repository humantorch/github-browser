$(function() {
	window.debug = location.hash === '#debug' ? true : false;

	var bus = _.extend({}, Backbone.Events),
		repoItems = new RepoItems();

	repoItems.fetch({
		success: function() {
			if (debug) {
				console.log('DEBUG: Repos data:', repoItems);
			}
			var reposView = new ReposView({model: repoItems, bus: bus}),
				commitsView = new CommitsView({bus: bus});

			$('#container').prepend(reposView.render().$el);
			commitsView.render();
		},
		error: function() {
			$('#container').html('<h3>We\'re having trouble receiving any data from Github at the moment. Please try again later.</h3>');
		}
	});
});