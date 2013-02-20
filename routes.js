/**
 * Module dependencies
 */
var util = require("./lib/util")
  , track = require("./services/track")
  , imp = require("./services/imp")
  , engage = require("./services/engage");

exports.track = function(emitter) {
  return function (req, res, next) {
    util.parseData(req.query.data, function(err, data) {
      if(err) return next(err);
      track.save(data, function(err) {
        if(err) return next(err);
        res.send("1");
      });
    });
  };
};

exports.imp = function(emitter) {
  return function (req, res, next) {
    util.parseData(req.query.data, function(err, data) {
      if(err) return next(err);
      imp.save(data, function(err) {
        if(err) return next(err);
        res.send("1");
      });
    });
  };
};

exports.engage = function(emitter) {
  return function (req, res, next) {
    util.parseData(req.query.data, function(err, data) {
      if(err) return next(err);
      engage.save(data, function(err) {
        if(err) return next(err);
        res.send("1");
      });
    });
  };
};
