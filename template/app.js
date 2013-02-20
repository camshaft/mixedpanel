/**
 * Module dependencies
 */
var mixpanel = require("mixedpanel");

var app = module.exports = mixpanel();

app.on("track", function(track) {
  console.log("Tracking:", track);
});
