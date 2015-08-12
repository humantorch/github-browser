var OrgSelect = Backbone.View.extend({
	events: {
		'click #fire': 'onOrgSelect'
	},

	initialize: function(options) {
		this.bus = options.bus;
	},

	onOrgSelect: function() {
		var org = $('#gh-org').val(),
			self = this;
		$('#gh-org').val('');

		var repoItems = new RepoItems({ });

		repoItems.url = 'https://api.github.com/users/'+org+'/repos?sort=pushed&access_token=6efa980a1997445eabbd9c90c3a0bd359e942e42';

		repoItems.fetch({
			success: function() {
				if (debug) {
					console.log('DEBUG: Repos data:', repoItems);
				}
				var reposView = new ReposView({model: repoItems, bus: self.bus}),
					commitsView = new CommitsView({bus: self.bus});

				$('#container').prepend(reposView.render().$el);
				commitsView.render();
			},
			error: function() {
				$('#container').html('<h3>We\'re having trouble receiving any data from Github at the moment. Please try again later.</h3>');
			}
		});
	}
});