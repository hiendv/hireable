// @flow

'use strict'

import path from 'path'
import fs from 'fs'
import config from 'config'

import User from './models/User'
import BadgeForUser from './models/BadgeForUser'
import BadgeForError from './models/BadgeForError'

class BadgeManager {

  _options: Object
  _style: string
  _styleDir: string
  _directory: string
  _images: Object

  constructor () {
    this._options = config.get('Badge')

    // Immutable
    this._directory = this._options.directory
    this._images = this._options.images

    // Mutable
    this.setStyle()
  }

  setStyle (style: ?string): void {
    if (!style) {
      style = this._options.style
    }
    let styleDir = path.join(__dirname, this._directory, style)
    try {
      fs.accessSync(styleDir)
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
      throw new Error('Invalid style')
    }
    this._style = style
    this._styleDir = styleDir
  }

  forUser (user: User): BadgeForUser {
    return new BadgeForUser(this._styleDir, this._style, this._images, user)
  }

  forError (error: Error): BadgeForError {
    return new BadgeForError(this._styleDir, this._style, this._images, error)
  }
}

export default BadgeManager
