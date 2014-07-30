Productively.Views.BoardForm = Backbone.CompositeView.extend({
  template: JST['boards/form'],

  className: 'the-board-form',

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
      // ord: this.collection.length,
    }, { 
      wait: true,

      success: function (resp) {
        Backbone.history.navigate('/boards/' + resp.id, { trigger: true });
      }
       });
    this.$('.title').val('');
    this.$('.title').focus();
  },
});