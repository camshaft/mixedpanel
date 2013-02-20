/**
 * Module exports
 */
var express = require("express")
  , pns = require("pack-n-stack");

/**
 * Expose the app
 */
module.exports = function(emitter) {
  var app = module.exports = pns(express());

  app.configure(function() {
    app.set("x-powered-by", false);
  });

  /**
   * Routes
   */
  app.get("*", function(req, res, next){
    res.send("Docs");
  });
  
  return app;
};
