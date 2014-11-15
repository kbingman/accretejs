var expect = require('chai').expect;
var DustBands = require('../src/dust_bands');

describe('DustBands',function(){
  beforeEach(function(){
    dustBands = new DustBands(50, 100);
    dustBands.dustHead = dustBands.bands[0];
  });

  describe('creating dust bands',function(){

    it('should add the first band on creation',function(){
      expect(dustBands.bands.length).to.equal(1);
    });

    it('should add a dust band', function() {
      dustBands.addBand(210, 300);
      expect(dustBands.bands.length).to.equal(2);
    });

    it('should add a dust band at the correct index', function() {
      dustBands.addBand(210, 300);
      dustBands.addBand(400, 500, true, true, 0);

      expect(dustBands.bands[1].inner).to.equal(400);
      expect(dustBands.bands[1].outer).to.equal(500);
    });

  });

  describe('available dust',function(){

    it('should return true if there is available dust',function(){
      expect(dustBands.dustAvailable(0, 100)).to.equal(true);
    });

    it('should return false if there is no available dust',function(){
      expect(dustBands.dustAvailable(0, 0)).to.equal(false);
    });

  });

  describe('remaining dust',function(){

    it('should return true if there dust remaining', function() {
      expect(dustBands.dustRemaining(0, 90)).to.equal(true);
    });

    it('should return false if there no dust remaining', function() {
      expect(dustBands.dustRemaining(0, 40)).to.equal(false);
    });

  });

  describe('compressing dust',function(){

    it('should compress the lanes', function() {
      dustBands.addBand(210, 300);
      dustBands.addBand(400, 500);
      dustBands.compressLanes();

      expect(dustBands.bands.length).to.equal(2);
    });

  });

  describe('updating dust',function(){

    beforeEach(function() {
      dustBands.addBand(210, 300);
      dustBands.addBand(400, 500);
      dustBands.updateLanes(0, 900, true);
    })

    it('should updateLanes the lanes with gas used', function() {
      expect(dustBands.bands[0].dust).to.equal(false);
      expect(dustBands.bands[1].dust).to.equal(false);
      expect(dustBands.bands[2].dust).to.equal(false);
    });

    // it('should updateLanes the lanes without gas used', function() {
    //   expect(dustBands.bands[0].gas).to.equal(true);
    //   expect(dustBands.bands[1].gas).to.equal(true);
    //   expect(dustBands.bands[2].gas).to.equal(true);
    // });

  });

});
