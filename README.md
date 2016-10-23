# hireable
[![Build Status](https://travis-ci.org/hiendv/hireable.svg?branch=master)](https://travis-ci.org/hiendv/hireable) [![bitHound Dependencies](https://www.bithound.io/github/hiendv/hireable/badges/dependencies.svg)](https://www.bithound.io/github/hiendv/hireable/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/hiendv/hireable/badges/devDependencies.svg)](https://www.bithound.io/github/hiendv/hireable/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/hiendv/hireable/badges/code.svg)](https://www.bithound.io/github/hiendv/hireable) [![dependencies](https://david-dm.org/hiendv/hireable.png)](https://david-dm.org/hiendv/hireable)


Available-for-hire badge built with tremendous help from [these guys](https://github.com/hiendv/hireable/graphs/contributors) and :coffee:  
[hireable.me](http://hireable.me) is sponsored by [@nguyenph88](https://github.com/nguyenph88). Thank you so much for making it possible!  

[![Is hiendv available for hire?](http://hireable.me/hiendv)](http://hireable.me/p/hiendv)

## Usage

Copy this code and paste it into **README** (or **README.md**) in your project:

```
[![Is <username> available for hire?](http://hireable.me/<username>)](http://hireable.me/p/<username>)
```

Want to use this badge on your website? Here is the HTML version:

```
<a href="http://hireable.me/p/<username>">
  <img src="http://hireable.me/<username>" alt="Is <username> available for hire?" />
</a>
```

You hate this style? Try others by modifying the URL of the badge as follow:
```
http://hireable.me/<username>/<style>
```
*`<username>` is a GitHub username*  
*`<style>` is a supported style*

#### Current supported styles
- default (null)
- flat
- Others will be added soon

## But why?
Some of my friends want to embed the employment status into their open-source projects.
But it takes too much time and effort to keep these information up-to-date across projects.  
I thought it would be much cooler to tell people whether you're hireable or not with a badge.

## The badges
#### Default
![Hireable](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/default/yes.svg)
![Not hireable](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/default/no.svg)
![Error](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/default/error.svg)

#### Flat
![Hireable](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/flat/yes.svg)
![Not hireable](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/flat/no.svg)
![Error](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/flat/error.svg)

[badges/shields Specification](https://github.com/badges/shields/blob/master/spec/SPECIFICATION.md) is no longer on our road map. All styles are pre-generated.  

- Q: **How do you know when I'm hireable?**  
A: Your [GitHub jobs profile](https://github.com/settings/profile#user_profile_hireable)

## Roadmap
- [x] [Customizable styles](https://github.com/hiendv/hireable/issues/7): [Released - v0.2.0](./CHANGELOG.md#v020---2016-09-03)
- [x] [On-the-fly badges](https://github.com/hiendv/hireable/pull/3#issuecomment-242659951): W̶o̶n̶'̶t̶ ̶b̶e̶ ̶i̶m̶p̶l̶e̶m̶e̶n̶t̶e̶d̶
- [x] [Remove Koa & related libraries](https://github.com/hiendv/hireable/issues/11): [Released - v0.3.0-rc.1](./CHANGELOG.md#v030-rc1---2016-09-08)
- [x] [Styling using request parameters](https://github.com/hiendv/hireable/issues/9): [Released - v0.3.0-rc.3](./CHANGELOG.md#v030-rc3---2016-09-14)

## Quickstart Installation
- Download the latest release [here](https://github.com/hiendv/hireable/releases)
```bash
# Unzip
unzip hireable-v*.zip -d hireable && cd hireable

# Dependencies
npm install --production

# Config. See #configurations
vim config/production.json

# Environment
export NODE_ENV=production

# Serve
npm run serve

# You may also want to try pm2 or forever instead
# pm2 start lib/index.js --name=hireable
```

## Configurations
Hireable uses [node-config](https://github.com/lorenwest/node-config)  
> Configurations are stored in configuration files within your application, and can be overridden and extended by environment variables, command line parameters, or external sources.

Default configurations
```json
{
    "Hireable": {
        "port": "1406"
    },
    "GitHub": {
        "token": ""
    },
    "Cache": {
        "maxAge": 0,
        "promise": true
    },
    "Badge": {
        "images": {
            "yes": "yes.svg",
            "no": "no.svg",
            "error": "error.svg"
        },
        "style": "default",
        "directory": "../styles"
    },
    "User": {
    }
}
```

## Development
- But first, give me a :star:. Thank you :laughing:
```bash
git clone https://github.com/hiendv/hireable.git && cd hireable
npm install
npm run dev

# Create a release?
npm run build && ls build
```

## Testing
```bash
npm test
```

## Contribution
Issues and PRs are welcome !
