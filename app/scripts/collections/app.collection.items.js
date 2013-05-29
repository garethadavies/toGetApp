define([

  'backbone',
  'models/app.model.item',
  'backbone.localStorage'

],function(Backbone, ItemModel) {

  'use strict';

  function isCompleted(item) { return item.get('completed'); }

  return Backbone.Collection.extend({

    model: ItemModel,

    localStorage: new Backbone.LocalStorage('items-backbone'),

    getCompleted: function() {

      return this.filter(isCompleted);

    },

    getActive: function() {

      return this.reject(isCompleted);

    },

    comparator: function(item) {

      return item.get('created');

    }

  });

});