define([

  'backbone',
  'models/app.model.list',
  'backbone.localStorage'

], function(Backbone, ListModel) {

  'use strict';

  function isCompleted(list) { return list.get('completed'); }

  return Backbone.Collection.extend({

    model: ListModel,

    localStorage: new Backbone.LocalStorage('lists-backbone'),

    getCompleted: function() {

      return this.filter(isCompleted);

    },

    getActive: function() {

      return this.reject(isCompleted);

    },

    comparator: function(list) {

      return list.get('created');

    }

  });

});