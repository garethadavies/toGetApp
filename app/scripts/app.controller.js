define([

  'marionette',
  'backbone',
  'underscore',
  'app',
  'app.entities',
  'app.views'

], function(Marionette, Backbone, _, App, Entities, Views) {

  console.log(App);
  console.log(Entities);
  console.log(Views);

  // export the app from this module
  return App.Controller;

});