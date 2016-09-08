/* eslint-env node, mocha */

import assert from 'assert'

import Badge from '../src/Badge'

describe('Badge tests', () => {
  let badge
  beforeEach(() => {
    badge = new Badge()
  })

  it('should be a badge instance', done => {
    assert(typeof badge.toString === 'function')
    assert(badge.toString() === '[Badge Object]')
    done()
  })

  it('should have show method', done => {
    assert(typeof badge.show === 'function')
    done()
  })

  it('should show a user', done => {
    badge.show('ghost').then(obj => {
      assert(typeof obj === 'object')
      assert(obj.username === 'ghost')
      done()
    })
  })

  it('should show a user with hireable', done => {
    badge.show('ghost').then(obj => {
      assert(typeof obj.hireable === 'boolean')
      done()
    })
  })

  it('should show a user not hireable', done => {
    badge.show('ghost').then(obj => {
      assert(obj.hireable === false)
      done()
    })
  })
})
