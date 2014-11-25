var DoleParams = Object.create({

  B: 1.2e-5, // For critical mass
  K: 50, // Dust/gas ratio
  // ALPHA and N both used in density calculations
  ALPHA: 5,
  N: 3,

  dustDensityCoeff: 1.5e-3, // A in Dole's paper
  cloudEccentricity: 0.25,
  eccentricityCoeff: 0.077,

  criticalMass: function(radius, eccentricity, luminosity) {
    return this.B *
      Math.pow(this.perihelionDistance(radius, eccentricity) *
      Math.sqrt(luminosity), -0.75);;
  },

  /**
   * function perihelionDistance
   *
   * returns the distance between the orbiting body and the
   * sun at it's closest approach.
   */
  perihelionDistance: function(radius, eccentricity) {
    return radius * (1 - eccentricity);
  },

  /**
   * function apheliondistance
   *
   * returns the distance between the orbiting body and the
   * sun at it's furthest approach.
   */
  aphelionDistance: function(radius, eccentricity) {
    return radius * (1 + eccentricity);
  },

  reducedMass: function(mass) {
    return mass / (1 + mass)
  },

  reducedMargin: function(mass) {
    return Math.pow(this.reducedMass(mass), 1/4);
  },

  lowBound: function(inner) {
    return inner / (1 + this.cloudEccentricity);
  },

  highBound: function(outer) {
    return outer / (1.0 - this.cloudEccentricity);
  },

  innerEffectLimit: function(options) {
    var mass = this.reducedMargin(options.mass);
    return this.perihelionDistance(options.axis, options.eccn) * (1 - mass);
  },

  outerEffectLimit: function(options) {
    var mass = this.reducedMargin(options.mass);
    return this.aphelionDistance(options.axis, options.eccn) * (1 + mass);
  },

  /**
   * TODO: Not sure quite yet if we're interacting with this in a
   * way where we can't call innerEffectLimit here...
   */
  innerSweptLimit: function(options) {
    return this.lowBound(this.innerEffectLimit(options));
  },

  /**
   * TODO: Read comment above
   */
  outerSweptLimit: function(options) {
    return this.highBound(this.outerEffectLimit(options));
  },

  dustDensity: function(stellarMass, oribitalRadius) {
    return this.dustDensityCoeff *
      Math.sqrt(stellarMass) *
      Math.exp(-this.ALPHA * Math.pow(oribitalRadius, 1/this.N));
  },

  massDensity: function(dustDensity, criticalMass, mass) {
    return this.K * dustDensity /
      (1 + Math.sqrt(criticalMass / mass) *
      (this.K - 1));
  },

  scaleCubeRootMass: function(scale, mass) {
    return scale * Math.pow(mass, 1/3);
  },

  innerDustLimit: function(stellarMass) {
    return 0;
  },

  outerDustLimit: function(stellarMass) {
    return this.scaleCubeRootMass(200, stellarMass);
  },

  innermostPlanet: function(stellarMass) {
    return this.scaleCubeRootMass(0.3, stellarMass);
  },

  outermostPlanet: function(mass) {
    return this.scaleCubeRootMass(50, mass);
  },

  randomEccentricity: function(pnrg) {
    return (1 - Math.pow(pnrg(), this.eccentricityCoeff));
  },

  /**
   * this is what stellar_dust_limit returns
   * return(200.0 * pow(stellar_mass_ratio,(1.0 / 3.0)));
   * Since I cannot find the original formula, I guess:
   */
  planetOuterSweptLimit: function(planetaryMass) {
    return 0.01 * Math.pow(planetaryMass, (1 / 3));
  },

  planetOuterDustLimit: function(planetaryMass) {
    return this.scaleCubeRootMass(10, planetaryMass);
  },

  innermostMoon: function(planetaryMass) {
    // need to figure out what this is...
    return this.scaleCubeRootMass(0.1, planetaryMass);
  },

  outermostMoon: function(planetaryMass) {
    // need to figure out what this is...
    return this.scaleCubeRootMass(1, planetaryMass);
  },

});

module.exports = DoleParams;
