const path = require('path')
const request = require('request')
const express = require('express')
const component = require('./component.js')('pages/index')

const router = express.Router()

router.get('/', (req, res, next) => {
  component.observe(component.events.done, next)
})

router.get('/hello', (req, res) => {
  req.pipe(request('http://localhost:8000/hello')).pipe(res)
})

router.all(['/admin/*', '/cms/*', '/pages/*', '/documents/*', '/contexts/*'], (req, res) => {
  req.pipe(request('http://localhost:8000' + req.url)).pipe(res)
})

router.use(express.static(path.resolve(__dirname, '../public')))

module.exports = router

