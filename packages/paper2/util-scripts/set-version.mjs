import { readFileSync, writeFileSync } from "node:fs";

const input = process.argv[2];

const pkgJsonObj = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);

console.log("=-=-=-=--=-=--= process.env  -=-=-=--=-=-=-=--=-");
console.log(process.env);
console.log(input);
console.log(pkgJsonObj.name);

// const newVersion = input.startsWith('v') ? input.substring(1, 99) : input;

// pkgJsonObj.version = newVersion;

// writeFileSync('./package.json', JSON.stringify(pkgJsonObj));
