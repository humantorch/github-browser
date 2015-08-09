var RepoView = Backbone.View.extend({
	tagName: 'li',
	className: 'repo',
	events: {
		'click': 'onClick'
	},
	onClick: function() {
		this.bus.trigger('repoSelected', this.model);
	},
	initialize: function(options) {
		this.bus = options.bus;
		if (!(options || options.model)) {
			throw new Error('no model');
		}
	},
	render: function() {
		var template = _.template($('#repoTemplate').html());
		var html = template(this.model.toJSON());
		this.$el.html(html);

		return this;
	}
});