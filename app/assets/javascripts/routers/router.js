Productively.Routers.Router = Backbone.Router.extend ({
  initialize: function () {
    var dropDownView = new Productively.Views.DropDownView({
      collection: Productively.Collections.boards
    });
    $('#add-dropdown').append(dropDownView.render().$el);
  },

  routes: {
    "": "boardsIndex",
    "boards/:id": "boardShow" 
  },

  boardsIndex: function () {
    Productively.Collections.boards.fetch();
    var indexView = new Productively.Views.BoardsIndex({
      collection: Productively.Collections.boards
    });
    this._swapView(indexView);
  },

  boardShow: function (id) {
    var board = Productively.Collections.boards.getOrFetch(id);
    var showView = new Productively.Views.BoardShow({
      model: board
    });
    this._swapView(showView);
  },

  _swapView: function(newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('#content').html(newView.render().$el);
  },
});