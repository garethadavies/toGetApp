/*global define*/

define([

  'app.vent'

], function(Vent) {

  'use strict';

  return {

    filterItems: function(id, title) {

      Vent.trigger('filter:items', {

				listId: id,
				title: title

      });

    }

  };

});