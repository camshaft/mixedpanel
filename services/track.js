/**
 * Module dependencies
 */
var redis = require("./redis");

exports.save = function(data, cb) {
  // TODO validate

  var obj = {
    properties: data.properties
  };

  redis.lpush("events:"+data.event, obj, function(err) {
    cb(err, obj);
  });
};