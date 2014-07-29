Productively.Views.CardForm = Backbone.View.extend({
  template: JST['cards/form'],

  className: 'new-card-form',

  id: function () {
    return 'form-' + this.collection.list.id;
  },

  events: {
    'submit': 'create',
  },

  render: function () {
    var content = this.template;
    this.$el.html(content);
    this.$el.hide();
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
    // this.$el.hide();
  }
});