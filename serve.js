const express = require('express')
const ejs = express()
const path = require('path')

ejs.use(express.static(path.resolve(__dirname, 'ui/dist')))

ejs.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'ui/dist/index.html')))

ejs.listen(3000, () => console.log('listening on port 3000'))
