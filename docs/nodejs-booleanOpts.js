import { createServer } from "http";
import { parse } from "url";
import { Readable } from "stream";
import "../packages/paper2/dist/jsdom-canvas-setup.js";
import {
  paper,
  Color,
  Path,
  Size,
} from "../packages/paper2/dist/paper2-core.js";

let timeToLive = 30; // in seconds

function dataURLtoStream(dataURL) {
  // Extract base64 data part
  const base64Data = dataURL.split(",")[1];

  // Decode base64 to a Buffer
  const buffer = Buffer.from(base64Data, "base64");

  // Create a Readable stream and push the buffer
  const readableStream = new Readable();
  readableStream.push(buffer);
  readableStream.push(null); // Signal end of stream

  return readableStream;
}

createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const parsedUrl = parse(req.url, true); // true to parse query string
  const queryParams = parsedUrl.query; // queryParams is an object
  if (queryParams.ttl) timeToLive = Number(queryParams.ttl);

  // var canvas = paper.createCanvas(800, 800);
  // paper.setup(canvas);
  paper.setup(new Size(500, 500));

  var style = {
    fillColor: new Color(1, 1, 0, 0.5),
    strokeColor: new Color(0, 0, 0),
    strokeWidth: 1.5,
  };

  var first = new Path.Rectangle([50, 50], [150, 150]);
  first.style = style;
  var second = first.clone().translate(50, 50);
  second.style = style;

  var intersection = first.subtract(second);
  intersection.style = style;
  intersection.translate(250, 0);
  paper.view.update();

  const dataUrl = paper.view.context.canvas.toDataURL("image/png");

  const stream = dataURLtoStream(dataUrl);
  // var stream = canvas.pngStream();
  stream.on("data", function (chunk) {
    res.write(chunk);
  });
  stream.on("end", function () {
    res.end();
    setTimeout(() => {
      process.exit();
    }, timeToLive * 1000);
  });
}).listen(3000);

console.log("Server running at http://127.0.0.1:3000/");
