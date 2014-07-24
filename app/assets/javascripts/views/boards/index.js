Tasktime.Views.BoardsIndex = Backbone.View.extend ({
  template: JST['boards/index'],

  initialize: function () {
    // this.listenTo(this.collection, "sync add remove change", this.render);
  },

  rander: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    return this;
  },

});