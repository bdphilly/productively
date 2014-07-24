window.Tasktime = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Tasktime.Routers.router = new Tasktime.Routers.Router({
      $rootEl: $("#content") 
    });
    Tasktime.Collections.boards = new Tasktime.Collections.Boards;
    Backbone.history.start();
  }
};

Backbone.CompositeView = Backbone.View.extend ({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);

    subview.delegateEvents();

    //if list have subviews, delegate events for each subview
    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});

$(document).ready(function () {
  Tasktime.initialize();
});