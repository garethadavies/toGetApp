/*global define*/

define([

  'marionette',
  'templates',
  'models/app.model.item',
  'views/app.view.itemView',
  'views/app.view.emptyView'

], function(Marionette, Templates, ItemModel, ItemView, EmptyView) {

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

      'keypress .add-item': 'addInputKeypress',
      'click .button-add-item': 'addItem',
      'click li': 'editItem',
      'click #filter-remove': 'removeFilter'

    },

    appendHtml: function(cv, iv, index){

      var $container = this.getItemViewContainer(cv);

      $container.prepend(iv.el);

    },

    initialize: function() {

      // this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);

      // this.listenTo(this.collection, 'add', this.render, this);

    },

    onRender: function() {
      
      // console.log(this.collection);

    },

    addInputKeypress: function(e) {

      var ENTER_KEY = 13;

      if (e.which === ENTER_KEY) {

        this.addItem();

      }

    },

    addItem: function() {

      var itemText = this.ui.itemInput.val().trim();

      if (itemText) {

        // console.log(e);

        var model = new ItemModel();

        model.set({

          title: itemText,
          created: Date.now()

        }).save();

        this.collection.add(model);

        // TODO: Reset the input
        this.ui.itemInput.val('');

      }
      
    },

    removeFilter: function(e) {

      e.preventDefault();

      var App = require('app');

      App.vent.trigger('remove:filter');

    }

  });

});
