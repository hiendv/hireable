/* eslint-env node, mocha */

'use strict'

import assert from 'assert'

import User from '../src/models/User'

describe('User', () => {
  it('should be initialized successfully', done => {
    let user = new User(1, 'hiendv', true)
    assert.equal(1, user.id)
    assert.equal('hiendv', user.username)
    assert.equal(true, user.hireable)
    done()
  })
})
