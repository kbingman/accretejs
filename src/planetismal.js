var Astro = require('./astro');
var DoleParams = require('./dole_params');

var Planetismal = function(options) {
  options = options || {};

  var axis = options.axis || 0; // Semi-major axis in AU
  var eccn = options.eccn || 0;
  var mass = options.mass || Astro.protoplanetMass;
  var gasGiant = options.gasGiant || false;
  var next = null;

  return {
    axis: axis,
    eccn: eccn,
    mass: mass,
    gasGiant: gasGiant,
    next: next,

    perihelionDistance: function() {
      return DoleParams.perihelionDistance(axis, eccn);
    },

    aphelionDistance: function() {
      return DoleParams.aphelionDistance(axis, eccn);
    },

    reducedMass: function() {
      return DoleParams.reducedMass(mass)
    },

    reducedMargin: function() {
      return DoleParams.reducedMargin(mass);
    },

    innerEffectLimit: function() {
      return DoleParams.innerEffectLimit(axis, eccn, DoleParams.reducedMargin(mass));
    },

    outerEffectLimit: function() {
      return DoleParams.outerEffectLimit(axis, eccn, DoleParams.reducedMargin(mass));
    },

    innerSweptLimit: function() {
      return DoleParams.innerSweptLimit(axis, eccn, DoleParams.reducedMargin(mass));
    },

    outerSweptLimit: function() {
      return DoleParams.outerSweptLimit(axis, eccn, DoleParams.reducedMargin(mass));
    },

    criticalMass: function(luminosity) {
      return DoleParams.criticalMass(axis, eccn, luminosity);
    },

    getEarthMass: function() {
      return mass * Astro.solarMassInEarthMass;
    }
  }

};

module.exports = Planetismal;
