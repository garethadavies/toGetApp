/*global define*/

define([

  'marionette',
  'templates',
  'app.vent',
  'views/app.view.itemEditHeader',
  'views/app.view.itemEditView'

], function(Marionette, Templates, Vent, EditHeader, EditView) {

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
      // 'click #items-edit': 'openEdit',
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

    // listChanged: function() {

    //   if (this.collection.length === 0) {

    //     this.render();

    //   }

    // },

    // openEdit: function(e) {

    //   e.preventDefault();

    //   $('#content-list li').find('.item-remove').removeClass('hide');

    //   $('#content-list li').find('.item-tick').addClass('hide');

    //   this.$el.find('#items-done').removeClass('hide');

    //   this.$el.find('#items-edit').addClass('hide');

    // },

    closeEdit: function(e) {

      e.preventDefault();

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

    openRightPanel: function(e) {

      e.preventDefault();

      Vent.trigger('open:right:panel');

    },

    openLeftPanel: function(e) {

      e.preventDefault();

      Vent.trigger('open:left:panel');

    }

  });

});