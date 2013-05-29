/*global define*/

define([

  'marionette',
  'templates',
  // 'vent',
  'models/app.model.list',
  'views/app.view.listItemView'

], function(Marionette, Templates, ListModel, ListItemView) {
  
  'use strict';

  return Marionette.CompositeView.extend({

    template: Templates.listView,

    itemView: ListItemView,

    itemViewContainer: '#list-list',

    ui: {
      
      toggle: '#toggle-all',
      listInput: '.add-item'
    
    },

    events: {

      'click #toggle-all': 'onToggleAllClick',
      'keypress .add-item': 'addInputKeypress',
      'click .button-add-list': 'addItem'
    
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

    addInputKeypress: function(e) {

      var ENTER_KEY = 13;

      if (e.which === ENTER_KEY) {

        this.addItem();

      }

    },

    addItem: function() {

      var listText = this.ui.listInput.val().trim();

      if (listText) {

        // console.log(e);

        var model = new ListModel;

        model.set('title', listText).save();

        // console.log(model);

        this.collection.add(model);

        // console.log(this.collection);

        // TODO: Reset the input
        this.ui.listInput.val('');

      }
      
    }

  });

});
