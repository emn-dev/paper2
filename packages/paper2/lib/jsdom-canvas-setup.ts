/* eslint-disable no-console */
import { JSDOM } from 'jsdom';
import { createCanvas } from 'canvas'; // You can use node-canvas for most complete server-side canvas

if (globalThis.process?.release?.name) {
  console.log('We are running in NodeJS');

  globalThis.hasNodeCanvas = true;
  globalThis.jsdomCreateCanvas = createCanvas;

  const dom = new JSDOM('<!DOCTYPE html>', {
    // Use the current working directory as the document's origin, so
    // requests to local files work correctly with CORS.
    url: 'file://' + process.cwd() + '/',
    resources: 'usable',
    pretendToBeVisual: true,
  });

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
