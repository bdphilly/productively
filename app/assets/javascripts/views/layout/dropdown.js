Productively.Views.DropDownView = Backbone.View.extend ({
  template: JST['layout/dropdown'],
  formTemplate: JST['layout/_form'],

  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

});