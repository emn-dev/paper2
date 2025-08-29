// This file is not our code, we copied from a NPM package
/* eslint-disable */
import fs from "node:fs";
import path from "path";
// @ts-expect-error
import _diffSnapshot from "jest-image-snapshot/src/diff-snapshot";

const _constants = {
  MATCH: "Matching image snapshot",
  RECORD: "Recording snapshot result",
};

let snapshotOptions = {};
let snapshotResult = {};
let snapshotRunning = false;
const kebabSnap = "-snap.png";
const dotSnap = ".snap.png";
const dotDiff = ".diff.png";

function _objectWithoutProperties(obj: any, keys: any) {
  const target = {};
  for (const i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    // @ts-ignore
    target[i] = obj[i];
  }
  return target;
}

function matchImageSnapshotOptions() {
  return (options = {}) => {
    snapshotOptions = options;
    snapshotRunning = true;
    return null;
  };
}

function matchImageSnapshotResult() {
  return () => {
    snapshotRunning = false;
    return snapshotResult;
  };
}

function matchImageSnapshotPlugin({ path: screenshotPath }: { path: string }) {
  if (!snapshotRunning) {
    return null;
  }

  const {
      // @ts-ignore
      screenshotsFolder,
      // @ts-ignore
      updateSnapshots,
      // @ts-ignore
      options: {
        failureThreshold = 0,
        failureThresholdType = "pixel",
        customSnapshotsDir,
        customDiffDir,
      } = {},
    } = snapshotOptions,
    // @ts-ignore
    options = _objectWithoutProperties(snapshotOptions.options, [
      "failureThreshold",
      "failureThresholdType",
      "customSnapshotsDir",
      "customDiffDir",
    ]);

  const receivedImageBuffer = fs.readFileSync(screenshotPath);
  fs.rmSync(screenshotPath);

  const { dir: screenshotDir, name } = path.parse(screenshotPath);

  const slashToUse = path.normalize("/");

  // NOTE: these next several lines are to fix an issue with screenshot/snapshot pathing during OPEN vs RUN
  let screenshotDir2 = screenshotDir; // screenshotDir = .../my-app/cypress/screenshots/groupF.cy.ts/groupF
  const firstPass = screenshotDir.substring(
    0,
    screenshotDir.lastIndexOf(slashToUse)
  ); // .../my-app/cypress/screenshots/groupF.cy.ts
  const secondPass = firstPass.substring(0, firstPass.lastIndexOf(slashToUse)); // .../my-app/cypress/screenshots
  const groupName = screenshotDir.substring(
    screenshotDir.lastIndexOf(slashToUse),
    9999
  ); // /groupF
  screenshotDir2 = secondPass.endsWith("screenshots")
    ? `${secondPass}${groupName}`
    : screenshotDir;
  // screenshotDir2 = .../my-app/cypress/screenshots/groupF

  const relativePath = path.relative(screenshotsFolder, screenshotDir2);

  // remove the cypress v5+ native retries suffix from the file name
  const snapshotIdentifier = name.replace(/ \(attempt [0-9]+\)/, "");
  const snapshotsDir = customSnapshotsDir
    ? path.join(process.cwd(), customSnapshotsDir, relativePath)
    : path.join(screenshotsFolder, "..", "snapshots", relativePath);

  const snapshotKebabPath = path.join(
    snapshotsDir,
    `${snapshotIdentifier}${kebabSnap}`
  );
  const snapshotDotPath = path.join(
    snapshotsDir,
    `${snapshotIdentifier}${dotSnap}`
  );

  const diffDir = customDiffDir
    ? path.join(process.cwd(), customDiffDir, relativePath)
    : path.join(snapshotsDir, "__diff_output__");
  const diffDotPath = path.join(diffDir, `${snapshotIdentifier}${dotDiff}`);

  if (fs.existsSync(snapshotDotPath))
    fs.cpSync(snapshotDotPath, snapshotKebabPath);

  snapshotResult = (0, _diffSnapshot.diffImageToSnapshot)(
    Object.assign(
      {
        snapshotsDir,
        diffDir,
        receivedImageBuffer,
        snapshotIdentifier: `${snapshotIdentifier}-snap`,
        failureThreshold,
        failureThresholdType,
        updateSnapshot: updateSnapshots,
      },
      options
    )
  );

  // @ts-ignore
  const { pass, added, updated, diffOutputPath } = snapshotResult;

  if (!pass && !added && !updated) {
    fs.cpSync(diffOutputPath, diffDotPath);
    fs.rmSync(diffOutputPath);
    fs.rmSync(snapshotKebabPath);
    // @ts-ignore
    snapshotResult.diffOutputPath = diffDotPath;

    return {
      path: diffDotPath,
    };
  }

  fs.cpSync(snapshotKebabPath, snapshotDotPath);
  fs.rmSync(snapshotKebabPath);
  // @ts-ignore
  snapshotResult.diffOutputPath = snapshotDotPath;

  return {
    path: snapshotDotPath,
  };
}

export function addMatchImageSnapshotPlugin(on: any, config: any) {
  on("task", {
    [_constants.MATCH]: matchImageSnapshotOptions(),
    [_constants.RECORD]: matchImageSnapshotResult(),
  });
  on("after:screenshot", matchImageSnapshotPlugin);
}
