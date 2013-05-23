/*global $*/
define([

  'marionette',
  // 'vent',
  'app.collections',
  'views/app.view.header',
  'views/app.view.itemListView',
  'snap'

], function(marionette, TodoList, Header, TodoListCompositeView, Snap) {

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

    header: '#content-header',
    main: '#content-main'

  });

  App.addInitializer(function(){

    var viewOptions = {

      collection: todoList
    
    };

    App.header.show(new Header(viewOptions));
    App.main.show(new TodoListCompositeView(viewOptions));

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

    $('#content li').on('click', function() {

      snapper.open('right');

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