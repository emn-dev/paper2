## Code in "snapshots-util" directory comes from this repo = https://github.com/jaredpalmer/cypress-image-snapshot

- That repo is not maintained and we only need basic functionality
- Trying to get a PR thru and then getting out npm publish seemed like not worth time
- Also not worth time to fork project and maintain tests/reporters/etc, we only need simple functionality...
- hmm...

## Reason for pulling this code in locally

- There is an issue with paths for screenshots in Cypress, the plugin we use "cypress-image-snapshot" piggy-backed on
  the screenshot pathing
- So when using Cypress OPEN it would put snapshots in "snapshots/test/groupA/my-test-snap.png", but when using Cypress
  RUN it would put snapshots in "snapshots/test/groupA.cy.ts/groupA/my-test-snap.png"
- Not the worst offense, but the problem is what is the source of truth?
- Pulling in locally we add some code to handle the path in "snaphots-util/plugin.js" and just have one source of truth
  using OPEN or RUN
