Productively.Routers.Router = Backbone.Router.extend ({
  initialize: function () {
    var dropDownView = new Productively.Views.DropDownView({
      collection: Productively.Collections.boards
    });
    $('#add-dropdown').append(dropDownView.render().$el);
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
    this._currentView = newView;
    $('#content').html(newView.render().$el);
  },
});