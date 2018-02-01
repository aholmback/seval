module.exports = class Cube {
  polygons() {
    return Cube.sides
  }
}

let corners = module.exports.corners = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 0, 1],
  [1, 0, 1],
  [0, 1, 0],
  [1, 1, 0],
  [0, 1, 1],
  [1, 1, 1] 
]

module.exports.sides = [
  [ corners[0], corners[1], corners[5], corners[4] ],
  [ corners[2], corners[3], corners[7], corners[6] ],
  [ corners[0], corners[1], corners[3], corners[2] ],
  [ corners[4], corners[5], corners[7], corners[6] ],
  [ corners[0], corners[2], corners[6], corners[4] ],
  [ corners[1], corners[3], corners[7], corners[5] ]
]
