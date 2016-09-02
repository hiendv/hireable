'use strict'

import Cache from './Cache'
import GitHub from './GitHub'

let services = {
  github () {},
  cache () {}
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
      badge: user.hireable ? 'hireable-yes.svg' : 'hireable-no.svg'
    }
  })
  .catch(e => {
    return {
      error: e.status,
      message: e.json ? e.json.message : e.message,
      badge: 'hireable-error.svg'
    }
  })
}

let _init = function () {
  // No need to check whether caching is disabled or not
  this.show = services.cache.rememberFunction(_show)
}

let Badge = function () {
  services = {
    cache: new Cache({
      age: parseInt(process.env.APP_CACHE)
    }),
    github: new GitHub({
      token: process.env.GITHUB_TOKEN
    })
  }
  _init.call(this)
}

Badge.prototype = {
  show (username) {
    // Default
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
