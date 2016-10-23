/* eslint-env node, mocha */

'use strict'

import assert from 'assert'
import path from 'path'
import config from 'config'
import sinon from 'sinon'

import BadgeForUser from '../src/models/BadgeForUser'
import User from '../src/models/User'

describe('BadgeForUser', () => {
  let options
  before(() => {
    options = config.get('Badge')
  })

  it('should be initialized successfully', done => {
    const user = new User(1, 'hiendv', true)
    const badge = new BadgeForUser('directory', 'style', options.images, user)
    assert.equal('directory', badge.directory)
    assert.equal('style', badge.style)
    assert.equal(options.images, badge.preset)
    assert.equal(user.hireable, badge.hireable)
    done()
  })

  it('should have realSrc method', done => {
    const user = new User(1, 'hiendv', true)
    const badge = new BadgeForUser('directory', 'style', options.images, user)
    assert.equal('function', typeof badge.realSrc)
    done()
  })

  it('should have validateSrc method', done => {
    const user = new User(1, 'hiendv', true)
    const badge = new BadgeForUser('directory', 'style', options.images, user)
    assert.equal('function', typeof badge.validateSrc)
    assert.throws(() => {
      badge.validateSrc(path.join(__dirname, 'non-existence'))
    }, Error)
    assert.equal(undefined, badge.validateSrc(__filename))
    done()
  })

  it('should have getSrc method', done => {
    sinon.stub(BadgeForUser.prototype, 'validateSrc', () => {})
    const user = new User(1, 'hiendv', true)
    const badge = new BadgeForUser('directory', 'style', options.images, user)
    assert.equal(path.join('directory', options.images[user.hireable ? 'yes' : 'no']), badge.getSrc())
    done()
  })
})
