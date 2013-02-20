
describe("Mixpanel", function(){

  it("should return a 1 when tracking data", function(done){
    mixpanel.track("Browser Track Test", {first: "prop"}, function(result) {
      result.should.eql(1);
      done();
    });
  });

});
