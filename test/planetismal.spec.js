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

    describe('defaults',function(){

      beforeEach(function() {
        planetismal = new Planetismal();
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
          mass: 1e-25
        });
      });

      it('should return the mass in earth masses', function(){
        expect(planetismal.getEarthMass()).to.equal(3.3277564e-20);
      });

      it('should return the correct perihelionDistance', function(){
        expect(planetismal.perihelionDistance()).to.equal(0.0999);
      });

      it('should return the correct aphelionDistance', function(){
        expect(planetismal.aphelionDistance()).to.equal(0.0999);
      });

      it('should return the correct reducedMass', function(){
        expect(planetismal.reducedMass()).to.equal(1e-25);
      });

      it('should return the correct reducedMargin', function(){
        expect(planetismal.reducedMargin()).to.equal(5.62341325190349e-7);
      });

      it('should return the correct innerEffectLimit', function(){
        expect(planetismal.innerEffectLimit()).to.equal(0.09989994382210161);
      });

      it('should return the correct outerEffectLimit', function(){
        expect(planetismal.outerEffectLimit()).to.equal(0.0999000561778984);
      });

      it('should return the correct innerSweptLimit', function(){
        expect(planetismal.innerSweptLimit()).to.equal(0.07991995505768129);
      });

      it('should return the correct outerSweptLimit', function(){
        expect(planetismal.outerSweptLimit()).to.equal(0.13320007490386454);
      });

      it('should return the correct criticalMass', function(){
        expect(planetismal.criticalMass(1)).to.equal(0.00006753161406712049);
      });

    });

  });

});
