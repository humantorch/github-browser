var ReposView = Backbone.View.extend({
	tagName: 'ul',
	id: 'repos',
	className: 'viewList',
	initialize: function(options) {
		this.bus = options.bus;
	},
	render: function() {
		var self = this;

		this.model.each(function(repoItem) {
			var view = new RepoView({model: repoItem, bus: self.bus});
			self.$el.append(view.render().$el);
		});

		return this;
	}
})