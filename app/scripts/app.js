// require(['backbone', 'marionette', 'jquery.sidr'], function (Backbone, Marionette) {
define(['marionette', 'backbone', 'snap'], function (Marionette, Backbone) {

  // set up the app instance
  var App = new Marionette.Application();

  App.addRegions({

    someRegion: '#some-div',
    anotherRegion: '#another-div'

  });

  App.addInitializer(function(options) {

  // new MyAppRouter();

    Backbone.history.start();

    var snapper = new Snap({

      element: document.getElementById('content')

    });

    $('#open-left').on('click', function() {

      if (snapper.state().state == 'left') {

        snapper.close();

      }
      else {

        snapper.open('left');

      }

    });

    $('#content li').on('click', function() {

      snapper.open('right');

    });

    $('.close-panels').on('click', function() {

      snapper.close();

    });    

  });

  // export the app from this module
  return App;

});