/**
 * Module exports
 */
var express = require("express")
  , pns = require("pack-n-stack")
  , base = require("connect-base")
  , api = require("./lib/api")
  , docs = require("./lib/docs")
  , report = require("./lib/report");

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
    app.use(express.favicon());
    app.use(base());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(function errorLogger(err, req, res, next) {
      console.error(err.stack || err);
      next(err);
    });
    app.use(function errorHandler(err, req, res, next) {
      res.type("text/plain");
      res.send("0");
    });
  });

  app.configure("development", function(){
    app.locals.pretty = true;
    app.useBefore("bodyParser", express.logger("dev"));
    app.replace("errorHandler", function errorHandler(err, req, res, next) {
      res.type("text/plain");
      res.send(err.stack || err);
    });
  });

  app.configure("test", function() {
    app.remove("errorLogger");
  });

  /**
   * Routes
   */
  app.get("/", function(req, res, next){
    res.send('Welcome. Get started with our API by visiting <a href="'+req.base+'/docs">our docs</a>');
  });

  /**
   * Docs Routes
   */
  app.useAfter("router", "/docs", "docs", docs(app));

  /**
   * Report Routes
   */
  app.useAfter("docs", "/report", "report", report(app));

  /**
   * API Routes
   */
  app.useAfter("report", "", "api", api(app));

  return app;
};
