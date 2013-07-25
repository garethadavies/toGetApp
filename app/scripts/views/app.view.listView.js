/*global define*/

define([

  'marionette',
  'templates',
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

      'keypress .add-item': 'addInputKeypress',
      'click .button-add-list': 'addItem'
    
    },

    appendHtml: function(cv, iv, index){

      var $container = this.getItemViewContainer(cv);

      $container.prepend(iv.el);

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

        var model = new ListModel();

        model.set('title', listText).save();

        this.collection.add(model);

        this.ui.listInput.val('');

      }
      
    }

  });

});
