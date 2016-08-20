require('dotenv').config()

import {version} from '../package.json'
import crypto from 'crypto'

import Koa from 'koa'
import Route from 'koa-route'
import Send from 'koa-send'

import Octokat from 'octokat'
import Badge from './Badge'

const app = new Koa()

app.context.github = new Octokat({
  token: process.env.GITHUB_TOKEN
})

const badge = new Badge(app.context, process.env)

app.use(Route.get('/', function * () {
  this.body = 'Hireable v' + version
}))

app.use(Route.get('/p/:user', function * (user) {
  this.redirect('https://github.com/' + user)
}))

app.use(Route.get('/:user/:repo?', function * show (id, repo) {
  let source
  yield badge.show(id, repo).then(src => {
    this.set('ETag', crypto.createHash('md5').update(src).digest('hex'))
    this.set('Cache-Control', 'private')
    source = src
  })
  yield Send(this, './public/' + source)
}))

app.listen(process.env.APP_PORT)
console.log('Listening on :' + process.env.APP_PORT)
console.log('Visit http://localhost:' + process.env.APP_PORT)
