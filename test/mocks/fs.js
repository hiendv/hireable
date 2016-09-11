let fs = require('fs')
fs.accessSync = function (src, mode) {
  return true
}

module.exports = fs
