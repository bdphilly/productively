Productively.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],

  events: {
    'submit': 'create',
  },

  render: function () {
    var content = this.template;
    this.$el.html(content);
    return this;
  },

  create: function (event) {
    event.preventDefault();
    this.collection.create({
      title: this.$('#title').val(),
      list_id: this.collection.list.id
    });
    this.$('#title').val('');
    this.$('#title').focus();
  }
});