Productively.Collections.Cards = Backbone.Collection.extend ({
  model: Productively.Models.Card,

  url: 'api/cards',

  comparator: 'ord',
  
  initialize: function (models, options) {
    this.list = options.list;
  },

  getOrFetch: function (id) {
    var cards = this;
    var card;
    if (card = this.get(id)) {
      card.fetch();
    } else {
      card = new Productively.Models.Card({ id: id });
      card.fetch({
        success: function () {
          cards.add(card);
        }
      })
    };
    
    return card;
  },
  
});