/*global define*/

define([

  'marionette',
  'templates',
  'app.vent',
  'models/app.model.list',
  'views/app.view.listItemView'

], function(Marionette, Templates, Vent, ListModel, ListItemView) {
  
  'use strict';

  return Marionette.CompositeView.extend({

    template: Templates.listView,

    itemView: ListItemView,

    itemViewContainer: '#list-list',

    ui: {
      
      toggle: '#toggle-all',
      listInput: '.add-item',
      notification: '.notification',
      notificationText: '#notification-text'
    
    },

    events: {

      'keypress .add-item': 'addInputKeypress',
      'submit #form-add-list': 'addItem'
    
    },

    appendHtml: function(cv, iv, index){

      var $container = this.getItemViewContainer(cv);

      $container.prepend(iv.el);

    },

    addInputKeypress: function(e) {

      var ENTER_KEY = 13;

      if (e.which === ENTER_KEY) {

        this.addItem();

      }

    },

    addItem: function(e) {

      e.preventDefault();

      var listText = this.ui.listInput.val().trim();

      // Has list title been supplied?
      if (listText) {

        // Creat a new list model
        var model = new ListModel();

        // Set and save the new model
        model.set('title', listText).save();

        // Add the new model to the collection
        this.collection.add(model);

        // Notify the user
        Vent.trigger('notify', {

          target: this.ui.notification,
          textTarget: this.ui.notificationText,
          mode: 'success',
          message: 'Your list has been added'

        });

        // Clean up the UI
        this.ui.listInput.val('');

      }
      
    }

  });

});
