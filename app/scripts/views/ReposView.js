var ReposView = Backbone.View.extend({
	tagName: 'ul',
	id: 'repos',
	className: 'viewList',
	events: {
		'click #fetchMore': 'fetchMore'
	},
	initialize: function(options) {
		this.bus = options.bus;
		this.model.on('add', this.onRepoAdded, this);
	},
	fetchMore: function() {
		var fetchedPage = parseInt(this.$el.attr('data-page'),10);
		this.$el.attr('data-page',fetchedPage+1);

		var repoItems = new RepoItems();
		repoItems.url += '&page='+(fetchedPage+1);
		// console.log(repoItems.url);
		var self = this;
		repoItems.fetch({
			success: function(repos) {
				if (repos.length > 0) {
					repos.each(function(repoItem) {
						var view = new RepoView({model: repoItem, bus: self.bus});
						self.$el.append(view.render().$el);
					});
				} else {
					console.log('no more repos to fetch');
					$('#fetchMore').remove();
				}
			}
		});
	},
	render: function() {
		var self = this;

		this.$el.attr('data-page','1').append('<button id="fetchMore">More</button>');
		this.model.each(function(repoItem) {
			var view = new RepoView({model: repoItem, bus: self.bus});
			self.$el.append(view.render().$el);
		});

		return this;
	}
});