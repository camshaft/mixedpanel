/**
 * Module dependencies
 */
var debug = require("debug")("mixedpanel:middleware:tokenValidator");

/**
 * Validate token
 *
 * @api public
 */
module.exports = function(token) {
  return function tokenValidator(req, res, next) {
    var reqToken = req.event.$token || (req.event.properties || {}).token;
    if (token !== reqToken) {
      return next(new Error("Invalid token"));
    };
    next();
  };
};
