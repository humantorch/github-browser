var OrgSelect = Backbone.View.extend({
	events: {
		'click #fire': 'onOrgSelect',
		'enter #gh-org': 'onOrgSelect',
		'focus #gh-org': 'emptyField'
	},

	initialize: function(options) {
		this.bus = options.bus;
	},

	emptyField: function() {
		$('#gh-org').val('');
	},

	onOrgSelect: function() {
		var org = $('#gh-org').val(),
			self = this;
		$('body').attr('data-org', org);
		$('#gh-org').val('');

		var repoItems = new RepoItems({el: '#repos' });

		repoItems.url = 'https://api.github.com/users/'+org+'/repos?sort=pushed';

		repoItems.fetch({
			success: function() {
				var av;
				if (repoItems.models[0] !== undefined) {
					av = repoItems.models[0].get('owner').avatar_url;
				}

				if ($('#repos').length > 0) {
					$('#repos').remove();
				}
				$('#commitslist').empty().append('<li id="visitRepo" class="ahem"><p>Recent commits</p>');
				if (debug) {
					console.log('DEBUG: Repos data:', repoItems);
				}
				var reposView = new ReposView({model: repoItems, bus: self.bus, avatar: av}),
					commitsView = new CommitsView({bus: self.bus});

				$('#container').prepend(reposView.render().$el);
				commitsView.render();
			},
			error: function() {
				$('#repos').empty().append('<li id="" class="ahem"><p>Sorry, that user doesn\'t appear to exist. Try another?</p></li>');
				$('header').css('background-image', 'url()');
				$('#commitslist').empty().append('<li id="visitRepo" class="ahem"><p>Recent commits</p>');
			}
		});
	}
});