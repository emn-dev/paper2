import { watch, readFileSync, writeFileSync } from "node:fs";

function modifyFileContents() {
  const rawFile = readFileSync("./dist/paper2-pre.esm.js", {
    encoding: "utf-8",
  });
  const fixedFile = rawFile.replaceAll("4444", "");
  writeFileSync("./dist/paper2.esm.js", fixedFile);
}

modifyFileContents();

watch("./dist/paper2-pre.esm.js", (eventType) => {
  if (eventType === "change") {
    console.log("REBUILD-modifyFileContents");
    modifyFileContents();
  }
});
