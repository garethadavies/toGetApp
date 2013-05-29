define([

  'backbone',
  'backbone.localStorage'

], function(Backbone) {

  'use strict';

  return Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage('lists-backbone'),

    defaults: {

      title: '',
      created: Date.now()
      
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
