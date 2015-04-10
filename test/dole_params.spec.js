var expect = require('chai').expect;
var Alea = require('alea');

var round = require('./utils').round;
var DoleParams = require('../src/dole_params');
var alea = new Alea(1);

var planet = {
  axis: 0.32526239259168505,
  eccn: 0.12527582726552988,
  mass: 1.1526143566158224e-7,
  gasGiant: false
}

var star = {
  mass: 1,
  luminosity: 1
}

describe('DoleParams', function(){

  it('should calculate the criticalMass', function() {
    var result = DoleParams.criticalMass(planet.axis, planet.eccn, star.luminosity);
    expect(round(result, 7)).to.equal(0.0000308);
  });

  it('should calculate the perihelionDistance', function() {
    var result = DoleParams.perihelionDistance(planet.axis, planet.eccn);
    expect(round(result, 3)).to.equal(0.285);
  });

  it('should calculate the aphelionDistance', function() {
    var result = DoleParams.aphelionDistance(planet.axis, planet.eccn);
    expect(round(result, 3)).to.equal(0.366);
  });

  it('should calculate the reducedMass', function() {
    var result = DoleParams.reducedMass(0.5);
    expect(round(result, 3)).to.equal(0.333);
  });

  it('should calculate the reducedMargin', function() {
    var result = DoleParams.reducedMargin(0.5);
    expect(round(result, 3)).to.equal(0.76);
  });

  it('should calculate the lowBound', function() {
    var result = DoleParams.lowBound(0.5);
    expect(round(result, 3)).to.equal(0.4);
  });

  it('should calculate the highBound', function() {
    var result = DoleParams.highBound(0.5);
    expect(round(result, 3)).to.equal(0.667);
  });

  it('should calculate the innerEffectLimit', function() {
    var result = DoleParams.innerEffectLimit(planet);
    expect(round(result, 3)).to.equal(0.279);
  });

  it('should calculate the outerEffectLimit', function() {
    var result = DoleParams.outerEffectLimit(planet);
    expect(round(result, 3)).to.equal(0.373);
  });

  it('should calculate the innerSweptLimit', function() {
    var result = DoleParams.innerSweptLimit(planet);
    expect(round(result, 3)).to.equal(0.223);
  });

  it('should calculate the outerSweptLimit', function() {
    var result = DoleParams.outerSweptLimit(planet);
    expect(round(result, 3)).to.equal(0.497);
  });

  it('should calculate the dustDensity', function() {
    var result = DoleParams.dustDensity(star.mass, planet.axis);
    expect(round(result, 3)).to.equal(0);
  });

  it('should calculate the massDensity', function() {
    var dustDensity = DoleParams.dustDensity(star.mass, planet.axis);
    var criticalMass = DoleParams.criticalMass(planet.axis, planet.eccn, star.luminosity);
    var result = DoleParams.massDensity(dustDensity, criticalMass, planet.mass);

    expect(round(result, 3)).to.equal(0);
  });

  it('should calculate the scaleCubeRootMass', function() {
    var result = DoleParams.scaleCubeRootMass(1, planet.mass);
    expect(round(result, 3)).to.equal(0.005);
  });

  it('should calculate the innerDustLimit', function() {
    var result = DoleParams.innerDustLimit(star.mass);
    expect(result).to.equal(0);
  });

  it('should calculate the outerDustLimit', function() {
    var result = DoleParams.outerDustLimit(star.mass);
    expect(round(result, 3)).to.equal(200);
  });

  it('should calculate the innermostPlanet', function() {
    var result = DoleParams.innermostPlanet(star.mass);
    expect(round(result, 3)).to.equal(0.3);
  });

  it('should calculate the outermostPlanet', function() {
    var result = DoleParams.outermostPlanet(star.mass);
    expect(round(result, 3)).to.equal(50);
  });

  it('should calculate the randomEccentricity', function() {
    var result = DoleParams.randomEccentricity(alea);
    expect(round(result, 3)).to.equal(0.048);
  });

  // it('should calculate the planetDustLimit', function() {
  //   var result = DoleParams.planetDustLimit(3);
  //   expect(round(result, 3)).to.equal(0.144);
  // });

});
