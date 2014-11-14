var Alea = require('alea');

var Astro = require('./astro');
var DoleParams = require('./dole_params');
var DustBand = require('./dust_band');
var DustBands = require('./dust_bands');
var Planetismal = require('./planetismal');

function Accrete(stellarMass, stellarLuminosity) {
  var seed = 1234;
  this.prng = new Alea(seed);
}

Accrete.prototype = Object.create({
  criticalMass: 0,
  dustDensity: 0,
  planetHead: 0,
  dustBands: null,

  distributePlanets: function(stellarMass, stellarLuminosity) {

    this.stellarMass = stellarMass || 1;
    this.stellarLuminosity = stellarLuminosity || Astro.luminosity(this.stellarMass);

    this.innerBound = DoleParams.innermostPlanet(this.stellarMass);
    this.outerBound = DoleParams.outermostPlanet(this.stellarMass);
    this.innerDust = DoleParams.innerDustLimit(this.stellarMass);
    this.outerDust = DoleParams.outerDustLimit(this.stellarMass);

    // console.log('this', this);
    // console.log('innerDust', this.innerDust);
    // console.log('outerDust', this.outerDust);

    var tismal, mass, planets, curr;
    var dustLeft = true;

    this.planetHead = null;

    this.dustBands = new DustBands(this.innerDust, this.outerDust);

    while (dustLeft) {
      tismal = new Planetismal({
        axis: (this.prng() * this.outerBound) + this.innerBound,
        eccn: DoleParams.randomEccentricity(this.prng)
      });

      this.dustDensity = DoleParams.dustDensity(this.stellarMass, tismal.axis);
      this.criticalMass = tismal.criticalMass(this.stellarLuminosity);

      mass = this.accreteDust(tismal);

      if (mass != 0.0 && mass != Astro.protoplanetMass) {

        if (mass >= this.criticalMass) {
          tismal.gasGiant = true;
        }

        this.dustBands.updateLanes(tismal.innerSweptLimit(), tismal.outerSweptLimit(), tismal.gasGiant);

        dustLeft = this.dustBands.dustRemaining(this.innerBound, this.outerBound);

        this.dustBands.compressLanes();

        if(!this.coalescePlanetismals(tismal)) {
          this.insertPlanet(tismal);
        }
      }
    }

    planets = [this.planetHead];
    curr = this.planetHead;

    while(curr = curr.next) planets.push(curr);

    return planets;
  },

  // Planetismal: nucleus
  accreteDust: function(nucleus) {
    var newMass = nucleus.mass;

    // TODO: Make sure that turning the original DO/WHILE
    // into a while didn't affect the outcome
    do {
      nucleus.mass = newMass;
      newMass = 0;

      this.dustBands.bands.forEach(function(band, i) {
        newMass += this.collectDust(nucleus, band);
      }, this);
    }
    while (newMass - nucleus.mass > 0.0001 * nucleus.mass);

    nucleus.mass = newMass;

    return nucleus.mass;
  },

  collectDust: function(nucleus, band) {
    var sweptInner = nucleus.innerSweptLimit(),
        sweptOuter = nucleus.outerSweptLimit();

    if(!band) {
      return 0;
    }

    if (sweptInner < 0) {
      sweptInner = 0;
    }

    if (band.outer <= sweptInner || band.inner >= sweptOuter) {
      return 0
    };

    if (!band.dust) {
      return 0
    };

    var dustDensity = this.dustDensity,
        massDensity = DoleParams.massDensity(dustDensity, this.criticalMass, nucleus.mass),
        density = (!band.gas || nucleus.mass < this.criticalMass) ? dustDensity : massDensity,
        sweptWidth = sweptOuter - sweptInner,
        outside = sweptOuter - band.outer,
        inside = band.inner - sweptInner;

    if (outside < 0) {
      outside = 0;
    }
    if (inside < 0) {
      inside = 0;
    }

    var width = sweptWidth - outside - inside,
        term1 = 4 * Math.PI * nucleus.axis * nucleus.axis,
        term2 = (1 - nucleus.eccn * (outside - inside) / sweptWidth),
        volume = term1 * nucleus.reducedMargin() * width * term2;

    return volume * density;
  },

  coalescePlanetismals: function(planetismal) {
    for (var curr = this.planetHead; curr; curr = curr.next) {

      var dist = curr.axis - planetismal.axis,
          dist1 = null,
          dist2 = null;

      if(dist > 0) {
        dist1 = planetismal.outerEffectLimit() - planetismal.axis;
        dist2 = curr.axis - curr.innerEffectLimit();
      }
      else {
        dist1 = planetismal.axis - planetismal.innerEffectLimit();
        dist2 = curr.outerEffectLimit() - curr.axis;
      }

      if (Math.abs(dist) <= dist1 || Math.abs(dist) <= dist1) {
        this.coalesceTwoPlanets(curr, planetismal);
        return true;
      }
    }

    return false;
  },

  coalesceTwoPlanets: function(a, b) {
    console.log('Collide!!!!');
    // This needs to be able to create a double planet / moon combination
    var newMass = a.mass + b.mass,
        newAxis = newMass / ((a.mass / a.axis) + (b.mass / b.axis)),
        term1 = a.mass * Math.sqrt(a.axis * (1.0 - a.eccn * a.eccn)),
        term2 = b.mass * Math.sqrt(b.axis * (1.0 - b.eccn * b.eccn)),
        term3 = (term1 + term2) / (newMass * Math.sqrt(newAxis)),
        term4 = 1.0 - term3 * term3,
        newEccn = Math.sqrt(Math.abs(term4));

    a.mass = newMass;
    a.axis = newAxis;
    a.eccn = newEccn;
    a.gasGiant = a.gasGiant || b.gasGiant;
  },

  insertPlanet: function(tismal) {
    if(!this.planetHead) {
      this.planetHead = tismal;
    }
    else {
      if (tismal.axis < this.planetHead.axis) {
        tismal.next = this.planetHead;
        this.planetHead = tismal;
      }
      else {
        var prev = this.planetHead,
          curr = this.planetHead.next;

          while(curr && curr.axis < tismal.axis) {
            prev = curr;
            curr = curr.next;
          }

        tismal.next = curr;
        prev.next = tismal;
        // console.log(this.planetHead);
      }
    }

  }
});

module.exports = Accrete;
