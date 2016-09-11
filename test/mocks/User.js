'use strict'

import GitHubMock from './GitHub'
import Badge from '../../src/Badge'

let badges = (new Badge()).all()

let User = function () {
}

User.prototype = {
  show (username) {
    return (new GitHubMock()).users(username).fetch().then(user => {
      return {
        id: user.id,
        username: user.login,
        hireable: user.hireable === true,
        badge: user.hireable ? badges.yes : badges.no
      }
    })
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
