const VERBOSE = false;

const NULL = null;
const PI = Math.PI;
const TRUE = true;
const FALSE = false;

const PROTOPLANET_MASS = 1.0E-15; /* Units of solar masses */
const SOLAR_MASS_IN_GRAMS = 1.989E33; /* Units of grams */
const EARTH_MASS_IN_GRAMS = 5.977E27; /* Units of grams */
const EARTH_RADIUS = 6.378E6; /* Units of cm */
const EARTH_RADIUS_IN_KM = 6378.0; /* Units of km */
const EARTH_ACCELERATION = 981.0; /* Units of cm/sec2 */
const EARTH_AXIAL_TILT = 23.4; /* Units of degrees */
const EARTH_EXOSPHERE_TEMP = 1273.0; /* Units of degrees Kelvin */
const EARTH_MASSES_PER_SOLAR_MASS = 332775.64;
const EARTH_EFFECTIVE_TEMP = 255.0; /* Units of degrees Kelvin */
const EARTH_ALBEDO = 0.39;
const CLOUD_COVERAGE_FACTOR = 1.839E-8; /* Km2/kg */
const EARTH_WATER_MASS_PER_AREA = 3.83E15; /* grams per square km */
const EARTH_SURF_PRES_IN_MILLIBARS = 1000.0;
const EARTH_CONVECTION_FACTOR = 0.43; /* from Hart, eq.20 */
const FREEZING_POINT_OF_WATER = 273.0; /* Units of degrees Kelvin */
const DAYS_IN_A_YEAR = 365.256; /* Earth days per Earth year */

/* gas_retention_threshold = 6.0; *//* ratio of esc vel to RMS vel */

const GAS_RETENTION_THRESHOLD = 5.0; /* ratio of esc vel to RMS vel */
const GAS_GIANT_ALBEDO = 0.5; /* albedo of a gas giant */
const CLOUD_ALBEDO = 0.52;
const AIRLESS_ROCKY_ALBEDO = 0.07;
const ROCKY_ALBEDO = 0.15;
const WATER_ALBEDO = 0.04;
const AIRLESS_ICE_ALBEDO = 0.5;
const ICE_ALBEDO = 0.7;
const SECONDS_PER_HOUR = 3600.0;
const CM_PER_AU = 1.495978707E13; /* number of cm in an AU */
const CM_PER_KM = 1.0E5; /* number of cm in a km */
const CM_PER_METER = 100.0;
const MILLIBARS_PER_BAR = 1000.0;
const KELVIN_CELCIUS_DIFFERENCE = 273.0;
const GRAV_CONSTANT = 6.672E-8; /* units of dyne cm2/gram2 */
const GREENHOUSE_EFFECT_CONST = 0.93; /* affects inner radius.. */
const MOLAR_GAS_CONST = 8314.41; /* units: g*m2/=sec2*K*mol; */
const K = 50.0; /* K = gas/dust ratio */
const B = 1.2E-5; /* Used in Crit_mass calc */
const DUST_DENSITY_COEFF = 2.0E-3; /* A in Dole's paper */
const ALPHA = 5.0; /* Used in density calcs */
const N = 3.0; /* Used in density calcs */
const J = 1.46E-19; /* Used in day-length calcs =cm2/sec2 g; */
const INCREDIBLY_LARGE_NUMBER = 9.9999E37;

/* Now for a few molecular weights =used for RMS velocity calcs;: */
/* This table is from Dole's book "Habitable Planets for Man", p. 38 */
const ATOMIC_HYDROGEN = 1.0; /* H */
const MOLECULAR_HYDROGEN = 2.0; /* H2 */
const HELIUM = 4.0; /* He */
const ATOMIC_NITROGEN = 14.0; /* N */
const ATOMIC_OXYGEN = 16.0; /* O */
const METHANE = 16.0; /* CH4 */
const AMMONIA = 17.0; /* NH3 */
const WATER_VAPOR = 18.0; /* H2O */
const NEON = 20.2; /* Ne */
const MOLECULAR_NITROGEN = 28.0; /* N2 */
const CARBON_MONOXIDE = 28.0; /* CO */
const NITRIC_OXIDE = 30.0; /* NO */
const MOLECULAR_OXYGEN = 32.0; /* O2 */
const HYDROGEN_SULPHIDE = 34.1; /* H2S */
const ARGON = 39.9; /* Ar */
const CARBON_DIOXIDE = 44.0; /* CO2 */
const NITROUS_OXIDE = 44.0; /* N2O */
const NITROGEN_DIOXIDE = 46.0; /* NO2 */
const OZONE = 48.0; /* O3 */
const SULPHUR_DIOXIDE = 64.1; /* SO2 */
const SULPHUR_TRIOXIDE = 80.1; /* SO3 */
const KRYPTON = 83.8; /* Kr */
const XENON = 131.3; /* Xe */

/* The following defines are used in the kothari_radius function in */
/* file enviro.c. */
const A1_20 = 6.485E12; /* All units are in cgs system. */
const A2_20 = 4.0032E-8; /* ie: cm, g, dynes, etc. */
const BETA_20 = 5.71E12;

/* The following defines are used in determining the fraction of a planet */
/* covered with clouds in function cloud_fraction in file enviro.c. */
const Q1_36 = 1.258E19; /* grams */
const Q2_36 = 0.0698; /* 1/Kelvin */

// Units
const radians_per_rotation = 2.0 * PI;
