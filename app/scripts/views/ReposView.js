var ReposView = Backbone.View.extend({
	tagName: 'ul',
	id: 'repos',
	className: 'viewList reposList',
	events: {
		'click #fetchMore': 'fetchMore'
	},
	initialize: function(options) {
		if (debug) {
			console.log('DEBUG: Repos View arguments: ',options);
		}
		this.bus = options.bus;
		this.model.on('add', this.onRepoAdded, this);
	},
	fetchMore: function() {
		var fetchedPage = parseInt(this.$el.attr('data-page'),10),
			repoItems = new RepoItems(),
			_this = this;
		this.$el.attr('data-page',fetchedPage+1);
		repoItems.url += '&page='+(fetchedPage+1);
		if (debug) {
			console.log('DEBUG: New repo data: ',repoItems);
		}
		repoItems.fetch({
			success: function(repos) {
				if (repos.length > 0) {
					repos.each(function(repoItem) {
						var view = new RepoView({model: repoItem, bus: _this.bus});
						_this.$el.append(view.render().$el);
						_this.$el.append($('#fetchMore'));
					});
				} else {
					if (debug) {
						console.log('DEBUG: There are no more repos to fetch');
					}
					$('#fetchMore').html('<p>Nope. No more to load.</p>').attr('id','');
				}
			}
		});
	},
	render: function() {
		var _this = this;

		this.model.each(function(repoItem) {
			var view = new RepoView({model: repoItem, bus: _this.bus});
			_this.$el.append(view.render().$el);
		});
		this.$el.attr('data-page','1').append('<li id="fetchMore" class="ahem"><p>Area man clicks here to load more repos.</p></li>');

		return this;
	}
});