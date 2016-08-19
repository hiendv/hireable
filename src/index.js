require('dotenv').config()

import {version} from '../package.json'
import path from 'path'
import crypto from 'crypto'

import Koa from 'koa'
import Route from 'koa-route'
import Serve from 'koa-static'

import Octokat from 'octokat'
import Badge from './Badge'

const app = new Koa()

app.context.github = new Octokat({
  token: process.env.GITHUB_TOKEN
})

const badge = new Badge(app.context, process.env)

app.use(Serve(path.join(__dirname, '../public'), {
  gzip: true,
  maxage: 0
}))

app.use(Route.get('/', function * () {
  this.body = 'Hireable v' + version
}))

app.use(Route.get('/p/:user', function * (user) {
  this.redirect('https://github.com/' + user)
}))

app.use(Route.get('/:user/:repo?', function * show (id, repo) {
  yield badge.show(id, repo).then(src => {
    this.body = null
    this.response.etag = crypto.createHash('md5').update(src).digest('hex')
    this.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    this.redirect(src)
    this.status = 301
  })
}))

app.listen(process.env.APP_PORT)
console.log('Listening on :' + process.env.APP_PORT)
console.log('Visit http://localhost:' + process.env.APP_PORT)
