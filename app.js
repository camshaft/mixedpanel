/**
 * Module exports
 */
var express = require("express")
  , pns = require("pack-n-stack")
  , routes = require("./routes")
  , Emitter = require("events").EventEmitter;

/**
 * Expose the app
 */
var app = module.exports = pns(express());

/**
 * App emitter
 */
var emitter = new Emitter;

/**
 * Configure the app
 */

app.configure(function(){
  app.set("x-powered-by", false);
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
  res.send("Welcome. Get started with our API by visiting http://mixpanel.com/docs/");
});

app.get("/import", routes.imp(emitter));
app.post("/import", routes.imp(emitter));
app.get("/track", routes.track(emitter));
app.post("/track", routes.track(emitter));
app.get("/engage", routes.engage(emitter));
app.post("/engage", routes.engage(emitter));
