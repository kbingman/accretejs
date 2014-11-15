var expect = require('chai').expect;
var Alea = require('alea');
var System = function(){

  var _prng = new Alea(1);

  return {
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

  });

});
