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
    var t, bounce, rel, w

    rel = self.position.clone().subtract(other.position)

    if (rel.length() < self.r + other.r) {
      rel.normalize()

      t = other.velocity.dot(rel) - self.velocity.dot(rel)
      bounce = Victor(t, t).multiply(rel)

      if (bounce.dot(rel) > 0) {
        self.velocity.add(bounce)
        other.velocity.subtract(bounce)
      }
    }
  }

  const next = function(self) {
    self.velocity.y = self.velocity.y + g
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
    position: Victor(canvas.width / 2 - 100, canvas.height / 2 - 100),
    r: 40,
    next: next,
    draw: draw,
  }
  
  const b = {
    velocity: Victor(0, 0),
    position: Victor(canvas.width / 2 + 100, canvas.height / 2 + 100),
    r: 40,
    next: next,
    draw: draw,
  }

  const repaint = function() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.beginPath()

    a.next(a)
    b.next(b)

    collision(a, b)

    a.draw(a, context)
    b.draw(b, context)

    window.requestAnimationFrame(repaint)

  }
  window.requestAnimationFrame(repaint)
}())
