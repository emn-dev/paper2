import { describe, it } from 'vitest';
import { Point, Path, Matrix, paper, Rectangle, Shape, Size } from '~/index-core';
import { createSVG, equals } from './_helpers';

describe('Given: SvgImport', () => {
  it('Import SVG line', () => {
    const attrs = {
      x1: 5,
      x2: 45,
      y1: 5,
      y2: 45,
    };
    const imported = paper.project.importSVG(createSVG('line', attrs));
    const path = new Path.Line([attrs.x1, attrs.y1], [attrs.x2, attrs.y2]);
    equals(imported, path);
  });

  it('Import SVG rect', () => {
    const attrs = {
      x: 25,
      y: 25,
      width: 100,
      height: 100,
    };
    const imported = paper.project.importSVG(createSVG('rect', attrs), { expandShapes: true });
    const path = new Path.Rectangle(attrs);
    equals(imported, path);
  });

  it('Import SVG round rect', () => {
    const attrs = {
      x: 25,
      y: 25,
      rx: 50,
      ry: 50,
      width: 100,
      height: 100,
    };
    const imported = paper.project.importSVG(createSVG('rect', attrs), { expandShapes: true });
    const path = new Path.Rectangle(new Rectangle(attrs), new Size(attrs.rx, attrs.ry));
    equals(imported, path);
  });

  it('Import SVG ellipse', () => {
    const attrs = {
      cx: 300,
      cy: 80,
      rx: 100,
      ry: 50,
    };
    const imported = paper.project.importSVG(createSVG('ellipse', attrs), { expandShapes: true });
    const path = new Path.Ellipse({
      center: new Point(attrs.cx, attrs.cy),
      radius: new Point(attrs.rx, attrs.ry),
    });
    equals(imported, path);
  });

  it('Import SVG circle', () => {
    const attrs = {
      cx: 100,
      cy: 80,
      r: 50,
    };
    const imported = paper.project.importSVG(createSVG('circle', attrs), { expandShapes: true });
    const path = new Path.Circle({
      center: new Point(attrs.cx, attrs.cy),
      radius: attrs.r,
    });
    equals(imported, path);
  });

  function createPolyPath(str) {
    const points = str.split(' ').map(function (point) {
      return point.split(',').map(parseFloat);
    });
    const path = new Path();
    path.moveTo(points[0]);
    for (let i = 1; i < points.length; i++) path.lineTo(points[i]);
    return path;
  }

  it('Import SVG polygon', () => {
    const points = '100,10 40,180 190,60 10,60 160,180';
    const imported = paper.project.importSVG(
      createSVG('polygon', {
        points: points,
      })
    );
    const path = createPolyPath(points);
    path.closePath();
    equals(imported, path);
  });

  it('Import SVG polyline', () => {
    const points = '5,5 45,45 5,45 45,5';
    const imported = paper.project.importSVG(
      createSVG('polyline', {
        points: points,
      })
    );
    const path = createPolyPath(points);
    equals(imported, path);
  });

  // TODO: how to have fails show up in async way?
  it.skip('Import SVG Image', () => {
    const svg =
      '<?xml version="1.0" encoding="utf-8"?><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><image style="overflow:visible;enable-background:new    ;" width="300" height="67" id="e0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" transform="matrix(0.2149 0 0 0.2149 304.7706 197.8176)"></image></svg>';
    const imported = paper.project.importSVG(svg);
    const raster = imported.children[0];
    raster.on('load', () => {
      equals(raster.matrix, new Matrix(0.2149, 0, 0, 0.2149, 337.0056, 205.01675));
    });
  });

  it('Import complex CompoundPath and clone', () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M4,14h20v-2H4V14z M15,26h7v-2h-7V26z M15,22h9v-2h-9V22z M15,18h9v-2h-9V18z M4,26h9V16H4V26z M28,10V6H0v22c0,0,0,4,4,4 h25c0,0,3-0.062,3-4V10H28z M4,30c-2,0-2-2-2-2V8h24v20c0,0.921,0.284,1.558,0.676,2H4z"/></svg>';
    const item = paper.project.importSVG(svg);
    equals(item.clone(), item, null, { cloned: true });
  });

  it('Import SVG without insertion', () => {
    const svg = createSVG('path', { d: '' });
    let imported = paper.project.importSVG(svg, { insert: true });
    equals(function () {
      return imported.parent === paper.project.activeLayer;
    }, true);
    imported = paper.project.importSVG(svg, { insert: false });
    equals(function () {
      return imported.parent === null;
    }, true);
  });

  it('Import SVG switch', () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg"><switch><line x1="0" x2="10" y1="0" y2="10" fill="none"></line></switch></svg>';
    paper.project.importSVG(svg, {
      onLoad: function (item) {
        equals(item.className, 'Group');
        equals(item.children.length, 1);
        equals(item.firstChild.className, 'Group');
        equals(item.firstChild.children.length, 1);
        equals(item.firstChild.firstChild, new Path([new Point(0, 0), new Point(10, 10)]));
      },
    });
  });

  it('Import SVG string with leading line-breaks', () => {
    const svg =
      '\n<?xml version="1.0" encoding="utf-8"?>\n<!-- Some Comment  -->\n<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <rect fill="red" width="100" height="100"/>\n</svg>\n';
    const imported = paper.project.importSVG(svg);
    equals(function () {
      return imported !== null;
    }, true);
    equals(imported.children.length, 1);
    equals(
      imported.firstChild,
      new Shape.Rectangle({
        size: [100, 100],
        fillColor: 'red',
      })
    );
  });

  // TODO: need to think about how to handle this
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
  //       // const ok = !!(options && options.expectError);
  //       // QUnit.push(
  //       //   ok,
  //       //   false,
  //       //   !ok,
  //       //   (ok && message) || 'Loading SVG from a valid URL should not give an error: ' + error
  //       // );
  //     },
  //   });
  // }

  // if (!isNodeContext) {
  // JSDom does not have SVG rendering, so we can't test there.
  // const svgFiles = {
  //   butterfly: { tolerance: 1e-2 },
  //   viewbox: { tolerance: 1e-2 },
  //   clipping: {},
  //   arcs: {},
  //   symbol: {},
  //   symbols: {},
  //   blendModes: {},
  //   'gradients-1': {},
  //   'gradients-2': {},
  //   'gradients-3': {},
  //   'gradients-4': {},
  // };

  // paper.Base.each(svgFiles, function (options, name) {
  //   if (options) {
  //     name += '.svg';
  //     it('Import ' + name, () => {
  //       importSVG('assets/' + name, null, options);
  //     });
  //   }

  //   it('Import inexistent file', () => {
  //     importSVG('assets/inexistent.svg', 'Load an inexistent SVG file should trigger an error', {
  //       expectError: true,
  //     });
  //   });
  // });
});
