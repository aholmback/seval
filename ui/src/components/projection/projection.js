const Animation = require('./animation.js')
const Cube = require('./cube.js')
const linear = require('./linearmap.js')


class Projection {
  constructor(id) {
    this.animation = new Animation(id)
    this.animation.observe(Animation.events.repaint, this.repaint.bind(this))
    this.cube = new Cube()
  }

  start() {
    this.animation.start()
  }

  repaint(event, context, timestamp) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    let polygons = []

    this.cube.polygons().forEach(polygon => {
      polygon = linear(polygon)
        .transform([100, 0, 0, 0, 100, 0, 0, 0, 100])
        .transpose([100, 100, 100])
      polygons.push(polygon)
    })

    polygons.forEach(polygon => {
      context.beginPath()

      polygon.forEach(vector => {
        context.lineTo(vector[0], vector[1])
      })

      context.closePath()
      context.stroke()
    })
  }
}

new Projection('projection').start()
