const _ = require('lodash')

module.exports = function(vectors) {

  vectors = _.cloneDeep(vectors)

  vectors.transpose = function(map) {
    var e, n

    for (n = 0; n < vectors.length; n++) {
      for (e = 0; e < 3; e++) {
        vectors[n][e] += map[e]
      }
    }

    return vectors
  }

  vectors.transform = function(map) {
    var e, m, n, sum

    for (n = 0; n < vectors.length; n++) {
      for (e = 0; e < 3; e++) {
        sum = 0
        for (m = 0; m < 3; m++) {
          sum += map[m] * vectors[n][e]
        }
        vectors[n][e] = sum
      }
    }

    return vectors
  }

  return vectors
}
