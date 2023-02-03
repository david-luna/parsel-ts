# parsel-ts

[![GitHub license](https://img.shields.io/github/license/david-luna/parsel-ts)](https://github.com/david-luna/parsel-ts/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/david-luna/parsel-ts.svg)](https://github.com/david-luna/parsel-ts/issues)
[![Build Status](https://github.com/david-luna/parsel-ts/actions/workflows/build.yml/badge.svg)](https://github.com/david-luna/parsel-ts/actions)
[![Coverage Status](https://img.shields.io/coveralls/github/david-luna/parsel-ts)](https://coveralls.io/github/david-luna/parsel-ts)
![Code Size](https://img.shields.io/bundlephobia/minzip/parsel-ts.svg)
![Weekly downloads](https://img.shields.io/npm/dw/parsel-ts.svg)

## Summary

TypeScrpit port of the awesome library made by [Lea Verou](https://github.com/LeaVerou)

You can find the original project [here](https://github.com/LeaVerou/parsel)

Reason to do it is to learn more about CSS and its grammar but also to provide typings to another project I'm woring on and add some tweaks and fixes.

The idea is to remain consistent with the current API which you can read in the [official website](https://projects.verou.me/parsel).

## Release notes

### [1.0.5]

* Fix for universal selector. See original issues [42](https://github.com/LeaVerou/parsel/issues/42) [43](https://github.com/LeaVerou/parsel/issues/43) & [44](https://github.com/LeaVerou/parsel/issues/44)
* Add universal token type

### [1.0.4]

* Improved token types and export them.

### [1.0.3]

* Fix bad reference to TypeScript definition files.

### [1.0.2]

* Fix for attribute values trimmed if ending with i/s (case sensitive flags). See [this issue](https://github.com/LeaVerou/parsel/issues/17)

### [1.0.1]

* Fix for backslashes. See [this issue](https://github.com/LeaVerou/parsel/issues/26)

### [1.0.0]

* 1st version with parse, tokenize, specificity, specificityToNumber and walk APIs
