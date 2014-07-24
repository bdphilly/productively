Tasktime.Collections.Cards = Backbone.Collection.extend ({
  model: Tasktime.Models.Card,

  initialize: function (models, options) {
    this.list = options.list;
  },

  url: function () {
    return 'api/lists/' + this.list.id + '/cards';
  },

  comparator: function (card) {
    card.get('rank');
  },

  getOrFetch: function (id) {
    var cards = this;
    var card;
    if (card = this.get(id)) {
      card.fetch();
    } else {
      card = new Tasktime.Models.Card({ id: id });
      card.fetch({
        success: function () {
          cards.add(card)
        }
      });
    }

    return card;
  },

});