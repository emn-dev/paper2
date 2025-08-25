import { Canvas } from "canvas";
import { JSDOM } from "jsdom";

if (globalThis.process?.release?.name) {
  console.log("We are running in NodeJS");
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.self = dom.window.self;
  if (!globalThis.navigator) {
    globalThis.navigator = dom.window.navigator;
  }

  global.window.HTMLCanvasElement = Canvas;
} else {
  console.log("Unknown runtime!");
}
