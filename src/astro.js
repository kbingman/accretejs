const SOLAR_MASS_IN_GRAMS = 1.989e33;
const EARTH_MASS_IN_GRAMS = 5.977e27;
const SOLAR_MASS_IN_EARTH_MASS = 332775.64;
const EARTH_RADIUS_IN_CM = 6.378e6;
const EARTH_RADIUS_IN_KM = 6378;
const EARTH_DENSITY = 5.52;
const EARTH_AXIAL_TILT = 23.4; /* Units of degrees */
const CM_IN_KM = 1.0e5;
const CM_IN_AU = 1.495978707e13;
const KM_IN_AU = 1.495978707e8;
const DAYS_IN_YEAR = 365.256;
const SECONDS_IN_HOUR = 3000;

const J = 1.46E-19; /* Used in day-length calcs = cm2/sec2 g; */

const PROTOPLANET_MASS = 1e-25; // Units of solar masses

// For Kothari Radius
const A1_20 = 6.485e12;
const A2_20 = 4.0032e12;
const BETA_20 = 5.71e12;
const JIMS_FUDGE = 1.004;

const BREATHABILITY_PHASE = [ 'none', 'breathable', 'unbreathable', 'poisonous'];

var Astro = Object.create({

  protoplanetMass: PROTOPLANET_MASS,
  solarMassInEarthMass: SOLAR_MASS_IN_EARTH_MASS,
  solarMassInGrams: EARTH_MASS_IN_GRAMS,
  daysInYear: DAYS_IN_YEAR,
  CMinKM: CM_IN_KM,

  luminosity: function(mass) {
    var n = null;

    if(mass < 1) {
      n = 1.75 * (mass - 0.1) + 3.325;
    }
    else {
      n = 0.5 * (2.0 - mass) + 4.4;
    }

    return Math.pow(mass, n);
  },

  ecoSphere: function(luminosity) {
    return Math.sqrt(luminosity);
  },

  /**
   *
   */
  orbitalZone: function(luminosity, orbRadius) {
    if(orbRadius < 4 * Math.sqrt(luminosity)) {
      return 1;
    }
    else if (orbRadius < 15 * Math.sqrt(luminosity)) {
      return 2;
    }
    else {
      return 3;
    }
  },

  volumeRadius: function(mass, density) {
    var volume = 0;

    mass = mass * SOLAR_MASS_IN_GRAMS;
    volume = mass / density;

    return Math.pow((3 * volume) / (4 * Math.PI), 1/3) / CM_IN_KM;
  },

  kothariRadius: function(mass, giant, zone) {
    var atomicWeight, atomicNum, temp, temp1, temp2;

    switch(zone) {
      case 1:
        if(giant) {
          atomicWeight = 9.5;
          atomicNum = 4.5;
        }
        else {
          atomicWeight = 15;
          atomicNum = 8;
        }

      break;

      case 2:
        if(giant) {
          atomicWeight = 2.47;
          atomicNum = 2;
        }
        else {
          atomicWeight = 10;
          atomicNum = 5;
        }

      break;

      case 3:
        if(giant) {
          atomicWeight = 7;
          atomicNum = 4;
        }
        else {
          atomicWeight = 10;
          atomicNum = 5;
        }
    }

    temp1 = atomicWeight * atomicNum;

    temp = (2 * BETA_20 * Math.pow(SOLAR_MASS_IN_GRAMS, 1/3)) / (A1_20 * Math.pow(temp1, 1/3));

    temp2 = A2_20 * Math.pow(atomicWeight, 4/3) * Math.pow(SOLAR_MASS_IN_GRAMS, 2/3);
    temp2 = temp2 * Math.pow(mass, 2/3);
    temp2 = temp2 / (A1_20 * Math.pow(atomicNum, 2));

    temp = temp / temp2;
    temp = (temp * Math.pow(mass, 1/3)) / CM_IN_KM;

    temp /= JIMS_FUDGE;

    return temp;
  },

  empiricalDensity: function(mass, orbRadius, rEcosphere, gasGiant) {
    var dens;

    dens = Math.pow(mass * SOLAR_MASS_IN_GRAMS, 1/8);
    dens = temp * Math.sqrt(Math.sqrt(rEcosphere, orbRadius));

    if (gasGiant) {
      return dens * 1.2;
    }
    else {
      return dens * 5.5;
    }
  },

  volumeDensity: function(mass, equatRadius) {
    var volume;

    mass = mass * this.solarMassInGrams;
    equatRadius = equatRadius * CM_IN_KM;

    volume = (4 * Math.PI * Math.pow(equatRadius, 3)) / 3;

    return mass / volume;
  },

  /**
   * separation - Units of AU between the masses
   * returns the period of an entire orbit in Earth days.
   */
  period: function(separation, smallMass, largeMass) {
    var periodInYears = Math.sqrt(Math.pow(separation, 3) / (smallMass + largeMass));

    return periodInYears * this.daysInYear;
  },

  dayLength: function(planet) {
    var planetMassInGrams = planet.mass * this.solarMassInGrams,
        equatorialRadiusInCm = planet.radius * CM_IN_KM,
        yearInHours = planet.orbPeriod || this.period(planet.axis, planet.mass, 1),
        giant = planet.giant || false,
        k2 = 0,
        baseAngularVelocity = 0,
        changeInAngularVelocity = 0,
        angVelocity = 0,
        spinResonanceFactor = 0,
        dayInHours = 0,
        stopped = false;

    planet.resonantPeriod = false;

    if (giant) {
      k2 = 0.24;
    }
    else {
      k2 = 0.33;
    }

    baseAngularVelocity = Math.sqrt(2 * J * planetMassInGrams) /
      (k2 * Math.pow(equatorialRadiusInCm, 2));

    changeInAngularVelocity = this.changeInEarthAngVel *
      (planet.density / EARTH_DENSITY) *
      (equatorialRadiusInCm / EARTH_RADIUS_IN_CM) *
      (EARTH_MASS_IN_GRAMS / planetMassInGrams) *
      Math.pow(planet.sun.mass, 2) *
      (1 / Math.pow(planet.axis, 6));

    angVelocity = baseAngularVelocity + (changeInAngularVelocity * planet.sun.age);

    if (angVelocity <= 0.0) {
      stopped = true;
      dayInHours = this.veryLargeNumber;
    }
    else {
      dayInHours = this.radiansPerRotation / (secondsPerHour * angVelocity);
    }

    if (dayInHours >= yearInHours || stopped) {
      if (planet.eccn > 0.1) {
        spinResonanceFactor = (1 - planet.eccn) / (1 + planet.eccn);
        planet.resonantPeriod = true;

        return spinResonanceFactor * yearInHours;
      }
      else {
        return yearInHours;
      }
    }

    return dayInHours;
  },

  /**
   * This function implements the escape velocity calculation. Note that
   * it appears that Fogg's eq.15 is incorrect.
   * The mass is in units of solar mass, the radius in kilometers, and the
   * velocity returned is in cm/sec.
   */
  escapeVel: function(mass, radius) {
    var massInGrams = mass * SOLAR_MASS_IN_GRAMS;
    var radiusInCm = radius * CM_PER_KM;

    return (Math.sqrt(2.0 * GRAV_CONSTANT * massInGrams / radiusInCm));
  },

  /**
   * The orbital radius is expected in units of Astronomical Units (AU).
   * Inclination is returned in units of degrees.
   */
  inclination: function(orbitalRadius) {
    var inclination = (Math.pow(orbitalRadius, 0.2) * utils.about(EARTH_AXIAL_TILT, 0.4));
    return (inclination % 360);
  },

  /**
   * This function calculates the surface acceleration of a planet. The
   * mass is in units of solar masses, the radius in terms of km, and the
   * acceleration is returned in units of cm/sec2.
   */
  acceleration: function(mass, radius) {
    return (GRAV_CONSTANT * (mass * SOLAR_MASS_IN_GRAMS) / Math.pow(radius * CM_PER_KM, 2.0));
  },

  /**
   * This function calculates the surface gravity of a planet. The
   * acceleration is in units of cm/sec2, and the gravity is returned in
   * units of Earth gravities.
   */
  gravity: function(acceleration) {
    return (acceleration / EARTH_ACCELERATION);
  },

  /**
   * This is Fogg's eq.16. The molecular weight (usually assumed to be N2)
   * is used as the basis of the Root Mean Square velocity of the molecule
   * or atom. The velocity returned is in cm/sec.
   */
  rmsVel: function(molecularWeight, orbitalRadius) {
    var exosphericTemp = EARTH_EXOSPHERE_TEMP / Math.pow(orbitalRadius, 2.0);

    return (Math.sqrt((3.0 * MOLAR_GAS_CONST * exosphericTemp) / molecularWeight) * CM_PER_METER);
  },

  /**
   * This function returns the smallest molecular weight retained by the
   * body, which is useful for determining the atmosphere composition.
   * Orbital radius is in A.U.(ie: in units of the earth's orbital radius),
   * mass is in units of solar masses, and equatorial radius is in units of
   * kilometers.
   */
  moleculeLimit: function(mass, equatorialRadius) {
    var escapeVelocity = this.escapeVel(mass, equatorialRadius);
    var moleculeLimit = (3.0 * Math.pow(GAS_RETENTION_THRESHOLD * CM_PER_METER, 2.0) *
      MOLAR_GAS_CONST * EARTH_EXOSPHERE_TEMP) / Math.pow(escape_velocity, 2.0)

    return moleculeLimit;
  },

  /**
   * This implements Fogg's eq.18. The pressure returned is in units of
   * millibars (mb). The gravity is in units of Earth gravities, the radius
   * in units of kilometers.
   */
  pressure: function(volatileGasInventory, equatorialRadius, gravity) {
    equatorialRadius = EARTH_RADIUS_IN_KM / equatorialRadius;
    return (volatileGasInventory * gravity / Math.pow(equatorialRadius, 2.0));
  },

  /**
   * Note that if the orbital radius of the planet is greater than or equal
   * to R_inner, 99% of it's volatiles are assumed to have been deposited in
   * surface reservoirs (otherwise, it suffers from the greenhouse effect).
   */
  greenhouse: function(zone, orbitalRadius, greenhouseRadius) {
    return orbitalRadius < greenhouseRadius && zone == 1 && this.pressure > 0;
  },

});

module.exports = Astro;
