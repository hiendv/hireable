# hireable
[![Build Status](https://travis-ci.org/hiendv/hireable.svg?branch=master)](https://travis-ci.org/hiendv/hireable) [![bitHound Dependencies](https://www.bithound.io/github/hiendv/hireable/badges/dependencies.svg)](https://www.bithound.io/github/hiendv/hireable/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/hiendv/hireable/badges/devDependencies.svg)](https://www.bithound.io/github/hiendv/hireable/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/hiendv/hireable/badges/code.svg)](https://www.bithound.io/github/hiendv/hireable)

Available-for-hire badge built with [Koa framework](https://github.com/koajs/koa)

[![Is hiendv available for hire?](http://hireable.me/hiendv)](http://hireable.me/p/hiendv)

```
[![Is <username> available for hire?](http://hireable.me/<username>)](http://hireable.me/p/<username>)
```
*`<username>` is a GitHub username*

[hireable.me](http://hireable.me) is sponsored by [@nguyenph88](https://github.com/nguyenph88). Thank you so much for your contribution.

## But why?
Some of my friends want to embed the employment status into their open-source projects.
But it takes too much time and effort to keep these information up-to-date across your projects.  
I thought it would be much cooler to tell people whether you're hireable or not with a badge. Isn't it? :confused:

## The badges
![Hireable](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/default/yes.svg)
![Not hireable](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/default/no.svg)
![Error](https://cdn.rawgit.com/hiendv/hireable/master/src/styles/default/error.svg)

I was too lazy to implement [badges/shields specification](https://github.com/badges/shields/blob/master/spec/SPECIFICATION.md)  
No on-the-fly generated badges for now, I guess. They are all pre-generated. 

- Q: **How do you know when I'm hireable?**  
A: Your [GitHub jobs profile](https://github.com/settings/profile#user_profile_hireable)

- Q: **Cache expiration**  
A: GitHub has their own image proxy: [camo](https://help.github.com/articles/why-do-my-images-have-strange-urls/). Hireable caching is flexible, see [Configurations](#configurations)

## Roadmap
- [x] Customizable styles: [Released - v0.2.0](./CHANGELOG.md#v020---2016-09-03)
- [ ] On-the-fly badges: Not implemented. See [#3 (comment)](https://github.com/hiendv/hireable/pull/3#issuecomment-242659951).

## Quickstart Installation
- Download the latest release [here](https://github.com/hiendv/hireable/releases)
```bash
# Unzip
unzip hireable-v*.zip -d hireable && cd hireable

# Dependencies
npm install --production

# Config. See #configurations
vim .env

# Serve
npm run serve

# Or even better with pm2 or forever
```

## Configurations
Configurations are defined in `.env` file.
```
# Application port
APP_PORT=1406

# Cache expiration in ms. Leave it null or 0 to disable
APP_CACHE=

# Your badge style. Leave it null for `default` style
APP_STYLE=

# GitHub personal access token. See https://github.com/settings/tokens
GITHUB_TOKEN=PersonalAccessToken
```

## Development
- C'mon, give it a :star:. Thank you :laughing:
```bash
git clone https://github.com/hiendv/hireable.git && cd hireable
npm install
cp .env.example .env && vim .env
npm run dev

# Create a release?
npm run build && cd build
```

## Testing
```bash
npm test
```
e2e test PRs are welcome!
