var expect = require('chai').expect;
var DustBands = require('../src/dust_bands');
var mocks = require('./mocks/dust_bands');
var dustbands;

describe('DustBands',function(){

  beforeEach(function(){
    dustBands = new DustBands(0, 0.20490096560499152);
    dustBands.dustHead = dustBands.bands[0];
  });

  afterEach(function(){
    dustBands = null;
  });

  describe('creating dust bands',function(){

    it('should add the first band on creation',function(){
      expect(dustBands.bands.length).to.equal(1);
    });

    it('should add a dust band', function() {
      dustBands.addBand(0.47698999482704735, 0.6113505559966328);
      expect(dustBands.bands.length).to.equal(2);
    });

    it('should add a dust band at the correct index', function() {
      dustBands.addBand(mocks[1].inner, mocks[1].outer, mocks[1].dust, mocks[1].gas);
      dustBands.addBand(mocks[2].inner, mocks[2].outer, mocks[2].dust, mocks[2].gas, 1);
      dustBands.addBand(mocks[3].inner, mocks[3].outer, mocks[3].dust, mocks[3].gas);

      expect(dustBands.bands[2].inner).to.equal(mocks[2].inner);
      expect(dustBands.bands[2].outer).to.equal(mocks[2].outer);
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
      expect(dustBands.dustRemaining(0, 40)).to.equal(true);
    });

  });

  describe('compressing dust',function(){

    it('should compress the lanes', function() {
      dustBands.addBand(mocks[1].inner, mocks[1].outer, mocks[1].dust, mocks[1].gas);
      dustBands.addBand(mocks[2].inner, mocks[2].outer, mocks[2].dust, mocks[2].gas, 1);
      dustBands.addBand(mocks[3].inner, mocks[3].outer, mocks[3].dust, mocks[3].gas);

      dustBands.compressLanes();

      expect(dustBands.bands.length).to.equal(2);
    });

  });

  describe('updating dust',function(){

    beforeEach(function() {
      dustBands.addBand(mocks[1].inner, mocks[1].outer, mocks[1].dust, mocks[1].gas);
      dustBands.addBand(mocks[2].inner, mocks[2].outer, mocks[2].dust, mocks[2].gas, 1);
      dustBands.addBand(mocks[3].inner, mocks[3].outer, mocks[3].dust, mocks[3].gas);

      dustBands.updateLanes(0, 1, true);
    });

    it('should updateLanes the lanes with gas used', function() {
      expect(dustBands.bands[0].dust).to.equal(false);
      expect(dustBands.bands[1].dust).to.equal(true);
      expect(dustBands.bands[2].dust).to.equal(false);
    });

    it('should updateLanes the lanes without gas used', function() {
      expect(dustBands.bands[0].gas).to.equal(false);
      expect(dustBands.bands[1].gas).to.equal(true);
      expect(dustBands.bands[2].gas).to.equal(false);
    });

  });

});
