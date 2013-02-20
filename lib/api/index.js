/**
 * Module exports
 */
var express = require("express")
  , pns = require("pack-n-stack")
  , track = require("./services/track")
  , engage = require("./services/engage")
  , defaultHeaders = require("./middleware/defaultHeaders")
  , mixpanelParser = require("./middleware/mixpanelParser")
  , tokenValidator = require("./middleware/tokenValidator");

/**
 * Expose the app
 */
module.exports = function(emitter) {
  var app = module.exports = pns(express());

  app.configure(function() {
    app.set("x-powered-by", false);
    app.use(defaultHeaders());
    app.use(mixpanelParser());
    app.use(tokenValidator(process.env.CLIENT_TOKEN));
    app.use(app.router);
    // TODO have an api specific error handler
  });

  /**
   * Routes
   */
  app.get("/import", eventHandler("import", track));
  app.post("/import", eventHandler("import", track));
  app.get("/track", eventHandler("track", track));
  app.post("/track", eventHandler("track", track));
  app.get("/engage", eventHandler("engage", engage));
  app.post("/engage", eventHandler("engage", engage));

  function eventHandler(name, service) {
    return function (req, res, next) {
      service.save(req.event, function(err, key, obj) {
        if(err) return next(err);
        res.send("1");
        emitter.emit(name, key, obj);
      });
    };
  };

  return app;
};
