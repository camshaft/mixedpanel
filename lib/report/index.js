/**
 * Module exports
 */
var express = require("express")
  , io = require("socket.io")
  , pns = require("pack-n-stack");

/**
 * Expose the app
 */
module.exports = function(emitter) {
  var app = module.exports = pns(express());

  /**
   * Routes
   */
  app.configure(function() {
    app.set("x-powered-by", false);
    app.use("/", "views", express.static(__dirname+"/views"));
    app.use("/partials", "partials", express.static(__dirname+"/public/partials"));
    app.use("/assets", "assets", express.static(__dirname+"/build"));
    // TODO auth
    app.use(app.router);
    app.use(function notFound(req, res, next) {
      res.send(404);
    });
  });

  /**
   * Reporters
   */
  emitter.on("track", function() {
    // TODO handle the event and push data to the different reports
  });

  /**
   * Install socket.io
   */
  emitter.on("listening", function(server) {
    var s = io.listen(server);

    /**
     * Hook up events to tell the browser
     */
    s.sockets.on("connection", function(socket) {
      emitter.on("track", function(key, properties) {
        socket.emit("track", {key: key, properties: properties});
      });
    });
  });
  
  return app;
};
