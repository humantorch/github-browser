var RepoItems = Backbone.Collection.extend({
	model: RepoItem,
	url: 'https://api.github.com/users/netflix/repos?sort=pushed'
});