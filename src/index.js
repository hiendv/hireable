import Koa from 'koa'
const app = new Koa()

app.use(function * () {
  this.body = 'Hello World'
})

app.listen(1406)
