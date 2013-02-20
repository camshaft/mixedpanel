/**
 * Module dependencies
 */
var debug = require("debug")("mixedpanel:middleware:mixpanelParser");

/**
 * Parse base64 encoded data
 *
 * @api public
 */
module.exports = function() {
  return function mixpanelParser(req, res, next) {
    if(!req.query.data) return next();
    try {
      var obj = new Buffer(req.query.data, 'base64').toString('utf-8');
      debug(obj);
      req.event = JSON.parse(obj);
      next();
    }
    catch (e) {
      next(e);
    }
  };
};
