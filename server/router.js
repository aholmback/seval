const path = require('path')
const request = require('request')
const express = require('express')
const cors = require('cors')
const router = express.Router()
const template = require('./templates/bundle.js')

const mountpoints = {
  documentation: {
    source: '/documentation',
    host: 'http://localhost:8000',
    target: '/pages/documentation',
  }
}

router.use(cors())

router.get('/', (req, res, next) => {
  request('http://localhost:8000/contexts/foo/bar?id=3', (error, response, body) => {
    res.send(template['pages/index'](JSON.parse(body)))
  })
})

router.get(mountpoints.documentation.source + '*', (req, res) => {

  let options = {
    url: (
      mountpoints.documentation.host +
      mountpoints.documentation.target +
      req.url.slice(mountpoints.documentation.source.length)
    ),
    headers: {
      'X-MOUNT-SOURCE': mountpoints.documentation.source,
      'X-MOUNT-TARGET': mountpoints.documentation.target,
    },
  }

  request(options, (error, response, body) => {
    let component = JSON.parse(body)
    res.send(template[component.name](component.context))
  })
})

router.get('/hello', (req, res) => {
  req.pipe(request('http://localhost:8000/hello')).pipe(res)
})

router.all(['/voxels/*', '/admin/*', '/cms/*', '/pages/*', '/documents/*', '/contexts/*'], (req, res) => {
  req.pipe(request('http://localhost:8000' + req.url)).pipe(res)
})

router.use(express.static(path.resolve(__dirname, '../public')))

module.exports = router

