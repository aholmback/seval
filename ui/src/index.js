import _ from 'lodash'
import './style.css'
import print from './print.js';

function component() {
  var element = document.createElement('div')
  var btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.classList.add('hello')

  var image = new Image()
  image.src = require('./icon.png')
  element.appendChild(image)

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = print

  element.appendChild(btn)

  return element
}

document.body.appendChild(component())
