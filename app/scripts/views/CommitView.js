var CommitView = Backbone.View.extend({
	tagName: 'li',
	className: 'repo',
	// events: {
	// 	'click': 'onClick'
	// },
	// onClick: function() {
	// 	this.bus.trigger('repoSelected', this.model);
	// },
	initialize: function(options) {
		this.bus = options.bus;
		if (!(options || options.model)) {
			throw new Error('no model');
		}
	},
	render: function() {
		var template = _.template($('#commitTemplate').html());
		// console.log(this.model);
		var html = template(this.model.toJSON());
		this.$el.html(html);

		return this;
	}
});