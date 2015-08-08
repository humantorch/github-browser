$(function() {

	var bus = _.extend({}, Backbone.Events);

	var repoItems = new RepoItems();

	repoItems.fetch({
		success: function() {
			// console.log(repoItems);
			var reposView = new ReposView({model: repoItems, bus: bus});
			$(document.body).prepend(reposView.render().$el);
		}
	});

	var commitsView = new CommitsView({bus: bus});
	commitsView.render();



});