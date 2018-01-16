const should = require('should')
const request = require('request')
const fs = require('fs')
const path = require('path')
const key = require('../key.json')
const root = path.resolve(__dirname, '..')

var assert = require('assert')

describe('Read file', function() {
  it('serves hello payload', function(done) {
    fs.readFile(path.resolve(__dirname, 'test.js'), 'utf8', function(err, contents) {
      console.log(err)
      console.log(contents)
    })
  })
})
