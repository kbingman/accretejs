var Astro = require('./astro');
var DoleParams = require('./dole_params');

function Planetismal(options) {
  this.axis = options.axis;
  this.eccn = options.eccn;
  this.mass = options.mass || Astro.protoplanetMass;
  this.gasGiant = options.gasGiant || false;
}

Planetismal.prototype = Object.create({
  axis: 0, // Semi-major axis in AU
  eccn: 0,
  mass: 0,
  gasGiant: false,
  next: null,

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

});

module.exports = Planetismal;
