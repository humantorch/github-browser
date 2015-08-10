var RepoView = Backbone.View.extend({
	tagName: 'li',
	className: 'repo',

	events: {
		'click': 'onClick'
	},

	onClick: function() {
		if (!(this.$el.hasClass('selected'))) {
			this.bus.trigger('repoSelected', this.model);
			$('#repos').find('.selected').removeClass('selected');
			this.$el.addClass('selected');
		}
	},

	initialize: function(options) {
		this.bus = options.bus;
		if (!(options || options.model)) {
			throw new Error('no model');
		}
	},

	render: function() {
		var template = _.template($('#repoTemplate').html()),
			html = template(this.model.toJSON());
		this.$el.html(html);

		return this;
	}
});