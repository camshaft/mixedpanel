/**
 * Module dependencies
 */
var redis = require("./redis")
  , msgpack = require("msgpack")
  , debug = require("debug")("mixedpanel:track");

exports.save = function(data, cb) {
  // TODO validate

  var obj = data.properties || {};

  if(!obj.time) obj.time = Date.now()/1000;

  debug("Event:", data.event, obj);

  var key = "track-events:"+data.event;
  
  redis.lpush(key, msgpack.pack(obj), function(err, idx) {
    key += ":"+idx;
    debug("Event", data.event ,"saved as", key);
    cb(err, key, obj);
  });
};
