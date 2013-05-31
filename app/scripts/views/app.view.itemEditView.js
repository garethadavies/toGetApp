/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, Templates) {
  
  'use strict';

  return Marionette.CompositeView.extend({

    template: Templates.itemEditView,

    ui: {

      titleField: '#form-item-name',
      listCombo: '#form-item-list'
    
    },

    events: {

      'click .destroy' : 'destroy',
      'dblclick label' : 'onEditClick',
      'keypress .edit' : 'onEditKeypress',
      'click .toggle'  : 'toggle',
      'submit #form-edit-item': 'saveItem'
    
    },

    initialize: function() {

      // this.listenTo(this.model, 'change', this.render, this);

    },

    onRender: function() {
      
      // Load the list items into the combo

      // <option value="1">Shopping</option>

    },

    destroy: function() {
      
      this.model.destroy();
    
    },

    toggle: function() {
      
      this.model.toggle().save();
    
    },

    onEditClick: function() {
      
      // this.$el.addClass('editing');
      // this.ui.edit.focus();
    
    },

    onEditKeypress : function(evt) {
      
      // var ENTER_KEY = 13;
      // var todoText = this.ui.edit.val().trim();

      // if ( evt.which === ENTER_KEY && todoText ) {
      //   this.model.set('title', todoText).save();
      //   this.$el.removeClass('editing');
      // }

    },

    saveItem: function(e) {

      e.preventDefault();

      // console.log(this.ui.titleField.val());
      // console.log(this.ui.listCombo.find('option:selected').val());

      // console.log(Backbone);

      this.model.set({

        title: this.ui.titleField.val(),
        listId: this.ui.listCombo.find('option:selected').val()

      });

      this.model.save();

    }

  });

});