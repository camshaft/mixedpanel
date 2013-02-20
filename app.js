/**
 * Module exports
 */
var express = require("express")
  , pns = require("pack-n-stack")
  , base = require("connect-base")
  , routes = require("./routes");

/**
 * Expose the app
 */
module.exports = function() {
  var app = module.exports = pns(express());

  /**
   * Configure the app
   */
  app.configure(function(){
    app.set("x-powered-by", false);
    app.use(base());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    // TODO auth
    app.use(app.router);
    app.use(function errorHandler(err, req, res, next) {
      console.error(err.stack || err);
      res.send("0");
    });
  });

  app.configure("development", function(){
    app.locals.pretty = true;
    app.useBefore("bodyParser", express.logger("dev"));
    app.replace("errorHandler", function errorHandler(err, req, res, next) {
      console.error(err.stack || err);
      res.send(err.stack || err);
    });
  });

  /**
   * Routes
   */
  app.get("/", function(req, res, next){
    res.send('Welcome. Get started with our API by visiting <a href="'+req.base+'/docs">our docs</a>');
  });

  app.get("/import", routes.imp(app));
  app.post("/import", routes.imp(app));
  app.get("/track", routes.track(app));
  app.post("/track", routes.track(app));
  app.get("/engage", routes.engage(app));
  app.post("/engage", routes.engage(app));

  // TODO
  app.get("/docs*", function(req, res) {
    res.send(501, "This is not implemented");
  });
  // TODO
  app.get("/report*", function(req, res) {
    res.send(501, "This is not implemented");
  });

  return app;
};
