/* eslint-disable no-console */
import { rmSync, writeFileSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import 'dotenv/config';
import * as esbuild from 'esbuild';
import pkg from './package.json' with { type: 'json' };

const buildDir = 'dist';
const fileBaseName = 'paper2-pre';

rmSync(buildDir, { force: true, recursive: true })

const sharedOpts = {
  entryPoints: ['lib/index.ts'],
  // sourcemap: true,
  sourcemap: false,
  bundle: true,
  allowOverwrite: true,
  define: {
    // GITHUB_REF: 'refs/tags/v1.0.15',
    'process.env.PACKAGE_VERSION': `'${process.env.GITHUB_REF?.replace('refs/tags/', '')}'`,
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

// const nodeOpts = {
//   ...sharedOpts,
//   outfile: `${buildDir}/${fileBaseName}.cjs.js`,
//   platform: 'node',
//   external,
// };

if (process.env.IS_BUILD === 'true') {
  // browserOpts.sourcemap = true;
  // nodeOpts.sourcemap = true;
  await esbuild.build(browserOpts);
  // await esbuild.build(nodeOpts);

  const rawFile = readFileSync("./dist/paper2-pre.esm.js", { encoding: "utf-8" });
  const fixedFile = rawFile.replaceAll("4444", "");
  writeFileSync("./dist/paper2.esm.js", fixedFile);
  rmSync("./dist/paper2-pre.esm.js", { force: true, recursive: true })

} else {
  const ctxBrowser = await esbuild.context(browserOpts);
  await ctxBrowser.watch();

  // const ctxNode = await esbuild.context(nodeOpts);
  // await ctxNode.watch();
}

try {
  execSync('npx tsc --project tsconfig.esbuild.json', { stdio: 'inherit' });
} catch(err){
  console.log('build.mjs-npx-tsc-ERROR');
  console.log(err);
}
