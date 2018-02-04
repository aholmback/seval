(function() {
  const canvas = document.getElementById('canvas-touch')
  if (!canvas) { return }

  const context = canvas.getContext('2d')
  var x, y

  context.lineCap = 'round'
  context.strokeStyle = 'rgba(0, 0, 0, 0.2)'

  const draw = function(e) {
    context.beginPath()
    context.lineTo(x, y)
    x = e.clientX - this.offsetLeft
    y = e.clientY - this.offsetTop
    context.lineTo(x, y)
    context.stroke()
  }

  const stop = function(e) {
    canvas.onmousemove = undefined
  }

  const start = function(e) {
    canvas.onmouseup = canvas.onmouseout = stop
    canvas.onmousemove = draw
  }


  canvas.onmousedown = start
}())
