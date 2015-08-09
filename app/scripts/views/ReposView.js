var ReposView = Backbone.View.extend({
	tagName: 'ul',
	id: 'repos',
	className: 'viewList reposList',
	events: {
		'click #fetchMore': 'fetchMore'
	},
	initialize: function(options) {
		this.bus = options.bus;
		this.model.on('add', this.onRepoAdded, this);
	},
	fetchMore: function() {
		console.log('fetchmore');
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
						self.$el.append($('#fetchMore'));
					});
				} else {
					console.log('no more repos to fetch');
					$('#fetchMore').html('<p>Nope. No more to load.</p>').attr('id','');
				}
			}
		});
	},
	render: function() {
		var self = this;

		this.model.each(function(repoItem) {
			var view = new RepoView({model: repoItem, bus: self.bus});
			self.$el.append(view.render().$el);
		});
		this.$el.attr('data-page','1').append('<li id="fetchMore" class="ahem"><p>Area man clicks here to load more repos.</p></li>');

		return this;
	}
});