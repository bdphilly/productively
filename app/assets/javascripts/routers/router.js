Tasktime.Routers.Router = Backbone.Router.extend ({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    // "": "boardsIndex",
    // "boards/new": "boardNew",
    // "boards/:id": "boardShow",
  },

  boardsIndex: function () {
    Tasktime.Collections.boards.fetch({
      // success: alert(Tasktime.Collections.boards.length)
    });
    // debugger
    var indexView = new Tasktime.Views.BoardsIndex({
      collection: Tasktime.Collections.boards
    });
    Tasktime.Collections.boards.fetch();
    this._swapView(indexView);
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this.$rootEl.html(newView.render().$el);
    this._currentView = newView;
  },
});