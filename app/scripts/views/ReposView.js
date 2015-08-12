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
			$fetchMore = $('#fetchMore'),
			_this = this;

		this.$el.attr('data-page',fetchedPage+1);
		repoItems.url = 'https://api.github.com/users/'+$(document.body).attr('data-org')+'/repos?sort=pushed&access_token=6efa980a1997445eabbd9c90c3a0bd359e942e42&page='+(fetchedPage+1);

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
					$fetchMore.html('<p>Nope. No more to load.</p>').attr('id','');
				}
			},
			error: function() {
				$fetchMore.html('<p>We\'re having trouble receiving any data from Github at the moment. Please try again later.</p>');
			}
		});
	},

	render: function() {
		var _this = this,
			$org = $(document.body).attr('data-org');

		if (this.model.length === 0) {
			this.$el.empty().append('<li id="" class="ahem"><p>Sorry, this user appears to have no repos available to browser. Try another?</p></li>');
			$('#commitsList').empty().append('<li id="visitRepo" class="ahem"><p>Recent commits</p>');
		} else {
			this.$el.empty().append('<li class="ahem"><p>Recently-updated repos – <a href="http://github.com/'+$org+'" target="_blank">Visit '+$org+' on Github</a></p></li>');
			this.model.each(function(repoItem) {
				var view = new RepoView({model: repoItem, bus: _this.bus});
				_this.$el.append(view.render().$el);
			});
			this.$el.attr('data-page','1').append('<li id="fetchMore" class="ahem"><p>Load more repos.</p></li>');
		}


		return this;
	}
});