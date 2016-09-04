# Changelog

## Keep a CHANGELOG
Changelog entries are classified using the following labels _(from [keep-a-changelog][]_):

- `added`: for new features
- `changed`: for changes in existing functionality
- `deprecated`: for once-stable features removed in upcoming releases
- `removed`: for deprecated features removed in this release
- `fixed`: for any bug fixes

## [Unreleased]
### Added
- Roadmap

## [v0.2.1] - 2016-09-05
### Added
- Add some bithound badges to README
- Add `APP_STYLE` configuration to README

### Changed
- Setup eslint for tests & build script
- Increase mocha timeout to 5000ms
- Update eslint-config-standard to v6.0.0

### Fixed
- Correct README badge urls
- Correct `APP_CACHE` configuration in README

## [v0.2.0] - 2016-09-03
### Added
- Add `Styles`. Now you're free to customize. See [#7](https://github.com/hiendv/hireable/issues/7) for more information

### Changed
- Move `GitHub` and `Cache` into separated modules
- Pass the whole user object to Promise result from `Badge.show` instead of badge `src`
- Refactor Badge & main modules. Move services into Badge
- Use `brightgreen` for `hireable:yes` instead of `green`
- Use [hireable.me](http://hireable.me) as the primary domain
- Support all versions of Node.js v4 instead of `>=4.2.0`

### Removed
- Drop `:repo` from `/:user` route

## [v0.1.3] - 2016-08-27
### Added
- TravisCI
- Some tests

### Changed
- Move `public` into `src/assets` because badges are no longer served in public due to [v0.1.1]
- Change the build script due to the above reason

## [v0.1.2] - 2016-08-23
### Changed
- Some improvements in README
    - Built with Koa
    - Sorry for the long domain
    - Remove `CDN` from FAQ
    - Add `Cache expiration` to FAQ
- Normalize headers: `etag` to `ETag`

## [v0.1.1] - 2016-08-19
### Added
- koa-send
- Cache-Control & ETag header

### Removed
- `APP_URL`
- Static `/public`

### Fixed
- Documentation (README)
- GitHub's camo proxy caching problem by sending badges directly instead of redirection to `/public`

## [v0.1.0] - 2016-08-19
### Added
- First release

[Unreleased]: https://github.com/hiendv/hireable/compare/v0.2.0...HEAD
[v0.2.0]: https://github.com/hiendv/hireable/compare/v0.1.3...v0.2.0
[v0.1.3]: https://github.com/hiendv/hireable/compare/v0.1.2...v0.1.3
[v0.1.2]: https://github.com/hiendv/hireable/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/hiendv/hireable/compare/v0.1.0...v0.1.1

[keep-a-changelog]: https://github.com/olivierlacan/keep-a-changelog

