Productively.Views.ListShow = Backbone.CompositeView.extend ({
  template: JST['lists/show'],

  className: 'list-container',

  events: {
    'click .add-a-card': 'showForm',
    'click .delete-list': 'destroyList',
    'mouseover .panel': 'showDeleteButton',
    'mouseleave .panel': 'hideDeleteButton',
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);
  },

  render: function () {
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);
    this.renderCards();
    return this;
  },

  renderCards: function () {
    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function (card) {
    var view = new Productively.Views.CardShow({
      model: card
    });
    this.addSubview('.cards', view);
  },

  removeCard: function (card) {
    var subview = _.find(
      this.subviews(".cards"),
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview(".cards", subview);
  },

  renderCardForm: function () {
    var view = new Productively.Views.CardForm({
      collection: this.model.cards()
    });

    this.addSubview('.card-form', view);
  },

  showForm: function (event) {
    event.preventDefault();
    $(event.target).toggle();
    this.renderCardForm();
  },

  showDeleteButton: function (event) {
    event.preventDefault();
    $(event.target).find('.delete-list').css('visibility', 'visible');
  },

  hideDeleteButton: function (event) {
    event.preventDefault();
    $(event.target).find('.delete-list').css('visibility', 'hidden');
  },

  destroyList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

});