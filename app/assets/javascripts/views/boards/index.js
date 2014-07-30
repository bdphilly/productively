Productively.Views.BoardsIndex = Backbone.CompositeView.extend ({
  template: JST['boards/index'],

  events: {
    'click .create-new-board': 'showForm',
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.renderBoardForm);
    
  },

  render: function () {
    var content = this.template({
      boards: this.collection
    });
    this.$el.html(content);
    return this;
  },

  renderBoardForm: function () {
    var view = new Productively.Views.BoardForm({
      collection: this.collection
    });
    this.addSubview('.board-form', view);
    $('.new-board-form').hide();
    // $('.create-new-board').show();
    
  },

  showForm: function (event) {
    event.preventDefault();
    // $(event.target).toggle();
    $('.create-new-board').hide();
    $('.new-board-form').show();
    // this.renderBoardForm();

  },

});