'use strict'

import Cache from './Cache'
import GitHub from './GitHub'

let _services = {
  github () {},
  cache () {},
  badge () {}
}

/**
 * @param  {String} username
 * @return {Promise}
 */
let _show = function (username) {
  let badges = _services.badge().all()
  return _services.github.users(username).fetch().then(user => {
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

let User = function (badge) {
  _services = {
    cache: new Cache({
      age: parseInt(process.env.APP_CACHE)
    }),
    github: new GitHub({
      token: process.env.GITHUB_TOKEN
    }),
    badge () {
      return badge
    }
  }
}

User.prototype = {
  show (username) {
    return _services.cache.rememberFunction(_show, this).call(this, username)
  },
  toString () {
    return '[User Object]'
  },
  inspect () {
    return this.toString()
  }
}

export default User
