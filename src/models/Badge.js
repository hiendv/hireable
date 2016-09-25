// @flow

'use strict'

import path from 'path'
import fs from 'fs'

// Abstract
class Badge {

  directory: string
  style: string
  preset: Object
  src: string

  constructor (directory: string, style: string, preset: Object) {
    if (this.constructor === Badge) {
      throw new TypeError('Can not construct abstract class.')
    }
    this.directory = directory
    this.style = style
    this.preset = preset
  }

  realSrc (src: string): string {
    let source = path.join(this.directory, src)
    fs.accessSync(source)
    return source
  }
}

export default Badge
