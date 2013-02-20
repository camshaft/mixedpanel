/**
 * Module dependencies
 */

exports.parseData = function(data, cb) {
  var obj = new Buffer(data, 'base64').toString('utf-8');
  try {
    cb(null, JSON.parse(obj));
  }
  catch (e) {
    cb(e);
  }
};
