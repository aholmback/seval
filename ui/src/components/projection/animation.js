module.exports = class Animation {
  constructor(id) {
    this.canvas = document.getElementById(id)
    this.context = this.canvas.getContext('2d')

    this.observers = {}

  }

  start() {
    window.requestAnimationFrame(this.repaint.bind(this))
  }

  observe(event, fn) {
    this.observers[event] = this.observers[event] || []
    this.observers[event].push(fn)
  }

  notify(event, timestamp) {
    if (!this.observers[event]) {
      return
    }

    this.observers[event].forEach(fn => {
      fn.apply(null, [event, this.context, timestamp])
    })
  }

  repaint(timestamp) {
    this.notify(Animation.events.repaint, timestamp)
    setTimeout(() => window.requestAnimationFrame(this.repaint.bind(this)), 1000)
  }
}

module.exports.events = {
  repaint: 'repaint',
}
