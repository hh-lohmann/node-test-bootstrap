// @ts-check

import package_data from './package.json' with { type: 'json' };
import * as process from 'node:process' ;
import assert from 'node:assert';

if( ! process.release || ! [ 'node', 'bun' ].includes( process.release.name ) ) throw Error( 'Must run in Node.js or Bun' );
if( process.release.sourceUrl && process.release.sourceUrl.includes( '/bun/') ) console.warn( 'Note: Running in Bun instead of Node may be experimental' );

/** Exit with error 
 * @example _exit_err( 'engines', 'not defined' )
 * @param cat - Category for templating
 * @param detail - Filling for template
 * @type { ( cat: 'engines'|'version', detail?: string ) => void }
 */
const _exit_err = function( cat, detail = '' ){ 
  let msg;
  if( cat === 'engines' ) {
    msg = `"engines" ${detail} in package.json for ${package_data.name} - maybe package is corrupted`;
  }
  if( cat === 'version' ) {
    msg = `Node.js version not appropiate for Node.js Test runner - given: ${_is.join('.')}, required min.: ${_min.join('.')}` ;
  }
  throw Error( msg ) ;
}

if( ! Object.hasOwn( package_data, 'engines' ) ) _exit_err( 'engines', 'not defined' );
if( ! Object.hasOwn( package_data.engines, 'node' ) ) _exit_err( 'engines', 'has no "node" entry' );
if( package_data.engines.node === '' ) _exit_err( 'engines', '"node" has no value' );

/** Extracts Semver as array of segments as numbers
 *  - Strips off anything that is not a number or a dot = allowing
 *    npm version ranges etc. as input
 * @example _to_ver_num_arr( '20.13.0' ) // => [ 20, 13, 0 ]
 * @param ver_string - String containing Semver
 * @returns Array with Semver segments as numbers
 * @type { ( ver_string: string ) => number[] }
 */
const _to_ver_num_arr = function( ver_string ){
  const my_arr = ver_string
    .replaceAll( /[^0-9\.]/g, '' )
    .split( '.' )
    .map( value => parseInt( value ) ) ;
  return my_arr;
}

const _is = _to_ver_num_arr( process.version ) ;
const _min = _to_ver_num_arr( package_data.engines.node ) ;
let _approved = undefined ;
if( ! _approved && _is[ 0 ] < _min[ 0 ] ) _exit_err( 'version' ) ;
if( ! _approved && _is[ 0 ] > _min[ 0 ] ) _approved = true ;
if( ! _approved && _is[ 1 ] < _min[ 1 ] ) _exit_err( 'version' ) ;
if( ! _approved && _is[ 1 ] > _min[ 1 ] ) _approved = true ;
if( ! _approved && _is[ 2 ] < _min[ 2 ] ) _exit_err( 'version' ) ;

export { assert }
export { suite, test } from 'node:test';
