var DustBands = function(inner, outer) {

  var bands = [];
  var dustHead = addBand(inner, outer);

  // OPTIONAL: after (after which indice to insert)
  function addBand(min, max, dust, gas, after) {
    bands = this.bands || bands;
    var band = {
      inner: min,
      outer: max,
      dust: dust || true,
      gas: gas  || true
    }

    if (after != undefined) {
      bands.splice(after + 1, 0, band);
    } else {
      bands.push(band);
    }

    return band;
  }

  // 'Public' methods
  return {
    bands: bands,
    dustHead: dustHead,

    dustAvailable: function(inside, outside) {
      if (!this.dustHead) {
        return false;
      }

      return this.bands.reduce(function(memo, band) {
        if (band && band.inner < outside) {
          memo = band.dust;
        }
        return memo;
      }, false);
    },

    updateLanes: function(min, max, usedGas) {
      // console.log('update')
      this.bands.forEach(function(band, i) {
        var newGas = band.gas && !usedGas,
            first = null,
            second = null,
            next = band;

        if (band.inner < min && band.outer > max) {
          first = addBand(min, max, false, newGas, i);
          second = addBand(max, band.outer, band.dust, band.gas, i + 1);

          band.outer = min;

          next = second;
        }
        else if (band.inner < max && band.outer > max) {
          first = addBand(max, band.outer, band.dust, band.gas, i);

          band.outer = max;
          band.dust = false;
          band.gas = newGas;
          next = first;
        }
        else if (band.inner < min && band.outer > min) {
          first = addBand(min, band.outer, false, newGas, i);

          band.outer = min;
          next = first;
        }
        else if (band.inner >= min && band.outer <= max) {
          band.dust = false;
          band.gas = newGas;
          next = band;
        }
        else if (band.inner > max || band.outer < min) {
          next = band;
        }

      });
    },

    dustRemaining: function(innerBound, outerBound) {
      return this.bands.reduce(function(memo, band, i) {
        if (band.dust && band.outer >= innerBound && band.inner <= outerBound) {
          memo = true;
        }
        return memo;
      }, false);
    },

    compressLanes: function() {
      this.bands.forEach(function(band, i) {
        var next = bands[i + 1];

        if (next && band.dust == next.dust && band.gas == next.gas) {
          this.bands.splice(i + 1, 1);
        }
      }, this);
    },

    addBand: addBand

  }

};

module.exports = DustBands;
