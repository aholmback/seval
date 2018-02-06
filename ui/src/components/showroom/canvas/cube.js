import Vector from '../utils/vector.js'

(function() {
  const canvas = document.getElementById('canvas-cube')
  if (!canvas) { return }

  const context = canvas.getContext('2d')

  context.translate(canvas.width * .5, canvas.height * .5)

  const scale = 30

  const voxels = [
    [4, 4, 0],
    [4, 4, 1],
    [3, 4, 1],
    [3, 4, 2],
    [3, 3, 2],
    [3, 2, 2],
    [3, 1, 2],
    [3, 1, 1],
    [3, 1, 0],
    [2, 1, 0],
  ]

  const rotate = function(vector, rx, ry, rz) {
    vector = multiply(vector, [
      [1, 0, 0],
      [0, Math.cos(rx), -Math.sin(rx)],
      [0, Math.sin(rx), Math.cos(rx)],
    ])

    vector = multiply(vector, [
      [Math.cos(ry), 0, Math.sin(ry)],
      [0, 1, 0],
      [-Math.sin(ry), 0, Math.cos(ry)],
    ])

    vector = multiply(vector, [
      [Math.cos(rz), -Math.sin(rz), 0],
      [Math.sin(rz), Math.cos(rz), 0],
      [0, 0, 1],
    ])

    return vector
  }

  const getSpace = function(voxels) {
    var s = [0, 0, 0]
    voxels.forEach(voxel => {
      for(var i=0; i<3; i++) {
        s[i] = Math.max(s[i], voxel[i] * scale)
      }
    })
    return s
  }

  const space = getSpace(voxels)

  const multiply = function(v, m) {
    return new Vector(
      m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z,
      m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z,
      m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z,
    )
  }

  const sortPolygons = function(a, b) {
    var as = 0, bs = 0

    a.forEach(vector => {
      as += vector[2]*10 + vector[1] + vector[0]
    })
    b.forEach(vector => {
      bs += vector[2]*10 + vector[1] + vector[0]
    })

    if (as === bs) { return 0 }
    if (as < bs) { return 1 }
    if (as > bs) { return -1 }
  }

  const add = function(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
  }

  const draw = function(polygon) {
    var x, y

    context.fillStyle = 'white'
    context.strokeStyle = 'black'
    context.beginPath()

    polygon.forEach(v => {
      var vector = new Vector(v[0], v[1], v[2])
      vector = vector.multiply(scale)
      vector = vector.add(new Vector(-space[0], -space[1], -space[2]))
      vector = rotate(vector, 0, Math.PI/2, 0)
      x = vector.x / (vector.z + 420) * 420
      y = vector.y / (vector.z + 420) * 420
      context.lineTo(x, y)
    })

    context.closePath()
    context.fill()
    context.stroke()
  }

  const getPolygons = function(voxels) {
    let polygons = []
    var x, y, z

    voxels.forEach(voxel => {
      x = voxel[0]
      y = voxel[1]
      z = voxel[2]

      polygons.push([ [x, y, z], [x + 1, y, z], [x + 1, y + 1, z], [x, y + 1, z] ])
      polygons.push([ [x, y, z + 1], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x, y + 1, z + 1] ])

      polygons.push([ [x, y, z], [x + 1, y, z], [x + 1, y, z + 1], [x, y, z + 1] ])
      polygons.push([ [x, y + 1, z], [x + 1, y + 1, z], [x + 1, y + 1, z + 1], [x, y + 1, z + 1] ])

      polygons.push([ [x, y, z], [x, y, z + 1], [x, y + 1, z + 1], [x, y + 1, z] ])
      polygons.push([ [x + 1, y, z], [x + 1, y, z + 1], [x + 1, y + 1, z + 1], [x + 1, y + 1, z] ])
    })

    return polygons
  }

  getPolygons(voxels).sort(sortPolygons).forEach(draw)

}())
