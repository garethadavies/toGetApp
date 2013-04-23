// require(['backbone', 'marionette', 'jquery.sidr'], function (Backbone, Marionette) {
define(['marionette', 'backbone', 'sidr', 'hammerjs'], function (Marionette, Backbone) {

  // set up the app instance
  var App = new Marionette.Application();

  App.addRegions({

    someRegion: '#some-div',
    anotherRegion: '#another-div'

  });

  App.addInitializer(function(options) {

  // new MyAppRouter();

    Backbone.history.start();

    console.log('hello');

    $('.left-menu').sidr();

    $('.right-menu').sidr({

      name: 'sidr2',
      side: 'right'

    });

    $('.close-sidr2').on('click', function() {

      $.sidr('close', 'sidr2');

    });

    $('.close-sidr').on('click', function() {

      $.sidr('close', 'sidr');

    });

    var openLeft = Hammer('body').on('swiperight', function(event) {

      $.sidr('close', 'sidr2');
      $.sidr('open', 'sidr');

    });

    var openRight = Hammer('body').on('swipeleft', function(event) {

      $.sidr('close', 'sidr');
      $.sidr('open', 'sidr2');

    });

  });

  // export the app from this module
  return App;

});