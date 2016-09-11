/* eslint-env node, mocha */

import assert from 'assert'
import muk from 'muk'

const Badge = muk('../src/Badge', {
  'fs': require('./mocks/fs.js')
}).default

const User = muk('../src/User', {
  './GitHub': require('./mocks/GitHub.js')
}).default

describe('User tests', () => {
  let user
  before(() => {
    user = new User(new Badge())
  })

  it('should be a user instance', done => {
    assert(typeof user.toString === 'function')
    assert(user.toString() === '[User Object]')
    done()
  })

  it('should have show method', done => {
    assert(typeof user.show === 'function')
    done()
  })

  it('should show a user', function (done) {
    user.show('ghost').then(obj => {
      assert(typeof obj === 'object')
      assert(obj.username === 'ghost')
      done()
    })
  })

  it('should show a user with hireable', function (done) {
    user.show('ghost').then(obj => {
      assert(typeof obj.hireable === 'boolean')
      done()
    })
  })

  it('should show a user not hireable', function (done) {
    user.show('ghost').then(obj => {
      assert(obj.hireable === false)
      done()
    })
  })
})
