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
    }
  },
  paths: {
    jquery: 'vendor/jquery/jquery',
    backbone: 'vendor/backbone-amd/backbone',
    underscore: 'vendor/underscore-amd/underscore',
    marionette: 'vendor/marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr' : 'vendor/marionette/public/javascripts/backbone.wreqr',
    'backbone.babysitter' : 'vendor/marionette/public/javascripts/backbone.babysitter'
  }
});

require(['backbone', 'marionette'], function (Backbone, Marionette) {

  // set up the app instance
  var App = new Marionette.Application();

  App.addRegions({
    
    someRegion: '#some-div',
    anotherRegion: '#another-div'
  
  });

  App.addInitializer(function(options) {

  // new MyAppRouter();
  
    Backbone.history.start();

  });

  // export the app from this module
  return App;

});
