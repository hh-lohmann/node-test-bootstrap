// @ts-check

/** Importing directly from Node libraries
 *  - ! NOT via index.js, otherwise the index.js import to test
 *    (see below) would be skipped since index.js would be already
 *    loaded
 */
import { mock } from 'node:test';

/** Check if module throws an Error on wrong Node version
 *  - ! Can only be run once for the same module since a module cannot be
 *    imported twice
 * @example _importWithMockedNodeVersion('v19.0.0','../index.js')
 * @param version - The version to mock, e.g. 'v19.0.0'
 * @param module - The module to import (with path)
 * @returns true on Error, false else
 * @type {(mockVersion:string,module:string)=>Promise<boolean>}
 */
export const importWithMockedNodeVersion = async function(mockVersion,module){
  /** @type {any} */
  let myVal;
  const prop = mock.property(process,'version',mockVersion);
  await import(module)
  .then(res=>{myVal=res})
  .catch(err=>{myVal=err})
  prop.mock.restore();
  if(
    myVal.constructor
    && myVal.constructor.name
    && myVal.constructor.name==='Error'
  ) return true;
  return false;
}
