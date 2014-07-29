Productively.Views.BoardShow = Backbone.CompositeView.extend ({
  template: JST['boards/show'],

  className: 'list',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.renderListForm);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);
  },

  render: function () {
    var content = this.template({
      board: this.model
    });

    this.$el.html(content);
    this.attachSubviews();
    globalview = this;
    return this;
  },

  renderLists: function () {
    this.model.lists().each(this.addList.bind(this));
  },

  addList: function (list) {
    var view = new Productively.Views.ListShow({
      model: list
    })
    this.addSubview('.inner-list', view);
  },

  renderListForm: function () {
    var view = new Productively.Views.ListForm({
      collection: this.model.lists()
    });
    this.addSubview('.list-form', view);
  },

  removeList: function (list) {
    var subview = _.find(
      this.subviews('.inner-list'),
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview('.inner-list', subview);
  },

});