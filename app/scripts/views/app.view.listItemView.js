/*global define*/

define([

  'marionette',
  'templates',
  'app.vent'

], function(Marionette, Templates, Vent) {
  
  'use strict';

  return Marionette.ItemView.extend({

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

      var that = this;

      setTimeout(function() {

        //
        that.$el.addClass('active');

      }, 0);

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

      if (confirm('Are you sure you want to remove this list?')) {

        // Add the removed class to this view
        that.$el.attr('class', 'removed');

        // Fade out the item takes 1 second
        setTimeout(function() {

          // Remove the item
          that.model.destroy();

        }, 1000);

      }

    },

    filterItems: function(e) {

      e.preventDefault();

      // Makes sure we have clicked on the list item
      if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {

        Vent.trigger('filter:items', {

          listId: this.model.get('listId'),
          title: this.model.get('title')

        });

      }

    }

  });

});