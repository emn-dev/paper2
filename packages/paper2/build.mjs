/* eslint-disable no-console */
import { rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import * as esbuild from 'esbuild';
import pkg from './package.json' with { type: 'json' };

console.log('i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i-i');
console.log(process.env);

const buildDir = 'dist';
const fileBaseName = 'paper2';

rmSync(buildDir, { force:true, recursive:true })

const sharedOpts = {
  entryPoints: ['lib/index.ts'],
  sourcemap: true,
  bundle: true,
  allowOverwrite: true,
  define: {
    'process.env.PACKAGE_VERSION': `'${process.env.npm_package_version}'`,
  },
};

const external = [];

if(pkg.dependencies) external.push(...Object.keys(pkg.dependencies));

const browserOpts = {
  ...sharedOpts,
  outfile: `${buildDir}/${fileBaseName}.esm.js`,
  platform: 'browser',
  format: 'esm',
  external: external.concat('events')
};

const nodeOpts = {
  ...sharedOpts,
  outfile: `${buildDir}/${fileBaseName}.cjs.js`,
  platform: 'node',
  external,
};

if (process.env.IS_BUILD === 'true') {
  await esbuild.build(browserOpts);
  await esbuild.build(nodeOpts);
} else {
  const ctxBrowser = await esbuild.context(browserOpts);
  await ctxBrowser.watch();

  const ctxNode = await esbuild.context(nodeOpts);
  await ctxNode.watch();
}

try {
  execSync('yarn tsc --project tsconfig.esbuild.json', { stdio: 'inherit' });
} catch {
  // unless nodejs itself messes up, errors are logged by execSync itself
}
