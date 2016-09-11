'use strict'

import fs from 'fs'
import path from 'path'

const _IMAGES = {
  yes: 'yes.svg',
  no: 'no.svg',
  error: 'error.svg'
}

let _style
let _directory
let _sources

let _loadSources = function () {
  let sources = {}
  Object.keys(_IMAGES).forEach(function (key) {
    let image = _IMAGES[key]
    let imageSrc = path.join(__dirname, _directory, _style, image)
    fs.accessSync(imageSrc)

    sources[key] = imageSrc
  })

  _sources = sources
}

let _loadStyle = function (style) {
  if (style) {
    _style = style
    return
  }

  if (process.env.APP_STYLE) {
    _style = process.env.APP_STYLE
    return
  }

  _style = 'default'
}

let _loadDirectory = function (directory) {
  if (directory) {
    _directory = directory
    return
  }

  if (process.env.APP_STYLE_DIR) {
    _style = process.env.APP_STYLE_DIR
    return
  }

  _directory = 'styles'
}

let Badge = function (style, directory) {
  _loadDirectory.call(this, directory)
  this.setStyle(style)
}

Badge.prototype = {
  all () {
    return _sources
  },
  dir () {
    return _directory
  },
  style () {
    return _style
  },
  setStyle (style) {
    _loadStyle.call(this, style)
    _loadSources.call(this)
  },
  images () {
    return _IMAGES
  },
  toString () {
    return '[Badge Object]'
  },
  inspect () {
    return this.toString()
  }
}

export default Badge
