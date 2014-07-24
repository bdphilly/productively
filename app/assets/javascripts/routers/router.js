Productively.Routers.Router = Backbone.Router.extend ({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "boardsIndex", 
  },

  boardsIndex: function () {
    Productively.Collections.boards.fetch();
    var indexView = new Productively.Views.BoardsIndex({
      collection: Productively.Collections.boards
    });
    this._swapView(indexView);
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(newView.render().$el);
    this._currentView = newView;
  },
});