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
      listId: null,
      isNew: false

    },

    idAttribute: 'itemId',

    toggle: function() {

      return this.set('completed', !this.get('completed'));

    }

  });

});
