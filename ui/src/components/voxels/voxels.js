const Vector = require('./vector.js')
const Polygon = require('./polygon.js')

fetch('http://192.168.30.128:3000/voxels/').then(response => {
  return response.json()
}).then(body => {
  let c = Canvas('voxels', body.data.voxels)
  console.log(body.data.hash)
  console.log(body.data.voxels)
  if (c) c.start()
})


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
        .multiply(scale / Math.max(x, y, z))
        .voxel(scale / Math.max(x, y, z))
    )
  }
  return this
}

function Canvas(id, voxels) {
  let element = document.getElementById(id)
  if (!element) return

  this.play = true
  this.c = 0

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
    this.c ++

    if (this.play) {
      window.requestAnimationFrame(repaint)
    }

    context.clearRect(-element.width/2, -element.height/2, element.width, element.height)

    block.polygons
      .map(p => p.rotate(0.005, 0.005, 0.005))
      .sort((a, b) => a.zstack() - b.zstack())
      .forEach(p => p.draw(element.width, context))
  }

  this.start = function() {
    window.requestAnimationFrame(repaint)
  }
  return this
}
