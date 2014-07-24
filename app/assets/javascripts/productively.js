window.Productively = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Productively.Routers.router = new Productively.Routers.Router;
    Productively.Collections.boards = new Productively.Collections.Boards;
    Backbone.history.start();
  }
};