'use strict'

/**
 * @param  {String} username
 * @return {Promise}
 */
let _user = function (username) {
  return this.$app.github.users(username).fetch()
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
  this.show = this.$app.cache.rememberFunction(_show)
}

let Badge = function (app, env) {
  this.$app = app
  this.$env = env
  _init.call(this)
}

Badge.prototype = {
  show (username) {
    // Default
    _show.call(this, username)
  }
}

export default Badge
