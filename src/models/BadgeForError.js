// @flow

'use strict'

import AbstractBadge from './AbstractBadge'

class BadgeForError extends AbstractBadge {

  error: Error
  message: string

  constructor (directory: string, style: string, preset: Object, error: Error) {
    super(directory, style, preset)
    this.error = error
    if (
      !this.error.json || typeof this.error.json !== 'object' ||
      !this.error.json.message || typeof this.error.json.message !== 'string'
    ) {
      this.message = this.error.message
    } else {
      this.message = this.error.json.message
    }
  }

  getSrc (): string {
    if (this.src) {
      return this.src
    }
    this.src = this.realSrc(this.preset.error)
    return this.src
  }
}

export default BadgeForError
