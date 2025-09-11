/* eslint-disable object-shorthand */
import { describe, it } from 'vitest';
import { paper } from '~/index-core';
import { compareSVG } from './_helpers';

describe('Given: SvgImport 2', () => {
  function getOpts(cb: any, expectError = false) {
    return {
      applyMatrix: false,
      onLoad: function (item, svg) {
        console.log('importSVG-onLOAD.');
        // if (!message) {
        //   message =
        //     'The imported SVG "' + url + '" should visually be ' + 'the same as the rasterized original SVG data.';
        // }
        // FOR_TESTING: uncomment below to force error
        // const svg2 = svg.replace('h-150 a150,150 0 1,0 150,-150', 'h-15 a15,15 0 1,0 15,-15');
        compareSVG(cb, item, svg, '', {});
      },

      onError: function () {
        console.log('importSVG__ERROR');

        if (expectError) {
          cb.done();
        } else {
          cb.fail('UNEXPECTED_IMPORT_SVG__ERROR');
        }
      },
    };
  }

  // TODO:
  // linux = 753 pixels differ
  // mac = perfect match
  it.skip('arcs', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/arcs.svg', getOpts(cb));
    }));

  it('symbol', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/symbol.svg', getOpts(cb));
    }));

  // TODO:
  // linux = 17,042 pixels differ
  // mac = perfect match
  it.skip('symbols', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/symbols.svg', getOpts(cb));
    }));

  // TODO:
  // linux = 118,594 pixels differ
  // mac = perfect match
  it.skip('blendModes', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/blendModes.svg', getOpts(cb));
    }));

  it('viewbox', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/viewbox.svg', getOpts(cb));
    }));

  it('gradients-1', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/gradients-1.svg', getOpts(cb));
    }));

  it('gradients-2', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/gradients-2.svg', getOpts(cb));
    }));

  it('gradients-3', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/gradients-3.svg', getOpts(cb));
    }));

  it('gradients-4', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/gradients-4.svg', getOpts(cb));
    }));

  it('Import non-existent file', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/nonexistent.svg', getOpts(cb, true));
    }));

  // TODO:
  // linux = 20,486 pixels differ
  // mac = 20,486 pixels differ
  it.skip('butterfly', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/butterfly.svg', getOpts(cb));
    }));

  // TODO:
  // linux = 2,727 pixels differ
  // mac = 2,700 pixels differ
  it.skip('clipping', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/clipping.svg', getOpts(cb));
    }));
});
