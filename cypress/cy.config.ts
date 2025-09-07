import { exec } from "child_process";
import { defineConfig } from "cypress";
import cyFailed from "cypress-failed-log/src/failed";
import os from "os";
import { addMatchImageSnapshotPlugin } from "./snapshots-util/plugin";

const baseUrl = "http://localhost:8080";

export default defineConfig({
  video: true,
  chromeWebSecurity: false,
  e2e: {
    env: { os: os.platform() },
    viewportHeight: 720,
    viewportWidth: 1280,
    baseUrl,
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config);
      on("task", { failed: cyFailed() });
      on("task", {
        printLog(message) {
          // eslint-disable-next-line no-console
          console.log(message);
          return null;
        },
      });
      on("task", {
        nodejsBooleanOpts() {
          const secondsToLive = 4;
          exec(`node ../docs/nodejs-booleanOpts.js ${secondsToLive}`);
          return null;
        },
      });

      // eslint-disable-next-line default-param-last
      on("before:browser:launch", (browser: any = {}, launchOptions: any) => {
        // if (browser.name === "chrome" && browser.isHeadless) {
        if (browser.name === "chrome") {
          // fullPage screenshot size is 1600x900 on non-retina screens
          // and double that on retina screens
          launchOptions.args.push("--window-size=1300,900");

          // force screen to be non-retina (1600x900 size)
          launchOptions.args.push("--force-device-scale-factor=1");
        }

        if (browser.name === "electron" && browser.isHeadless) {
          // fullPage screenshot size is 1600x900
          launchOptions.preferences.width = 1600;
          launchOptions.preferences.height = 900;
        }

        if (browser.name === "firefox" && browser.isHeadless) {
          // menubars take up height on the screen
          launchOptions.args.push("--width=1600");
          launchOptions.args.push("--height=900");
        }

        return launchOptions;
      });
    },
  },
});
