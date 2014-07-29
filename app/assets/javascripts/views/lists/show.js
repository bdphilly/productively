Productively.Views.ListShow = Backbone.CompositeView.extend ({
  template: JST['lists/show'],

  className: 'list-container',

  events: {
    'click .add-a-card': 'showForm',
    'click .delete-list': 'destroyList',
    'mouseover .panel': 'showDeleteButton',
    'mouseleave .panel': 'hideDeleteButton',
    'sortreceive': 'receiveCard',
    // 'sortremove': 'moveCard',
    'sortstop': 'updateRanks',
  },

  initialize: function () {
    // this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);
  },

  id: function () {
    return 'list-' + this.model.id;
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
    var that = this;

    this.model.cards().each(this.addCard.bind(this));
    $('.cards').sortable({
      connectWith: '.cards'
    });
  },

  updateRanks: function (event) {
    var that = this;
    var cardIdArray = $(event.target).sortable('toArray', {
      attribute: 'id'
    });
    var rank = 0;

    _.each(cardIdArray, function (cardId) {
      var id = cardId.split('-')[1];
      var card = that.model.cards().get(id);
      card.save({ 'ord': rank });
      rank ++;
    });
  },

  addCard: function (card) {
    var view = new Productively.Views.CardShow({
      model: card
    });
    this.addSubview('.cards', view);
  },

  receiveCard: function (event, ui) {
    var cardId = ui.item.attr('id').split('-')[1];
    var cardIndex = ui.item.index() - .1;
    debugger
    var cardClone = new Productively.Models.Card({
      id: cardId,
      ord: cardIndex,
      list_id: this.model.id
    });
    cardClone.save();
    this.model.collection.add(cardClone, { 
      silent: true 
    });

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

  moveCard: function (event, ui) {
    var cardId = ui.item.attr('id').split('-')[1];
    var cardToRemove = this.model.cards().get(cardId);
    this.model.cards().remove(cardToRemove);
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