/* eslint-env node, mocha */

'use strict'

import assert from 'assert'
import path from 'path'
import config from 'config'
import sinon from 'sinon'

import BadgeForError from '../src/models/BadgeForError'

describe('BadgeForError', () => {
  let options
  before(() => {
    options = config.get('Badge')
  })

  it('should be initialized successfully', done => {
    const error = new Error('Message')
    const badge = new BadgeForError('directory', 'style', options.images, error)
    assert.equal('directory', badge.directory)
    assert.equal('style', badge.style)
    assert.equal(error.message, badge.error.message)
    done()
  })

  it('should have realSrc method', done => {
    const error = new Error('Message')
    const badge = new BadgeForError('directory', 'style', options.images, error)
    assert.equal('function', typeof badge.realSrc)
    done()
  })

  it('should have validateSrc method', done => {
    const error = new Error('Message')
    const badge = new BadgeForError('directory', 'style', options.images, error)
    assert.equal('function', typeof badge.validateSrc)
    assert.throws(() => {
      badge.validateSrc(path.join(__dirname, 'non-existence'))
    }, Error)
    assert.equal(undefined, badge.validateSrc(__filename))
    done()
  })

  it('should have getSrc method', done => {
    sinon.stub(BadgeForError.prototype, 'validateSrc', () => {})
    const error = new Error('Message')
    const badge = new BadgeForError('directory', 'style', options.images, error)
    assert.equal(path.join('directory', options.images.error), badge.getSrc())
    done()
  })
})
