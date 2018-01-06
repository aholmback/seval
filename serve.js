const express = require('express')
const app = express()
const router = require('./router.js')
const http = require('http');
const server = http.createServer(app);

app.use(router)

server.listen(3000)
server.on('listening', () => console.log('listening on port 3000'))
