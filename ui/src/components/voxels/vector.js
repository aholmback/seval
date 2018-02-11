const Polygon = require('./polygon.js')

module.exports = Vector

function Vector(x, y, z) {
  this.x = x
  this.y = y
  this.z = z

  this.invert = function() {
    return new Vector(-x, -y, -z)
  }

  this.multiply = function(v) {
    if(v instanceof Vector) {
      return new Vector(x * v.x, y * v.y, z * v.z)
    } else {
      return new Vector(x * v, y * v, z * v)
    }
  }

  this.divide = function(v) {
    if(v instanceof Vector) {
      return new Vector(x / v.x, y / v.y, z / v.z)
    } else {
      return new Vector(x / v, y / v, z / v)
    }
  }

  this.add = function(v) {
    if(v instanceof Vector) {
      return new Vector(x + v.x, y + v.y, z + v.z)
    } else {
      return new Vector(x + v, y + v, z + v)
    }
  }

  this.subtract = function(v) {
    if(v instanceof Vector) {
      return new Vector(x - v.x, y - v.y, z - v.z)
    } else {
      return new Vector(x - v, y - v, z - v)
    }
  }

  this.transform = function(m) {
    return new Vector(
      m[0][0] * x + m[0][1] * y + m[0][2] * z,
      m[1][0] * x + m[1][1] * y + m[1][2] * z,
      m[2][0] * x + m[2][1] * y + m[2][2] * z,
    )
  }

  this.cross = function(v) {
    return new Vector(y * v.z - z * v.y, z * v.x - x * v.z, x * v.y - y * v.x)
  }

  this.dot = function(v) {
    return x * v.x + y * v.y + z * v.z
  }

  this.length = function() {
    return Math.sqrt(x*x + y*y + z*z)
  }

  this.angle = function(v) {
    return Math.acos(this.dot(v)/(this.length()*v.length()))
  }

  this.rotate = function(rx, ry, rz) {
    return this.transform([
      [1, 0, 0],
      [0, Math.cos(rx), -Math.sin(rx)],
      [0, Math.sin(rx), Math.cos(rx)],
    ]).transform([
      [Math.cos(ry), 0, Math.sin(ry)],
      [0, 1, 0],
      [-Math.sin(ry), 0, Math.cos(ry)],
    ]).transform([
      [Math.cos(rz), -Math.sin(rz), 0],
      [Math.sin(rz), Math.cos(rz), 0],
      [0, 0, 1],
    ])
  }

  this.voxel = function(w) {
    w = w | 1

    let cube = [
      [ [x, y, z + w], [x + w, y, z + w], [x + w, y + w, z + w], [x, y + w, z + w] ], // Back
      [ [x, y, z], [x + w, y, z], [x + w, y + w, z], [x, y + w, z] ], // Front
      [ [x, y, z], [x + w, y, z], [x + w, y, z + w], [x, y, z + w] ], // Top
      [ [x, y + w, z], [x + w, y + w, z], [x + w, y + w, z + w], [x, y + w, z + w] ], // Bottom
      [ [x, y, z], [x, y, z + w], [x, y + w, z + w], [x, y + w, z] ], // Left
      [ [x + w, y, z], [x + w, y, z + w], [x + w, y + w, z + w], [x + w, y + w, z] ], // Right
    ]

    let polygons = []
    for(var i=0; i < cube.length; i++) {
      for(var j=0; j < cube[i].length; j++) {
        cube[i][j] = new Vector(cube[i][j][0], cube[i][j][1], cube[i][j][2])
      }
      polygons.push(new Polygon(cube[i], i%2))
    }

    return polygons
  }

  return this
}
