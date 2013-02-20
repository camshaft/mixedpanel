/**
 * Module dependencies
 */
var mixpanel = require("mixedpanel");

var app = module.exports = mixpanel();

app.on("track", function(key, track) {
  console.log("Tracking:", key, track);
});
