/* eslint-disable no-console */
// Based on https://www.npmjs.com/package/http-server-spa

import type { ServerResponse } from "node:http";
import { readFileSync, readFile as rf, stat } from "fs";
import { parse } from "url";
import { join } from "path";
import http from "http";

// CLI arguments
const root = process.argv[2] || "./docs";
const port = process.argv[3] || 8080;
const file = process.argv[4] || "index.html";
const cwd = process.cwd();

let index: any;

// Try put the root file in memory
try {
  const uri = join(process.cwd(), root, file);
  index = readFileSync(uri);
} catch (e) {
  console.log(`[ERR] Could not start server, fallback file not found`);
  process.exit();
}

function sendError(res: ServerResponse) {
  res.writeHead(500);
  res.write("500 Server Error");
  res.end();
}

function sendFile(res: ServerResponse, uri: string, data: string) {
  if (uri.endsWith(".js")) {
    res.writeHead(200, { "Content-Type": "application/javascript" });
  }
  res.write(data, "binary");
  res.end();
}

function readFile(res: ServerResponse, uri: string) {
  rf(uri, "binary", (err, fileToUse) => {
    if (err) sendError(res);
    else sendFile(res, uri, fileToUse);
  });
}

function sendNotFound(res: ServerResponse) {
  res.writeHead(404);
  res.write("404 Not Found");
  res.end();
}

function sendIndex(res: ServerResponse, status: number) {
  if (process.env.NODE_ENV !== "production") {
    const uri = join(process.cwd(), root, file);
    index = readFileSync(uri);
  }
  res.writeHead(status, { "Content-Type": "text/html" });
  res.write(index);
  res.end();
}

function isRouteRequest(uri: string) {
  return uri.split("/").pop()?.indexOf(".") === -1;
}

http
  .createServer((req, res) => {
    const uri = parse(req.url || "").pathname || "";
    let resource = join(cwd, root, decodeURI(uri));

    if (uri.endsWith(".esm.js")) {
      if (resource.includes("/")) {
        resource = resource.replace("/docs/", "/packages/paper2/dist/");
      } else {
        // We are on a Windows machine
        resource = resource.replace("\\docs\\", "\\packages\\paper2\\dist\\");
      }
    }

    // A route was requested
    if (isRouteRequest(uri)) {
      sendIndex(res, uri === "/" ? 200 : 301);
      // console.log(`[OK] GET ${uri}`);
      return;
    }
    // A file was requested
    stat(resource, (err) => {
      if (err === null) {
        readFile(res, resource);
        // console.log(`[OK] GET ${uri}`);
      } else {
        sendNotFound(res);
        if (uri.includes("com.chrome.devtools")) {
          // do nothing
        } else {
          console.log(`[ER] GET ${uri}`);
        }
      }
    });
  })
  .listen(Number(port));

console.log(`----------------------------------------------`);
console.log(`[OK] Serving static files from ./${root}`);
console.log(`[OK] Using the fallback file ${file}`);
console.log(`[OK] Listening on http://localhost:${port}`);
console.log(`----------------------------------------------`);
