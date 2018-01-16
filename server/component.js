const fs = require('fs')

const key = require('../key.json')
const root = path.resolve(__dirname, '..')
const util = require('util')
const fs = require('fs')

class Component {
  constructor(name) {
    this.name = name
    this.path = path.resolve(root, key.components.path, `${this.name}.hbs`)
    this.template = null
    this.events = {
      template: 'template',
      done: 'done',
    }

    this.observers = {}
    for (event in this.events) {
      this.observers[event] = []
    }
  }

  loadTemplate() {
    fs.readFile(this.path, 'utf8', function(err, content) {
      this.template = content || this.template
      this.notify(this.events.template)
    })
  }

  observe(event, fn) {
    this.observers[event].push(fn)
  }

  notify(event, ...args) {
    this.observers[event].forEach(fn => {
      fn(event, ...args)
    })
  }
}
