/**
Application Central Vent
@module Vent
*/

/*
Requires:
  * backbone.wreqr
Contents:
  * Return a new Event aggregator
Author(s): 
  * Gareth Davies
*/

define([

	'backbone',
  'backbone.wreqr'

], function(Backbone, Wreqr) {

  // Return a new Event aggregator
  return new Backbone.Wreqr.EventAggregator();

});