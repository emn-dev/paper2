import { readFileSync, writeFileSync, cpSync } from "node:fs";

const input = process.argv[2];

const pkgJsonObj = JSON.parse(
  readFileSync("./packages/paper2/package.json", { encoding: "utf-8" })
);

const newVersion = input.startsWith("v") ? input.substring(1, 99) : input;

pkgJsonObj.version = newVersion;
pkgJsonObj.main = pkgJsonObj.main.replace("dist", ".");

writeFileSync(
  "./packages/paper2/dist/package.json",
  JSON.stringify(pkgJsonObj)
);

cpSync("./README.md", "./packages/paper2/dist/README.md");
