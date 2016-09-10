require('dotenv').config()

import http from 'http'
import url from 'url'

import Pattern from 'url-pattern'
import Send from 'send'

import {version} from '../package.json'
import Badge from './Badge'

const routes = {
  user () {
    return {
      pattern: new Pattern('/:user'),
      then (request, response, params) {
        (new Badge()).show(params.user).then(user => {
          // ETag is automatically generated
          response.setHeader('Cache-Control', 'private')
          response.setHeader('Hireable', ~~user.hireable) // Double bitwise NOT
          Send(request, user.badge).pipe(response)
        })
      }
    }
  },
  profile () {
    return {
      pattern: new Pattern('/p/:user'),
      then (request, response, params) {
        response.writeHead(302, {
          'Location': 'https://github.com/' + params.user
        })
        response.end()
      }
    }
  }
}

const app = http.createServer(function (request, response) {
  if (request.method !== 'GET') {
    // Only GET for now
    response.writeHead(403)
    response.end()
    return
  }

  let parts = url.parse(request.url)

  if (parts.pathname === '/favicon.ico') {
    response.writeHead(404)
    response.end()
  }

  for (let key in routes) {
    let route = routes[key]()
    let params = route.pattern.match(parts.pathname)
    if (!params) {
      continue
    }
    route.then.call(this, request, response, params)
    return
  }

  response.writeHead(200)
  response.end('Hireable v' + version)
})

app.listen(process.env.APP_PORT, () => {
  console.log('Listening on :' + process.env.APP_PORT)
  console.log('Visit http://localhost:' + process.env.APP_PORT)
})

module.exports = app
