/** Provide "@reporters/bail" as feature of current package
 *  - {@link https://www.npmjs.com/@reporters/bail |@reporters/bail}
 *    should be a feature of the current package, but just declaring
 *    it as a dependency / devDependency / peerDependency to make it
 *    available does work with npm as a side effect of npm's flat
 *    node_modules structure but not with pnpm that indeed installs
 *    a dependency of a package so that it is not in the scope of
 *    other packages or parents, so it has to be exported, and for
 *    that it has to be imported
 *    - export has to follow import's structure, i.e. "export
 *      default"
 *    - to fulfill the syntax for Node's "--test-reporter=" the
 *      export has to be provided as a subpath export in
 *      package.json
 *    - note that just copying the code content of "@reporters/bail"
 *      is explicitly not wanted, not only for technical reasons
 *      (possible updates of "@reporters/bail") but also to keep
 *      respect for the original author 
*/
export type ReportersBail=(sourc:any)=>AsyncGenerator<string, void, unknown>;
