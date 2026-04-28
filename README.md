###### Node.js

# Node test bootstrap

Node [has a test runner on board](#node-test-runner) whose capabilities depend on the Node version used, esp. "suite" / "describe" requiring at least Node 20.13, and "suite" and other functions have to be imported identically to every test file.

The following tries to simplify the required (opionated) importing and checks the required Node version offering the respective functionality.


## Bun

Node's "assert" is fully and its test runner is [partly implemented](#bun-node-compatibility) in Bun, so the bootstrap here will also accept to be run in Bun, details may depend on exact tests.


## Installation

Depending on your preferred package manager:

```shell
  npm i hh-lohmann/fetch-cors-valid
```

```shell
  pnpm i hh-lohmann/fetch-cors-valid
```'should return "' + value[ 1 ] + '" for `' + value[ 0 ] + '`: ' + eval( value[ 0 ] )

```shell
  yarn add hh-lohmann/fetch-cors-valid
```

```shell
  // see note on Bun in README
  bun i hh-lohmann/fetch-cors-valid
```


## Usage

* Bootstrapping
  ```js
    import { assert, suite, test } from 'node-test-bootstrap';
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

Tests only if given Node version is not older than that stated in [package.json](package.json) under "extensions. Literal [range operators](#npm-semver-ranges) (formally required in package.json) are stripped off here due to implicit / exclusive ">=". Note that unfortunately npm regards "engines" settings [just as "advisory"](#npm-engines-advisory-only) and therefore will not prevent installing in not matching Node versios without further ado.

### TypeScript complain "Could not find a declaration file for module 'node-test-bootstrap'"

TypeScript / IntelliSense definition files should come from the involved Node libraries already installed on your system (what should be guaranteed by the involved Node version test).



## References

###### bun-node-compatibility
  * [Bun: Node.js Compatibility](https://bun.com/docs/runtime/nodejs-compat)

###### node-test-describe-suite
  * [Node.js: Test runner: describe / suite](https://nodejs.org/api/test.html#describe-and-it-aliases)

###### node-test-runner
  * [Node.js: Test runner](https://nodejs.org/api/test.html#test-runner)

###### npm-engines-advisory-only
  * [npm: package.json: "engines ... advisory only"](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines#:~:text=Unless,advisory%20only)

###### npm-semver-ranges
  * [npm/node-semver: The semver parser for node: Ranges](https://github.com/npm/node-semver#ranges)
