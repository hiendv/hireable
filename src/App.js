// @flow

import config from 'config'
import http from 'http'
import url from 'url'
import Pattern from 'url-pattern'

import {version} from '../package.json'

class App {

  _options: Object
  _routes: Object
  port: number
  server: Object

  constructor () {
    this._options = config.get('Hireable')
    this._routes = {
      profileShow () {
        return {
          pattern: new Pattern('(/*)p/:user(/)'),
          then (request, response, params) {
            require('./controllers/profile').show.apply(this, arguments)
          }
        }
      },
      badgeShow () {
        return {
          pattern: new Pattern('(/*):user(/:style)(/)'),
          then (request, response, params) {
            require('./controllers/badge').show.apply(this, arguments)
          }
        }
      }
    }

    let self = this
    this.server = http.createServer((request, response) => {
      this._dispatch.call(self, request, response)
    })
    this.port = this._options.port
  }

  route (endpoint: ?string) {
    return 'http://127.0.0.1:' + this.port + (endpoint ? '/' + endpoint : '')
  }

  _dispatch (request, response) {
    if (request.method !== 'GET') {
      response.writeHead(405)
      return response.end('Method Not Allowed')
    }

    var parts = url.parse(request.url)

    if (parts.pathname === '/favicon.ico') {
      response.writeHead(404)
      return response.end()
    }

    for (var key in this._routes) {
      var route = this._routes[key].call(this)
      var params = route.pattern.match(parts.pathname)
      if (!params) continue // Not match
      route.then.call(this, request, response, params)
      return
    }

    return response.end('Hireable v' + version)
  }

  run (port: ?number) {
    if (port) {
      this.port = port
    }

    this.server.listen(this.port, () => {
      console.log('Listening on :' + this.port)
      console.log('Visit ' + this.route())
    })
  }

  stop () {
    this.server.close()
  }
}

export default App
