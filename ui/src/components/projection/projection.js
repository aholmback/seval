class LinearMap {
  constructor() {
    this._map = [1, 0, 0, 0, 1, 0, 0, 0, 1]
  }

  transform(map) {
    var newmap = [];
    for (var i = 0; i < 3; ++i) {
      for (var j = 0; j < 3; ++j) {
        var sum = 0;
        for (var k = 0; k < 3; ++k) {
          sum += this._map[i * 3 + k] * map[k * 3 + j]
        }
        newmap.push(sum)
      }
    }
    this._map = newmap
  }

  map(vector) {
    var newVector = [];
    for (var y = 0; y < 3; ++y) {
      var sum = 0;
      for (var x = 0; x < 3; ++x) {
        sum += vector[x] * this._map[y * 3 + x]
      }
      newVector.push(sum);
    }

    return newVector;
  }
}


class Animation {
  constructor(id) {
    this.events = {
      repaint: 'repaint',
    }
    this.observers = {}
  }

  start() {
    this.repaint()
  }

  observe(event, fn) {
    this.observers[event] = this.observers[event] || []
    this.observers[event].push(fn)
  }

  notify(event) {
    if (!this.observers[event]) {
      return
    }
    this.observers[event].forEach(fn => {
      fn(event)
    })
  }

  repaint(timestamp) {
    this.notify(this.events.repaint, timestamp)
    window.requestAnimationFrame(this.repaint.bind(this))
  }
}

var canvas = document.getElementById('projection');
var context = canvas.getContext('2d');

context.translate(canvas.width / 2, canvas.height / 2); // 0 should be in the centre
context.strokeStyle = '#999999';

var scale = 50;
var d = 0.001;
var t = 0;

var a = new Animation()


a.observe(a.events.repaint, function(timestamp) {

	context.clearRect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height)

	t += .01

  var lm = new LinearMap()

  var a = Math.cos(t)
  var b = Math.sin(t)
  var rotateX = [
    1.0, 0.0, 0.0,
    0.0,   a,  -b,
    0.0,   b,   a,
  ]

  var rotateY = [
      a, 0.0,   b,
    0.0, 1.0, 0.0,
     -b, 0.0,   a,
  ]

  lm.transform(rotateY)
  lm.transform(rotateX)

  new SampleBox().render(lm)

});

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

class Cube {
  constructor(context) {
    let corners = [
      [-1.0, -1.0, -1.0],
      [ 1.0, -1.0, -1.0],

      [-1.0, -1.0,  1.0],
      [ 1.0, -1.0,  1.0],

      [-1.0,  1.0, -1.0],
      [ 1.0,  1.0, -1.0],

      [-1.0,  1.0,  1.0],
      [ 1.0,  1.0,  1.0] 
    ]

    this.sides = [
      [
        corners[0], corners[1], corners[5], corners[4]
      ], // FRONT
      [
        corners[2], corners[3], corners[7], corners[6]
      ], // REAR
      [
        corners[0], corners[1], corners[3], corners[2]
      ], // BOTTOM
      [
        corners[4], corners[5], corners[7], corners[6]
      ], // TOP
      [
        corners[0], corners[2], corners[6], corners[4]
      ], // LEFT
      [
        corners[1], corners[3], corners[7], corners[5]
      ]  // RIGHT
    ]
  }

  render(lm) {
    this.sides.forEach(side => {
      new Polygon(context, side).transform(lm.map.bind(lm)).render();
    })
  }
}

class Polygon {
  constructor(context, vectors) {
    this.context = context
    this.vectors = vectors.slice()

    let scale = new LinearMap()
    scale.transform([30, 0, 0, 0, 30, 0, 0, 0, 30])
    this.transform(scale.map.bind(scale))
  }

  transform(map) {
    let vectors = this.vectors
    for (var i = 0; i < this.vectors.length; i++) {
      this.vectors[i] = map(this.vectors[i])
    }
    return this
  }

  render() {

    this.context.beginPath();

    this.context.moveTo(this.vectors[0][0], this.vectors[0][1])

    for (var j = 1; j < this.vectors.length; ++j) {
      context.lineTo(this.vectors[j][0], this.vectors[j][1]);
    }

    context.closePath();
    context.stroke();
  }
}

a.start()
