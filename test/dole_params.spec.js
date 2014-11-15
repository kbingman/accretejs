var expect = require('chai').expect;
var DoleParams = require('../src/dole_params');

var planet = {
  axis: 0.32526239259168505,
  eccn: 0.12527582726552988,
  mass: 1.1526143566158224e-7,
  gasGiant: false
}

describe('DoleParams', function(){

  it('should be defined', function() {
    expect(DoleParams).to.be.defined;
  });

});
