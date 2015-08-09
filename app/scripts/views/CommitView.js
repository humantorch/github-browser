var CommitView = Backbone.View.extend({
	tagName: 'li',
	className: 'commit',

	initialize: function(options) {
		if (!(options || options.model)) {
			throw new Error('no model');
		}
	},
	render: function() {
		var template = _.template($('#commitTemplate').html()),
			html = template(this.model.toJSON());
		this.$el.html(html);

		return this;
	}
});