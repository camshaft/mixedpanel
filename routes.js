/**
 * Module dependencies
 */
var util = require("./lib/util")
  , track = require("./services/track")
  , imp = require("./services/imp")
  , engage = require("./services/engage");

exports.track = function(emitter) {
  return eventHandler("track", track, emitter);
};

exports.imp = function(emitter) {
  return eventHandler("import", imp, emitter);
};

exports.engage = function(emitter) {
  return eventHandler("engage", engage, emitter);
};

function eventHandler(name, service, emitter) {
  return function (req, res, next) {
    util.parseData(req.query.data, function(err, data) {
      if(err) return next(err);
      service.save(data, function(err, obj) {
        if(err) return next(err);
        res.send("1");
        emitter.emit(name, obj)
      });
    });
  };
};
