import http from 'http'
import assert from 'assert'

import '../src/index.js'

describe('GET /', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:' + process.env.APP_PORT, res => {
      assert.equal(200, res.statusCode)
      done()
    })
  })
})
