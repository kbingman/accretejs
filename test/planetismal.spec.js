var expect = require('chai').expect;
var Planetismal = require('../src/planetismal');

describe('Planetismal',function(){

  describe('creating a planetismal',function(){

    it('should return the default value for gasGiant', function(){
      var planetismal = new Planetismal({
        axis: 0.1,
        eccn: 0.001
      });
      expect(planetismal.gasGiant).to.be.false;
    });

    it('should return mass if given', function(){
      var planetismal = new Planetismal({
        axis: 0.1,
        mass: 1,
        eccn: 0.001
      });
      expect(planetismal.mass).to.equal(1);
    });

    it('should return the mass in earth masses', function(){
      var planetismal = new Planetismal({
        axis: 0.1,
        mass: 1.1526143566158224e-7,
        eccn: 0.001
      });
      expect(planetismal.getEarthMass()).to.equal(0.038356198019601856);
    });

  });

});
