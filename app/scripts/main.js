/*global require*/
'use strict';

require.config({
  paths: {
    jquery: 'vendor/jquery/jquery',
    backbone: 'vendor/backbone-amd/backbone',
    underscore: 'vendor/underscore-amd/underscore',
    marionette: 'vendor/marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr' : 'vendor/marionette/public/javascripts/backbone.wreqr',
    'backbone.babysitter' : 'vendor/marionette/public/javascripts/backbone.babysitter',
    'jquery.sidr': 'vendor/sidr/jquery.sidr.min'
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
    'jquery.sidr': {
      deps: ['jquery']
    }
  }
});

require(['app'], function (App) {

  console.log(App);

});
