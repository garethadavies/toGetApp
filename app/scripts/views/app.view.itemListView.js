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
      
      'click #toggle-all': 'onToggleAllClick',
      'keypress .add-item': 'addInputKeypress',
      'click .button-add-item': 'addItem',
      'click li': 'editItem'
    
    },

    initialize: function() {

      this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);

    },

    onRender: function() {

      this.updateToggleCheckbox();

      // console.log(this.collection);

    },

    updateToggleCheckbox: function() {

      function reduceCompleted(left, right) { return left && right.get('completed'); }

      var allCompleted = this.collection.reduce(reduceCompleted,true);

      this.ui.toggle.prop('checked', allCompleted);

    },

    onToggleAllClick: function(evt) {

      var isChecked = evt.currentTarget.checked;

      this.collection.each(function(item){

        item.save({'completed': isChecked});

      });

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

        model.set('title', itemText).save();

        // console.log(model);

        this.collection.add(model);

        // console.log(this.collection);

        // TODO: Reset the input
        this.ui.itemInput.val('');

      }
      
    }

  });

});
