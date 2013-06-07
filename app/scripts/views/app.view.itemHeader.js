/*global define*/

define([

  'marionette',
  'templates',
  'views/app.view.itemEditHeader',
  'views/app.view.itemEditView'

], function(Marionette, Templates, EditHeader, EditView) {

  'use strict';

  return Marionette.ItemView.extend({

    template : Templates.itemHeader,

    ui: {

      input: '#new-todo',
      itemCount: '#item-count',
      itemsTitle: '#items-title'

    },

    events: {

      'click #items-add': 'openRightPanel',
      'click #open-left': 'openLeftPanel',
      'click #items-edit': 'openEdit',
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

      this.ui.itemCount.text(this.collection.length);

    },

    openEdit: function() {

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

    },

    openRightPanel: function() {

      var App = require('app');

      App.editHeader.show(new EditHeader());
      App.editMain.show(new EditView());

      App.vent.trigger('open:right');

      App.vent.trigger('combo:lists', {

        view: App.editMain.currentView,
        model: undefined

      });

    },

    openLeftPanel: function() {

      var App = require('app');

      App.vent.trigger('open:left');

    }

  });

});