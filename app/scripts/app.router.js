define([

	'marionette'

], function(marionette) {

  'use strict';

  return marionette.AppRouter.extend({

    appRoutes: {

      'list/:id/:title': 'filterItems'

    }

  });

});