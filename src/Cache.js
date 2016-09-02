'use strict'

import MemoizeeInstance from 'memoizee'

let Cache = function (options) {
  this.options = {
    promise: true,
    maxAge: options.age ? options.age : 0
  }
}
Cache.prototype = {
  rememberFunction (fn) {
    if (!this.options.maxAge) {
      // Disabled
      return fn
    }

    return MemoizeeInstance.call(this, fn, this.options)
  }
}

export default Cache
