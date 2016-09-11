/* eslint-env node, mocha */

import http from 'http'
import assert from 'assert'
import muk from 'muk'

let App = muk('../src/App', {
  './User': require('./mocks/User.js')
}).default

let app = new App()
app.run()

describe('GET /', () => {
  it('should return 200', done => {
    http.get(app.route('/'), res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })
})

describe('GET /ghost', () => {
  it('should return 200', done => {
    http.get(app.route('/ghost'), res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })

  it('should have headers', done => {
    http.get(app.route('/ghost'), res => {
      assert(res.headers)
      done()
    })
  })

  it('should have content type header', done => {
    http.get(app.route('/ghost'), res => {
      assert(res.headers['content-type'])
      done()
    })
  })

  it('should return an image', done => {
    http.get(app.route('/ghost'), res => {
      assert(res.headers['content-type'].indexOf('image/') >= 0)
      done()
    })
  })

  it('should return no', done => {
    http.get(app.route('/ghost'), res => {
      assert(res.headers['hireable'] === '0')
      done()
    })
  })

  it('should have hireable-style header', done => {
    http.get(app.route('/ghost'), res => {
      assert(res.headers['hireable-style'] === 'default')
      done()
    })
  })
})
