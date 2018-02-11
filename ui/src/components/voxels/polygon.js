
module.exports = Polygon

function Polygon(vectors, direction) {

  const Vector = require('./vector.js')

  this.vectors = vectors

  this.zstack = function() {
    var z = 0

    vectors.forEach(v => z += v.z)

    return -z
  }

  this.normal = function() {
    let n = vectors[0].subtract(vectors[1]).cross(vectors[2].subtract(vectors[1]))

    if (direction) {
      return n
    }
    return n.invert()
  }

  this.rotate = function(rx, ry, rz) {
    vectors = vectors.map(v => v.rotate(rx, ry, rz))
    return this
  }

  this.draw = function(depth, context) {
    let t = this.normal().angle(Vector(-1, 0, -1))

    let v = Math.round(200 + Math.max(Math.cos(t) * 40, 0))

    context.fillStyle = `rgb(${v}, ${v}, ${v})`

    context.strokeStyle = 'white'
    context.beginPath()

    vectors.forEach(v => {
      context.lineTo(v.x / (v.z + depth) * depth, v.y / (v.z + depth) * depth)
    })

    context.closePath()
    context.fill()
    context.stroke()
  }
  return this
}
