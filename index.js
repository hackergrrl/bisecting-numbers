var NumBase = require('numbase')
var defined = require('defined')

function BisectingNumberSystem (chars) {
  if (!(this instanceof BisectingNumberSystem)) { return new BisectingNumberSystem(chars) }

  var chars = defined(chars, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

  var numbase = new NumBase(chars)

  this.zero = function () {
    return chars.charAt(0)
  }

  // a==b => 0, a<b => -1, a>b => 1
  this.compare = function (a, b) {
    return compare(numbase, a, b)
  }

  this.inc = function (v) {
    // Increment the suffix only
    if (v.indexOf('.') !== -1) {
      return prefix(v) + this.inc(suffix(v))
    }

    return numbase.encode(parseInt(numbase.decode(v), 10) + 1)
  }

  this.dec = function (v) {
    // Decrement the suffix only
    if (v.indexOf('.') !== -1) {
      return prefix(v) + this.dec(suffix(v))
    }

    return numbase.encode(parseInt(numbase.decode(v), 10) - 1)
  }

  var prefix = function (v) {
    if (v.indexOf('.') === -1) {
      return ''
    } else {
      return v.substring(0, v.lastIndexOf('.') + 1)
    }
  }

  var suffix = function (v) {
    if (v.indexOf('.') === -1) {
      return v
    } else {
      return v.substring(v.lastIndexOf('.') + 1)
    }
  }

  this.bisect = function (v) {
    return v + '.' + chars.charAt(0)
  }
}

// return a list of the .-delimited segments of a number
function segments (v) {
  return v.split('.')
}

function compare (numbase, a, b) {
  if (a.indexOf('.') !== -1 || b.indexOf('.') !== -1) {
    var as = segments(a)
    var bs = segments(b)
    for (var i = 0; i < Math.min(as.length, bs.length); i++) {
      var result = compare(numbase, as[i], bs[i])
      if (result !== 0) {
        return result
      }
    }
    return as.length - bs.length
  } else {
    var av = parseInt(numbase.decode(a), 10)
    var bv = parseInt(numbase.decode(b), 10)
    if (av < bv) {
      return -1
    } else if (av > bv) {
      return 1
    } else {
      return 0
    }
  }
}

module.exports = BisectingNumberSystem
