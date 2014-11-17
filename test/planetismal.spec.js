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

      it('should return the correct perihelionDistance', function(){
        planetismal.axis = 1;
        expect(planetismal.perihelionDistance()).to.equal(0.999);
      });

      it('should return the correct aphelionDistance', function(){
        planetismal.axis = 1;
        expect(planetismal.aphelionDistance()).to.equal(0.999);
      });

      it('should return the correct reducedMass', function(){
        planetismal.mass = 1;
        expect(planetismal.reducedMass()).to.equal(0.5);
      });

      it('should return the correct reducedMargin', function(){
        expect(planetismal.reducedMargin()).to.equal(0.01842557262658827);
      });

      it('should return the correct innerEffectLimit', function(){
        expect(planetismal.innerEffectLimit()).to.equal(0.09805928529460384);
      });

      it('should return the correct outerEffectLimit', function(){
        expect(planetismal.outerEffectLimit()).to.equal(0.10174071470539617);
      });

      it('should return the correct innerSweptLimit', function(){
        expect(planetismal.innerSweptLimit()).to.equal(0.07844742823568307);
      });

      it('should return the correct outerSweptLimit', function(){
        expect(planetismal.outerSweptLimit()).to.equal(0.13565428627386156);
      });

      it('should return the correct criticalMass', function(){
        expect(planetismal.criticalMass(1)).to.equal(0.00006753161406712049);
      });

    });

  });

});
