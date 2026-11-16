###### npm package

# Node testing bootstrap with bailing

Node [has a test runner on board](#nodejs-test-runner) whose capabilities depend on the Node version used, esp. "mock.property" requiring at least Node 22.20, and "mock" and other objects have to be imported identically to every test file. Unlike Jest, Mocha, Bun and Vitest it has no built-in "bail" option to stop after first failing test.

The following acts as a tiny middleware to validate the running Node version to provide "assert", "mock", "suite" and "test" functions and a "bail" possibility by an additional package.


*[hh lohmann &lt;hh.lohmann@gmail.com&gt;](mailto:hh.lohmann@gmail.com?subject=node-test-bootstrap)*

<!-- see https://hh-lohmann.github.io/github-readme-pages-switch -->
<p align="center" id="github_readme_pages_switch" style="display:none;">
  <b><i>This page may be displayed more optimal in its
  <a href="https://hh-lohmann.github.io/node-test-bootstrap">GitHub Pages view</a>
  </i></b>
</p>


## Changelog

<!-- to be filled by e.g. commits-to-changelog <https://npmjs.com/commits-to-changelog> (this line will be replaced by content) -->


## Usage

Bootstrapping
```js
import { assert, mock, suite, test } from 'node-test-bootstrap';
```

Write tests like
```js
import { /* functions to check */ } from /* module to check */;

suite( /* collections of tests */, () => {
  /* single test */
  test( /* display name */, /* options */ , () => {
    /* details */
    assert( /* check */ )
  });
});
```

Run tests without bailing
```sh
node --test
```

Run tests with bailing
```sh
// display only first failing test (nothing displayed if no test fails)
node --test --test-reporter=@reporters/bail --test-reporter-destination=stdout

// display all tests until first failing test
node --test --test-reporter=@reporters/bail --test-reporter-destination=stdout \
     --test-reporter=spec --test-reporter-destination=stdout
```
  * Note: `--test-reporter=spec --test-reporter-destination=stdout` is used by Node as default as long no (other) reporter is explicitly defined what is the case with"@reporters\bail", so then the default has to be "reinvoked" by making it explicit where each `test-reporter` has to be accompanied by a `test-reporter-destination`, i.e. where to write its output, see details under [Multiple reporters](#nodejs-test-runner-multiple-reporters); the `\` at line end effectively escapes the line break so that all lines separated with `\` will be executed as one single line


## Bun

> **Important:** Use "bun test --isolate" to avoid "leaked handles" between tests due to Bun's speed optimizations

Bun implents Node's "assert" [fully](#bun-nodejs-compatibility-nodeassert) and its test runner library [partly](#bun-nodejs-compatibility-nodetest), so the bootstrap here will also accept to be run in Bun, details may depend on exact tests, especially regarding mocks.


## Requirements / Dependencies

* npm packages (to be installed together with current package, reuse already downloaded packages with [pnpm](#pnpm))
  * [@reporters/bail](#molow-reportersbail): Stop whole Node test runner run when a single test fails



## Installation

Dev dependencies like this should be installed explicitly as such to make it easier for humans and tooling to separate it from production critical / less exchangeable things, so do not dismiss the "-D" switch ("-d" for Bun) just by regarding it as old-school.

Pick for your preferred package manager:

```shell
  npm i -D node-test-bootstrap
```

```shell
  pnpm i -D node-test-bootstrap
```

```shell
  // see note on Bun in README
  bun i -D node-test-bootstrap
```

```shell
  # For Yarn you should double check docs for your and / or
  # current Yarn version, newer versions do not treat `i package_name`
  # as an alias for `add ...` and exclude global installations
  yarn add -D node-test-bootstrap
```


## Details

### Node version testing

Tests if given Node version is not older than that stated for "engines: node" in [the current library's package.json](package.json) (***not*** *the package.json of the project where the current library is imported to*). Literal [range operators](#npmnode-semver-the-semver-parser-for-node-ranges) (formally required in package.json) would be stripped off since ">=" is implicit here. Note that unfortunately npm regards "engines" settings [just as "advisory"](#npm-packagejson-engines--advisory-only) and therefore will not prevent installing into not matching Node versions.

### TypeScript complain "Could not find a declaration file for module 'node-test-bootstrap'" (ts(7016))

VS Code may mark a [Quick Fix](#visual-studio-code-quick-fixes) "Could not find a declaration file for module 'node-test-bootstrap'" (with some non working suggestsions for fixing), while at the same time Type checking and IntelliSense work well. The background here is that the functions to type come from general Node libraries and the type definitions for them are acquired automatically by VS Code - trying to provide them by the way the Quick Fix for ts(7016) knows about would superfluously and massively blow up the size of the current package and its update cycles.


## Source Code

  * GitHub: <https://github.com/hh-lohmann/node-test-bootstrap>


## License

  * MIT (see [LICENSE.txt](LICENSE.txt))


## References

### Bun: Node.js Compatibility node:assert
* <https://bun.com/docs/runtime/nodejs-compat#nodeassert>

### Bun: Node.js Compatibility node:test
* <https://bun.com/docs/runtime/nodejs-compat#nodetest>

### MoLow @reporters/bail
* Stop whole Node test runner run when a single test fails
* <https://github.com/MoLow/reporters/tree/main/packages/bail

### Node.js: Test runner
* <https://nodejs.org/api/test.html#test-runner>

### Node.js: Test runner: describe / suite
* <https://nodejs.org/api/test.html#describe-and-it-aliases>

### Node.js: Test runner: Multiple reporters
* <https://nodejs.org/api/test.html#multiple-reporters>

### npm: package.json: "engines ... advisory only"
* <https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines#:~:text=Unless,advisory%20only>

### npm/node-semver: The semver parser for node: Ranges
* <https://github.com/npm/node-semver#ranges>

### pnpm
* Reuse already downloaded Node packages
* <https://www.npmjs.com/package/pnpm>

### Visual Studio Code: Quick Fixes
* <https://code.visualstudio.com/docs/typescript/typescript-refactoring#_quick-fixes>

### Visual Studio Code: Typings and Automatic Type Acquisition
* <https://code.visualstudio.com/docs/nodejs/working-with-javascript#_typings-and-automatic-type-acquisition>


<!-- see https://hh-lohmann.github.io/html-endspacer -->
<p id="endspacer" data-version="0.2.0" title="Endspacer - helps to align scrolling and positioning link targets | Scroll up to content or click / touch to jump to page top" align="center"><a href="#top"><img alt="Endspacer: './markdown-assets/endspacer.png' missing - see https://hh-lohmann.github.io/html-endspacer" src="./markdown-assets/endspacer.png" height="1000" width="100%"><br>[top]</a></p>
