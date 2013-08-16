/*global $*/
define([

  'backbone',
  'marionette',
  'app.vent',
  'collections/app.collection.items',
  'collections/app.collection.lists',
  'views/app.view.itemHeader',
  'views/app.view.itemListView',
  'views/app.view.listHeader',
  'views/app.view.listView',
  'views/app.view.itemEditHeader',
  'views/app.view.itemEditView',
  'models/app.model.item',
  'app.controller',
  'app.router',
  'snap'

], function(Backbone, Marionette, Vent, ItemCollection, ListCollection, ItemHeaderView, ItemListView, ListsHeaderView, ListsView, EditHeaderView, EditItemView, ItemModel, Controller, Router, Snap) {

  'use strict';

  var
  that = this,
  App = new Marionette.Application(),
  itemCollection = new ItemCollection(),
  listCollection = new ListCollection(),
  itemsOptions = {

    collection: itemCollection

  },
  snapper = new Snap({

    element: document.getElementById('content')

  });

  window.App = App;

  /*
  Application State Object
  */
  App.state = {};

  /*
  Application Regions
  */
  App.addRegions({

    itemsHeader: '#content-header',
    itemsMain: '#content-main',
    listsHeader: '#list-header',
    listsMain: '#list-main',
    editHeader: '#edit-header',
    editMain: '#edit-main'

  });

  /*
  Application Initialisers
  */
  App.addInitializer(function(){

    /*
    Disable the panel slide
    */

    snapper.disable();
    
    /*
    Fetch the collections
    */

    itemCollection.fetch();
    listCollection.fetch();

    /*
    Main region event
    */

    // When the main list is shown
    App.itemsMain.on('show', function() {

      // Fade in the app content
      $('body').fadeIn('slow');

    });

    /*
    Show the items
    */

    App.itemsHeader.show(new ItemHeaderView(itemsOptions));
    App.itemsMain.show(new ItemListView(itemsOptions));

  });

  /*
  Post-Initialisation
  */
  App.on('initialize:after', function() {

    /*
    Instantiate a new router
    */

    new Router({

      controller: Controller

    });

    /*
    Start Backbone history
    */

    Backbone.history.start();

    /*
    Fixes
    */

    // Allow :active styles to work in your CSS on a page in Mobile Safari
    document.addEventListener('touchstart', function() {}, true);

  });

  /*
  Open the right panel and load in the add/edit views
  */
  Vent.on('open:right:panel', function(options) {

    var itemOptions = {};

    /*
    Set any defaults for the itemOptions object
    */

    _.defaults(itemOptions, {

      model: new ItemModel(),
      collection: itemCollection,
      listCollection: listCollection

    });

    // Have options and a model been supplied?
    if (options && options.model) {

      // Set itemOptions model to supplied model
      itemOptions.model = options.model;

    }

    /*
    Post-show
    */

    App.editMain.on('show', function(view) {

      // Load the combo lists
      Vent.trigger('combo:lists', {

        view: view,
        model: itemOptions.model

      });

      // Open the right-hand panel
      snapper.open('right');

      // Enable panel slide
      snapper.enable();

    });

    /*
    Show the views
    */

    App.editHeader.show(new EditHeaderView(itemOptions));
    App.editMain.show(new EditItemView(itemOptions));

  });

  /*
  Open the left panel and load in the list views
  */
  Vent.on('open:left:panel', function() {

    // console.log(listCollection);
    // console.log(App.listsMain.currentView);

    // Have the lists already been displayed?
    if (!App.listsMain.currentView) {

      var listsOptions = {

        collection: listCollection

      };

      /*
      Post-show
      */

      App.listsMain.on('show', function(view) {

        // Open the right-hand panel
        snapper.open('left');

        // Enable panel slide
        snapper.enable();

      });

      /*
      Set any defaults for the itemOptions object
      */

      App.listsHeader.show(new ListsHeaderView(listsOptions));
      App.listsMain.show(new ListsView(listsOptions));

    }
    else {

      // Open the right-hand panel
      snapper.open('left');

      // Enable panel slide
      snapper.enable();

    }

  });

  /*
  Close any open panels
  */
  Vent.on('close:panels', function() {

    // Close all panels
    snapper.close();

    // Disable the panel slide
    snapper.disable();

  });

  /*
  Save Item
  */
  Vent.on('save:item', function(options, callback) {

    var
    view = options.view,
    data = options.data,
    model = options.view.model,
    isNew = model.isNew();

    // Set the model values
    model.set({

      title: data.title,
      created: (isNew) ? Date.now() : model.get('created'),
      listId: data.listId

    }).save();

    // Is this a new model?
    if (isNew) {

      // Are we in a filtered state?
      if (App.state.filtered) {

        // Is the new model set to the filtered list?
        if (App.state.listId === model.get('listId')) {

          // Add the item to the filtered collection
          App.itemsMain.currentView.collection.add(model);

        }

      }

      // Add the item to the collection
      itemCollection.add(model);

      // Clear the title text field
      view.ui.titleField.val('');

      //
      view.model = new ItemModel();

      // Reset the lists combo
      Vent.trigger('combo:lists', {

        view: view,
        model: undefined

      });

      // Reset the 'add' button
      view.ui.button.text('Add');

    }
    else {

      // Are we in a filtered state?
      if (App.state.filtered) {

        // Is the updated model set to the filtered list?
        if (App.state.listId !== model.get('listId')) {

          // Add the item to the filtered collection
          App.itemsMain.currentView.collection.remove(model);

        }
        else {

          // Add the item to the filtered collection
          App.itemsMain.currentView.collection.add(model);

        }

      }

    }

    // Fire any callback supplied
    if (callback) {

      callback(true);

    }

    // Notify the user
    Vent.trigger('notify', {

      target: view.ui.notification,
      textTarget: view.ui.notificationText,
      mode: 'success',
      message: 'Your item has been saved'

    });

  });

  /*
  Load Lists Combo
  */
  Vent.on('combo:lists', function(options) {

    var target = options.view.$el.find('#form-item-list');

    // If there are no lists
    if (listCollection.length === 0) {

      // Hide the combo
      target.parent().hide();

      return;

    }

    // Loop through each model in the list collection
    _.each(listCollection.models, function(value, index) {

      var
      exists = false,
      listId = value.get('listId'),
      title = value.get('title');

      _.each(target[0].options, function(item) {

        var
        option = $(item),
        optionValue = option.val();

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
          if (options.model.get('listId') === optionValue && optionValue) {

            option.prop('selected', true);

          }

        });

      }

    });

  });

  /*
  Filter Items
  */
  Vent.on('filter:items', function(options) {

    var
    filteredCollection = itemCollection.clone(),
    filtered = filteredCollection.filter(function(item) {

      return item.get('listId') === options.listId;

    });

    // App items filtered state
    App.state.filtered = true;
    App.state.listId = options.listId;

    //
    filteredCollection.reset(filtered);

    // After we have shown the item header
    App.itemsHeader.on('show', function(view) {

      // Change the item list title
      view.ui.itemsTitle.text(options.title);

    });

    // After we have shown the new item list
    App.itemsMain.on('show', function(view) {

      view.ui.filterControl.removeClass('hide');

      view.ui.filterText.text(options.title);

      // Show the filtered item list
      Vent.trigger('close:panels');

    });

    //
    App.itemsHeader.show(new ItemHeaderView({

      collection: filteredCollection

    }));

    //
    App.itemsMain.show(new ItemListView({

      collection: filteredCollection

    }));

    // Navigate to the right url
    Backbone.history.navigate('list/' + options.listId + '/' + options.title, false);

  });

  /*
  Add new list to lists collection
  */
  Vent.on('change:item:list', function(options) {

    // Are there any items in the collection
    if (options.collection.length > 0) {

      // Compare the model's listId against the collection's listId
      if (options.collection.models[0].get('listId') === options.model.get('listId')) {

        // Same listId's, so must be an add
        options.collection.add(options.model);

      }
      else {

        // ListId's not the same so remove from collection
        options.collection.remove(options.model);

      }

    }
    else {

      // No items in collection, so must be an add
      options.collection.add(options.model);

    }

  });

  /*
  Remove any item filter
  */
  Vent.on('remove:filter', function() {

    // App items filtered state
    App.state.filtered = false;

    // After we have shown the item header
    App.itemsHeader.on('show', function(view) {

      // Change the item list title
      view.ui.itemsTitle.text('All items');

    });

    // After we have shown the new item list
    App.itemsMain.on('show', function(view) {

      view.ui.filterControl.addClass('hide');

      view.ui.filterText.text('');

    });

    App.itemsHeader.show(new ItemHeaderView({

      collection: itemCollection

    }));

    App.itemsMain.show(new ItemListView({

      collection: itemCollection

    }));

    // Navigate to the right url
    Backbone.history.navigate('', false);

  });

  /*
  Notify the user or summat
  */
  Vent.on('notify', function(options) {

    console.log(options);

    //
    options.textTarget.text(options.message);

    //
    options.target.addClass(options.mode);

    //
    options.target.fadeIn(800);

    //
    if (options.mode === 'success') {

      //
      options.target.find('i').addClass('icon-ok');

    } 

    //
    options.target.delay(2000).fadeOut(1000);

  });

  /*
  Disable snapper after slide
  */
  snapper.on('end', function(){
    
    snapper.disable();
  
  });

  return App;

});