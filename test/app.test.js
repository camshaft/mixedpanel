/**
 * Module dependencies
 */
var should = require("should")
  , supertest = require("supertest")
  , Mixpanel = require("mixpanel")
  , app = require("..");

describe("Mixpanel", function(){
  
  it("should return the docs link at the root", function(done){
    supertest(app)
      .get("/")
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        done();
      });
  });

  describe("client integration", function(){

    var server
      , client = Mixpanel.init("testing", {key: "testing", host: "localhost", port: 5001});

    before(function(done) {
      server = app.listen(5001, function() {
        done();
      });
    });


    it("should return a 1 when tracking data", function(done){
      client.track("testing", {first: "prop"}, function(err) {
        done(err);
      });
    });

    it("should return a 1 when importing data", function(done){
      client.import("testing", new Date(), {second: "prop"}, function(err) {
        done(err);
      });
    });

    it("should return a 1 when setting te person info", function(done){
      client.people.set("cameron", "gender", "male", function(err) {
        done(err);
      });
    });

    it("should return a 1 when incrementing", function(done){
      client.people.increment("cameron", "page_views", 1, function(err) {
        done(err);
      });
    });

    it("should return a 1 when tracking a charge", function(done){
      client.people.track_charge("cameron", 29.99, {testing: 123}, function(err) {
        done(err);
      });
    });

    it("should return a 1 when clearing charges", function(done){
      client.people.clear_charges("cameron", function(err) {
        done(err);
      });
    });

    it("should return a 1 when deleteing a user", function(done){
      client.people.delete_user("cameron", function(err) {
        done(err);
      });
    });

  });

});
