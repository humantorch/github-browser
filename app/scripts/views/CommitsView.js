var CommitsView = Backbone.View.extend({
	el: '#commitslist',

	initialize: function(options) {
		this.bus = options.bus;
		this.bus.on('repoSelected', this.onRepoSelected, this);
	},

	onRepoSelected: function(commits) {
		var commits_url = (commits.get('commits_url')).replace('{/sha}','');
		var commitItems = new CommitItems();
		commitItems.url = commits_url+'?access_token=6efa980a1997445eabbd9c90c3a0bd359e942e42';
		var self = this;
		commitItems.fetch({
			success: function(commits) {
				self.$el.empty();
				commits.each(function(commitItem) {
					var view = new CommitView({model: commitItem, bus: self.bus});
					self.$el.append(view.render().$el);
				});
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

