require('dotenv').config()

import {version} from '../package.json'
import path from 'path'

import Koa from 'koa'
import Route from 'koa-route'
import Serve from 'koa-static'

import Octokat from 'octokat'
import Badge from './lib/Badge'

const app = new Koa()

app.context.github = new Octokat({
  token: process.env.GITHUB_TOKEN
})

Badge.$app = app.context
Badge.$env = process.env

app.use(Serve(path.join(__dirname, '../public'), {
  maxage: 31536000000
}))

app.use(Route.get('/', function * () {
  this.body = 'Hireable v' + version
}))

app.use(Route.get('/:user/:repo?', function * show (id, repo) {
  yield Badge.show(id, repo).then(src => {
    this.redirect(src)
  })
}))

app.listen(process.env.APP_PORT)
console.log('Listening on :' + process.env.APP_PORT)
