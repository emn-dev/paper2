import { createServer } from "http";
import { createWriteStream, readFileSync, writeFile } from "fs";
import { Readable } from "stream";
import path from "path";
import "../packages/paper2/dist/jsdom-canvas-setup.js";
import {
  paper,
  Color,
  Size,
  Path,
  Point,
} from "../packages/paper2/dist/paper2-core.js";

const serverPort = 3002;
let timeToLive = 30; // in seconds
if (process.argv[2]) timeToLive = process.argv[2];

let outputDir = "./raster-temp";

if (process.argv[3] === "cyTest") outputDir = "../docs/raster-temp";

function main2() {
  createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const fileBuffer = readFileSync(`${outputDir}/frame-0.png`);

    const stream = new Readable();
    stream.push(fileBuffer); // Push the entire buffer as a single chunk
    stream.push(null); // Signal the end of the stream

    stream.on("data", function (chunk) {
      res.write(chunk);
    });
    stream.on("end", function () {
      res.end();
      setTimeout(() => {
        process.exit();
      }, timeToLive * 1000);
    });
  }).listen(serverPort);

  console.log(`Server running at http://127.0.0.1:${serverPort}`);
}

paper.setup(new Size(300, 600));
var stops = [new Color(1, 1, 0, 0), "red", "black"];

var radius = paper.view.bounds.width * 0.4,
  from = new Point(paper.view.center.x),
  to = from.add(radius, 0);

new Path.Circle({
  center: from,
  radius: radius,
  fillColor: {
    stops: stops,
    radial: true,
    origin: from,
    destination: to,
  },
  strokeColor: "black",
});

var from = paper.view.bounds.leftCenter,
  to = paper.view.bounds.bottomRight;

var rect = new Path.Rectangle({
  from: from,
  to: to,
  fillColor: {
    stops: stops,
    radial: false,
    origin: from,
    destination: to,
  },
  strokeColor: "black",
});

rect.rotate(45).scale(0.7);

var svg = paper.project.exportSVG({ asString: true });
// console.log(svg);

writeFile(path.resolve("./out.svg"), svg, function (err) {
  if (err) throw err;
  console.log("Saved!");
});
