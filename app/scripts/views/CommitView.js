var CommitView = Backbone.View.extend({
	tagName: 'li',
	className: 'commit',

	events: {
		'click': 'commitClick'
	},
	commitClick: function(){
		window.open(this.model.get('html_url'), '_blank');
	},

	initialize: function(options) {
		// this.bus = options.bus;
		if (!(options || options.model)) {
			throw new Error('no model');
		}
	},
	render: function() {
		var template = _.template($('#commitTemplate').html());
		var html = template(this.model.toJSON());
		this.$el.html(html);

		return this;
	}
});