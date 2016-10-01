/* eslint-env node, mocha */

'use strict'

import assert from 'assert'

import AbstractBadge from '../src/models/AbstractBadge'

describe('AbstractBadge', () => {
  it('should not be constructed', done => {
    assert.throws(() => {
      AbstractBadge()
    }, TypeError)
    done()
  })
})
