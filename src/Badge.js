'use strict'

import fs from 'fs'
import path from 'path'

import Cache from './Cache'
import GitHub from './GitHub'

const STYLE_DIR = 'styles'
const images = {
  yes: 'yes.svg',
  no: 'no.svg',
  error: 'error.svg'
}

let sources = {}
let style

let services = {
  github () {},
  cache () {}
}

/**
 * @return void
 */
let _styles = function () {
  if (!process.env.APP_STYLE) {
    style = 'default'
  }

  // Validate source existence
  Object.keys(images).forEach(function (key) {
    let image = images[key]
    let imageSrc = path.join(__dirname, STYLE_DIR, style, image)
    fs.accessSync(imageSrc)

    sources[key] = imageSrc
  })
}

/**
 * @param  {String} username
 * @return {Promise}
 */
let _user = function (username) {
  return services.github.users(username).fetch()
}

/**
 * @param  {String} username
 * @return {Promise}
 */
let _show = function (username) {
  return _user.call(this, username).then(user => {
    return {
      id: user.id,
      username: user.login,
      hireable: user.hireable,
      badge: user.hireable ? sources.yes : sources.no
    }
  })
  .catch(e => {
    return {
      error: e.status,
      message: e.json ? e.json.message : e.message,
      badge: sources.error
    }
  })
}

let _init = function () {
  services = {
    cache: new Cache({
      age: parseInt(process.env.APP_CACHE)
    }),
    github: new GitHub({
      token: process.env.GITHUB_TOKEN
    })
  }

  this.show = services.cache.rememberFunction(_show)

  _styles.call(this)
}

let Badge = function () {
  _init.call(this)
}

Badge.prototype = {
  show (username) {
    _show.call(this, username)
  },

  toString () {
    return '[Badge Object]'
  },

  inspect () {
    return this.toString()
  }
}

export default Badge
