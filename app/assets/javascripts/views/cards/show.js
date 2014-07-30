Productively.Views.CardShow = Backbone.CompositeView.extend({
  template: JST['cards/show'],

  events: {
    'click button.delete-card': 'destroyCard',
    'mouseover .panel-card': 'showDeleteButton',
    'mouseleave .panel-card': 'hideDeleteButton',
    'mousedown .panel-card': 'rotateCardIn',
    'mouseup .panel-card': 'rotateCardOut'
  },

  id: function () {
    return 'card-' + this.model.id;
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      card: this.model
    });

    this.$el.html(content);
    return this;
  },

  showDeleteButton: function (event) {
    event.preventDefault();
    $(event.target).find('.delete-card').css('visibility', 'visible');
  },

  hideDeleteButton: function (event) {
    event.preventDefault();
    $(event.target).find('.delete-card').css('visibility', 'hidden');
  },

  destroyCard: function () {
    event.preventDefault()
    this.model.destroy();
  },

  rotateCardIn: function () {
    event.preventDefault();
    $(event.target).addClass('dragged');
  },

  rotateCardOut: function () {
    event.preventDefault();
    $(event.target).removeClass('dragged');
  },

});