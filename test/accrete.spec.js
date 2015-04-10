var expect = require('chai').expect;
var Accrete = require('../src/accrete');
var round = require('./utils').round;
var mockSystem = require('./mocks/planets');
var system, planet;

describe('Accrete', function(){

  beforeEach(function() {
    accrete = new Accrete(10);
  });

  describe('initialize', function() {

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

  describe('create system', function() {

    beforeEach(function() {
      system = accrete.distributePlanets();
    });

    describe('star', function() {

      it('should return the default stellar mass', function() {
        expect(system.star.mass).to.equal(1);
      });

      it('should return the default stellar luminosity', function() {
        expect(system.star.luminosity).to.equal(1);
      });

    });

    // These are just for reference as I update the accret file to prevent
    // unforeseen changes.
    describe('first planet', function() {
      beforeEach(function() {
        planet = system.planets[0];
      })

      it('should create an array of planets', function() {
        expect(system.planets.length).to.equal(10);
      });

      it('should return the first planets axis', function() {
        expect(round(planet.axis)).to.equal(0.339);
      });

      it('should return the first planets eccn', function() {
        expect(round(planet.eccn)).to.equal(0.04);
      });

      it('should return the first planets mass', function() {
        var earthMass = planet.getEarthMass();

        expect(round(earthMass, 3)).to.equal(0.059);
      });

      it('should return false for gasGiant', function() {
        expect(planet.gasGiant).to.equal(false);
      });

    });

    describe('sixth planet', function() {
      beforeEach(function() {
        planet = system.planets[6];
      })

      it('should return the sixth planets axis', function() {
        expect(round(planet.axis)).to.equal(4.647);
      });

      it('should return the sixth planets eccn', function() {
        expect(round(planet.eccn)).to.equal(0.029);
      });

      it('should return the sixth planets mass', function() {
        var earthMass = planet.getEarthMass();

        expect(round(earthMass, 3)).to.equal(125.06);
      });

      it('should return true for gasGiant', function() {
        expect(planet.gasGiant).to.equal(true);
      });

    });

  });

  describe('moons', function() {
    it('should calcute a planets moons', function(){
      system = accrete.distributePlanets();
      planet = system.planets[7];
      console.log('');
      // console.log('planet mass', planet.getEarthMass());

      system2 = accrete.distributePlanets();
      system3 = accrete.distributePlanets();
      system4 = accrete.distributePlanets();

      // console.log('Planets');
      system.planets.forEach(function(planet, i) {
        var moons = accrete.distributeMoons(planet.mass, 1);
        // console.log('Planet', i, ':', planet.getEarthMass());
        // console.log('Moons:', moons.length);
        moons.forEach(function(moon) {
          // console.log(moon.getEarthMass());
        });
      });

      // system2.planets.forEach(function(planet, i) {
      //   var moons = accrete.distributeMoons(planet.mass, 1);
      //   console.log('Planet', i, ':', planet.getEarthMass());
      //   console.log('Moons:', moons.length);
      //   moons.forEach(function(moon) {
      //     console.log(moon.getEarthMass());
      //   });
      // });
      //
      // system3.planets.forEach(function(planet, i) {
      //   var moons = accrete.distributeMoons(planet.mass, 1);
      //   console.log('Planet', i, ':', planet.getEarthMass());
      //   console.log('Moons:', moons.length);
      //   moons.forEach(function(moon) {
      //     console.log(moon.getEarthMass());
      //   });
      // });
      //
      // system4.planets.forEach(function(planet, i) {
      //   var moons = accrete.distributeMoons(planet.mass, 1);
      //   console.log('Planet', i, ':', planet.getEarthMass());
      //   console.log('Moons:', moons.length);
      //   moons.forEach(function(moon) {
      //     console.log(moon.getEarthMass());
      //   });
      // });

    });
  });

  describe('methods', function() {

    it('should accreteDust');
    // it('should collectDust', function() {
    //   var nucleus = {
    //     axis: 17.007568080164493,
    //     eccn: 0.09801781789989505,
    //     mass: 1.5693094439699946e-9,
    //     gasGiant: false
    //   }
    //   var band = {
    //     inner: 12,
    //     outer: 24,
    //     dust: true,
    //     gas: true
    //   }
    //   expect(accrete.collectDust(nucleus, band, 0.00002040088928732126)).to.equal(0)
    // });
    it('should coalescePlanetismals');
    it('should coalesceTwoPlanets');
    it('should insertPlanet');
  });

});
