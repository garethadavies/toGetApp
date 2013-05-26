/*global $*/
define([

  'marionette',
  // 'vent',
  'app.collections',
  'views/app.view.itemHeader',
  'views/app.view.itemListView',
  'snap'

], function(marionette, TodoList, ItemHeader, ItemListView, Snap) {

  'use strict';

  var
  App = new marionette.Application(),
  todoList = new TodoList();

  App.listenTo(todoList, 'all', function() {
    // if (todoList.length === 0) {
    //   App.main.$el.hide();
    //   // App.footer.$el.hide();
    // } else {
    //   App.main.$el.show();
    //   // App.footer.$el.show();
    // }
  });

  App.addRegions({

    itemsHeader: '#content-header',
    itemsMain: '#content-main',
    listsHeader: '#content-header',
    listsMain: '#content-main',
    editHeader: '#content-header',
    editMain: '#content-main'

  });

  App.addInitializer(function(){

    var itemsOptions = {

      collection: todoList

    };

    /*
    Show the items
    */

    App.itemsHeader.show(new ItemHeader(itemsOptions));
    App.itemsMain.show(new ItemListView(itemsOptions));

    /*
    Show the lists
    */

    // App.listsHeader.show(new Header(viewOptions));
    // App.listsMain.show(new TodoListCompositeView(viewOptions));

    /*
    Show the items
    */

    // App.editHeader.show(new Header(viewOptions));
    // App.editMain.show(new TodoListCompositeView(viewOptions));

    /*
    */

    todoList.fetch();

    var snapper = new Snap({

      element: document.getElementById('content')

    });

    $('#open-left').on('click', function() {

      if (snapper.state().state == 'left') {

        snapper.close();

      }
      else {

        snapper.open('left');

      }

    });

    $('#content li').on('click', function(e) {

      console.log(e);

      // Make sure the list item has been clicked
      if (e.target.tagName === 'LI') {

        snapper.open('right');

      }

    });

    $('.close-panels').on('click', function() {

      snapper.close();

    }); 

  });

  // vent.on('todoList:filter',function(filter) {
  //   filter = filter || 'all';
  //   $('#todoapp').attr('class', 'filter-' + filter);
  // });

  // vent.on('todoList:clear:completed',function(){
  //   function destroy(todo)     { todo.destroy(); }

  //   todoList.getCompleted().forEach(destroy);
  // });

  return App;

});