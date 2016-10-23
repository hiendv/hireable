// @flow

'use strict'

import path from 'path'
import fs from 'fs'

class AbstractBadge {

  directory: string
  style: string
  preset: Object
  src: string

  constructor (directory: string, style: string, preset: Object) {
    if (this.constructor === AbstractBadge) {
      throw new TypeError('Can not construct abstract class.')
    }
    this.directory = directory
    this.style = style
    this.preset = preset
  }

  validateSrc (src: string): void {
    fs.accessSync(src)
  }

  realSrc (src: string): string {
    let source = path.join(this.directory, src)
    this.validateSrc(source)
    return source
  }
}

export default AbstractBadge
