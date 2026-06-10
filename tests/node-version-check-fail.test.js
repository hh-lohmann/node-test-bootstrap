/** @file node-version-check-fail.test.js
 *  - To be run with Node.js >= 22.20.0 (for mock.property)
 */ /** */

// @ts-check

import { importWithMockedNodeVersion } from './importWithMockedNodeVersion.js'

/** Importing directly from Node libraries
 *  - ! NOT via index.js, otherwise the index.js import to test
 *    (see below) would be skipped since index.js would be already
 *    loaded
 */
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

/** Actual test separated from suite / test due to async problems */
const errorThrown=await importWithMockedNodeVersion('v19.0.0','../index.js');

test( 'Fail if given Node version is older than required', () => {
  assert.throws(
    () => {
      if(errorThrown) throw Error('Error was thrown');
      throw Error('no error thrown');
    },
    {
      name:'Error',
      message:'Error was thrown'
    }
  )
})
