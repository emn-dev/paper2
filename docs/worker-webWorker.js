// import { paper } from "./paper2-core.esm.js"; // Use this when working locally
import { paper } from "https://unpkg.com/paper2/paper2-core.esm.js"; // paper2-core or paper2-full works

paper.setup([640, 480]);

onmessage = function (event) {
  const data = event.data;
  if (data) {
    const path1 = paper.project.importJSON(data[0]);
    const path2 = paper.project.importJSON(data[1]);
    console.log(path1, path2);
    const result = path1.unite(path2);
    postMessage(result.exportJSON());
  }
};
