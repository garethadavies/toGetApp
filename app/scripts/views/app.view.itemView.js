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

      'click .item-tick': 'completed',
      'click .item-remove': 'destroy',
      'click': 'editItem'

    },

    initialize: function() {

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

    destroy: function(e) {

      e.preventDefault();

      if (confirm('Are you sure?')) {

        this.model.destroy();

      }

    },

    completed: function(e) {

      e.preventDefault();

      var completed = (this.model.get('completed') === false) ? true : false;

      this.model.set({

        completed: completed

      }).save();

    },

    editItem: function(e) {

      e.preventDefault();

      var App = require('app');

      App.vent.trigger('edit:item', e, this.model);

    }

  });

});