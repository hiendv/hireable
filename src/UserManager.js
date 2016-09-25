// @flow

'use strict'

import config from 'config'
import Cache from './Cache'
import GitHub from './GitHub'
import User from './models/User'

class UserManager {

  _options: Object
  _github: Object
  findByUsername: Function

  constructor () {
    this._options = config.get('User')
    this._github = new GitHub()
    this.findByUsername = (new Cache()).fn(this._findByUsername)
  }

  _findByUsername (username: string): Promise<User> {
    return this._github.users(username).fetch().then(item => {
      return new User(item.id, item.login, item.hireable === true)
    })
    .catch(e => {
      e.message = e.json ? e.json.message : e.message
      throw e
    })
  }

}

export default UserManager
