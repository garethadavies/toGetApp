/*global require*/
require.config({
  paths: {
    jquery: '../../components/jquery/jquery',
    backbone: '../../components/backbone/backbone',
    underscore: '../../components/underscore/underscore',
    marionette: '../../components/marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr' : '../../components/marionette/public/javascripts/backbone.wreqr',
    'backbone.babysitter' : '../../components/marionette/public/javascripts/backbone.babysitter',
    snap: '../../components/snap/snap',
    tpl: '../../components/tpl/tpl',
    'backbone.localStorage': '../../components/backbone.localStorage/backbone.localStorage',
    'backbone.syphon': '../../components/backbone.syphon/lib/amd/backbone.syphon'
  },
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'backbone.wreqr': {
      deps: ['backbone']
    },
    'backbone.babysitter': {
      deps: ['backbone']
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Marionette'
    }, 
    'backbone.localStorage': {
      deps: ['backbone']
    },
    snap: {
      deps: ['jquery']
    }, 
    'backbone.syphon': {
      deps: ['backbone']
    },
  }
});

require([

  'app'

], function(App) {

  App.start();

});
