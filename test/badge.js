/* eslint-env node, mocha */

import assert from 'assert'
import path from 'path'

import muk from 'muk'

const Badge = muk('../src/Badge', {
  'fs': require('./mocks/fs.js')
}).default

describe('Badge tests', () => {
  let badge
  before(() => {
    badge = new Badge()
  })

  it('should be a badge instance', done => {
    assert(typeof badge.toString === 'function')
    assert(badge.toString() === '[Badge Object]')
    done()
  })

  it('should have all method', done => {
    assert(typeof badge.all === 'function')
    done()
  })

  it('should have return badges', done => {
    let badges = badge.all()
    assert(badges.yes)
    assert(badges.no)
    assert(badges.error)
    done()
  })

  it('should have return badges in another style', done => {
    badge = new Badge('other-style')
    let badges = badge.all()
    let images = badge.images()
    assert(badges.yes === path.join(__dirname, '../src', badge.dir(), 'other-style', images.yes))
    assert(badges.no === path.join(__dirname, '../src', badge.dir(), 'other-style', images.no))
    assert(badges.error === path.join(__dirname, '../src', badge.dir(), 'other-style', images.error))
    done()
  })

  it('should have return badges in another directory', done => {
    badge = new Badge(null, 'other-dir')
    let badges = badge.all()
    let images = badge.images()
    assert(badges.yes === path.join(__dirname, '../src', 'other-dir', badge.style(), images.yes))
    assert(badges.no === path.join(__dirname, '../src', 'other-dir', badge.style(), images.no))
    assert(badges.error === path.join(__dirname, '../src', 'other-dir', badge.style(), images.error))
    done()
  })

  it('should have return badges in another directory and another style', done => {
    badge = new Badge('other-style', 'other-dir')
    let badges = badge.all()
    let images = badge.images()
    assert(badges.yes === path.join(__dirname, '../src', 'other-dir', 'other-style', images.yes))
    assert(badges.no === path.join(__dirname, '../src', 'other-dir', 'other-style', images.no))
    assert(badges.error === path.join(__dirname, '../src', 'other-dir', 'other-style', images.error))
    done()
  })
})
