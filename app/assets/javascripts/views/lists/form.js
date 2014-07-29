Productively.Views.ListForm = Backbone.CompositeView.extend ({
  template: JST['lists/form'],

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
      board_id: this.collection.board.id,
      ord: this.collection.length,
    }, { wait: true });
    this.$('#title').val('');
    this.$('#title').focus();
  },

})