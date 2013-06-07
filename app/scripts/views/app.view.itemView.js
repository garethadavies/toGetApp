/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, Templates) {

  'use strict';

  return Marionette.CompositeView.extend({

    tagName: 'li',

    template: Templates.itemView,

    ui: {

      edit: '.edit'

    },

    events: {

      'click .destroy': 'destroy',
      'dblclick label': 'onEditClick',
      'keypress .edit': 'onEditKeypress',
      'click .toggle': 'toggle',
      'click .item-tick': 'completed',
      'click .item-remove': 'destroy',
      'click': 'editItem'

    },

    initialize: function() {

      // this.listenTo(this.$el, 'click', this.editItem, this);
      this.listenTo(this.model, 'change', this.render, this);

    },

    onRender: function() {

      this.$el.removeClass('active completed');

      if (this.model.get('completed')) {

        this.$el.addClass('completed');

      }
      else {

        this.$el.addClass('active');

      }

    },

    destroy: function() {

      if (confirm('Are you sure?')) {

        this.model.destroy();

      }

    },

    toggle: function() {

      this.model.toggle().save();

    },

    onEditClick: function() {

      this.$el.addClass('editing');
      this.ui.edit.focus();

    },

    onEditKeypress: function(evt) {

      var ENTER_KEY = 13;
      var todoText = this.ui.edit.val().trim();

      if ( evt.which === ENTER_KEY && todoText ) {
        this.model.set('title', todoText).save();
        this.$el.removeClass('editing');
      }

    },

    completed: function() {

      var completed = (this.model.get('completed') === false) ? true : false;

      console.log(this.model);

      this.model.set({

        completed: completed

      }).save();

      console.log(this.model);

    },

    editItem: function(e) {

      var App = require('app');

      App.vent.trigger('edit:item', e, this.model);

    }

  });

});