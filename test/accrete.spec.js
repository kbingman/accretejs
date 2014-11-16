var expect = require('chai').expect;
var Accrete = require('../src/accrete');
var round = require('./utils').round;

describe('Accrete', function(){

  beforeEach(function() {
    accrete = new Accrete(10);
  });

  describe('initialize', function() {

    it('should be defined', function() {
      expect(accrete).to.be.defined;
    });

    it('should return repeatable random numbers', function() {
      var rand = accrete.prng();
      expect(round(rand)).to.equal(0.954);
    });

    it('should not return the same random numbers', function() {
      var rand1 = accrete.prng();
      var rand2 = accrete.prng();
      expect(round(rand2)).to.equal(0.552);
    });

  });

  // This could get big...
  describe('create system', function() {

    // it('should create an array of planets', function() {
    //   var system = accrete.distributePlanets();
    //
    //   expect(system.length).to.equal(10);
    // });

    it('should return the default stellar mass', function() {
      var system = accrete.distributePlanets();
      expect(system.star.mass).to.equal(1);
    });

    it('should return the default stellar luminosity', function() {
      var system = accrete.distributePlanets();

      expect(system.star.luminosity).to.equal(1);
    });
  });

});
