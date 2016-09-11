require('dotenv').config()

import http from 'http'
import url from 'url'

import Pattern from 'url-pattern'
import Send from 'send'

import {version} from '../package.json'
import User from './User'

const _ROUTES = {
  user () {
    return {
      pattern: new Pattern('/:user'),
      then (request, response, params) {
        (new User()).show(params.user).then(user => {
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
let _dispatch = function (request, response) {
  if (request.method !== 'GET') {
    // Only GET for now
    response.writeHead(403)
    response.end()
    return
  }

  let parts = url.parse(request.url)

  if (parts.pathname) {
    parts.pathname = parts.pathname.replace(/^[\/]+/g, '/')
  }

  if (parts.pathname === '/favicon.ico') {
    response.writeHead(404)
    response.end()
  }

  for (let key in _ROUTES) {
    let route = _ROUTES[key]()
    let params = route.pattern.match(parts.pathname)
    if (!params) {
      continue
    }
    route.then.call(this, request, response, params)
    return
  }

  response.writeHead(200)
  response.end('Hireable v' + version)
}

let _server = http.createServer(_dispatch)

let App = function () {}
App.prototype = {
  route (endpoint) {
    return 'http://127.0.0.1:' + process.env.APP_PORT + '/' + endpoint
  },
  run (port) {
    let APP_PORT = port || process.env.APP_PORT
    _server.listen(APP_PORT, () => {
      console.log('Listening on :' + APP_PORT)
      console.log('Visit http://127.0.0.1:' + APP_PORT)
    })
  },
  stop () {
    _server.close()
  }
}

export default App
