Productively.Views.ListForm = Backbone.CompositeView.extend ({
  template: JST['lists/form'],

  className: 'list-form-container',

  events: {
    'submit': 'create',
    'click .new-list-title': 'showForm',
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
      board_id: this.collection.board.id,
      ord: this.collection.length + 1,
    }, { wait: true });
    this.$('.title').val('');
    this.$('.title').focus();
    $('.new-list-title').show();
    $('.new-list-form').hide();
  },

  showForm: function (event) {
    event.preventDefault();
    $('.new-list-title').hide();
    $('.new-list-form').show();
  },

})