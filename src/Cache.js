'use strict'

import MemoizeeInstance from 'memoizee'

let Cache = function (options) {
  this.options = {
    promise: true,
    maxAge: options.age ? options.age : 0
  }
}

Cache.prototype = {
  rememberFunction (fn, scope) {
    if (!this.options.maxAge) {
      return fn
    }
    return MemoizeeInstance.call(scope, fn, this.options)
  },
  toString () {
    return '[Cache Object]'
  },
  inspect () {
    return this.toString()
  }
}

export default Cache
