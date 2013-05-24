define([

  'backbone',
  'backbone.localStorage'

], function(Backbone) {

  'use strict';

  return Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    defaults: {

      title     : '',
      completed : false,
      created   : 0
      
    },

    idAttribute: 'itemId',

    initialize: function() {

      if (this.isNew()) this.set('created', Date.now());

    },

    toggle: function() {

      return this.set('completed', !this.get('completed'));

    }

  });

});
