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

    // console.log('hello');

    // $('.left-menu').sidr();

    // $('.right-menu').sidr({

    //   name: 'sidr2',
    //   side: 'right'

    // });

    // $('.close-sidr2').on('click', function() {

    //   $.sidr('close', 'sidr2');

    // });

    // $('.close-sidr').on('click', function() {

    //   $.sidr('close', 'sidr');

    // });

    // var hammertime = Hammer(element, {
    //     drag_min_distance: 20
    // });

    // var openLeft = Hammer('#main-list').on('swiperight', function(event) {

    //   $.sidr('close', 'sidr2');
    //   $.sidr('open', 'sidr');

    // });

    // var openRight = Hammer('#main-list').on('swipeleft', function(event) {

    //   $.sidr('close', 'sidr');
    //   $.sidr('open', 'sidr2');

    // });

    // var closeLeft = Hammer('#sidr').on('swipeleft', function(event) {

    //   $.sidr('close', 'sidr');
    //   // $.sidr('open', 'sidr');

    // });

    // var closeRight = Hammer('#sidr2').on('swiperight', function(event) {

    //   $.sidr('close', 'sidr2');
    //   // $.sidr('open', 'sidr2');

    // });

  });

  // export the app from this module
  return App;

});