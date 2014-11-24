var expect = require('chai').expect;
var Astro = require('../src/astro');
var round = require('./utils').round;
var system = require('./mocks/planets');

var planet = system.planets[0];

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

  describe('methods', function() {
    it('should return the ecoSphere', function() {
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);

      expect(ecosphereRadius).to.equal(1);
    });

    it('should return the orbitalZone', function() {
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);
      expect(zone).to.equal(1);
    });

    it('should return the kothariRadius', function() {
      var zone = Astro.orbitalZone(system.star.luminosity, planet.axis);
      var kothariRadius = Astro.kothariRadius(planet.mass, planet.gasGiant, zone);

      expect(kothariRadius).to.equal(1.6283585806954553e-14);
    });

    it('should return the empiricalDensity', function() {
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity)
      var empiricalDensity = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant);

      expect(round(empiricalDensity, 0)).to.equal(10849);
    });

    it('should return the volumeRadius', function() {
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);
      var density = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant)
      var volumeRadius = Astro.volumeRadius(planet.mass, density);

      expect(round(volumeRadius)).to.equal(171.505);
    });

    it('should return the greenhouse');
    it('should return the pressure');
    it('should return the moleculeLimit');
    it('should return the rmsVel');
    it('should return the gravity');
    it('should return the acceleration');
    it('should return the inclination');

    it('should return the escapeVel', function() {
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);
      var density = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant);
      var radius = Astro.volumeRadius(planet.mass, density);
      var escapeVel = Astro.escapeVel(planet.mass, radius);

      expect(round(escapeVel, 0)).to.equal(1335563);
    });

    it('should return the dayLength');

    it('should return the period in days', function() {
      var period = Astro.period(planet.axis, planet.mass, system.star.mass);
      expect(round(period)).to.equal(67.756);
    });

    it('should return the volumeDensity', function() {
      var ecosphereRadius = Astro.ecosphere(system.star.luminosity);
      var density = Astro.empiricalDensity(planet.mass, planet.axis, ecosphereRadius, planet.gasGiant)
      var volumeRadius = Astro.volumeRadius(planet.mass, density);
      var volumeDensity = Astro.volumeDensity(planet.mass, volumeRadius);

      expect(round(volumeDensity)).to.equal(0.033);
    });
  });


});
