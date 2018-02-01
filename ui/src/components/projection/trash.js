const Animation = require('./animation.js')
const animation = new Animation('projection')


class SampleBox {
  render(lm) {
    new Compass().render(lm)
    new Cube().render(lm)
  }
}

class Compass {
  constructor(context) {
    this.parameters = {
      x: {
        color: '#F06',
        label: {
          position: [30, 0, 0],
          text: 'X',
        },
        start: [0, 0, 0],
        end: [20, 0, 0],
      },
      y: {
        color: '#F90',
        label: {
          position: [0, 30, 0],
          text: 'Y',
        },
        start: [0, 0, 0],
        end: [0, 20, 0],
      },
      z: {
        color: '#09C',
        label: {
          position: [0, 0, 30],
          text: 'Z',
        },
        start: [0, 0, 0],
        end: [0, 0, 20],
      }
    }
  }

  render(lm) {
    this.renderAxis(this.parameters.x, lm)
    this.renderAxis(this.parameters.y, lm)
    this.renderAxis(this.parameters.z, lm)
  }

  renderAxis(axis, lm) {
    context.save();
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    var labelPosition = lm.map(axis['label']['position'])
    var start = lm.map(axis['start'])
    var end = lm.map(axis['end'])

    context.textBaseline = 'middle';
    context.textAlign = 'center';

    context.strokeStyle = axis['color'];
    context.fillStyle = axis['color'];

    context.fillText(axis['label']['text'], labelPosition[0], labelPosition[1]);
    context.beginPath();
    context.moveTo(start[0], start[1])
    context.lineTo(end[0], end[1]);
    context.stroke();
    context.restore();
  }
}


class Polygon {
  constructor(context, vectors) {
    this.context = context
    this.vectors = vectors.slice()

    let scale = new LinearMap([30, 0, 0, 0, 30, 0, 0, 0, 30])
    this.transform(scale.map.bind(scale))
  }

  transform(map) {
    for (var i = 0; i < this.vectors.length; i++) {
      this.vectors[i] = map(this.vectors[i])
    }
    return this
  }

  render() {

    this.context.beginPath();

    for (var j = 0; j < this.vectors.length; ++j) {
      context.lineTo(this.vectors[j][0], this.vectors[j][1]);
    }

    context.closePath();
    context.stroke();
  }
}


animation.observe(animation.events.repaint, function(event, context, timestamp) {

	context.clearRect(- context.canvas.width / 2, - context.canvas.height / 2, context.canvas.width, context.canvas.height)


  var lm = new LinearMap()
  var t = (timestamp || 0) / 1000
  var a = Math.cos(t)
  var b = Math.sin(t)


  var rotateX = (v) => {
    return [
      1, 0, 0,
      0, a,-b,
      0, b, a,
    ]
  }

  var rotateY = (v) => {
    return [
      a, 0, b,
      0, 1, 0,
     -b, 0, a,
    ]
  }

  var skewZ = (v) => {
    return [
      1, 0, 0,
      0, 1, 0,
      0, 0, 1,
    ]
  }

  lm.transform(rotateY)
  lm.transform(rotateX)

  lm.transform(skewZ)

  new SampleBox().render(lm)

});

animation.start()
