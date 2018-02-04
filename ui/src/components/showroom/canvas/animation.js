import Victor from 'victor'

(function() {
  const canvas = document.getElementById('canvas-animation')
  if (!canvas) { return }

  const context = canvas.getContext('2d')
  const g = 0.1
  const f = 1
  const normals = {
    top: Victor(0, 1),
    bottom: Victor(0, -1),
    left: Victor(1, 0),
    right: Victor(-1, 0),
  }

  const collision = function(self, other) {
    var t, n, d, s

    d = self.position.distance(other.position) - (self.r + other.r)

    if (d < 0) {
      n = self.position.clone().subtract(other.position).normalize()
      t = self.velocity.dot(n)
      self.velocity.add(Victor(-2 * t, -2 * t).multiply(n))

    }
  }

  const next = function(self) {
    var t

    // höjre
    if (self.position.x + self.r >= canvas.width) {
      t = -2 * self.velocity.dot(normals.right)
      self.velocity.add(Victor(t, t).multiply(normals.right))
    }

    // left
    if (self.position.x <= self.r) {
      t = -2 * self.velocity.dot(normals.left)
      self.velocity.add(Victor(t, t).multiply(normals.left))
    }

    // top
    if (self.position.y <= self.r) {
      t = -2 * self.velocity.dot(normals.top)
      self.velocity.add(Victor(t, t).multiply(normals.top))
    }

    // bottom
    if (self.position.y + self.r >= canvas.height) {
      t = -2 * self.velocity.dot(normals.bottom)
      self.velocity.add(Victor(t, t).multiply(normals.bottom))
    }

    self.position.add(self.velocity)
  }

  const draw = function(self, context) {
    context.arc(self.position.x, self.position.y, self.r, 0, Math.PI * 2)
    context.fill()
  }

  const a = {
    velocity: Victor(5, 5),
    position: Victor(canvas.width / 2 - 100, canvas.height / 2),
    r: 40,
    next: next,
    draw: draw,
    collision: collision,
  }
  
  const b = {
    velocity: Victor(1, -5),
    position: Victor(canvas.width / 2 + 100, canvas.height / 2),
    r: 40,
    next: next,
    draw: draw,
    collision: collision,
  }

  const repaint = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()

    a.next(a)
    b.next(b)

    a.collision(a, b)

    a.draw(a, context)
    b.draw(b, context)

    window.requestAnimationFrame(repaint)

  }
  window.requestAnimationFrame(repaint)
}())
