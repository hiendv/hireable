'use strict'

let GitHub = function (options) {
}

GitHub.prototype = {
  users (username) {
    return {
      fetch () {
        return new Promise((resolve, reject) => {
          resolve({
            id: Math.floor(Math.random() * 1000),
            login: username,
            hireable: null
          })
        })
      }
    }
  }
}

module.exports = GitHub
