var expect = require('chai').expect;
var Astro = require('../src/astro');
var round = require('./utils').round;

var planet1 = {
  axis: 0.32526239259168505,
  eccn: 0.12527582726552988,
  mass: 1.1526143566158224e-7,
  gasGiant: false
}

describe('Astro', function(){

  describe('luminosity', function(){

    it('should correctly calculate the luminosity for the sun', function(){
      expect(Astro.luminosity(1)).to.equal(1);
    });

    it('should correctly calculate the luminosity for a larger star', function(){
      var luminosity = Astro.luminosity(1.2);
      expect(round(luminosity)).to.equal(2.399);
    });

  });

  describe('period', function() {
    it('should return the period in days', function(){
      var period = Astro.period(planet1.axis, planet1.mass, 1)
      expect(round(period)).to.equal(67.756);
    });
  });

  describe('orbitalZone', function() {
    it('should return the orbitalZone');
  });

  describe('ecoSphere', function() {
    it('should return the ecoSphere', function(){
      expect(Astro.ecoSphere(1)).to.equal(1);
    });
  });

  describe('kothariRadius', function() {
    it('should return the kothariRadius');
  });

  describe('empiricalDensity', function() {
    it('should return the empiricalDensity');
  });

  describe('volumeRadius', function() {
    it('should return the volumeRadius');
  });

  describe('escapeVel', function() {
    it('should return the escapeVel');
  });

});
