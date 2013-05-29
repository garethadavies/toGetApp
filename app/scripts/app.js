/*global $*/
define([

  'marionette',
  // 'vent',
  'collections/app.collection.items',
  'collections/app.collection.lists',
  'views/app.view.itemHeader',
  'views/app.view.itemListView',
  'views/app.view.listHeader',
  'views/app.view.listView',
  'views/app.view.itemEditHeader',
  'views/app.view.itemEditView',
  'snap'

], function(Marionette, ItemCollection, ListCollection, ItemHeader, ItemListView, ListHeader, ListView, ItemEditHeader, ItemEditView, Snap) {

  'use strict';

  var
  App = new Marionette.Application(),
  itemCollection = new ItemCollection(),
  listCollection = new ListCollection();

  App.listenTo(itemCollection, 'all', function() {
    // if (itemCollection.length === 0) {
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
    listsHeader: '#list-header',
    listsMain: '#list-main',
    editHeader: '#edit-header',
    editMain: '#edit-main'

  });

  App.addInitializer(function(){

    var
    itemsOptions = {

      collection: itemCollection

    },
    listsOptions = {

      collection: listCollection

    };

    /*
    Show the items
    */

    App.itemsHeader.show(new ItemHeader(itemsOptions));
    App.itemsMain.show(new ItemListView(itemsOptions));

    /*
    Show the lists
    */

    App.listsHeader.show(new ListHeader(listsOptions));
    App.listsMain.show(new ListView(listsOptions));

    /*
    Show the items
    */

    // App.editHeader.show(new Header(viewOptions));
    // App.editMain.show(new ItemCollectionCompositeView(viewOptions));

    /*
    Fetch the collections
    */

    itemCollection.fetch();
    listCollection.fetch();

    /*
    */

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

  // vent.on('itemCollection:filter',function(filter) {
  //   filter = filter || 'all';
  //   $('#todoapp').attr('class', 'filter-' + filter);
  // });

  // vent.on('itemCollection:clear:completed',function(){
  //   function destroy(todo)     { todo.destroy(); }

  //   itemCollection.getCompleted().forEach(destroy);
  // });

  return App;

});