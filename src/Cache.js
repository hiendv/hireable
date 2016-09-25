// @flow
'use strict'

import config from 'config'
import Memoizee from 'memoizee'

class Cache {

  _options: Object

  constructor () {
    this._options = config.get('Cache')
  }

  fn (fn: Function): Function {
    return Memoizee(fn, this._options)
  }
}

export default Cache
