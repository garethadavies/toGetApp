/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, templates) {

  'use strict';

  return Marionette.ItemView.extend({

    template : templates.itemEditHeader,

    ui: {
      input : '#new-todo'
    },

    events: {
      
      'click .close-panels': 'closeEdit'
    
    },

    editItems: function() {

      $('#content-list li').find('.item-remove').removeClass('hide');

      $('#content-list li').find('.item-tick').addClass('hide');

      this.$el.find('#items-done').removeClass('hide');

      this.$el.find('#items-edit').addClass('hide');

    },

    closeEdit: function() {

      var snapper = new Snap({

        element: document.getElementById('content')

      });

      snapper.close();

    },

    onInputKeypress: function(evt) {

      var ENTER_KEY = 13;
      var todoText = this.ui.input.val().trim();

      if (evt.which === ENTER_KEY && todoText) {

        this.collection.create({

          title : todoText

        });

        this.ui.input.val('');

      }

    }

  });

});