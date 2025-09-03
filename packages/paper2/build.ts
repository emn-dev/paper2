import { rmSync, cpSync, writeFileSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import 'dotenv/config';
import * as esbuild from 'esbuild';
// import pkg from './package.json' with { type: 'json' };

type buildOpts = esbuild.SameShape<esbuild.BuildOptions, esbuild.BuildOptions>;

const buildDir = 'dist';
const coreBaseName = 'paper2-core';
const fullBaseName = 'paper2';

rmSync(buildDir, { force: true, recursive: true });

const sharedOpts: buildOpts = {
  // entryPoints: ['lib/index.ts'],
  // sourcemap: true,
  sourcemap: false,
  bundle: true,
  // minify: true, // Do we need a min version?
  allowOverwrite: true,
  external: ['jsdom'],
  define: {
    // GITHUB_REF: 'refs/tags/v1.0.15',
    'process.env.PACKAGE_VERSION': `'${process.env.GITHUB_REF?.replace('refs/tags/', '')}'`,
  },
};

// const external = [];
// if(pkg.dependencies) external.push(...Object.keys(pkg.dependencies));

const jsdomSetup: buildOpts = {
  ...structuredClone(sharedOpts),
  entryPoints: ['lib/jsdom-setup.ts'],
  outfile: `${buildDir}/jsdom-setup.js`,
  platform: 'browser',
  format: 'esm',
};

const jsdomCanvasSetup: buildOpts = {
  ...structuredClone(sharedOpts),
  entryPoints: ['lib/jsdom-canvas-setup.ts'],
  outfile: `${buildDir}/jsdom-canvas-setup.js`,
  platform: 'browser',
  format: 'esm',
};

const browserCoreOpts: buildOpts = {
  ...structuredClone(sharedOpts),
  entryPoints: ['lib/index-core.ts'],
  outfile: `${buildDir}/${coreBaseName}.js`,
  platform: 'browser',
  format: 'esm',
};

const browserFullOpts: buildOpts = {
  ...structuredClone(sharedOpts),
  entryPoints: ['lib/index-full.ts'],
  outfile: `${buildDir}/${fullBaseName}.js`,
  platform: 'browser',
  format: 'esm',
};

browserCoreOpts.define['process.env.PAPER2_FULL'] = 'false';
browserFullOpts.define['process.env.PAPER2_FULL'] = 'true';

// TODO: do we even need a specific backend/node build? Can we just use esm for all nowadays?
// const nodeOpts = {
//   ...sharedOpts,
//   outfile: `${buildDir}/${fileBaseName}.cjs.js`,
//   platform: 'node',
// };

async function main() {
  await esbuild.build(jsdomSetup);
  await esbuild.build(jsdomCanvasSetup);

  if (process.env.IS_BUILD === 'true') {
    // browserCoreOpts.treeShaking = true;
    // browserFullOpts.treeShaking = true;
    await esbuild.build(browserCoreOpts);
    await esbuild.build(browserFullOpts);
    // await esbuild.build(nodeOpts);
  } else {
    const ctxBrowserCore = await esbuild.context(browserCoreOpts);
    await ctxBrowserCore.watch();

    const ctxBrowserFull = await esbuild.context(browserFullOpts);
    await ctxBrowserFull.watch();

    // const ctxNode = await esbuild.context(nodeOpts);
    // await ctxNode.watch();
  }

  try {
    execSync('npx tsc --project tsconfig.esbuild.json', { stdio: 'inherit' });

    let indexCoreDts = readFileSync('./dist/@types/index-core.d.ts', { encoding: 'utf8' });
    indexCoreDts = `import './paper';\n${indexCoreDts}`;
    writeFileSync('./dist/@types/index-core.d.ts', indexCoreDts);
    indexCoreDts = indexCoreDts.replaceAll(` './`, ` './@types/`);
    writeFileSync('./dist/paper2-core.d.ts', indexCoreDts);
    cpSync('./lib/paper.d.ts', './dist/@types/paper.d.ts');
  } catch (err) {
    console.log('build.mjs-npx-tsc-ERROR');
    console.log(err);
  }
}

main();
