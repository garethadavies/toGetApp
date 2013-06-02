/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, Templates) {
  
  'use strict';

  return Marionette.CompositeView.extend({

    tagName: 'li',

    template: Templates.listItemView,

    ui: {

      edit : '.edit'

    },

    events: {

      'click .destroy' : 'destroy',
      'dblclick label' : 'onEditClick',
      'keypress .edit' : 'onEditKeypress',
      'click .toggle'  : 'toggle',
      'click .list-remove': 'destroy',
      'click': 'filterItems'

    },

    initialize: function() {

      this.listenTo(this.model, 'change', this.render, this);

    },

    onRender: function() {

      // this.$el.removeClass('active completed');
      // if (this.model.get('completed')) this.$el.addClass('completed');
      // else this.$el.addClass('active');

    },

    destroy: function() {

      this.model.destroy();

    },

    filterItems: function() {

      var App = require('app');

      App.vent.trigger('filter:items', this.model);

    }

  });

});