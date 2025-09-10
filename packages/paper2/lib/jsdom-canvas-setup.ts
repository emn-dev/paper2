/* eslint-disable no-console */
import { JSDOM } from 'jsdom';
import { createCanvas, Image } from 'canvas';

if (globalThis.process?.release?.name) {
  console.log('[jsdom-canvas-setup] hasNodeCanvas = true');

  globalThis.hasNodeCanvas = true;
  globalThis.jsdomCreateCanvas = createCanvas;
  globalThis.jsdomImage = Image;

  const dom = new JSDOM('<!DOCTYPE html>', {
    // Use the current working directory as the document's origin, so
    // requests to local files work correctly with CORS.
    url: `file://${process.cwd()}/`,
    resources: 'usable',
    pretendToBeVisual: true,
  });

  globalThis.window = dom.window;
  globalThis.document = dom.window.document;
  globalThis.self = dom.window.self;
  if (!globalThis.navigator) globalThis.navigator = dom.window.navigator;
} else {
  console.log('[jsdom-canvas-setup] Unknown runtime!');
}
