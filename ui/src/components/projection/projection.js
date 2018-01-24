
function multiplyMatrices(m1, m2) {
  var elements = [];
  for (var i = 0; i < 3; ++i) {
    for (var j = 0; j < 3; ++j) {
      var sum = 0;
      for (var k = 0; k < 3; ++k) {
        sum += m2[i * 3 + k] * m1[k * 3 + j]
      }
      elements.push(sum)
    }
  }
  return new Mat3(elements)
}

function multiplayVector(m1, m2) {
  var elements = [];
  for (var y = 0; y < 3; ++y) {
    var sum = 0;
    for (var x = 0; x < 3; ++x) {
      sum += m1[x] * m2.element(x, y);
    }
    elements.push(sum);
  }

  return new Vec3(elements);
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


function Vec3(elements) {

  this.element = function(i) {
    return elements[i];
  };

  this.multiply = function(matrix) {
    return matrix.multiply(this);
  }
}

function drawPolygon(context, polygon, fx, fy) {
  context.beginPath();
  context.moveTo(fx(polygon.vertex(0)), -1 * fy(polygon.vertex(0)));
  for (var i = 1; i < polygon.count(); ++i) {
    context.lineTo(fx(polygon.vertex(i)), -1 * fy(polygon.vertex(i)));
  }
  context.closePath();
  context.stroke();
}


function drawLineFromVectors(context, a, b) {
  context.beginPath();
  context.moveTo(a.element(0), -1 * a.element(1));
  context.lineTo(b.element(0), -1 * b.element(1));
  context.stroke();
}

var modelVerts = [
  new Vertex(-1.0, -1.0, -1.0), // 0 FBL
  new Vertex( 1.0, -1.0, -1.0), // 1 FBR

  new Vertex(-1.0, -1.0,  1.0), // 2 RBL
  new Vertex( 1.0, -1.0,  1.0), // 3 RBR
  
  new Vertex(-1.0,  1.0, -1.0), // 4 FTL
  new Vertex( 1.0,  1.0, -1.0), // 5 FTR

  new Vertex(-1.0,  1.0,  1.0), // 6 RTL
  new Vertex( 1.0,  1.0,  1.0)  // 7 RTR
];

var modelPolygons = [
  new Polygon([
    modelVerts[0],
    modelVerts[1],
    modelVerts[5],
    modelVerts[4]
  ]), // FRONT
  new Polygon([
    modelVerts[2],
    modelVerts[3],
    modelVerts[7],
    modelVerts[6]
  ]), // REAR
  new Polygon([
    modelVerts[0],
    modelVerts[1],
    modelVerts[3],
    modelVerts[2]
  ]), // BOTTOM
  new Polygon([
    modelVerts[4],
    modelVerts[5],
    modelVerts[7],
    modelVerts[6]
  ]), // TOP
  new Polygon([
    modelVerts[0],
    modelVerts[2],
    modelVerts[6],
    modelVerts[4]
  ]), // LEFT
  new Polygon([
    modelVerts[1],
    modelVerts[3],
    modelVerts[7],
    modelVerts[5]
  ])  // RIGHT
];


function Vertex(x, y, z) {
  this.x = function() {
    return x;
  };

  this.y = function() {
    return y;
  };

  this.z = function() {
    return z;
  };
}

Vertex.transform = function(vertex, matrix) {
  return Vertex.fromVec3(
    matrix.multiply(
      Vertex.toVec3(vertex)
    )
  );
};

Vertex.toVec3 = function(vertex) {
  return new Vec3([vertex.x(), vertex.y(), vertex.z()]);
};

Vertex.fromVec3 = function(vector) {
  return new Vertex(vector.element(0), vector.element(1), vector.element(2));
};

function Polygon(vertices) {
  this.count = function() {
    return vertices.length;
  };

  this.vertex = function(i) {
    return vertices[i];
  };
}

function Mat3(elements) {

  this.elements = elements

  this.element = function(x, y) {
    return elements[y * 3 + x];
  };

  this.multiply = function(other) {
    if (other instanceof Vec3) {

      var elements = [];
      for (var y = 0; y < 3; ++y) {
        var sum = 0;
        for (var x = 0; x < 3; ++x) {
          sum += other.element(x) * this.element(x, y);
        }
        elements.push(sum);
      }

      return new Vec3(elements);
    } else {

      var elements = [];
      for (var z = 0; z < 3; ++z) {
        for (var y = 0; y < 3; ++y) {
          var sum = 0;
          for (var x = 0; x < 3; ++x) {
            sum += other.element(y, x) * this.element(x, z);
          }
          elements.push(sum);
        }
      }

      return new Mat3(elements);
    }
  };
}

Mat3.identity = function() {
  return new Mat3([
    1.0, 0.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 1.0
  ]);
}

Mat3.rotationX = function(angle) {
  var a = Math.cos(angle);
  var b = Math.sin(angle);
  return new Mat3([
    1.0, 0.0, 0.0,
    0.0,   a,  -b,
    0.0,   b,   a,
  ]);
};

Mat3.rotationY = function(angle) {
  var a = Math.cos(angle);
  var b = Math.sin(angle);
  return new Mat3([
      a, 0.0,   b,
    0.0, 1.0, 0.0,
     -b, 0.0,   a,
  ]);
};


Mat3.rotationZ = function(angle) {
  var a = Math.cos(angle);
  var b = Math.sin(angle);
  return new Mat3([
      a,  -b, 0.0,
      b,   a, 0.0,
    0.0, 0.0, 1.0,
  ]);
};

Mat3.isometric = function(angle) {
  var a = Math.cos(angle);
  var b = Math.sin(angle);
  return new Mat3([
     a, 0, a,
    -b, 1, b,
     0, 0, 0
  ]);
};

a.observe(a.events.repaint, function(timestamp) {

	context.clearRect(- canvas.width / 2, - canvas.height / 2, canvas.width, canvas.height)

	t += .01

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

  var transform = multiplyMatrices(rotateX, rotateY)

	drawAxisIndicator(context, transform);

  drawPolygon2(context, modelPolygons, transform);
});


function drawPolygon2(context, modelPolygons, transform) {

  for (var i = 0; i < modelPolygons.length; ++i) {
    polygon = modelPolygons[i]
    context.beginPath();

    var vertexTransform = function(vertex, matrix) {
      var vector = multiplayVector( [vertex.x(), vertex.y(), vertex.z()], matrix)
      return [vector.element(0), vector.element(1), vector.element(2)]
    }

    var vertex = vertexTransform(modelPolygons[i].vertex(0), transform);

    context.moveTo(vertex[0] * scale, -1 * vertex[1] * scale);

    for (var j = 1; j < modelPolygons[i].count(); ++j) {
      vertex = vertexTransform(modelPolygons[i].vertex(j), transform);
      context.lineTo(vertex[0] * scale, -1 * vertex[1] * scale);
    }

    context.closePath();
    context.stroke();
  }
}

function drawAxisIndicator(context, matrix) {

  context.save();

  context.textBaseline = 'middle';
  context.textAlign = 'center';

  context.strokeStyle = '#F06';
  context.fillStyle = '#F06';

  var x = multiplayVector([30.0, 0.0, 0.0], matrix);

  context.fillText('X', x.element(0), -1 * x.element(1));
  drawLineFromVectors(
    context,
    multiplayVector([0.0, 0.0, 0.0], matrix),
    multiplayVector([20.0, 0.0, 0.0], matrix)
  );

  context.strokeStyle = '#F90';
  context.fillStyle = '#F90';

  var y = multiplayVector([0.0, 30.0, 0.0], matrix);
  context.fillText('Y', y.element(0), -1 * y.element(1));
  drawLineFromVectors(
    context,
    multiplayVector([0.0, 0.0, 0.0], matrix),
    multiplayVector([0.0, 20.0, 0.0], matrix)
  );

  context.strokeStyle = '#09C';
  context.fillStyle = '#09C';

  var z = multiplayVector([0.0, 0.0, 30.0], matrix);
  context.fillText('Z', z.element(0), -1 * z.element(1));
  drawLineFromVectors(
    context,
    multiplayVector([0.0, 0.0, 0.0], matrix),
    multiplayVector([0.0, 0.0, 20.0], matrix)
  );

  context.restore();
}

a.start()
