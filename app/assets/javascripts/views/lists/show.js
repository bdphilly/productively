Productively.Views.ListShow = Backbone.CompositeView.extend ({
  template: JST['lists/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
  },

  render: function () {
    var content = this.template({
      list: this.model
    });

    this.$el.html(content);
    this.renderCards();
    this.renderCardForm();
    return this;
  },

  renderCards: function () {
    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function (card) {
    var view = new Productively.Views.CardShow({
      model: card
    });
    this.addSubview('#cards', view);
  },

  renderCardForm: function () {
    var view = new Productively.Views.CardForm({
      collection: this.model.cards()
    });
    this.addSubview('#card-form', view);
  },

})