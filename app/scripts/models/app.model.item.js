define([

  'backbone',
  'backbone.localStorage'

], function(Backbone) {

  'use strict';

  return Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage('items-backbone'),

    defaults: {

      title: '',
      completed: false,
      created: Date.now()
      
    },

    idAttribute: 'listId',

    initialize: function() {

      if (this.isNew()) this.set('created', Date.now());

    },

    toggle: function() {

      return this.set('completed', !this.get('completed'));

    }

  });

});
