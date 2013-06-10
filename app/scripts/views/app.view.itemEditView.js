/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, Templates) {
  
  'use strict';

  return Marionette.CompositeView.extend({

    template: Templates.itemEditView,

    ui: {

      titleField: '#form-item-name',
      listCombo: '#form-item-list',
      button: '.form-item-button',
      notification: '.notification',
      notificationText: '#notification-text'
    
    },

    events: {

      'submit #form-edit-item': 'saveItem'
    
    },

    initialize: function() {

      // this.listenTo(this.model, 'change', this.render, this);

    },

    onRender: function() {
      
      if (this.model) {

        this.ui.titleField.val(this.model.get('title'));

        this.ui.button.text('Update');

      }
      else {

        this.ui.button.text('Add');

      }

    },

    saveItem: function(e) {

      e.preventDefault();

      var
      that = this,
      App = require('app'),
      title = this.ui.titleField.val(),
      listId = this.ui.listCombo.find('option:selected').val();

      // Validate
      if (title) {

        // If we are updating a model
        if (this.model) {

          this.model.set({

            title: title,
            listId: listId

          });

          this.model.save();

          App.vent.trigger('notify', {

            target: that.ui.notification,
            textTarget: that.ui.notificationText,
            mode: 'success',
            message: 'Your item has been updated'

          });

        }
        else {

          App.vent.trigger('add:item', {

            title: title,
            listId: listId

          }, function(model) {

            // Re-render the form
            that.render();

            App.vent.trigger('notify', {

              target: that.ui.notification,
              textTarget: that.ui.notificationText,
              mode: 'success',
              message: 'Your item has been added'

            });

          });

        }

      }
      else {

        return;

      }

    }

  });

});