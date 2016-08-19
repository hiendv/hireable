import Cache from 'memoizee'
let Badge = function (app, env) {
  this.$app = app
  this.$env = env
  if (this.$env.APP_CACHE) {
    this.show = Cache(this._show, { maxAge: this.$env.APP_CACHE, promise: true })
  } else {
    this.show = this._show
  }
}

Badge.prototype.draw = function (src) {
  return '/' + src
}

Badge.prototype._show = function (id, repo) {
  return this.$app.github.users(id)
  .fetch()
  .then(user => {
    if (user.hireable) {
      return 'hireable-yes.svg'
    }
    return 'hireable-no.svg'
  })
  .catch(e => {
    return 'hireable-error.svg'
    // console.log(e.json ? e.json.message : e.message, e.status)
  })
  .then(src => this.draw(src))
}

export default Badge
