var Accrete = require('./src/accrete.js');

var seed = 2000;

var start = +new Date();
var gen = new Accrete('hello42');
var sys = gen.distributePlanets(1.2);

console.log(+new Date() - start);
console.log(sys.planets.length);

sys.planets.forEach(function(planet, i) {
  console.log(planet.axis, planet.mass, planet.gasGiant);
});


// for(var p in sys.planets) {
//   // var au = Math.log(sys[p].axis + 1) / Math.log(10),
//   //     rad = Math.pow(sys[p].getEarthMass(), 1/3);
//
//   console.log(sys[p].axis, sys[p].getEarthMass())
// }

// Planetismal curr = (Planetismal)e.nextElement();
//             double au = log10(curr.getOrbitalAxis());
//             double rad = Math.pow(curr.getMassEarth(), 1.0/3.0);
//             int r = (int)(rad * (double)rscale);
//             int x0 = (int)(au * (double)hscale);
//             int x = x0 + hscale - r;
//             int y = vscale - r;
//             if (curr.isGasGiant())
//                 g.drawOval(x, y, 2*r, 2*r);
//             else
//                 g.fillOval(x, y, 2*r, 2*r);
//         }
