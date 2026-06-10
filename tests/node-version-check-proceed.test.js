/** @file node-version-check-proceed.test.js
 *  - To be run with Node.js >= 22.20.0 (for mock.property)
 */ /** */

// @ts-check

import { importWithMockedNodeVersion } from './importWithMockedNodeVersion.js'

/** Importing directly from Node libraries
 *  - ! NOT via index.js, otherwise the index.js import to test
 *    (see below) would be skipped since index.js would be already
 *    loaded
 */
import { test } from 'node:test';

/** Actual test separated from suite / test due to async problems */
const errorThrown=await importWithMockedNodeVersion('v22.20.0','../index.js');

test( 'Proceed if given Node version is not older than required', () => {
  if(errorThrown) throw Error('Error was thrown');
})
