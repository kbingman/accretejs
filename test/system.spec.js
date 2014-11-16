var expect = require('chai').expect;
var Alea = require('alea');
var System = function(mass){

  var _prng = new Alea(1);
  var _mass = mass;

  return {
    mass: _mass,
    distributePlanets: function() {
      return _prng();
    }
  }

}

describe('System', function(){

  describe('init', function(){

    it('should create a regular random number', function(){
      var system = System();
      expect(system.distributePlanets()).to.be.equal(0.526047095656395);
    });

    it('should update the mass', function(){
      var system = System(1);
      system.mass = 2;
      expect(system.mass).to.be.equal(2);
    });

  });

});
