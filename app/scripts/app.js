// require(['backbone', 'marionette', 'jquery.sidr'], function (Backbone, Marionette) {
define(['marionette', 'backbone', 'jquery.sidr'], function (Marionette, Backbone) {

  // set up the app instance
  var App = new Marionette.Application();

  App.addRegions({

    someRegion: '#some-div',
    anotherRegion: '#another-div'

  });

  console.log(Backbone);
  console.log(jQuery.fn.sidr);

  App.addInitializer(function(options) {

  // new MyAppRouter();

    Backbone.history.start();

    console.log('hello');

  });

  // export the app from this module
  return App;

});