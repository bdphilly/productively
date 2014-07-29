Productively.Views.CardForm = Backbone.CompositeView.extend({
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
    return this;
  },

  create: function (event) {
    event.preventDefault();
    this.collection.create({
      title: this.$('.title').val(),
      list_id: this.collection.list.id,
      ord: this.collection.models.length,
    }, { wait: true });
    this.$('.title').val('');
    this.$('.title').focus();
  },
});