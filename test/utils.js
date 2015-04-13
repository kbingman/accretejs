var expect = require('chai').expect;

function round(number, places) {
  if (places == 0) {
    return Math.round(number);
  }

  places = places || 3;
  var factor = Math.pow(10, places);
  return Math.round(number * factor) / factor;
}

function testValue(value, expected) {
  expect(round(value)).to.equal(expected);
  console.log(round(value));
}

module.exports = {

  round: round,
  testValue: testValue

}
