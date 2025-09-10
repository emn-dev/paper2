/* eslint-disable object-shorthand */
import { describe, it } from 'vitest';
import { paper } from '~/index-core';
import { compareSVG } from './_helpers';

describe('Given: SvgImport 2', () => {
  it('arcs', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/arcs.svg', {
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
          // TODO: how to handle this?
          // const ok = !!(options && options.expectError);
          cb.fail('importSVG__ERROR');
          console.log('importSVG__ERROR');
          // QUnit.push(
          //   ok,
          //   false,
          //   !ok,
          //   (ok && message) || 'Loading SVG from a valid URL should not give an error: ' + error
          // );
        },
      });
    }));

  it('symbol', () =>
    new Promise<void>((done, fail) => {
      const cb = { done, fail };
      paper.project.importSVG('./tests/assets/symbol.svg', {
        applyMatrix: false,

        onLoad: function (item, svg) {
          console.log('importSVG-onLOAD.');
          // if (!message) {
          //   message =
          //     'The imported SVG "' + url + '" should visually be ' + 'the same as the rasterized original SVG data.';
          // }
          // FOR_TESTING: uncomment below to force error
          // console.log(svg);
          // const svg2 = svg.replace('M-75,75l0,-150l150,0l0,150', 'M-7,7l0,-15l15,0l0,15');
          compareSVG(cb, item, svg, '', {});
        },

        onError: function () {
          // TODO: how to handle this?
          // const ok = !!(options && options.expectError);
          cb.fail('importSVG__ERROR');
          console.log('importSVG__ERROR');
          // QUnit.push(
          //   ok,
          //   false,
          //   !ok,
          //   (ok && message) || 'Loading SVG from a valid URL should not give an error: ' + error
          // );
        },
      });
    }));

  // // TODO: need to think about how to handle this
  // function importSVG(url, message, options) {
  //   paper.project.importSVG(url, {
  //     applyMatrix: false,

  //     onLoad: function (item, svg) {
  //       if (!message) {
  //         message =
  //           'The imported SVG "' + url + '" should visually be ' + 'the same as the rasterized original SVG data.';
  //       }
  //       compareSVG(() => '', item, svg, message, options);
  //     },

  //     onError: function () {
  //       // TODO: how to handle this?
  //       const ok = !!(options && options.expectError);
  //       console.log('=a-sd=f-a=-df=-as====ok', ok);
  //       // QUnit.push(
  //       //   ok,
  //       //   false,
  //       //   !ok,
  //       //   (ok && message) || 'Loading SVG from a valid URL should not give an error: ' + error
  //       // );
  //     },
  //   });
  // }

  // // if (!isNodeContext) {
  // // JSDom does not have SVG rendering, so we can't test there.
  // const svgFiles = {
  //   // butterfly: { tolerance: 1e-2 },
  //   // viewbox: { tolerance: 1e-2 },
  //   // clipping: {},
  //   arcs: {},
  //   // symbol: {},
  //   // symbols: {},
  //   // blendModes: {},
  //   // 'gradients-1': {},
  //   // 'gradients-2': {},
  //   // 'gradients-3': {},
  //   // 'gradients-4': {},
  // };

  // paper.Base.each(svgFiles, function (options, name) {
  //   if (options) {
  //     name += '.svg';
  //     it('Import ' + name, () => {
  //       importSVG('./tests/assets/' + name, null, options);
  //     });
  //   }
  // });

  // it('Import inexistent file', () => {
  //   importSVG('assets/inexistent.svg', 'Load an inexistent SVG file should trigger an error', {
  //     expectError: true,
  //   });
  // });
});
