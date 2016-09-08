/* eslint-env node, mocha */

import http from 'http'
import assert from 'assert'

import App from '../src/index.js'

let url = function (route) {
  return 'http://127.0.0.1:' + process.env.APP_PORT + route
}

describe('GET /', () => {
  before(() => App.listen(process.env.APP_PORT))
  after(() => App.close())

  it('should return 200', done => {
    http.get(url('/'), res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })
})

describe('GET /ghost', () => {
  before(() => App.listen(process.env.APP_PORT))
  after(() => App.close())

  it('should return 200', done => {
    http.get(url('/ghost'), res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })

  it('should have headers', done => {
    http.get(url('/ghost'), res => {
      assert(res.headers)
      done()
    })
  })

  it('should have content type header', done => {
    http.get(url('/ghost'), res => {
      assert(res.headers['content-type'])
      done()
    })
  })

  it('should return an image', done => {
    http.get(url('/ghost'), res => {
      assert(res.headers['content-type'].indexOf('image/') >= 0)
      done()
    })
  })

  it('should return no', done => {
    http.get(url('/ghost'), res => {
      assert(res.headers['hireable'] === '0')
      done()
    })
  })
})
