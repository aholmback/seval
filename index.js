const Express = require('express')
const express = Express()

express.get('/', (req, res) => res.send('Hello World!'))

express.listen(3000, () => console.log('Seval is listening on port 3000!'))
