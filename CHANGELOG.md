# Changelog

## key

Changelog entries are classified using the following labels _(from [keep-a-changelog][]_):

- `added`: for new features
- `changed`: for changes in existing functionality
- `deprecated`: for once-stable features removed in upcoming releases
- `removed`: for deprecated features removed in this release
- `fixed`: for any bug fixes

## Unreleased

### Changed
- Some improvements in README
    - Built with Koa
    - Sorry for the long domain
    - Remove `CDN` from FAQ
    - Add `Cache expiration` to FAQ
- Normalize headers: `etag` to `ETag`

## [0.1.1] - 2016-08-19
### Added
- koa-send
- Cache-Control & ETag header

### Removed
- APP_URL
- Static `/public

### Fixed
- Documentation (README)
- GitHub's camo proxy caching problem by sending badges directly instead of redirection to `/public`

## [0.1.0] - 2016-08-19
### Added
- First release.

[Unreleased]: https://github.com/hiendv/hireable/compare/v0.1.1...HEAD
[v0.1.1]: https://github.com/hiendv/hireable/compare/v0.1.0...v0.1.1

[keep-a-changelog]: https://github.com/olivierlacan/keep-a-changelog

