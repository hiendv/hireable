// @flow

'use strict'

import Badge from './Badge'
import User from './User'

class BadgeForUser extends Badge {

  user: User
  hireable: boolean

  constructor (directory: string, style: string, preset: Object, user: User) {
    super(directory, style, preset)
    this.user = user
    this.hireable = this.user.hireable
  }

  getSrc (): string {
    if (this.src) {
      return this.src
    }
    if (this.user.hireable) {
      this.src = this.realSrc(this.preset.yes)
      return this.src
    }
    this.src = this.realSrc(this.preset.no)
    return this.src
  }
}

export default BadgeForUser
