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

		this.$el.empty().append('<li id="visitRepo" class="ahem"><p>Recent commits</p>').addClass('loading');
		commitItems.url = commits_url+'?per_page=100';

		commitItems.fetch({
			success: function(commits) {
				_this.$el.removeClass('loading').empty().append('<li id="visitRepo" class="ahem"><p>Recent commits – <a href="'+repoinfo.get('html_url')+'" target="_blank">View <em>'+repoinfo.get('name')+'</em> on Github <i class="fa fa-github"></i></a></p></li>');
				commits.each(function(commitItem) {
					var view = new CommitView({model: commitItem, bus: _this.bus});
					_this.$el.append(view.render().$el).scrollTop(0);
				});
			},
			error: function() {
				_this.$el.removeClass('loading').html('<h3>We\'re having trouble receiving any data from Github at the moment. Please try again later.</h3>');
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

