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

  it('should be calculate criticalMass', function() {
    var result = DoleParams.criticalMass(planet.axis, planet.eccn, star.luminosity);
    expect(round(result, 7)).to.equal(0.0000308);
  });

  it('should be calculate perihelionDistance', function() {
    var result = DoleParams.perihelionDistance(planet.axis, planet.eccn);
    expect(round(result, 3)).to.equal(0.285);
  });

  it('should be calculate aphelionDistance', function() {
    var result = DoleParams.aphelionDistance(planet.axis, planet.eccn);
    expect(round(result, 3)).to.equal(0.366);
  });

  it('should be calculate reducedMass', function() {
    var result = DoleParams.reducedMass(0.5);
    expect(round(result, 3)).to.equal(0.333);
  });

  it('should be calculate reducedMargin', function() {
    var result = DoleParams.reducedMargin(0.5);
    expect(round(result, 3)).to.equal(0.76);
  });

  it('should be calculate lowBound', function() {
    var result = DoleParams.lowBound(0.5);
    expect(round(result, 3)).to.equal(0.4);
  });

  it('should be calculate highBound', function() {
    var result = DoleParams.highBound(0.5);
    expect(round(result, 3)).to.equal(0.667);
  });

  it('should be calculate innerEffectLimit', function() {
    var result = DoleParams.innerEffectLimit(planet.axis, planet.eccn, planet.mass);
    expect(round(result, 3)).to.equal(0.285);
  });

  it('should be calculate outerEffectLimit', function() {
    var result = DoleParams.outerEffectLimit(planet.axis, planet.eccn, planet.mass);
    expect(round(result, 3)).to.equal(0.366);
  });

  it('should be calculate innerSweptLimit', function() {
    var result = DoleParams.innerSweptLimit(planet.axis, planet.eccn, planet.mass);
    expect(round(result, 3)).to.equal(0.228);
  });

  it('should be calculate outerSweptLimit', function() {
    var result = DoleParams.outerSweptLimit(planet.axis, planet.eccn, planet.mass);
    expect(round(result, 3)).to.equal(0.488);
  });

  it('should be calculate dustDensity', function() {
    var result = DoleParams.dustDensity(star.mass, planet.axis);
    expect(round(result, 3)).to.equal(0);
  });

  it('should be calculate massDensity');
  // function() {
  //   var result = DoleParams.massDensity(dustDensity, criticalMass, mass);
  //   expect(round(result, 3)).to.equal(0.488);
  // }


  it('should be calculate scaleCubeRootMass', function() {
    var result = DoleParams.scaleCubeRootMass(1, planet.mass);
    expect(round(result, 3)).to.equal(0.005);
  });

  it('should be calculate innerDustLimit', function() {
    var result = DoleParams.innerDustLimit(star.mass);
    expect(result).to.equal(0);
  });

  it('should be calculate outerDustLimit', function() {
    var result = DoleParams.outerDustLimit(star.mass);
    expect(round(result, 3)).to.equal(200);
  });

  it('should be calculate innermostPlanet', function() {
    var result = DoleParams.innermostPlanet(star.mass);
    expect(round(result, 3)).to.equal(0.3);
  });

  it('should be calculate outermostPlanet', function() {
    var result = DoleParams.outermostPlanet(star.mass);
    expect(round(result, 3)).to.equal(50);
  });

  it('should be calculate randomEccentricity', function() {
    var result = DoleParams.randomEccentricity(alea);
    expect(round(result, 3)).to.equal(0.048);
  });

});
