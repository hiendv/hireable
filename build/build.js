var pkg = require('../package.json')
var path = require('path')
var fs = require('fs')
var archiver = require('archiver')

var name = path.join(__dirname, pkg.name + '-v' + pkg.version + '.zip')
var output = fs.createWriteStream(name)
var archive = archiver('zip')

output.on('close', function () {
  console.log(name + ' is created')
})

archive.on('error', function (err) {
  throw err
})

archive.pipe(output)

archive
  .directory(path.join(__dirname, '../lib/'), 'lib')
  .file(path.join(__dirname, '../package.json'), {name: 'package.json'})
  .file(path.join(__dirname, '../.env.example'), {name: '.env'})
  .file(path.join(__dirname, '../README.md'), {name: 'README.md'})
  .file(path.join(__dirname, '../CHANGELOG.md'), {name: 'CHANGELOG.md'})
  .finalize()
