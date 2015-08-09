var CommitsView = Backbone.View.extend({
	el: '#commitslist',

	initialize: function(options) {
		this.bus = options.bus;
		this.bus.on('repoSelected', this.onRepoSelected, this);
	},

	onRepoSelected: function(repoinfo) {
		if (debug) {
			console.log('DEBUG: Repository data passed to CommitsView: ',repoinfo);
		}
		var commits_url = (repoinfo.get('commits_url')).replace('{/sha}',''),
			commitItems = new CommitItems(),
			_this = this;

		this.$el.empty().addClass('loading');
		commitItems.url = commits_url+'?access_token=6efa980a1997445eabbd9c90c3a0bd359e942e42';

		commitItems.fetch({
			success: function(commits) {
				_this.$el.append('<li id="visitRepo" class="ahem"><h2>Recent Commits</h2><p><a href="'+repoinfo.get('html_url')+'">View <em>'+repoinfo.get('name')+'</em> on Github <i class="fa fa-github"></i></a></p></li>');
				commits.each(function(commitItem) {
					var view = new CommitView({model: commitItem, bus: _this.bus});
					_this.$el.append(view.render().$el).scrollTop(0);
				});
				_this.$el.removeClass('loading');
			}
		});
	},

	render: function(){
		if (this.model) {
			this.$('#reponame').html(this.model.get('name'));
		}
		if (debug) {
			console.log('DEBUG: CommitsView.render()');
		}

		return this;
	}
});

