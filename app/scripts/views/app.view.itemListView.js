/*global define*/

define([

  'marionette',
  'templates',
  // 'vent',
  'app.models',
  'views/app.view.itemView'

], function(Marionette, templates, Model, ItemView) {

  'use strict';

  return Marionette.CompositeView.extend({

    template: templates.itemListView,

    itemView: ItemView,

    itemViewContainer: '#content-list',

    ui: {

      toggle: '#toggle-all',
      itemInput: '.add-item'

    },

    events: {
      
      'click #toggle-all': 'onToggleAllClick',
      'keypress .add-item': 'addItem'
    
    },

    initialize: function() {

      this.listenTo(this.collection, 'all', this.updateToggleCheckbox, this);

    },

    onRender: function() {

      this.updateToggleCheckbox();

    },

    updateToggleCheckbox: function() {

      function reduceCompleted(left, right) { return left && right.get('completed'); }
      var allCompleted = this.collection.reduce(reduceCompleted,true);
      this.ui.toggle.prop('checked', allCompleted);

    },

    onToggleAllClick: function(evt) {

      var isChecked = evt.currentTarget.checked;
      this.collection.each(function(todo){
        todo.save({'completed': isChecked});
      });

    },

    addItem: function(e) {

      var
      ENTER_KEY = 13,
      todoText = this.ui.itemInput.val().trim();

      if (e.which === ENTER_KEY && todoText) {

        // console.log(e);

        var model = new Model;

        model.set('title', todoText).save();

        // console.log(model);

        this.collection.add(model);

        // console.log(this.collection);

        // TODO: Reset the input
        this.ui.itemInput.val('');

      }
    }

  });

});
