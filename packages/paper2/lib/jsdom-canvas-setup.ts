/* eslint-disable no-console */
import { JSDOM } from 'jsdom';
import { Canvas } from 'canvas'; // You can use node-canvas for most complete server-side canvas

if (globalThis.process?.release?.name) {
  console.log('We are running in NodeJS');
  const dom = new JSDOM(`<!DOCTYPE html>`);

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.XMLSerializer = dom.window.XMLSerializer;
  globalThis.self = dom.window.self;
  if (!globalThis.navigator) {
    globalThis.navigator = dom.window.navigator;
  }

  globalThis.window.HTMLCanvasElement = Canvas as any; // You can use node-canvas for most complete server-side canvas
} else {
  console.log('Unknown runtime!');
}
