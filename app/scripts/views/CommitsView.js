var CommitsView = Backbone.View.extend({
	el: '#commitslist',

	initialize: function(options) {
		this.bus = options.bus;
		this.bus.on('repoSelected', this.onRepoSelected, this);
	},

	events: {
		'click #visitRepo a': 'visitRepo'
	},
	visitRepo: function(){
		// window.open(this.model.get('html_url'), '_blank');
	},

	onRepoSelected: function(commits) {
		this.$el.empty().addClass('loading');
		var commits_url = (commits.get('commits_url')).replace('{/sha}','');
		var commitItems = new CommitItems();
		commitItems.url = commits_url+'?access_token=6efa980a1997445eabbd9c90c3a0bd359e942e42';
		var self = this;
		commitItems.fetch({
			success: function(commits) {
				self.$el.append('<li id="visitRepo" class="ahem"><h2>Recent Commits</h2><p><a>View repo on Github <i class="fa fa-github"></i></a></p></li>');
				commits.each(function(commitItem) {
					var view = new CommitView({model: commitItem, bus: self.bus});
					self.$el.append(view.render().$el).scrollTop(0);
				});
				self.$el.removeClass('loading');
			}
		});
	},

	render: function(){
		if (this.model) {
			this.$('#reponame').html(this.model.get('name'));
		}

		return this;
	}
});

