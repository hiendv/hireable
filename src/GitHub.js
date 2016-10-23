// @flow

'use strict'

import config from 'config'
import Octokat from 'octokat'

class GitHub {

  _options: Object
  _instance: Object

  constructor () {
    this._options = config.get('GitHub')
    this._instance = new Octokat(this._options)
  }

  users () {
    return this._instance.users.apply(this, arguments)
  }
}

export default GitHub
