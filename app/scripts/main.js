/*global require*/
'use strict';

require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    backbone: '../components/backbone-amd/backbone',
    underscore: '../components/underscore-amd/underscore',
    marionette: '../components/marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr' : '../components/marionette/public/javascripts/backbone.wreqr',
    'backbone.babysitter' : '../components/marionette/public/javascripts/backbone.babysitter',
    // 'sidr': '../components/sidr/jquery.sidr.min',
    'snap': '../components/snap/snap',
    'hammerjs': '../components/hammerjs/dist/jquery.hammer.min'
  },
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    },
    'sidr': {
      deps: ['jquery']
    },
    'hammerjs': {
      deps: ['jquery']
    }
  }
});

require(['app'], function (App) {

  console.log(App);

  App.start();

});
