require('dotenv').config()

import http from 'http'
import url from 'url'

import Pattern from 'url-pattern'
import Send from 'send'

import {version} from '../package.json'
import User from './User'
import Badge from './Badge'

const _ROUTES = {
  user () {
    return {
      pattern: new Pattern('(/*):user(/)'),
      then (request, response, params) {
        (new User(new Badge())).show(params.user).then(user => {
          response.setHeader('Cache-Control', 'private')
          response.setHeader('Hireable', ~~user.hireable) // Double bitwise NOT
          Send(request, user.badge).pipe(response)
        })
      }
    }
  },
  profile () {
    return {
      pattern: new Pattern('(/*)p/:user(/)'),
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
  let abort = function (code, msg) {
    if (!code) {
      code = 200
    }
    response.writeHead(code)
    response.end(msg)
  }

  if (request.method !== 'GET') {
    return abort(403, 'Supported methods: GET')
  }

  let parts = url.parse(request.url)

  if (parts.pathname === '/favicon.ico') {
    return abort(404)
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

  abort(200, 'Hireable v' + version)
}

let _server = http.createServer(_dispatch)
let _port = process.env.APP_PORT

let App = function () {}
App.prototype = {
  route (endpoint) {
    return 'http://127.0.0.1:' + _port + (endpoint ? '/' + endpoint : '')
  },
  run (port) {
    if (port) {
      _port = port
    }

    _server.listen(_port, () => {
      console.log('Listening on :' + _port)
      console.log('Visit ' + this.route())
    })
  },
  stop () {
    _server.close()
  }
}

export default App
