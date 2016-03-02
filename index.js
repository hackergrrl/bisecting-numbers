var NumBase = require('numbase')
var defined = require('defined')

function BisectingNumberSystem (chars) {
  if (!(this instanceof BisectingNumberSystem)) { return new BisectingNumberSystem(chars) }

  var chars = defined(chars, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')

  var numbase = new NumBase(chars)

  this.fromInteger = function (int) {
    return numbase.encode(int)
  }

  // a==b => 0, a<b => -1, a>b => 1
  this.compare = function (a, b) {
    if (a.indexOf('.') !== -1 || b.indexOf('.') !== -1) {
      var as = this.segments(a)
      var bs = this.segments(b)
      for (var i = 0; i < Math.min(as.length, bs.length); i++) {
        var result = this.compare(as[i], bs[i])
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

  // return a list of the .-delimited segments of a number
  this.segments = function (v) {
    return v.split('.')
  }

  this.inc = function (v) {
    // Increment the suffix only
    if (v.indexOf('.') !== -1) {
      return this.prefix(v) + this.inc(this.suffix(v))
    }

    return numbase.encode(parseInt(numbase.decode(v), 10) + 1)
  }

  this.dec = function (v) {
    // Decrement the suffix only
    if (v.indexOf('.') !== -1) {
      return this.prefix(v) + this.dec(this.suffix(v))
    }

    return numbase.encode(parseInt(numbase.decode(v), 10) - 1)
  }

  this.prefix = function (v) {
    if (v.indexOf('.') === -1) {
      return ''
    } else {
      return v.substring(0, v.lastIndexOf('.') + 1)
    }
  }

  this.suffix = function (v) {
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

module.exports = BisectingNumberSystem
