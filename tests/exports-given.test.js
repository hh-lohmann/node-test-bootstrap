/** @file node-version-check-fail.test.js
 *  - To be run with Node.js >= 22.20.0 (for mock.property)
 */ /** */

// @ts-check

import * as my_imports from '../index.js';

/** Importing directly from Node libraries
 *  - ! NOT via index.js, otherwise the index.js import to test
 *    (see below) would be skipped since index.js would be already
 *    loaded
 */
import { suite, test } from 'node:test';

suite( 'Check if expected exports are given', () => {
  ['assert','mock','suite','test'].forEach(value=>{
    test(value,()=>{
      if(!Object.hasOwn(my_imports,value)) throw Error(`"${value}" not found`);
    })
  })
})
