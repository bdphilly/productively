Tasktime.Collections.Lists = Backbone.Collection.extend ({
  model: Tasktime.Models.List,

  initialize: function (models, options) {
    this.board = options.board;
  },

  url: function () {
    return 'api/boards/' + this.board.id + '/lists';
  },

  comparator: function (list) {
    return list.get('rank');
  },

  getOrFetch: function (id) {
    var lists = this;
    var list;
    if (list = this.get(id)) {
      list.fetch();
    } else {
      list = new Tasktime.Models.List({ id: id });
      list.fetch({
        success: function () {
          lists.add(list)
        }
      });
    }

    return list;
  },

})