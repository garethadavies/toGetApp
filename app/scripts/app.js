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
  'models/app.model.item',
  'snap'

], function(Marionette, ItemCollection, ListCollection, ItemHeader, ItemListView, ListHeader, ListView, EditHeader, EditView, ItemModel, Snap) {

  'use strict';

  var
  that = this,
  App = new Marionette.Application(),
  itemCollection = new ItemCollection(),
  listCollection = new ListCollection(),
  snapper = new Snap({

    element: document.getElementById('content')

  });

  /*
  Disable snapper after slide
  */
  snapper.on('end', function(){
    
    snapper.disable();
  
  });

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

    snapper.disable();

    var
    itemsOptions = {

      collection: itemCollection

    },
    listsOptions = {

      collection: listCollection

    };

    /*
    Fetch the collections
    */

    itemCollection.fetch();
    listCollection.fetch();

    /*
    Show the add/edit form
    */

    App.editHeader.show(new EditHeader());
    App.editMain.show(new EditView());

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
    */

    // $('#open-left').on('click', function() {

    //   if (snapper.state().state == 'left') {

    //     snapper.close();

    //   }
    //   else {

    //     snapper.open('left');

    //   }

    // });

    // $('#content li').on('click', function(e) {

    //   // console.log(e);

    //   // Make sure the list item has been clicked
    //   if (e.target.tagName === 'LI') {

    //     snapper.open('right');

    //   }

    // });

    // $('.close-panels').on('click', function() {

    //   snapper.close();

    // }); 

  });

  // vent.on('itemCollection:filter',function(filter) {
  //   filter = filter || 'all';
  //   $('#todoapp').attr('class', 'filter-' + filter);
  // });

  // vent.on('itemCollection:clear:completed',function(){
  //   function destroy(todo)     { todo.destroy(); }

  //   itemCollection.getCompleted().forEach(destroy);
  // });

  App.vent.on('add:item', function(options, callback) {

    // console.log(options);

    var model = new ItemModel();

    model.set({

      title: options.title,
      created: Date.now(),
      listId: options.listId

    }).save();

    itemCollection.add(model);

    if (callback) {

      callback(model);

    }

  });

  App.vent.on('open:right', function() {

    snapper.open('right');

    snapper.enable();

  });

  App.vent.on('open:left', function() {

    snapper.open('left');

    snapper.enable();

  });

  App.vent.on('close:panels', function() {

    snapper.close();

    snapper.disable();

  });

  App.vent.on('edit:item', function(e, model) {

    var itemOptions = {

      model: model

    };

    if (e.target.tagName === 'LI') {

      snapper.open('right');

    }

    /*
    Post-show
    */

    App.editMain.on('show', function(view) {

      App.vent.trigger('combo:lists', {

        view: view,
        model: model

      });

    });

    /*
    Show the items
    */

    App.editHeader.show(new EditHeader(itemOptions));

    App.editMain.show(new EditView(itemOptions));

  });

  App.vent.on('combo:lists', function(options) {

    // console.log(view);
    // console.log(itemCollection);

    var target = options.view.$el.find('#form-item-list');

    // console.log(target[0].options.length);

    _.each(listCollection.models, function(value, index) {

      var
      exists = false,
      listId = value.get('listId'),
      title = value.get('title');

      _.each(target[0].options, function(item) {

        var
        option = $(item),
        optionValue = option.val();

        // console.log($(item).val());
        // console.log(index);
        // console.log(model.get('listId'));

        option.prop('selected', false);

        // If the listId is already in the combo
        if (optionValue === listId) {

          exists = true;

        }

      });

      // If the list item does not exist
      if (!exists) {

        target.append(new Option(value.get('title'), value.get('listId')));

      }

      // Has a model been supplied (edit state)
      if (options.model) {

        _.each(target[0].options, function(item) {

          var
          option = $(item),
          optionValue = option.val();

          // Does the item already have a listId set?
          if (options.model.get('listId') === optionValue) {

            option.prop('selected', true);

          }

        });

      }

    });

  });

  App.vent.on('filter:items', function(list) {

    var
    listId = list.get('listId'),
    filteredCollection = itemCollection.clone();

    // itemCollection.fetch();

    // console.log(listId);

    var filtered = filteredCollection.filter(function(item) {

      return item.get('listId') === listId;

    });

    // console.log(filtered);

    filteredCollection.reset(filtered);

    App.itemsHeader.show(new ItemHeader({

      collection: filteredCollection

    }));

    App.itemsMain.show(new ItemListView({

      collection: filteredCollection

    }));

    //
    $('#items-title').text(list.get('title'));

  });

  App.vent.on('notify', function(options) {

    options.textTarget.text(options.message);

    options.target.removeClass('hide');

    options.target.addClass(options.mode);

    if (options.mode === 'success') {

      options.target.find('i').addClass('icon-ok');

    } 

    options.target.delay(2000).fadeOut(1000);

  });

  return App;

});