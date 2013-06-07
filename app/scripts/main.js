/*global require*/
require.config({
  paths: {
    jquery: '../../components/jquery/jquery',
    backbone: '../../components/backbone-amd/backbone',
    underscore: '../../components/underscore-amd/underscore',
    marionette: '../../components/marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr' : '../../components/marionette/public/javascripts/backbone.wreqr',
    'backbone.babysitter' : '../../components/marionette/public/javascripts/backbone.babysitter',
    snap: '../../components/snap/snap',
    tpl: '../../components/tpl/tpl',
    'backbone.localStorage': '../../components/backbone.localStorage/backbone.localStorage'
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
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    },
    'backbone.localStorage': {
      deps: ['backbone']
    },
    snap: {
      deps: ['jquery']
    }
  }
});

require([

  'app'

], function(App) {

  App.start();

});
