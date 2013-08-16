/*global define*/

define([

  'marionette',
  'templates',
  'app.vent'

], function(Marionette, Templates, Vent) {

  'use strict';

  return Marionette.CompositeView.extend({

    tagName: 'li',

    template: Templates.itemView,

    ui: {

      edit: '.edit',
      tick: '.item-tick',
      removeButton: '.item-remove'

    },

    events: {

      'click .item-tick': 'completed',
      'click .item-remove': 'destroy',
      'click': 'editItem'

    },

    initialize: function() {

      this.listenTo(this.model, 'change', this.render, this);

    },

    onRender: function() {

      var that = this;

      //
      this.$el.removeClass('active completed');

      //
      if (this.model.get('completed')) {

        //
        this.$el.addClass('completed'); 

        //
        this.showHideRemove(true);

      }
      else {

        // console.log(this.model.isNew());
        // console.log(this.model);

        if (this.model.get('isNew')) {

          //
          setTimeout(function() {

            //
            that.$el.addClass('active');

            //
            that.model.set({

              isNew: false

            },
            {

              silent: true
            
            });

          }, 0);

        }
        else {

          //
          that.$el.addClass('active');

        }


      }

    },

    destroy: function(e) {

      e.preventDefault();

      var that = this;

      if (confirm('Are you sure you want to remove this item?')) {

        // Add the removed class to this view
        that.$el.attr('class', 'removed');

        // Fade out the item takes 1 second
        setTimeout(function() {

          // Remove the item
          that.model.destroy();

        }, 1000);

      }

    },

    completed: function(e) {

      e.preventDefault();

      //
      this.showHideRemove(true);

      //
      var completed = (this.model.get('completed') === false) ? true : false;

      //
      this.model.set({

        completed: completed

      }).save();

    },

    editItem: function(e) {

      e.preventDefault();

      // Is this a click on the list item?
      if (e.target.tagName === 'LI') {

        //
        Vent.trigger('open:right:panel', {

          model: this.model

        });

      }

    },

    showHideRemove: function(show) {

      if (show) {

        //
        this.ui.removeButton.fadeIn('slow');

      }
      else {

        //
        this.ui.removeButton.fadeOut('slow');

      }

    }

  });

});