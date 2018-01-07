const express = require('express')
const router = express.Router()
const path = require('path')
const request = require('request')

router.get('/', (req, res) => res.send('root'))
router.get('/test', (req, res) => res.sendFile(path.resolve(__dirname, 'public/dist/index.html')))
router.get('/hello', (req, res) => {
  req.pipe(request('http://localhost:8000/hello')).pipe(res)
})

router.all('/admin/*', (req, res) => {
  req.pipe(request('http://localhost:8000' + req.url)).pipe(res)
})

router.use(express.static(path.resolve(__dirname, 'public')))
module.exports = router

