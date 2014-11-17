var expect = require('chai').expect;
var round = require('./utils').round;
var DoleParams = require('../src/dole_params');

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

  it('should be calculate reducedMargin');

  it('should be calculate lowBound');

  it('should be calculate highBound');

  it('should be calculate innerEffectLimit');

  it('should be calculate outerEffectLimit');

  it('should be calculate innerSweptLimit');

  it('should be calculate outerSweptLimit');

  it('should be calculate dustDensity');

  it('should be calculate massDensity');

  it('should be calculate scaleCubeRootMass');

  it('should be calculate innerDustLimit');

  it('should be calculate outerDustLimit');

  it('should be calculate innermostPlanet');

  it('should be calculate outermostPlanet');

  it('should be calculate randomEccentricity');

});
