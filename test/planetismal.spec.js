var expect = require('chai').expect;
var Planetismal = require('../src/planetismal');
var Astro = require('../src/astro');
var round = require('./utils').round;

var planetismal;

describe('Planetismal',function(){

  describe('creating a planetismal',function(){

    describe('attributes',function(){

      beforeEach(function() {
        planetismal = new Planetismal({
          axis: 0.1,
          eccn: 0.001,
          mass: 1e-25,
          gasGiant: true
        });
      });

      it('should return eccn if given', function(){
        expect(planetismal.eccn).to.equal(0.001);
      });

      it('should return axis if given', function(){
        expect(planetismal.axis).to.equal(0.1);
      });

      it('should return mass if given', function(){
        expect(planetismal.mass).to.equal(1e-25);
      });

      it('should return gasGiant if given', function(){
        expect(planetismal.gasGiant).to.equal(true);
      });

    });

    describe('defaults', function(){

      beforeEach(function() {
        planetismal = new Planetismal({
          axis: 0,
          eccn: 0
        });
      });

      it('should return the default eccn', function(){
        expect(planetismal.eccn).to.equal(0);
      });

      it('should return the default axis', function(){
        expect(planetismal.axis).to.equal(0);
      });

      it('should return default mass from the Astro functions', function(){
        expect(planetismal.mass).to.equal(Astro.protoplanetMass);
      });

      it('should return the default value for gasGiant', function(){
        expect(planetismal.gasGiant).to.be.false;
      });

    });

    describe('methods',function(){

      beforeEach(function() {
        planetismal = new Planetismal({
          axis: 0.1,
          eccn: 0.001,
          mass: 1.1526143566158224e-7
        });
      });

      it('should return the mass in earth masses', function(){
        expect(planetismal.getEarthMass()).to.equal(0.038356198019601856);
      });

    });

  });

});
