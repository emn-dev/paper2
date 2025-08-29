// This file is not our code, we copied from a NPM package
/* eslint-disable */

const _constants = {
  MATCH: "Matching image snapshot",
  RECORD: "Recording snapshot result",
};

const screenshotsFolder = Cypress.config("screenshotsFolder");
const updateSnapshots = Cypress.env("updateSnapshots") || false;
const failOnSnapshotDiff =
  typeof Cypress.env("failOnSnapshotDiff") === "undefined";

function matchImageSnapshotCommand(defaultOptions: any) {
  return function matchImageSnapshot(
    subject: any,
    maybeName: any,
    commandOptions: any
  ) {
    const options = Object.assign(
      {},
      defaultOptions,
      (typeof maybeName === "string" ? commandOptions : maybeName) || {}
    );

    cy.task(_constants.MATCH, {
      screenshotsFolder,
      updateSnapshots,
      options,
    });

    const name = typeof maybeName === "string" ? maybeName : undefined;
    const target = subject ? cy.wrap(subject) : cy;
    target.screenshot(name || "", options);

    return cy.task(_constants.RECORD).then(
      // @ts-ignore
      ({
        // @ts-ignore
        pass,
        added,
        updated,
        diffSize,
        imageDimensions,
        diffRatio,
        diffPixelCount,
        diffOutputPath,
      }) => {
        if (!pass && !added && !updated) {
          const message = diffSize
            ? `Image size (${imageDimensions.baselineWidth}x${imageDimensions.baselineHeight}) different than saved snapshot size (${imageDimensions.receivedWidth}x${imageDimensions.receivedHeight}).\nSee diff for details: ${diffOutputPath}`
            : `Image was ${
                diffRatio * 100
              }% different from saved snapshot with ${diffPixelCount} different pixels.\nSee diff for details: ${diffOutputPath}`;

          if (failOnSnapshotDiff) {
            throw new Error(message);
          } else {
            Cypress.log({ message });
          }
        }
      }
    );
  };
}

export function addMatchImageSnapshotCommand(maybeName: any) {
  const options = maybeName;
  const name = "matchImageSnapshot";
  Cypress.Commands.add(
    // @ts-ignore
    name,
    {
      prevSubject: ["optional", "element", "window", "document"],
    },
    matchImageSnapshotCommand(options)
  );
}
