Productively.Collections.Lists = Backbone.Collection.extend ({
  model: Productively.Models.List,

  initialize: function (models, options) {
    this.board = options.board;
  },

  url: 'api/lists',

  getOrFetch: function (id) {
    var lists = this;
    var list;
    if (list = this.get(id)) {
      list.fetch();
    } else {
      list = new Productively.Models.List({ id: id });
      list.fetch({
        success: function () {
          lists.add(list);
        }
      })
    };
    
    return list;
  },
  
});