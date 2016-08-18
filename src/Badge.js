export default {
  draw (src) {
    if (this.$env.APP_URL) {
      return this.$env.APP_URL + '/' + src
    }
    return '/' + src
  },
  show (id, repo) {
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
}
