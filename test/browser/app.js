/**
 * Module exports
 */
var mixedpanel = require("../..")
  , express = require("express");

var app = module.exports = mixedpanel();

app.useBefore("bodyParser", express.static(__dirname+"/public"));
app.useAfter("static", "/vendor", "chai-static", express.static(__dirname+"/../../node_modules/chai"));
app.useAfter("static", "/vendor", "mocha-static", express.static(__dirname+"/../../node_modules/mocha"));
