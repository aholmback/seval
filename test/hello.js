const should = require('should')
const request = require('request')

var assert = require('assert')

describe('Stash', function() {
  describe('Responds', function() {
    it('is up', function(done) {
      request('http://localhost:8000', done)
    })
    it('serves hello payload', function(done) {
      request('http://localhost:8000/hello', function(error, response, body) {
        JSON.parse(body).should.have.property('message').equal('Hello world!')
        done()
      })
    })
  })
})

describe('Server', function() {
  describe('Responds', function() {
    it('is up', function(done) {
      request('http://localhost:3000', done)
    })
    it('serves hello payload', function(done) {
      request('http://localhost:3000/hello', function(error, response, body) {
        JSON.parse(body).should.have.property('message').equal('Hello world!')
        done()
      })
    })
  })
})
