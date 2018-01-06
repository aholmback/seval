const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => res.send('root'))
router.get('/test', (req, res) => res.sendFile(path.resolve(__dirname, 'ui/dist/index.html')))
router.get('/asdf', (req, res, next) => {
  res.send('asdf')
  console.log('qwer')
})

router.use(express.static(path.resolve(__dirname, 'ui/dist')))
module.exports = router

