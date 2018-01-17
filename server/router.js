const path = require('path')
const request = require('request')
const express = require('express')
const router = express.Router()
const template = require('./templates/bundle.js')

router.get('/', (req, res, next) => {
  request('http://localhost:8000/contexts/foo/bar?id=3', (error, response, body) => {
    res.send(template['pages/index'](JSON.parse(body)))
  })
})

router.get('/hello', (req, res) => {
  req.pipe(request('http://localhost:8000/hello')).pipe(res)
})

router.all(['/admin/*', '/cms/*', '/pages/*', '/documents/*', '/contexts/*'], (req, res) => {
  req.pipe(request('http://localhost:8000' + req.url)).pipe(res)
})

router.use(express.static(path.resolve(__dirname, '../public')))

module.exports = router

