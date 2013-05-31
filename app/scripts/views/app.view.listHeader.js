/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, templates) {

  'use strict';

  return Marionette.ItemView.extend({

    template : templates.listHeader,

    ui: {
      
      input : '#new-list',
      listCount: '#list-count'
    
    },

    events: {
      
      'click #items-edit': 'editItems',
      'click #items-done': 'closeEdit'
    
    },

    initialize: function() {

      this.listenTo(this.collection, 'add', this.showCount, this);
      this.listenTo(this.collection, 'remove', this.showCount, this);

    },

    onRender: function() {

      this.showCount();

    },

    showCount: function() {

      this.ui.listCount.text(this.collection.length);

    },

    editItems: function() {

      $('#content-list li').find('.item-remove').removeClass('hide');

      $('#content-list li').find('.item-tick').addClass('hide');

      this.$el.find('#items-done').removeClass('hide');

      this.$el.find('#items-edit').addClass('hide');

    },

    closeEdit: function() {

      $('#content-list li').find('.item-remove').addClass('hide');

      $('#content-list li').find('.item-tick').removeClass('hide');

      this.$el.find('#items-done').addClass('hide');

      this.$el.find('#items-edit').removeClass('hide');

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