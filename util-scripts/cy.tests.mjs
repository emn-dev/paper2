import { spawn } from "child_process";

function runScript(scriptName) {
  return spawn("npm", ["run", scriptName], {
    stdio: "inherit",
    shell: true, // important on Windows
  });
}

let cyCmd = "cy:run:pipeline:cmd";

if (process.argv[2] === "a") cyCmd += ":a";
if (process.argv[2] === "b") cyCmd += ":b";

const cyRunner = runScript(cyCmd);
const httpServer = runScript("serve:docs");

function cleanup() {
  if (!httpServer.killed) {
    console.log("Killing httpServer...");
    httpServer.kill();
  }
}

// cyRunner exits (any code, success or error)
cyRunner.on("exit", (code) => {
  console.log(`cyRunner exited with code ${code}`);
  cleanup();
  if (code !== 0) throw Error("Cy errors!");
});

cyRunner.on("error", (err) => {
  console.error("cyRunner error:", err);
  cleanup();
  throw Error("Cy errors!");
});
