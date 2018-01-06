const express = require('express')
const router = express.Router()
const path = require('path')

router.use(express.static(path.resolve(__dirname, 'ui/dist')))
router.get('/', (req, res) => res.send('root'))
router.get('/test', (req, res) => res.send('test'))

module.exports = router

