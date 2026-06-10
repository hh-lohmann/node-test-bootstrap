###### npm package

# Node testing bootstrap

Node [has a test runner on board](#node-test-runner) whose capabilities depend on the Node version used, esp. "mock.property" requiring at least Node 22.20, and "mock" and other objects have to be imported identically to every test file.

The following acts as a tiny middleware to check the running Node version before importing the required Node functionality in single stroke.


## Bun

Bun implents Node's "assert" [fully](#bun-node-compatibility-assert) and its test runner library [partly](#bun-node-compatibility-test), so the bootstrap here will also accept to be run in Bun, details may depend on exact tests.


## Installation

Depending on your preferred package manager:

```shell
  npm i hh-lohmann/node-test-bootstrap
```

```shell
  pnpm i hh-lohmann/node-test-bootstrap
```

```shell
  yarn add hh-lohmann/node-test-bootstrap
```

```shell
  // see note on Bun in README
  bun i hh-lohmann/node-test-bootstrap
```


## Usage

* Bootstrapping
  ```js
    import { assert, mock, suite, test } from 'node-test-bootstrap';
  ```

* Your tests like
  ```js
    import { /* your functions to check */ } from /* your module to check */;
    
    suite( /* your detail test */, () => {
      /* your test setup */
      test( /* display name */, /* options */ , () => {
        /* your details */
        assert( /* your check */ )
      });
    });
  ```


## Details

### Node version testing

Tests if given Node version is not older than that stated for "engines: node" in [the current library's package.json](package.json) (***not*** *the package.json of the project where the current library is imported to*). Literal [range operators](#npm-semver-ranges) (formally required in package.json) would be stripped off since ">=" is implicit here. Note that unfortunately npm regards "engines" settings [just as "advisory"](#npm-engines-advisory-only) and therefore will not prevent installing into not matching Node versions.

### TypeScript complain "Could not find a declaration file for module 'node-test-bootstrap'" (ts(7016))

VS Code may mark a [Quick Fix](#vscode-quick-fixes) "Could not find a declaration file for module 'node-test-bootstrap'" (with some non working suggestsions for fixing), while at the same time Type checking and IntelliSense work well. The background here is that the functions to type come from general Node libraries and the type definitions for them are acquired automatically by VS Code - trying to provide them by the way the Quick Fix for ts(7016) knows about would superfluously and massively blow up the size of the current package and its update cycles.


## References

###### bun-node-compatibility-assert
  * [Bun: Node.js Compatibility node:assert](https://bun.com/docs/runtime/nodejs-compat#nodeassert)

###### bun-node-compatibility-test
  * [Bun: Node.js Compatibility node:test](https://bun.com/docs/runtime/nodejs-compat#nodetest)

###### node-test-describe-suite
  * [Node.js: Test runner: describe / suite](https://nodejs.org/api/test.html#describe-and-it-aliases)

###### node-test-runner
  * [Node.js: Test runner](https://nodejs.org/api/test.html#test-runner)

###### npm-engines-advisory-only
  * [npm: package.json: "engines ... advisory only"](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines#:~:text=Unless,advisory%20only)

###### npm-semver-ranges
  * [npm/node-semver: The semver parser for node: Ranges](https://github.com/npm/node-semver#ranges)

###### vscode-quick-fixes
  * [Visual Studio Code: Quick Fixes](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_quick-fixes)

###### vscode-automatic-type-acquisition
  * [Visual Studio Code: Typings and Automatic Type Acquisition](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_typings-and-automatic-type-acquisition)
