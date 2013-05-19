define(function(require) {

  'use strict';

  return {

    itemView: require('tpl!templates/itemView.tmpl'),
    itemListView: require('tpl!templates/itemListView.tmpl'),
    itemEditView: require('tpl!templates/itemEditView.tmpl'),
    listItemView: require('tpl!templates/listItemView.tmpl'),
    listView: require('tpl!templates/listView.tmpl'),
    header: require('tpl!templates/header.tmpl')

  };

});