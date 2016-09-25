import Send from 'send'
import UserManager from '../UserManager'
import BadgeManager from '../BadgeManager'

let u = new UserManager()
let b = new BadgeManager()

exports.show = (request, response, params) => {
  response.setHeader('Cache-Control', 'private')
  try {
    b.setStyle(params.style)
    u.findByUsername(params.user).then(user => {
      let badge = b.forUser(user)
      response.setHeader('Hireable', ~~badge.hireable) // Double bitwise NOT
      response.setHeader('Hireable-Style', badge.style)
      Send(request, badge.getSrc()).pipe(response)
    }).catch(e => {
      let badge = b.forError(e)
      response.setHeader('Hireable-Error', badge.error.message)
      response.setHeader('Hireable-Style', badge.style)
      Send(request, badge.getSrc()).pipe(response)
    })
  } catch (error) {
    response.writeHead(403)
    response.end(error.message)
  }
}
