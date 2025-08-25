# [paper2](https://github.com/emn-dev/paper2) [![NPM](https://img.shields.io/npm/v/paper2.svg)](https://www.npmjs.com/package/paper2)

The essence of [paper.js](https://github.com/paperjs/paper.js) wrapped in modern tooling. It is set up as a TypeScript monorepo. The short-term goal of this project is to get as close as possible to 1-to-1 matching functionality with paperjs, while at the same time adopting some newer tooling and techniques for building JS/TS projects. Then, over time, we can try to enhance and extend functionality.

> NOTE: We are BIG fans of paperjs! That library has allowed us to do awesome things :)

The existence of paper2 is to help paperjs extend its life far into the future.

## Collaboration is Welcomed!

- Just create an Issue asked to be a collaborator
- I will send you Github invite email to join this repo
- Once confirmed, you can create a branch off of main (e.g. my-fix-branch)
- Then do you work locally and commit and push up the changes
- Then create a PR for "my-fix-branch" to "main"
- If all tests pass and everything looks good then most likely it will be a approved and merged in :)

## Getting Started

- Require nodejs version >= `v22` ([Node.js Releases](https://nodejs.org/en/about/previous-releases))
- Verify [corepack](https://www.npmjs.com/package/corepack) is enabled
  - Currently you just run `corepack enable` in your terminal, but that will [change starting with nodejs v25](https://nodejs.org/docs/latest-v22.x/api/corepack.html)
- Using [yarn (berry)](https://github.com/yarnpkg/berry) for package manager
  - You do not need to install this manually, corepack will ask you to download the yarn version specified in package.json
- Run `yarn install`

## Examples and Testing - Local

Run and edit browser examples:

- `cd packages/paper2`
- Run `yarn serve:docs`
  - Now you can go to [http://localhost:8080](http://localhost:8080) to view examples
- Open new terminal in same directory
- Run `yarn serve`
  - Now your edits to source code show up in the browser

Linting:

- `cd packages/paper2`
- Run `yarn test:lint`

Unit Tests:

- `cd packages/paper2`
- Run `yarn test:unit`

## Examples and Testing - Live

- Browser
  - https://emn-dev.github.io/paper2
- Nodejs
  - https://github.com/emn-dev/paper2-client
    - This required cloning the repo and you run on your local machine
  - https://stackblitz.com/edit/paper2-client
    - This can be run directly in the browser

## npm

- https://www.npmjs.com/package/paper2
- unpkg
  - core = https://unpkg.com/paper2/paper2-core.esm.js
  - full = https://unpkg.com/paper2/paper2-full.esm.js

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
