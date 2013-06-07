/*global define*/

define([

  'marionette',
  'templates',
  // 'vent',
  'models/app.model.item',
  'views/app.view.itemView'

], function(Marionette, Templates, ItemModel, ItemView) {

  'use strict';

  return Marionette.CompositeView.extend({

    template: Templates.itemListView,

    itemView: ItemView,

    itemViewContainer: '#content-list',

    ui: {

      toggle: '#toggle-all',
      itemInput: '.add-item'

    },

    events: {

      'keypress .add-item': 'addInputKeypress',
      'click .button-add-item': 'addItem',
      'click li': 'editItem'

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

        var model = new ItemModel;

        model.set({

          title: itemText,
          created: Date.now()

        }).save();

        // console.log(model);

        this.collection.add(model);

        // this.collection.sort();

        // console.log(this.collection);

        // TODO: Reset the input
        this.ui.itemInput.val('');

      }
      
    }

  });

});
