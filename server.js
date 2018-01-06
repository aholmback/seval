const express = require('express')

const router = require('./router.js')

const http = require('http');
const app = express()
const server = http.createServer(app);

app.use(router)

server.listen(3000)
server.on('listening', () => console.log('listening on port 3000'))
