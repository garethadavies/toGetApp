/*global define*/

define([

  'marionette',
  'templates',
  'app.vent',
  'models/app.model.item',
  'views/app.view.itemView',
  'views/app.view.emptyView'

], function(Marionette, Templates, Vent, ItemModel, ItemView, EmptyView) {

  'use strict';

  return Marionette.CompositeView.extend({

    template: Templates.itemListView,

    itemView: ItemView,

    itemViewContainer: '#content-list',

    emptyView: EmptyView,

    ui: {

      contentList: '#content-list',
      filterControl: '#filter-control',
      filterText: '#filter-text'

    },

    events: {

      'click #filter-remove': 'removeFilter'

    },

    appendHtml: function(cv, iv, index){

      var $container = this.getItemViewContainer(cv);

      $container.prepend(iv.el);

    },

    initialize: function() {

      this.listenTo(this.collection, 'change:listId', this.filterItems, this.model);

    },

    filterItems: function(model) {

      // Are we in a filtered state?
      if (Backbone.history.fragment) {

        Vent.trigger('change:item:list', {

          collection: this.collection,
          model: model

        });

      }

    },

    removeFilter: function(e) {

      e.preventDefault();

      Vent.trigger('remove:filter');

    }

  });

});
