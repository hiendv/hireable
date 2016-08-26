import Cache from 'memoizee'

var https = require('https');
var fs = require('fs');

var _HIREABLE = "hireable";
var _YES = "yes";
var _YES_COLOR = "green";
var _YES_SVG_FILENAME = _HIREABLE + '-' + _YES;
var _NO = "no";
var _NO_COLOR = "yellow";
var _NO_SVG_FILENAME = _HIREABLE + '-' + _NO;
var _ERROR = "error";
var _ERROR_COLOR = "lightgrey";
var _ERROR_SVG_FILENAME = _HIREABLE + '-' + _ERROR;

let Badge = function (app, env) {
  this.$app = app
  this.$env = env
  if (this.$env.APP_CACHE) {
    this.show = Cache(this._show, { maxAge: this.$env.APP_CACHE, promise: true })
  } else {
    this.show = this._show
  }
}

let download = function(url, dest, cb) {
  let file = fs.createWriteStream('./public/temp.txt');
  let request = https.get(url, function(response) {
    response.pipe(file);
    fs.rename('./public/temp.txt',dest, function(err) {
            if (err) console.log('ERROR: ' + err);
    });
  }).on('error', function(err) {
    fs.unlink(dest);
    if (cb) cb(err.message);
  });
};

Badge.prototype.draw = function (src) {
  return '/' + src
}

Badge.prototype._show = function (id, repo) {
  return this.$app.github.users(id)
  .fetch()
  .then(user => {
    if (user.hireable) {
      download('https://img.shields.io/badge/' + _HIREABLE + '-' + _YES + '-' + _YES_COLOR + '.svg', './public/' + _YES_SVG_FILENAME + '.svg')
      return _YES_SVG_FILENAME + '.svg'
    }
    download('https://img.shields.io/badge/' + _HIREABLE + '-' + _NO + '-' + _NO_COLOR + '.svg', './public/' + _NO_SVG_FILENAME + '.svg')
      return _NO_SVG_FILENAME + '.svg'
  })
  .catch(e => {
    download('https://img.shields.io/badge/' + _HIREABLE + '-' + _ERROR + '-' + _ERROR_COLOR + '.svg', './public/' + _ERROR_SVG_FILENAME + '.svg')
    return _ERROR_SVG_FILENAME + '.svg'
    // console.log(e.json ? e.json.message : e.message, e.status)
  })
  .then(src => this.draw(src))
}

export default Badge
