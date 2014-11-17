module.exports = {
  round: function(number, places) {
    if (places == 0) {
      return Math.round(number);
    }

    places = places || 3;
    var factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  }
}
