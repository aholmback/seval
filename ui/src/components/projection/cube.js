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

