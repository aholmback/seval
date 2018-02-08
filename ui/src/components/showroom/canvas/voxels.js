const Vector = require('./vector.js')
const Polygon = require('./polygon.js')

let voxels = require('./voxelsamples.js')
let c = Canvas('canvas-cube', voxels.h)

if (c) c.start()

function Block(voxels, scale) {

  var x = 0, y = 0, z = 0

  voxels.forEach(v => {
    x = Math.max(x, v[0] + 1)
    y = Math.max(y, v[1] + 1)
    z = Math.max(z, v[2] + 1)
  })

  this.polygons = []

  for(var i = 0; i < voxels.length; i++) {
    this.polygons = this.polygons.concat(
      Vector(voxels[i][0], voxels[i][1], voxels[i][2])
        .add(Vector(x, y, z).divide(2).invert())
        .multiply(scale / x)
        .voxel(scale / x)
    )
  }
  return this
}

function Canvas(id, voxels) {
  let element = document.getElementById(id)
  if (!element) return

  this.play = true

  let context = element.getContext('2d')

  element.onclick = toggleplay.bind(this)

  context.translate(element.width * .5, element.height * .5)

  let block = Block(voxels, element.width/4)

  function toggleplay() {
    if(!this.play) {
      this.start()
    }
    this.play = !this.play
  }

  function repaint(m) {
    if (this.play) {
      window.requestAnimationFrame(repaint)
    }

    context.clearRect(-element.width/2, -element.height/2, element.width, element.height)

    block.polygons
      .map(p => p.rotate(.01, Math.sin(m*0.001)* .01, .02))
      .sort((a, b) => a.zstack() - b.zstack())
      .forEach(p => p.draw(element.width, context))
  }

  this.start = function() {
    window.requestAnimationFrame(repaint)
  }
  return this
}
