Productively.Views.BoardShow = Backbone.CompositeView.extend ({
  template: JST['boards/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList)
  },

  render: function () {
    var content = this.template({
      board: this.model
    });

    this.$el.html(content);
    this.renderLists();
    this.renderListForm();
    return this;
  },

  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
  },

  addList: function (list) {
    var view = new Productively.Views.ListShow({
      model: list
    })
    this.addSubview('#lists', view);
  },

  renderListForm: function () {
    var view = new Productively.Views.ListForm({
      collection: this.model.lists()
    });
    this.addSubview('#list-form', view);
  },

});