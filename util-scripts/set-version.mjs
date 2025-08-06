import { readFileSync, writeFileSync, cpSync } from "node:fs";

const input = process.argv[2];

const pkgJsonObj = JSON.parse(
  readFileSync("./packages/paper2/package.json", { encoding: "utf-8" })
);

const newVersion = input.startsWith("v") ? input.substring(1, 99) : input;

pkgJsonObj.version = newVersion;
pkgJsonObj.main = pkgJsonObj.main.replace("dist", ".");
pkgJsonObj.module = pkgJsonObj.module.replace("dist", ".");
pkgJsonObj.types = pkgJsonObj.types.replace("dist", ".");
delete pkgJsonObj.scripts.postinstall; // We do not want this running on end-users machine

writeFileSync(
  "./packages/paper2/dist/package.json",
  JSON.stringify(pkgJsonObj)
);

cpSync("./README.md", "./packages/paper2/dist/README.md");
