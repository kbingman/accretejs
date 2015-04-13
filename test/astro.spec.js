var expect = require('chai').expect;
var Astro = require('../src/astro');
var round = require('./utils').round;
var testValue = require('./utils').testValue;
var system = require('./mocks/planets');
var earth = system.planets[0];
var jupiter = system.planets[1];

describe('Astro', function(){

  describe('luminosity', function(){

    it('should correctly calculate the luminosity for the sun', function(){
      testValue(Astro.luminosity(1), 1);
    });

    it('should correctly calculate the luminosity for a larger star', function(){
      var luminosity = Astro.luminosity(1.2);

      testValue(luminosity, 2.399);
    });

  });

  describe('methods', function() {
    it('should return the ecoSphere', function() {
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);

      // expect(ecosphereRadius).to.equal(1);
      testValue(ecosphereRadius, 1);
    });

    it('should return the orbitalZone, zone 1', function() {
      var planet = earth;
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);

      console.log(zone);
      expect(zone).to.equal(1);
    });

    it('should return the orbitalZone zone 2', function() {
      var planet = jupiter;
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);

      console.log(zone);
      expect(zone).to.equal(2);
    });

    // it('should return the orbitalZone zone 3', function() {
    //   var planet = system.planets[11];
    //   var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);
    //
    //   console.log(zone);
    //   expect(zone).to.equal(3);
    // });

    it('should return the kothariRadius', function() {
      var planet = earth;

      var kothariRadius = Astro.kothariRadius(planet.mass, planet.gasGiant, 1);

      console.log(round(kothariRadius, 0));
      expect(round(kothariRadius, 0)).to.equal(6377);
    });

    it('should return the empiricalDensity', function() {
      var planet = earth;
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity)
      var empiricalDensity = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant);

      console.log(round(empiricalDensity));
      expect(round(empiricalDensity, 0)).to.equal(5);
    });

    it('should return the volumeRadius', function() {
      var planet = jupiter;
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);
      var density = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant)
      var volumeRadius = Astro.volumeRadius(planet.mass, density);

      console.log(round(volumeRadius, 0));
      expect(round(volumeRadius, 0)).to.equal(64978);
    });

    it('should return the greenhouse', function() {
      var planet = earth;
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);
      var ecosphere = Astro.ecosphere(system.star.mass);
      var greenhouse = Astro.greenhouse(zone, planet.axis, ecosphere);

      console.log(greenhouse);
      expect(greenhouse).to.equal(false);
    });

    it('should return the pressure', function() {
      // var planet = system.planets[2];
      // var pressure = Astro.pressure(volatileGasInventory, planet.axis, gravity);

      expect(Astro.pressure).to.be.defined;
    });
    it('should return the moleculeLimit', function() {
      expect(Astro.moleculeLimit).to.be.defined;
    });

    it('should return the rmsVel', function() {
      expect(Astro.rmsVel).to.be.defined;
    });

    it('should return the acceleration', function() {
      var planet = earth;
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);
      var radius = Astro.kothariRadius(planet.mass, planet.gasGiant, zone);
      var acceleration = Astro.acceleration(planet.mass, radius);

      console.log(round(acceleration));
      expect(round(acceleration)).to.equal(979.953);
    });

    it('should return the gravity', function() {
      var planet = earth;
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);
      var radius = Astro.kothariRadius(planet.mass, planet.gasGiant, zone);
      var acceleration = Astro.acceleration(planet.mass, radius);
      var gravity = Astro.gravity(acceleration);

      console.log(round(gravity));
      expect(round(gravity)).to.equal(0.999);
    });

    it('should return the inclination', function() {
      expect(Astro.inclination).to.be.defined;
    });

    it('should return the escapeVel', function() {
      var planet = earth;
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);
      var density = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant);
      var radius = Astro.volumeRadius(planet.mass, density);
      var escapeVel = Astro.escapeVel(planet.mass, radius);

      console.log(round(escapeVel, 0));
      expect(round(escapeVel, 0)).to.equal(1118001);
    });

    it('should return the dayLength', function() {
      var mainSequenceAge = 5.4e10;
      var radius = 6377;
      var orbitalPeriod = 365.255;

      var dayLength = Astro.dayLength(earth.mass, radius, orbitalPeriod, earth.eccentricity, earth.giant, mainSequenceAge);

      console.log(round(dayLength));
      expect(round(dayLength)).to.equal(24);
    });

    it('should return the period in days', function() {
      var planet = earth;
      var period = Astro.period(planet.axis, planet.mass, system.star.mass);

      console.log(round(period));
      expect(round(period)).to.equal(365.255);
    });

    it('should return the volumeDensity', function() {
      var planet = earth;
      // var ecosphereRadius = Astro.ecosphere(system.star.luminosity);
      // var kothariRadius = Astro.kothariRadius(planet.mass, planet.gasGiant, 1);
      var volumeDensity = Astro.volumeDensity(planet.mass, 6377);

      console.log(round(volumeDensity));
      expect(round(volumeDensity)).to.equal(5.499);
    });
  });


});
