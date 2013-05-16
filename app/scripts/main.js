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
    'snap': '../components/snap/snap'
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
    'snap': {
      deps: ['jquery']
    }
  }
});

require([

  'app',
  'app.controller'

], function(App, Controller) {

  // console.log(App);

  App.start();

});
