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
      
      // 'click #lists-edit': 'openEdit',
      // 'click #lists-done': 'closeEdit',
      'click .close-panels': 'closePanel'
    
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

    openEdit: function() {

      var listItems = $('#list-list li');

      listItems.find('.list-remove').removeClass('hide');

      listItems.find('.list-title-input').removeClass('hide');

      listItems.find('.list-tick').addClass('hide');

      listItems.find('.list-title').addClass('hide');

      this.$el.find('#lists-done').removeClass('hide');

      this.$el.find('#lists-edit').addClass('hide');

    },

    closeEdit: function() {

      var listItems = $('#list-list li');

      listItems.find('.list-remove').addClass('hide');

      listItems.find('.list-title-input').addClass('hide');

      listItems.find('.list-tick').removeClass('hide');

      listItems.find('.list-title').removeClass('hide');

      this.$el.find('#lists-done').addClass('hide');

      this.$el.find('#lists-edit').removeClass('hide');

    },

    closePanel: function() {

      var App = require('app');

      App.vent.trigger('close:panels');

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