'use strict'

import Cache from './Cache'
import GitHub from './GitHub'
import Badge from './Badge'

let badges = (new Badge()).all()

let _services = {
  github () {},
  cache () {}
}

let _init = function () {
  _services = {
    cache: new Cache({
      age: parseInt(process.env.APP_CACHE)
    }),
    github: new GitHub({
      token: process.env.GITHUB_TOKEN
    })
  }

  this.show = _services.cache.rememberFunction(_show)
}

/**
 * @param  {String} username
 * @return {Promise}
 */
let _fetch = function (username) {
  return _services.github.users(username).fetch()
}

/**
 * @param  {String} username
 * @return {Promise}
 */
let _show = function (username) {
  return _fetch.call(this, username).then(user => {
    return {
      id: user.id,
      username: user.login,
      hireable: user.hireable === true,
      badge: user.hireable ? badges.yes : badges.no
    }
  })
  .catch(e => {
    return {
      error: e.status,
      message: e.json ? e.json.message : e.message,
      badge: badges.error
    }
  })
}

let User = function () {
  _init.call(this)
}

User.prototype = {
  show (username) {
    _show.call(this, username)
  },
  badges () {
    return badges
  },
  toString () {
    return '[User Object]'
  },
  inspect () {
    return this.toString()
  }
}

export default User
