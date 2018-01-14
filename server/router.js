const path = require('path')
const request = require('request')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.send('root'))

router.get('/hello', (req, res) => {
  req.pipe(request('http://localhost:8000/hello')).pipe(res)
})

router.all(['/admin/*', '/cms/*', '/pages/*', '/documents/*', '/contexts/*'], (req, res) => {
  req.pipe(request('http://localhost:8000' + req.url)).pipe(res)
})

router.use(express.static(path.resolve(__dirname, '../public')))

module.exports = router

