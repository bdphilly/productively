Productively.Collections.Boards = Backbone.Collection.extend ({
  model: Productively.Models.Board,

  url: 'api/boards',
  
  getOrFetch: function (id) {
    var boards = this;
    var board;
    if (board = this.get(id)) {
      board.fetch();
    } else {
      board = new Productively.Models.Board({ id: id });
      board.fetch({
        success: function () {
          boards.add(board);
        }
      })
    }
    
    return board;
  },
  
});