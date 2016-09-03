require('dotenv').config()

import {version} from '../package.json'
import crypto from 'crypto'

import Koa from 'koa'
import Route from 'koa-route'
import Send from 'koa-send'

import Badge from './Badge'

const app = new Koa()
const badge = new Badge()

app.use(Route.get('/', function * () {
  this.body = 'Hireable v' + version
}))

app.use(Route.get('/p/:user', function * (user) {
  this.redirect('https://github.com/' + user)
}))

app.use(Route.get('/:user', function * show (username) {
  let source

  yield badge.show(username).then(user => {
    this.set('ETag', crypto.createHash('md5').update(JSON.stringify(user)).digest('hex'))
    this.set('Cache-Control', 'private')
    source = user.badge
  })

  yield Send(this, source, {
    root: '/'
  })
}))

app.listen(process.env.APP_PORT)

console.log('Listening on :' + process.env.APP_PORT)
console.log('Visit http://localhost:' + process.env.APP_PORT)
