/*global define*/

define([

  'marionette',
  'templates',
  'app.vent'

], function(Marionette, Templates, Vent) {

  'use strict';

  return Marionette.ItemView.extend({

    template : Templates.itemEditHeader,

    ui: {

      input: '#new-todo',
      panelTitle: 'h1'

    },

    events: {
      
      'click .close-panels': 'closePanel'
    
    },

    onRender: function() {

      // Is this a new model?
      if (!this.model) {

        this.ui.panelTitle.text('Add an item');

      }
      else {

        this.ui.panelTitle.text('Edit this item');

      }

    },

    closePanel: function(e) {

      e.preventDefault();

      Vent.trigger('close:panels');

    }

  });

});