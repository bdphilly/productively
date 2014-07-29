Productively.Views.CardShow = Backbone.View.extend({
  template: JST['cards/show'],

  events: {
    'click button.delete-card': 'destroyCard',
  },

  id: function () {
    return 'card-' + this.model.id;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync remove', this.render);
  },

  render: function () {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);
    return this;
  },

  destroyCard: function () {
    event.preventDefault()
    
    this.model.destroy({
      succcess: function () {
        alert('gone!');
      }
    });
  },



});