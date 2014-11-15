module.exports = {
  round: function(number, places) {
    places = places || 3;
    var factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  }
}
