/*global define*/

define([

  'marionette',
  'templates',
  'app.vent',
  'backbone.syphon'

], function(Marionette, Templates, Vent, Syphon) {

  'use strict';

  return Marionette.ItemView.extend({

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

      this.listenTo(this.collection, 'add', this.render, this);

    },

    onRender: function() {

      if (this.model.isNew()) {

        this.ui.button.text('Add');

      }
      else {

        this.ui.titleField.val(this.model.get('title'));

        this.ui.button.text('Update');

      }

    },

    saveItem: function(e) {

      e.preventDefault();

      // Syphon the model data from the view
      var data = Syphon.serialize(this);

      // Validate
      if (data.title) {

        Vent.trigger('save:item', {

          view: this,
          data: data

        });

      }
      else {

        return;

      }

    }

  });

});