Tasktime.Collections.Boards = Backbone.Collections.extend ({
  model: Tasktime.Models.Board,

  url: 'api/boards',

  getOrFetch: function (id) {
    var boards = this;
    var board;
    if (board = this.get(id)) {
      board.fetch();
    } else {
      board = new Tasktime.Models.Board({ id: id });
      board.fetch({
        success: function () { 
          boards.add(board) 
        }
      });
    }

    return board;
  },

});