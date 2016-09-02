'use strict'

import Octokat from 'octokat'

let GitHub = function (options) {
  this.instance = new Octokat(options)
}
GitHub.prototype = {
  users () {
    return this.instance.users.apply(this, arguments)
  }
}

export default GitHub
