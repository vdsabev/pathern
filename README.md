[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![downloads][downloads-badge]][npmcharts]
[![version][version-badge]][package]
[![MIT License][license-badge]][license]

[![size][size-badge]][unpkg-dist]
[![gzip size][gzip-badge]][unpkg-dist]

<h1 align="center">Pathern 🛣</h1>
<p align="center">Minimalistic path pattern matching</p>

# Install
```
npm install pathern
```

# Usage
```ts
import * as pathern from 'pathern';
```

## replace
```ts
pathern.replace('postContent/:postId', '1');                // 'postContent/1'
pathern.replace('postContent/:postId', { postId: '1' });    // 'postContent/1'
pathern.replace(':a/:b/:c', { a: '1', b: '2', c: '3' });    // '1/2/3'
pathern.replace('$a\\$b\\$c', { a: '1', b: '2', c: '3' }, { // '1/2/3'
  prefix: '$',
  delimiter: '\\',
});
```

## extract
```ts
pathern.extract('a/:b/c', 'a/2/c'); // { b: '2' }
```

[build-badge]: https://img.shields.io/travis/vdsabev/pathern.svg?style=flat-square
[build]: https://travis-ci.org/vdsabev/pathern
[coverage-badge]: https://img.shields.io/codecov/c/github/vdsabev/pathern.svg?style=flat-square
[coverage]: https://codecov.io/github/vdsabev/pathern
[version-badge]: https://img.shields.io/npm/v/pathern.svg?style=flat-square
[package]: https://www.npmjs.com/package/pathern
[downloads-badge]: https://img.shields.io/npm/dm/pathern.svg?style=flat-square
[npmcharts]: http://npmcharts.com/compare/pathern
[license-badge]: https://img.shields.io/npm/l/pathern.svg?style=flat-square
[license]: https://github.com/vdsabev/pathern/blob/master/LICENSE.md
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/pathern/index.min.js?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/pathern/index.min.js?label=size&style=flat-square
[unpkg-dist]: https://unpkg.com/pathern
