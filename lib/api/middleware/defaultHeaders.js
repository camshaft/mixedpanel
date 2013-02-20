/**
 * Module dependencies
 */
var debug = require("debug")("mixedpanel:middleware:defaultHeaders");

/**
 * Parse base64 encoded data
 *
 * @api public
 */
module.exports = function() {
  return function defaultHeaders(req, res, next) {
    res.set("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Max-Age", 1728000);
    res.set("Cache-Control", "no-cache, no-store");
    next();
  };
};
