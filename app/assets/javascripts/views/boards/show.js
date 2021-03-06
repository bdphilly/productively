Productively.Views.BoardShow = Backbone.CompositeView.extend ({
  template: JST['boards/show'],

  className: 'list',

  events: {
    'click .delete-board-modal': 'destroyBoard',
  },

  initialize: function () {
    // this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model, 'sync', this.renderListForm);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);
  },

  render: function () {
    // Temporary hack to deal with the zombie subviews
    if (this.subviews('.inner-list').length > 0) {
      var that = this;
      var subviews = that.subviews('.inner-list')
      for (var i = 0; i < subviews.length; i++) {
        console.log(subviews[i]);
        this.removeSubview('.inner-list', subviews[i])
      }
      if (subviews.length == 1) {
        this.removeSubview('.inner-list', subviews[0])
      }
    }

    // if (this.subviews('.list-form').length > 0) {
    //   subview = this.subviews('.list-form')[0]
    //   this.removeSubview('.list-form', subview)
    // }

    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.renderLists();
    this.renderListForm();
    this.attachSubviews();
    globalview = this;
    return this;
  },

  renderLists: function () {
    var that = this;

    this.model.lists().each(this.addList.bind(this));
    this.$('.inner-list').sortable({
      connectWith: '.inner-list',

      cursor: 'move',

      handle: '.panel-heading',

      tolerance: 'pointer',

      update: function (event, ui) {
        console.log(event.target);
        var listIdArray = $(event.target).sortable('toArray', { 
          attribute: 'id' 
        });
        console.log(listIdArray);
        that.updateRanks(listIdArray);
      },
    });
  },

  updateRanks: function (listIdArray) {
    var that = this;
    var rank = 0;
    _.each(listIdArray, function (listId) {
      var id = listId.split('-')[1];
      var list = that.model.lists().get(id);
      list.save({ 'ord': rank });
      rank ++;
    });
  },

  addList: function (list) {
    var view = new Productively.Views.ListShow({
      model: list
    })
    this.addSubview('.inner-list', view);
  },

  renderListForm: function () {
    var view = new Productively.Views.ListForm({
      collection: this.model.lists()
    });
    this.addSubview('.list-form', view);
  },

  removeList: function (list) {
    var subview = _.find(
      this.subviews('.inner-list'),
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview('.inner-list', subview);
  },

  destroyBoard: function (event) {
    event.preventDefault();
    var that = this;
    this.model.destroy({
      success: function (){
        that.$el.hide();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        Backbone.history.navigate('', { trigger: true });
      },
      error: function (model, response) {
        console.log(response)
      }
    });

  },

});