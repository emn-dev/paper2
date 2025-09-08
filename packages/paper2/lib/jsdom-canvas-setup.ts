/* eslint-disable no-console */
import { JSDOM } from 'jsdom';
import { createCanvas } from 'canvas'; // You can use node-canvas for most complete server-side canvas

if (globalThis.process?.release?.name) {
  console.log('We are running in NodeJS');

  globalThis.thisIsNodeJs = true;
  globalThis.jsdomCreateCanvas = createCanvas;

  const dom = new JSDOM(`<!DOCTYPE html>`);

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.XMLSerializer = dom.window.XMLSerializer;
  globalThis.self = dom.window.self;
  if (!globalThis.navigator) {
    globalThis.navigator = dom.window.navigator;
  }
} else {
  console.log('Unknown runtime!');
}
