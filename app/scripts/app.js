/*global $*/
define([

  'marionette',
  'vent',
  'collections/TodoList',
  'views/Header',
  'views/TodoListCompositeView',
  'views/Footer'

], function(marionette, vent, TodoList, Header, TodoListCompositeView, Footer) {

    'use strict';

    var App = new marionette.Application(),
        todoList = new TodoList();

    App.bindTo(todoList, 'all', function() {
      if (todoList.length === 0) {
        App.main.$el.hide();
        App.footer.$el.hide();
      } else {
        App.main.$el.show();
        App.footer.$el.show();
      }
    });

    App.addRegions({
      header : '#header',
      main   : '#main',
      footer : '#footer'
    });

    App.addInitializer(function(){

      var viewOptions = {
        collection : todoList
      };

      App.header.show(new Header(viewOptions));
      App.main.show(new TodoListCompositeView(viewOptions));
      App.footer.show(new Footer(viewOptions));

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


    vent.on('todoList:filter',function(filter) {
      filter = filter || 'all';
      $('#todoapp').attr('class', 'filter-' + filter);
    });

    vent.on('todoList:clear:completed',function(){
      function destroy(todo)     { todo.destroy(); }

      todoList.getCompleted().forEach(destroy);
    });

    return App;

  }
);