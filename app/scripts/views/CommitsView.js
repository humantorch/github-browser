var CommitsView = Backbone.View.extend({
	el: "#commitslist",

	initialize: function(options) {
		console.log(options);
		this.bus = options.bus;
		// console.log(options);
		this.bus.on('repoSelected', this.onRepoSelected, this);

	},

	onRepoSelected: function(commits) {
		var commits_url = (commits.get('commits_url')).replace('{/sha}','');
		// console.log(commits);
		var commitItems = new CommitItems();
		commitItems.url = commits_url+'?access_token=6efa980a1997445eabbd9c90c3a0bd359e942e42';
		// console.log(commitItems);
		var self = this;
		commitItems.fetch({
			success: function(commits) {
				self.$el.empty();
				// var commitsView = new CommitsView({model: commitItems.models});
				// $(document.body).prepend(commitsView.render().$el);
				commits.each(function(commitItem) {
					console.log(commitItem);
					var view = new CommitView({model: commitItem, bus: self.bus});
					self.$el.append(view.render().$el);
				});
			}
		});
	},

	render: function(){
		if (this.model) {
			this.$("#reponame").html(this.model.get("name"));
		}

		return this;
	}
});

