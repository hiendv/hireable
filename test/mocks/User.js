'use strict'

import GitHubMock from './GitHub'
import Badge from '../../src/Badge'

let badges = (new Badge()).all()

let User = function () {
}

User.prototype = {
  show (username) {
    let self = this
    return (new GitHubMock()).users(username).fetch().then(user => {
      return {
        id: user.id,
        username: user.login,
        hireable: user.hireable === true,
        badge: user.hireable ? badges.yes : badges.no,
        badge_style: 'default'
      }
    })
  },
  toString () {
    return '[User Object]'
  },
  inspect () {
    return this.toString()
  }
}

export default User
