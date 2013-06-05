/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, templates) {

  'use strict';

  return Marionette.ItemView.extend({

    template : templates.itemEditHeader,

    ui: {

      input: '#new-todo',
      panelTitle: 'h1'

    },

    events: {
      
      'click .close-panels': 'closePanel'
    
    },

    onRender: function() {

      // console.log(this.model);

      if (this.model) {

        this.ui.panelTitle.text('Edit this item');

      }
      else {

        this.ui.panelTitle.text('Add an item');

      }

    },

    closePanel: function() {

      var App = require('app');

      App.vent.trigger('close:panels');

    }

  });

});