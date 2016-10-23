exports.show = (request, response, params) => {
  response.writeHead(302, {
    'Location': 'https://github.com/' + params.user
  })
  response.end()
}
