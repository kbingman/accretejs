var Alea = require('alea');

var Astro = require('./astro');
var DoleParams = require('./dole_params');
var DustBand = require('./dust_band');
var DustBands = require('./dust_bands');
var Planetismal = require('./planetismal');

function Accrete(seed) {
  var seed = seed || 1234;
  this.prng = new Alea(seed);
}

Accrete.prototype = Object.create({

  distributePlanets: function(stellarMass, stellarLuminosity) {

    // So the question is, do we do this as an object or not...
    var stellarMass = stellarMass || 1;
    var stellarLuminosity = stellarLuminosity || Astro.luminosity(stellarMass);
    var planetHead = null;

    var tismal, mass, planets, curr, dustDensity, criticalMass;
    var dustLeft = true;

    var dustBands = DustBands(DoleParams.innerDustLimit(stellarMass), DoleParams.outerDustLimit(stellarMass));
    // console.log(dustBands);

    while (dustLeft) {
      tismal = Planetismal({
        axis: (this.prng() * DoleParams.outermostPlanet(stellarMass)) + DoleParams.innermostPlanet(stellarMass),
        eccn: DoleParams.randomEccentricity(this.prng)
      });

      dustDensity = DoleParams.dustDensity(stellarMass, tismal.axis);
      criticalMass = DoleParams.criticalMass(tismal.axis, tismal.eccn, stellarLuminosity);
      // console.log(criticalMass)

      mass = this.accreteDust(tismal, dustBands.bands, criticalMass, dustDensity);

      if (mass != 0.0 && mass != Astro.protoplanetMass) {

        if (mass >= criticalMass) {
          tismal.gasGiant = true;
        }

        dustBands.updateLanes(DoleParams.innerSweptLimit(tismal), DoleParams.outerSweptLimit(tismal), tismal.gasGiant);

        dustLeft = dustBands.dustRemaining(DoleParams.innermostPlanet(stellarMass), DoleParams.outermostPlanet(stellarMass));

        dustBands.compressLanes();

        // var temp = this.coalescePlanetismals(tismal, planetHead);

        if(!this.coalescePlanetismals(tismal, planetHead)) {
          planetHead = this.insertPlanet(tismal, planetHead);
        }
      }
    }

    planets = [planetHead];
    curr = planetHead;

    while(curr = curr.next) {
      planets.push(curr);
    }

    return {
      planets: planets,
      star: {
        mass: stellarMass,
        luminosity: stellarLuminosity
      }
    };
  },

  /**
   * distribute_moon_masses does the same thing to a
   * planetary system as distribute_planetary_masses
   * does to the whole solar system.
   */
  // distributeMoonMasses: function(planet){
  //   // {
  //   //   planetaryMass
  //   //   planetEccentricity
  //   //   stellarLuminosityRatio
  //   //   outerDust
  //   //   innerDust
  //   // }
  //
  distributeMoons: function(planetaryMass, stellarLuminosity) {

    var moonHead = null;
    var tismal, mass, curr, moons, dustDensity, criticalMass;
    var dustLeft = true;

    var dustBands = DustBands(0, DoleParams.planetOuterDustLimit(planetaryMass));

    while (dustLeft) {
      tismal = Planetismal({
        axis: (this.prng() * DoleParams.outermostMoon(planetaryMass)) + DoleParams.innermostPlanet(planetaryMass),
        eccn: DoleParams.randomEccentricity(this.prng)
      });

      // console.log('innermost planet', DoleParams.innermostMoon(planetaryMass))
      // console.log('outermost planet', DoleParams.outermostMoon(planetaryMass))

      dustDensity = DoleParams.dustDensity(planetaryMass, tismal.axis);
      criticalMass = DoleParams.criticalMass(tismal.axis, tismal.eccn, stellarLuminosity);
      mass = this.accreteDust(tismal, dustBands.bands, criticalMass, dustDensity);

      if (mass != 0.0 && mass != Astro.protomoonMass) {

        if (mass >= criticalMass) {
          tismal.gasGiant = true;
        }

        dustBands.updateLanes(0, DoleParams.planetOuterSweptLimit(tismal.mass));

        dustLeft = dustBands.dustRemaining(DoleParams.innermostPlanet(planetaryMass), DoleParams.outermostPlanet(planetaryMass));

        dustBands.compressLanes();

        if (!this.coalescePlanetismals(tismal, moonHead) && tismal.mass > Astro.protomoonMass) {
          // console.log('coalescePlanetismals');
          // console.log(tismal);
          moonHead = this.insertPlanet(tismal, moonHead);
        }
      } else {
        // console.log('Break', +new Date());
        break;
      }
    }

    moons = [];
    if (moonHead) {
      curr = moonHead;
      while(curr = curr.next) {
        moons.push(curr);
      }
    }

    return moons;
  },

  // Planetismal: nucleus
  accreteDust: function(nucleus, bands, criticalMass, dustDensity) {
    var newMass = nucleus.mass;

    // TODO: Make sure that turning the original DO/WHILE
    // into a while didn't affect the outcome
    do {
      nucleus.mass = newMass;
      newMass = 0;

      bands.forEach(function(band, i) {
        newMass += this.collectDust(nucleus, band, criticalMass, dustDensity);
      }, this);
    }
    while (newMass - nucleus.mass > 0.0001 * nucleus.mass);

    nucleus.mass = newMass;

    return nucleus.mass;
  },

  collectDust: function(nucleus, band, criticalMass, dustDensity) {
    var sweptInner = DoleParams.innerSweptLimit(nucleus),
        sweptOuter = DoleParams.outerSweptLimit(nucleus);

    var massDensity, density, sweptWidth, outside, inside,
        width, term1, term2, volume;

    if(!band) {
      return 0;
    }

    if (sweptInner < 0) {
      sweptInner = 0;
    }

    if (band.outer <= sweptInner || band.inner >= sweptOuter) {
      return 0;
    };

    if (!band.dust) {
      return 0;
    };

    massDensity = DoleParams.massDensity(dustDensity, criticalMass, nucleus.mass);
    density = (!band.gas || nucleus.mass < criticalMass) ? dustDensity : massDensity;
    sweptWidth = sweptOuter - sweptInner;
    outside = sweptOuter - band.outer > 0 ? sweptOuter - band.outer : 0;
    inside = band.inner - sweptInner > 0 ? band.inner - sweptInner : 0;

    width = sweptWidth - outside - inside;
    term1 = 4 * Math.PI * nucleus.axis * nucleus.axis;
    term2 = (1 - nucleus.eccn * (outside - inside) / sweptWidth);
    volume = term1 * DoleParams.reducedMargin(nucleus.mass) * width * term2;

    return volume * density;
  },

  coalescePlanetismals: function(planetismal, planetHead) {
    for (var curr = planetHead; curr; curr = curr.next) {
      var dist = curr.axis - planetismal.axis,
          dist1 = null,
          dist2 = null;

      if(dist > 0) {
        dist1 = DoleParams.outerEffectLimit(planetismal) - planetismal.axis;
        dist2 = curr.axis - DoleParams.innerEffectLimit(curr);
      }
      else {
        dist1 = planetismal.axis - DoleParams.innerEffectLimit(planetismal);
        dist2 = DoleParams.outerEffectLimit(curr) - curr.axis;
      }

      if (Math.abs(dist) <= Math.abs(dist1) || Math.abs(dist) <= Math.abs(dist2)) {
        this.coalesceTwoPlanets(curr, planetismal);
        return true;
      }
    }

    return false;
  },

  coalesceTwoPlanets: function(a, b) {
    // console.log('Collide!!!!');
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

    // console.log(a)

    return a;
  },

  insertPlanet: function(tismal, planetHead) {
    var prev, curr;

    if(!planetHead) {
      return tismal;
    }

    if (tismal.axis < planetHead.axis) {
      tismal.next = planetHead;
      return tismal;
    }
    else {
      prev = planetHead;
      curr = planetHead.next;

      while(curr && curr.axis < tismal.axis) {
        prev = curr;
        curr = curr.next;
      }

      tismal.next = curr;
      prev.next = tismal;

      return planetHead;
    }

  }
});

module.exports = Accrete;
