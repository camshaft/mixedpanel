/**
 * Module dependencies
 */
var redis = require("./redis")
  , debug = require("debug")("mixedpanel:engage");

exports.save = function(data, cb) {
  // TODO
  debug(data);
  cb();
};
