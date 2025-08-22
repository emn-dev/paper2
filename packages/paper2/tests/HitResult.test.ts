import { describe, it } from 'vitest';
import {
  paper,
  HitResult,
  Path,
  Point,
  Segment,
  Size,
  Color,
  CompoundPath,
  Group,
  PointText,
  Shape,
  SymbolDefinition,
} from '~/index-core';
import { equals } from './_helpers';

describe('Given: HitResult', () => {
  it('Hit-testing options', () => {
    const defaultOptions = {
      type: null,
      tolerance: paper.settings.hitTolerance,
      fill: true,
      stroke: true,
      segments: true,
      handles: false,
      ends: false,
      position: false,
      center: false,
      bounds: false,
      guides: false,
      selected: false,
    };
    equals(HitResult.getOptions(), defaultOptions, 'Default options');
  });

  function testHitResult(hitResult, expeced, message = '') {
    equals(
      !!hitResult,
      !!expeced,
      message ? message : expeced ? 'A HitResult should be returned.' : 'No HitResult should be returned.'
    );
    if (hitResult && expeced) {
      if (expeced.type) {
        equals(hitResult.type, expeced.type, "hitResult.type == '" + expeced.type + "'");
      }
      if (expeced.item) {
        equals(hitResult.item == expeced.item, true, 'hitResult.item == ' + expeced.item);
      }
      if (expeced.name) {
        equals(hitResult.name, expeced.name, "hitResult.name == '" + expeced.name + "'");
      }
      if (expeced.point) {
        equals(hitResult.point.toString(), expeced.point.toString(), "hitResult.point == '" + expeced.point + "'");
      }
      if (expeced.segment) {
        equals(hitResult.segment == expeced.segment, true, 'hitResult.segment == ' + expeced.segment);
      }
    }
  }

  it('hitting a filled shape', () => {
    const path = new Path.Circle([50, 50], 50);

    path.hitTest([75, 75]);
    testHitResult(path.hitTest([75, 75]), null, 'Since the path is not filled, the hit-test should return null.');

    path.fillColor = 'red';
    testHitResult(path.hitTest([75, 75]), {
      type: 'fill',
      item: path,
    });
  });

  it('the item on top should be returned', () => {
    const path = new Path.Circle([50, 50], 50);
    path.fillColor = 'red';

    // The cloned path is lying above the path:
    const copy = path.clone();

    testHitResult(paper.project.hitTest([75, 75]), {
      type: 'fill',
      item: copy,
    });
  });

  it('hitting a stroked path', () => {
    const path = new Path([0, 0], [50, 0]);

    // We are hit-testing with an offset of 5pt on a path with a stroke width
    // of 10:

    testHitResult(
      paper.project.hitTest([25, 5]),
      null,
      'Since the path is not stroked yet, the hit-test should return null.'
    );

    path.strokeColor = 'black';
    path.strokeWidth = 10;

    testHitResult(path.hitTest([25, 5]), {
      type: 'stroke',
      item: path,
    });
  });

  it('hitting a selected path', () => {
    const path = new Path.Circle([50, 50], 50);
    path.fillColor = 'red';

    testHitResult(
      paper.project.hitTest([75, 75], { selected: true }),
      null,
      'Since the path is not stroked yet, the hit-test should return null.'
    );

    path.selected = true;

    testHitResult(paper.project.hitTest([75, 75]), {
      type: 'fill',
      item: path,
    });
  });

  it('hitting path segments', () => {
    const path = new Path([0, 0], [10, 10], [20, 0]);

    testHitResult(paper.project.hitTest([10, 10]), {
      type: 'segment',
      item: path,
    });
  });

  it('hitting the center and position of a path', () => {
    const path = new Path([0, 0], [100, 100], [200, 0]);
    path.closed = true;
    const center = path.bounds.center,
      position = path.position,
      positionResult = {
        type: 'position',
        item: path,
        point: position,
      },
      centerResult = {
        type: 'center',
        item: path,
        point: center,
      };

    testHitResult(
      paper.project.hitTest(position, {
        center: true,
      }),
      centerResult
    );

    const offset = new Point(1, 1);
    testHitResult(
      paper.project.hitTest(position.add(offset), {
        tolerance: offset.length,
        center: true,
      }),
      centerResult,
      'position with tolerance'
    );

    testHitResult(
      paper.project.hitTest(position, {
        position: true,
      }),
      positionResult
    );

    testHitResult(
      paper.project.hitTest(center, {
        position: true,
      }),
      positionResult
    );

    path.pivot = [100, 100];

    testHitResult(
      paper.project.hitTest(center, {
        position: true,
      }),
      null,
      'with pivot, the position should not be in the center'
    );

    testHitResult(
      paper.project.hitTest(path.position, {
        position: true,
      }),
      {
        type: 'position',
        item: path,
        point: path.position,
      }
    );
  });

  it('hitting path handles (1)', () => {
    const path = new Path.Circle(new Point(), 10);
    path.firstSegment.handleIn = [-50, 0];
    path.firstSegment.handleOut = [50, 0];
    const firstPoint = path.firstSegment.point;

    testHitResult(
      paper.project.hitTest(firstPoint.add(50, 0), {
        handles: true,
      }),
      {
        type: 'handle-out',
        item: path,
      }
    );

    testHitResult(
      paper.project.hitTest(firstPoint.add(-50, 0), {
        handles: true,
      }),
      {
        type: 'handle-in',
        item: path,
      }
    );
  });

  it('hitting path handles (2)', () => {
    const path = new Path(
      new Segment({
        point: [0, 0],
        handleIn: [-50, -50],
        handleOut: [50, 50],
      })
    );

    testHitResult(
      paper.project.hitTest([50, 50], {
        handles: true,
      }),
      {
        type: 'handle-out',
        item: path,
      }
    );

    testHitResult(
      paper.project.hitTest([-50, -50], {
        handles: true,
      }),
      {
        type: 'handle-in',
        item: path,
      }
    );
  });

  it('hit-testing stroke on segment point of a path', () => {
    const path = new Path([0, 0], [50, 50], [100, 0]);
    path.strokeColor = 'black';
    path.closed = true;

    let error = null;
    try {
      paper.project.hitTest(path.firstSegment.point, {
        stroke: true,
      });
    } catch (e) {
      error = e;
    }
    let description = 'This hit-test should not throw an error';
    if (error) description += ': ' + error;
    equals(error == null, true, description);
  });

  it('hit-testing a point that is extremely close to a curve', () => {
    const path = new Path.Rectangle([0, 0], [100, 100]);
    // A point whose x value is extremely close to 0:
    const point = new Point(2.842 / Math.pow(10, 14), 0);
    let error;
    try {
      path.hitTest(point, {
        stroke: true,
      });
    } catch (e) {
      error = e;
    }
    let description = 'This hit-test should not throw an error';
    if (error) description += ': ' + error;
    equals(error == null, true, description);
  });

  it('hitting path ends', () => {
    const path = new Path([0, 0], [50, 50], [100, 0]);
    path.closed = true;

    equals(
      function () {
        return !paper.project.hitTest(path.firstSegment.point, {
          ends: true,
        });
      },
      true,
      'No HitResult should be returned, because the path is closed.'
    );

    path.closed = false;

    testHitResult(
      paper.project.hitTest(path.lastSegment.point, {
        ends: true,
      }),
      {
        type: 'segment',
        item: path,
        segment: path.lastSegment,
      }
    );

    equals(
      function () {
        return !paper.project.hitTest(path.segments[1].point, {
          ends: true,
        });
      },
      true,
      'No HitResult should be returned, since the second segment is not an end'
    );
  });

  it('When a path is closed, the end of a path cannot be hit.', () => {
    const path = new Path([0, 0], [50, 50], [100, 0]);
    path.closed = true;

    const hitResult = paper.project.hitTest([0, 0], {
      ends: true,
    });
    equals(
      function () {
        return !hitResult;
      },
      true,
      'When a path is closed, the end of a path cannot be hit.'
    );
  });

  it('hitting path bounding box', () => {
    const path = new Path.Circle({
      center: [100, 100],
      radius: 50,
      fillColor: 'red',
    });

    testHitResult(
      paper.project.hitTest(path.bounds.topLeft, {
        bounds: true,
      }),
      {
        type: 'bounds',
        item: path,
        name: 'top-left',
        point: path.bounds.topLeft,
      }
    );
  });

  it('hitting raster bounding box', () => {
    const path = new Path.Circle({
      center: [100, 100],
      radius: 50,
      fillColor: 'red',
    });
    const raster = path.rasterize(72);
    path.remove();

    testHitResult(
      paper.project.hitTest(raster.bounds.topLeft, {
        bounds: true,
      }),
      {
        type: 'bounds',
        item: raster,
        name: 'top-left',
        point: path.bounds.topLeft,
      }
    );
  });

  it('hitting guides', () => {
    const path = new Path.Circle({
      center: [100, 100],
      radius: 50,
      fillColor: 'red',
    });
    const copy = path.clone();

    const result = paper.project.hitTest(path.position);

    equals(result && result.item, copy, 'The copy should be returned, because it is on top.');

    path.guide = true;

    const result2 = paper.project.hitTest(path.position, {
      guides: true,
      fill: true,
    });

    equals(result2 && result2.item, path, 'The path should be returned, because it is a guide.');
  });

  it('hitting raster items', () => {
    // Create a path, rasterize it and then remove the path:
    const path = new Path.Rectangle(new Point(), new Size(320, 240));
    path.fillColor = 'red';
    const raster = path.rasterize(72);

    const hitResult = paper.project.hitTest(new Point(160, 120));

    equals(
      function () {
        return hitResult && hitResult.item == raster;
      },
      true,
      'Hit raster item before moving'
    );

    // Move the raster:
    raster.translate(100, 100);

    const hitResult2 = paper.project.hitTest(new Point(160, 120));

    equals(
      function () {
        return hitResult2 && hitResult2.item == raster;
      },
      true,
      'Hit raster item after moving'
    );
  });

  it('hitting path with a text item in the project', () => {
    const path = new Path.Rectangle(new Point(50, 50), new Point(100, 100));
    path.fillColor = 'blue';

    const hitResult = paper.project.hitTest(new Point(75, 75));

    equals(
      function () {
        return hitResult && hitResult.item == path;
      },
      true,
      'Hit path item before adding text item'
    );

    const text1 = new PointText(30, 30);
    text1.content = 'Text 1';

    const hitResult2 = paper.project.hitTest(new Point(75, 75));

    equals(
      function () {
        return !!hitResult2;
      },
      true,
      'A hitresult should be returned.'
    );

    equals(
      function () {
        return !!hitResult && hitResult.item == path;
      },
      true,
      'We should have hit the path'
    );
  });

  it('hit-testing of items that come after a transformed group.', () => {
    paper.project.currentStyle.fillColor = 'black';
    const point1 = new Point(100, 100);
    const point2 = new Point(140, 100);
    const delta = new Point(250, 0);

    const path1 = new Path.Circle(point1, 20);
    path1.name = 'path1';
    const path2 = new Path.Circle(point2, 20);
    path2.name = 'path2';

    const group = new Group(path2);
    group.name = 'group';

    let hitResult = paper.project.hitTest(point1);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path1,
      'Hit testing project for point1 should give us path1.'
    );

    hitResult = paper.project.hitTest(point2);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path2,
      'Hit testing project for point2 should give us path2.'
    );

    hitResult = paper.project.hitTest(point2);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path2,
      'Hit testing project for point2 should give us path2.'
    );

    group.translate(delta);

    hitResult = paper.project.hitTest(point1);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path1,
      'After translating group, hit-testing project for point1 should give us path1.'
    );

    hitResult = paper.project.hitTest(point2.add(delta));
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path2,
      'After translating group, hit-testing project for point2 + delta should give us path2.'
    );

    hitResult = path1.hitTest(point1);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path1,
      'After translating group, hit-testing path1 for point1 should give us path1.'
    );

    group.moveBelow(path1);

    hitResult = paper.project.hitTest(point1);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path1,
      'After moving group before path1, hit-testing project for point1 should give us path1.'
    );

    hitResult = paper.project.hitTest(point2.add(delta));
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path2,
      'After moving group before path1, hit-testing project for point2 + delta should give us path2.'
    );

    hitResult = path1.hitTest(point1);
    equals(
      function () {
        return hitResult && hitResult.item;
      },
      path1,
      'After moving group before path1, hit-testing path1 for point1 should give us path1.'
    );
  });

  it('hit-testing of placed symbols.', () => {
    const point = new Point(100, 100);

    const path = new Path.Circle([0, 0], 20);
    path.fillColor = 'black';
    const definition = new SymbolDefinition(path);
    const placedItem = definition.place(point);
    const hitResult = placedItem.hitTest(point);
    equals(
      function () {
        return hitResult && hitResult.item == placedItem;
      },
      true,
      'hitResult.item should be placedItem'
    );
  });

  it('hit-testing the corner of a rectangle with miter stroke.', () => {
    const rect = new Path.Rectangle({
      rectangle: [100, 100, 300, 200],
      fillColor: '#f00',
      strokeColor: 'blue',
      strokeJoin: 'miter',
      strokeWidth: 20,
    });
    equals(function () {
      return rect.hitTest(rect.strokeBounds.topRight) != null;
    }, true);
  });

  it('hit-testing invisible items.', () => {
    const point = new Point(0, 0);
    const circle1 = new Path.Circle({
      center: point.subtract([25, 0]),
      radius: 50,
      fillColor: 'red',
    });
    const circle2 = new Path.Circle({
      center: point.add([25, 0]),
      radius: 50,
      fillColor: 'blue',
    });

    equals(function () {
      return paper.project.hitTest(point).item === circle2;
    }, true);

    circle2.visible = false;

    equals(function () {
      return paper.project.hitTest(point).item === circle1;
    }, true);
  });

  it('hit-testing guides.', () => {
    const point = new Point(0, 0);
    const circle1 = new Path.Circle({
      center: point.subtract([25, 0]),
      radius: 50,
      fillColor: 'red',
    });
    const circle2 = new Path.Circle({
      center: point.add([25, 0]),
      radius: 50,
      fillColor: 'blue',
    });

    const strokePoint = circle2.bounds.leftCenter;

    equals(function () {
      return paper.project.hitTest(strokePoint).item === circle2;
    }, true);

    circle2.guide = true;

    equals(function () {
      return paper.project.hitTest(strokePoint).item === circle1;
    }, true);

    equals(function () {
      const result = paper.project.hitTest(strokePoint, {
        guides: true,
        fill: true,
      });
      return result && result.item === circle2;
    }, true);
  });

  it('hit-testing fills with tolerance', () => {
    const path = new Path.Rectangle({
      from: [50, 50],
      to: [200, 200],
      fillColor: 'red',
    });

    const tolerance = 10;
    const point = path.bounds.bottomRight.add(tolerance / Math.SQRT2);

    equals(function () {
      const result = paper.project.hitTest(point, {
        tolerance: tolerance,
        fill: true,
      });
      return result && result.item === path;
    }, true);

    const point2 = new Point(20, 20);
    const size = new Size(40, 40);
    const hitPoint = new Point(10, 10);
    const options = {
      fill: true,
      tolerance: 20,
    };

    const shapeRect = new Shape.Rectangle(point2, size);
    shapeRect.fillColor = 'black';

    const pathRect = new Path.Rectangle(point2, size);
    pathRect.fillColor = 'black';

    equals(function () {
      const hit = shapeRect.hitTest(hitPoint, options);
      return hit && hit.type === 'fill';
    }, true);

    equals(function () {
      const hit = pathRect.hitTest(hitPoint, options);
      return hit && hit.type === 'fill';
    }, true);
  });

  it('hit-testing compound-paths', () => {
    const center = new Point(100, 100);
    const path1 = new Path.Circle({
      center: center,
      radius: 100,
    });
    const path2 = new Path.Circle({
      center: center,
      radius: 50,
    });
    const compoundPath = new CompoundPath({
      children: [path1, path2],
      fillColor: 'blue',
      fillRule: 'evenodd',
    });
    // When hit-testing a side, we should get a result on the torus
    equals(function () {
      const result = paper.project.hitTest(center.add([75, 0]), {
        fill: true,
      });
      return result && result.item === compoundPath;
    }, true);
    // When hit-testing the center, we should not get a result on the torus
    equals(function () {
      const result = paper.project.hitTest(center, {
        fill: true,
      });
      return result === null;
    }, true);
    // When asking specifically for paths, she should get the top-most path in
    // the center (the one that cuts out the hole)
    equals(function () {
      const result = paper.project.hitTest(center, {
        class: Path,
        fill: true,
      });
      return result && result.item === path2;
    }, true);
  });

  it('hit-testing clipped items', () => {
    const rect = new Path.Rectangle({
      point: [50, 150],
      size: [100, 50],
      fillColor: 'red',
    });
    const circle = new Path.Circle({
      center: [100, 200],
      radius: 20,
      fillColor: 'green',
    });
    const group = new Group({
      children: [rect, circle],
    });
    group.clipped = true;

    const point1 = new Point(100, 190);
    const point2 = new Point(100, 210);

    equals(function () {
      const result = paper.project.hitTest(point1);
      return result && result.item === circle;
    }, true);

    equals(function () {
      const result = paper.project.hitTest(point2);
      return result === null;
    }, true);
  });

  it('hit-testing with a match function', () => {
    const point = new Point(100, 100),
      red = new Color('red'),
      green = new Color('green'),
      blue = new Color('blue');
    const c1 = new Path.Circle({
      center: point,
      radius: 50,
      fillColor: red,
    });
    const c2 = new Path.Circle({
      center: point,
      radius: 50,
      fillColor: green,
    });
    const c3 = new Path.Circle({
      center: point,
      radius: 50,
      fillColor: blue,
    });

    equals(function () {
      const result = paper.project.hitTest(point, {
        fill: true,
        match: function (res) {
          return res.item.fillColor == red;
        },
      });
      return result && result.item === c1;
    }, true);
    equals(function () {
      const result = paper.project.hitTest(point, {
        fill: true,
        match: function (res) {
          return res.item.fillColor == green;
        },
      });
      return result && result.item === c2;
    }, true);
    equals(function () {
      const result = paper.project.hitTest(point, {
        fill: true,
        match: function (res) {
          return res.item.fillColor == blue;
        },
      });
      return result && result.item === c3;
    }, true);
  });

  it('hit-testing for all items', () => {
    const c1 = new Path.Circle({
      center: [100, 100],
      radius: 40,
      fillColor: 'red',
    });
    const c2 = new Path.Circle({
      center: [120, 120],
      radius: 40,
      fillColor: 'green',
    });
    const c3 = new Path.Circle({
      center: [140, 140],
      radius: 40,
      fillColor: 'blue',
    });

    equals(function () {
      const result = paper.project.hitTestAll([60, 60]);
      return result.length === 0;
    }, true);

    equals(function () {
      const result = paper.project.hitTestAll([80, 80]);
      return result.length === 1 && result[0].item === c1;
    }, true);

    equals(function () {
      const result = paper.project.hitTestAll([100, 100]);
      return result.length === 2 && result[0].item === c2 && result[1].item === c1;
    }, true);

    equals(function () {
      const result = paper.project.hitTestAll([120, 120]);
      return result.length === 3 && result[0].item === c3 && result[1].item === c2 && result[2].item === c1;
    }, true);

    equals(function () {
      const result = paper.project.hitTestAll([140, 140]);
      return result.length === 2 && result[0].item === c3 && result[1].item === c2;
    }, true);

    equals(function () {
      const result = paper.project.hitTestAll([160, 160]);
      return result.length === 1 && result[0].item === c3;
    }, true);

    equals(function () {
      const result = paper.project.hitTestAll([180, 180]);
      return result.length === 0;
    }, true);
  });

  it('hit-testing shapes with strokes and rounded corners (#1207)', () => {
    const rect = new Shape.Rectangle({
      size: [300, 180],
      strokeWidth: 30,
      strokeColor: 'black',
      fillColor: 'blue',
      radius: 90,
    });

    const path = rect.toPath();
    path.visible = false;

    // Test a few shape stroke hit-test edge cases that are right between the
    // rounded corners and the straight parts.

    testHitResult(paper.project.hitTest([90, -10]), {
      type: 'stroke',
    });
    testHitResult(paper.project.hitTest([90, 190]), {
      type: 'stroke',
    });
    testHitResult(paper.project.hitTest([-10, 90]), {
      type: 'stroke',
    });

    // Test at regular intervals along the stroke, and step away from the center
    // in both directions to hit-test

    for (let pos = 0; pos < path.length; pos += 10) {
      const loc = path.getLocationAt(pos),
        step = loc.normal.multiply(5);
      testHitResult(paper.project.hitTest(loc.point.add(step)), {
        type: 'stroke',
      });
      testHitResult(paper.project.hitTest(loc.point.subtract(step)), {
        type: 'stroke',
      });
    }
  });

  it('hit-testing scaled items with different settings of view.zoom and item.strokeScaling (#1195)', () => {
    function testItem(ctor, zoom, strokeScaling) {
      const item = new ctor.Rectangle({
        point: [100, 100],
        size: [100, 100],
        fillColor: 'red',
        strokeColor: 'black',
        strokeWidth: 10,
        strokeScaling: strokeScaling,
        applyMatrix: true,
      });
      item.scale(2);
      paper.view.zoom = zoom;

      const tolerance = 10,
        options = { tolerance: tolerance, fill: true, stroke: true },
        bounds = item.strokeBounds,
        point = bounds.leftCenter,
        name = ctor.name + '.Rectangle, strokeScaling = ' + strokeScaling + ', zoom = ' + zoom;

      testHitResult(
        paper.project.hitTest(point.subtract(tolerance + 1, 0), options),
        null,
        name + ' outside of stroke'
      );
      testHitResult(
        paper.project.hitTest(point.subtract(tolerance, 0), options),
        { type: 'stroke' },
        name + ' on stroke within tolerance'
      );
      testHitResult(paper.project.hitTest(point, options), { type: 'stroke' }, name + ' on stroke');
      item.remove();
    }

    testItem(Shape, 1, false);
    testItem(Shape, 1, true);
    testItem(Shape, 2, false);
    testItem(Shape, 2, true);

    testItem(Path, 1, false);
    testItem(Path, 1, true);
    testItem(Path, 2, false);
    testItem(Path, 2, true);
  });

  it('hit-testing items scaled to 0', () => {
    const item = new Shape.Rectangle({
      point: [0, 0],
      size: [100, 100],
      fillColor: 'red',
      selected: true,
    });

    item.scale(0);

    testHitResult(paper.project.hitTest(item.position), null, 'should not throw an exception.');
  });

  // TODO: project.hitTest(point, {type: AnItemType});
});
