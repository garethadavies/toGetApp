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
      
      'click #lists-edit': 'editlists',
      'click #lists-done': 'closeEdit'
    
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

    editlists: function() {

      $('#list-list li').find('.list-remove').removeClass('hide');

      $('#list-list li').find('.list-tick').addClass('hide');

      this.$el.find('#lists-done').removeClass('hide');

      this.$el.find('#lists-edit').addClass('hide');

    },

    closeEdit: function() {

      $('#list-list li').find('.list-remove').addClass('hide');

      $('#list-list li').find('.list-tick').removeClass('hide');

      this.$el.find('#lists-done').addClass('hide');

      this.$el.find('#lists-edit').removeClass('hide');

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