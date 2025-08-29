# [paper2](https://github.com/emn-dev/paper2) [![Nightly Build](https://github.com/emn-dev/paper2/actions/workflows/nightly.yml/badge.svg?branch=main)](https://github.com/emn-dev/paper2/actions/workflows/nightly.yml) [![NPM](https://img.shields.io/npm/v/paper2.svg)](https://www.npmjs.com/package/paper2)

The essence of [paper.js](https://github.com/paperjs/paper.js) wrapped in modern tooling. It is set up as a TypeScript monorepo. The short-term goal of this project is to get as close as possible to 1-to-1 matching functionality with paperjs, while at the same time adopting some newer tooling and techniques for building JS/TS projects. Then, over time, we can try to enhance and extend functionality.

> NOTE: We are BIG fans of paperjs! That library has allowed us to do awesome things :)

The existence of [paper2.org](https://paper2.org) is to help paperjs extend its life far into the future.

## How to collaborate

1. [Create an Issue](https://github.com/emn-dev/paper2/issues) and just ask to be a collaborator
2. We will send you Github invite email to join this repo
3. Once confirmed, you can create a branch off of main (e.g. my-fix-branch)
4. Then do you work locally and commit and push up the changes
5. When happy with your changes then create a PR for "my-fix-branch" to "main"
6. If all tests pass and everything looks good then most likely it get approved and merged in :)

## Getting Started

1. Verify your Nodejs version >= `v22` ([Node.js Releases](https://nodejs.org/en/about/previous-releases))
1. Verify [corepack](https://www.npmjs.com/package/corepack) is enabled
   1. Currently you just run `corepack enable` in your terminal, but that will [change starting with nodejs v25](https://nodejs.org/docs/latest-v22.x/api/corepack.html)
1. Run `yarn install`
   1. Do not install [yarn (berry)](https://github.com/yarnpkg/berry) manually, corepack will ask you to download the yarn version specified in package.json

## Examples and Testing - Local

Run and edit browser examples:

1. `cd packages/paper2` and run `yarn serve:docs`
   1. Now you can go to [http://localhost:8080](http://localhost:8080) to view examples
1. Open new terminal in same directory
1. Run `yarn serve`
   1. Now your edits to source code show up in the browser

Linting:

1. `cd packages/paper2` and run `yarn test:lint`

Unit Tests:

1. `cd packages/paper2` and run `yarn test:unit`

## Examples and Testing - Live

- Browser = https://paper2.org
- Nodejs
  - https://github.com/emn-dev/paper2-client
    - JavaScript - This required cloning the repo and you run on your local machine
  - https://github.com/emn-dev/paper2-client-ts
    - TypeScript - This required cloning the repo and you run on your local machine
  - https://stackblitz.com/edit/paper2-client
    - This can be run directly in the browser

## npm + unpkg

- core = https://unpkg.com/paper2/paper2-core.js
- full = https://unpkg.com/paper2/paper2.js

## Tooling Decisions

- [TypeScript](https://www.typescriptlang.org/)
  - Firstly, I love JavaScript since early days, but...
  - When working on medium/large applications that have multiple contributors large JS codebases can become very difficult to understand/maintain
  - Also, having the tsc help catch common bugs during development time can elimate many runtime errors
  - Lastly, trying to reverse engineer JS code to then build types for it is prone to bugs. It is better to have the source be written in TS and you get good typings "for free"
- [Yarn](https://yarnpkg.com/)... because of [Put simply, our differences lie in our priorities...](https://yarnpkg.com/getting-started/qa#is-yarn-faster-than-other-package-managers)
- [esbuild](https://esbuild.github.io/)... because we want simple, low configuration, and fast builds
- [Vitest](https://vitest.dev/)... because we want simple, low configuration, and fast unit tests
- [ESLint](https://eslint.org/)... because we want comprehensive and configurable linting
