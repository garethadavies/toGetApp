/*global define*/

define(function() {

  'use strict';

  return {

    filterItems: function(id, title) {

      var App = require('app');

      App.vent.trigger('filter:items', {

				listId: id,
				title: title

      });

    }

  };

});