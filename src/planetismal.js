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
      return DoleParams.perihelionDistance(this.axis, this.eccn);
    },

    aphelionDistance: function() {
      return DoleParams.aphelionDistance(this.axis, this.eccn);
    },

    reducedMass: function() {
      return DoleParams.reducedMass(this.mass)
    },

    reducedMargin: function() {
      return DoleParams.reducedMargin(this.mass);
    },

    innerEffectLimit: function() {
      return DoleParams.innerEffectLimit(this.axis, this.eccn, DoleParams.reducedMargin(this.mass));
    },

    outerEffectLimit: function() {
      return DoleParams.outerEffectLimit(this.axis, this.eccn, DoleParams.reducedMargin(this.mass));
    },

    innerSweptLimit: function() {
      return DoleParams.innerSweptLimit(this.axis, this.eccn, DoleParams.reducedMargin(this.mass));
    },

    outerSweptLimit: function() {
      return DoleParams.outerSweptLimit(this.axis, this.eccn, DoleParams.reducedMargin(this.mass));
    },

    criticalMass: function(luminosity) {
      return DoleParams.criticalMass(this.axis, this.eccn, luminosity);
    },

    getEarthMass: function() {
      return this.mass * Astro.solarMassInEarthMass;
    }
  }

};

module.exports = Planetismal;
