/*global require*/
'use strict';

require.config({
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    marionette : {
      deps : [
        'jquery',
        'underscore',
        'backbone'
      ],
      exports : 'Marionette'
    },
  },
  paths: {
    jquery: '../components/zepto/zepto',
    backbone: '../components/backbone-amd/backbone',
    underscore: '../components/underscore-amd/underscore',
    marionette: '../components/marionette/lib/core/amd/backbone.marionette'
  }
});

require(['backbone', 'marionette'], function (Backbone) {
  Backbone.history.start();
});