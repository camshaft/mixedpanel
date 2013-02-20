/**
 * Module dependencies
 */
var url = require("url")
  , REDIS_URL = require("everypaas").getRedisUrl()
  , config = url.parse(REDIS_URL || "")
  , redis = require("redis").createClient(config.port, config.hostname);

redis.auth((config.auth || "").split(":")[1]);

module.exports = redis;
