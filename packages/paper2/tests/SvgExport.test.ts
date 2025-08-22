import { describe, it } from 'vitest';
import { paper, Point, Path, Color, Group, Rectangle, Shape, Size, SymbolDefinition } from '~/index-core';
import { compareSVG, createSVG, equals } from './_helpers';

// TODO: these are going to need some figuring out... I think we will need a canvas instance

describe('Given: SvgExport', () => {
  function createPolyPath(str) {
    const points = str.split(' ').map(function (point) {
      return point.split(',').map(parseFloat);
    });
    const path = new Path();
    path.moveTo(points[0]);
    for (let i = 1; i < points.length; i++) path.lineTo(points[i]);
    return path;
  }

  it('Export SVG line', () => {
    const attrs = {
      x1: 5,
      x2: 45,
      y1: 5,
      y2: 45,
    };
    const path = new Path.Line([attrs.x1, attrs.y1], [attrs.x2, attrs.y2]);
    equals(path.exportSVG({ matchShapes: true }), createSVG('line', attrs));
  });

  it('Export SVG rect', () => {
    const attrs = {
      x: 25,
      y: 25,
      width: 100,
      height: 100,
    };
    const path = new Path.Rectangle(attrs);
    equals(path.exportSVG({ matchShapes: true }), createSVG('rect', attrs));
  });

  it('Export SVG round rect', () => {
    const attrs = {
      x: 25,
      y: 25,
      rx: 50,
      ry: 50,
      width: 100,
      height: 100,
    };
    const path = new Path.Rectangle(new Rectangle(attrs), new Size(attrs.rx, attrs.ry));
    equals(path.exportSVG({ matchShapes: true }), createSVG('rect', attrs));
  });

  it('Export SVG ellipse', () => {
    const attrs = {
      cx: 300,
      cy: 80,
      rx: 100,
      ry: 50,
    };
    const path = new Path.Ellipse({
      center: new Point(attrs.cx, attrs.cy),
      radius: new Point(attrs.rx, attrs.ry),
    });
    equals(path.exportSVG({ matchShapes: true }), createSVG('ellipse', attrs));
  });

  it('Export SVG circle', () => {
    const attrs = {
      cx: 100,
      cy: 80,
      r: 50,
    };
    const path = new Path.Circle({
      center: new Point(attrs.cx, attrs.cy),
      radius: attrs.r,
    });
    equals(path.exportSVG({ matchShapes: true }), createSVG('circle', attrs));
  });

  it('Export SVG polygon', () => {
    const points = '100,10 40,180 190,60 10,60 160,180';
    const path = createPolyPath(points);
    path.closePath();
    equals(
      path.exportSVG({ matchShapes: true }),
      createSVG('polygon', {
        points: points,
      })
    );
  });

  it('Export SVG polyline', () => {
    const points = '5,5 45,45 5,45 45,5';
    const path = createPolyPath(points);
    equals(
      path.exportSVG({ matchShapes: true }),
      createSVG('polyline', {
        points: points,
      })
    );
  });

  it('Export SVG path defaults to precision 5', () => {
    const path = new Path('M0.123456789,1.9l0.8,1.1');
    equals(path.exportSVG({}).getAttribute('d'), 'M0.12346,1.9l0.8,1.1');
  });

  it('Export SVG path at precision 0', () => {
    const path = new Path('M0.123456789,1.9l0.8,1.1');
    equals(path.exportSVG({ precision: 0 }).getAttribute('d'), 'M0,2l1,1');
  });

  it('Export SVG viewbox attribute with top left at origin', () => {
    new Path.Rectangle(new Point(10, 10), new Size(80));
    const rectangle = new Rectangle(new Point(0, 0), new Size(100));
    equals(paper.project.exportSVG({ bounds: rectangle }).getAttribute('viewBox'), '0,0,100,100');
  });

  // if (!isNodeContext) {
  // JSDom does not have SVG rendering, so we can't test there.
  it('Export transformed shapes', () => {
    let rect = new Shape.Rectangle({
      point: [200, 100],
      size: [200, 300],
      fillColor: 'red',
    });
    rect.rotate(40);

    const circle = new Shape.Circle({
      center: [200, 300],
      radius: 100,
      fillColor: 'green',
    });
    circle.scale(0.5, 1);
    circle.rotate(40);

    const ellipse = new Shape.Ellipse({
      point: [300, 300],
      size: [100, 200],
      fillColor: 'blue',
    });
    ellipse.rotate(-40);

    rect = new Shape.Rectangle({
      point: [250, 20],
      size: [200, 300],
      radius: [40, 20],
      fillColor: 'yellow',
    });
    rect.rotate(-20);
    const svg = paper.project.exportSVG({ bounds: 'content', asString: true });
    compareSVG(() => '', svg, paper.project.activeLayer);
  });

  it('Export not invertible item.matrix', () => {
    new Shape.Rectangle({
      point: [100, 100],
      size: [100, 100],
      fillColor: 'red',
      matrix: [1, 1, 1, 1, 1, 1],
    });
    const svg = paper.project.exportSVG({ bounds: 'content', asString: true });
    compareSVG(() => '', svg, paper.project.activeLayer);
  });

  it('Export gradients', () => {
    const bounds = new Rectangle(new Size(300, 600));
    const stops = [new Color(1, 1, 0, 0), 'red', 'black'];

    const radius = bounds.width * 0.4;
    let from = new Point(bounds.center.x);
    let to = from.add(radius, 0);

    new Path.Circle({
      center: from,
      radius: radius,
      fillColor: {
        stops: stops,
        radial: true,
        origin: from,
        destination: to,
      },
      strokeColor: 'black',
    });

    from = bounds.leftCenter;
    to = bounds.bottomRight;

    const rect = new Path.Rectangle({
      from: from,
      to: to,
      fillColor: {
        stops: stops,
        radial: false,
        origin: from,
        destination: to,
      },
      strokeColor: 'black',
    });

    rect.rotate(45).scale(0.7);

    const svg = paper.project.exportSVG({ bounds: 'content', asString: true });
    compareSVG(() => '', svg, paper.project.activeLayer, null, {
      tolerance: 1e-2,
    });
  });

  it('Export SVG with clipping defs', () => {
    new Group({
      children: [
        new Path.Circle({
          center: [150, 150],
          radius: 50,
        }),
        new Path.Rectangle({
          point: [100, 100],
          size: [100, 100],
          fillColor: 'green',
        }),
      ],
      clipped: true,
    });
    const svg = paper.project.exportSVG({ bounds: 'content', asString: true });
    compareSVG(() => '', svg, paper.project.activeLayer, null, {
      tolerance: 1e-2,
    });
  });

  it('Export symbol with stroke', () => {
    const item = new Path.Circle({
      center: [0, 0],
      radius: 50,
      strokeColor: 'blue',
      strokeWidth: 10,
    });

    // const symbol = new Symbol(item);
    const symbol = new SymbolDefinition(item);
    symbol.place([50, 50]);

    const svg = paper.project.exportSVG({ bounds: 'content', asString: true });
    compareSVG(() => '', svg, paper.project.activeLayer);
  });
  // }
});
