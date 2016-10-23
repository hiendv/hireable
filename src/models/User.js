// @flow

'use strict'

class User {

  id: number
  username: string
  hireable: boolean

  constructor (id: number, username: string, hireable: boolean) {
    this.id = id
    this.username = username
    this.hireable = hireable
  }
}

export default User
