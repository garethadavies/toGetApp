/*global define*/

define([

  'marionette',
  'templates'

], function(Marionette, Templates) {
  
  'use strict';

  return Marionette.CompositeView.extend({

    tagName: 'li',

    template: Templates.listItemView,

    ui: {

      edit : '.edit',
      listTitleInput: '.list-title-input',
      listTitle: '.list-title',
      listEditButton: '.list-edit',
      listRemoveButton: '.list-remove',
      listUpdateButton: '.list-update'

    },

    events: {

      'click .list-remove': 'destroy',
      'click': 'filterItems',
      'click .list-update': 'updateList',
      'click .list-edit': 'openEdit'

    },

    initialize: function() {

      this.listenTo(this.model, 'change', this.render, this);

    },

    onRender: function() {

      // this.$el.removeClass('active completed');
      // if (this.model.get('completed')) this.$el.addClass('completed');
      // else this.$el.addClass('active');

    },

    updateList: function(e) {

      e.preventDefault();

      this.model.set({

        title: this.ui.listTitleInput.val()

      });

      if (this.model.hasChanged()) {

        this.model.save();

      }
      else {

        this.closeEdit();

      }

    },

    openEdit: function(e) {

      e.preventDefault();

      this.ui.listRemoveButton.removeClass('hide');

      this.ui.listTitleInput.removeClass('hide');

      this.ui.listUpdateButton.removeClass('hide');

      this.ui.listEditButton.addClass('hide');

      this.ui.listTitle.addClass('hide');

    },

    closeEdit: function() {

      this.ui.listRemoveButton.addClass('hide');

      this.ui.listTitleInput.addClass('hide');

      this.ui.listUpdateButton.addClass('hide');

      this.ui.listEditButton.removeClass('hide');

      this.ui.listTitle.removeClass('hide');

    },

    destroy: function(e) {

      e.preventDefault();

      var that = this;

      if (confirm('Are you sure?')) {

        that.model.destroy();

      }

    },

    filterItems: function(e) {

      e.preventDefault();

      var App = require('app');

      // Makes sure we have clicked on the list item
      if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {

        App.vent.trigger('filter:items', {

          listId: this.model.get('listId'),
          title: this.model.get('title')

        });

      }

    }

  });

});