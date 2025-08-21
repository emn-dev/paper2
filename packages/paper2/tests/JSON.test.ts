import { describe, it } from 'vitest';
import {
  paper,
  Point,
  Path,
  Size,
  Project,
  Rectangle,
  CompoundPath,
  Group,
  SymbolDefinition,
  PointText,
  Color,
  Gradient,
} from '~/index-core';
import { equals } from './_helpers';

function testExportImportJSON(project) {
  // Use higher precision than in comparissons, for bounds
  const json = project.exportJSON({ precision: 8 });
  const project2 = new Project();
  project2.importJSON(json);
  equals(project, project2, null, { dontShareProject: true });
}

describe('Given: JSON', () => {
  it('Circles', () => {
    const topLeft = new Point(200, 200);
    const size = new Size(150, 100);
    const rectangle = new Rectangle(topLeft, size);
    const path = new Path.Ellipse(rectangle);
    path.fillColor = 'black';

    const topLeft2 = new Point(5, 400);
    const size2 = new Size(100, 50);
    const rectangle2 = new Rectangle(topLeft2, size2);
    const path2 = new Path.Ellipse(rectangle2);
    path2.fillColor = 'yellow';

    const path3 = new Path.Circle(new Point(50, 50), 25);
    path3.fillColor = 'red';

    testExportImportJSON(paper.project);
  });

  it('CompoundPath', () => {
    paper.project.currentStyle.fillColor = 'black';
    const path1 = new Path.Rectangle([200, 200], [100, 100]);
    const path2 = new Path.Rectangle([50, 50], [200, 200]);
    const path3 = new Path.Rectangle([0, 0], [400, 400]);
    new CompoundPath(path1, path2, path3);

    testExportImportJSON(paper.project);
  });

  it('Empty Path', () => {
    new Path();

    testExportImportJSON(paper.project);
  });

  it.skip('Gradients', () => {
    const path = new Path.Circle([100, 100], 40);
    const gradient = new Gradient(['yellow', 'red', 'black'], true);
    const from = path.position;
    const to = path.bounds.rightCenter;
    const gradientColor = new Color(gradient, from, to);
    path.fillColor = gradientColor;
    path.strokeColor = 'black';
    testExportImportJSON(paper.project);
  });

  it('Group transform', () => {
    const circle1 = new Path.Circle([100, 100], 50);
    circle1.fillColor = 'red';
    const circle2 = new Path.Circle([200, 100], 50);
    circle2.fillColor = 'blue';
    const group = new Group(circle1, circle2);
    group.translate([100, 100]);
    group.scale(0.5);
    group.rotate(10);

    testExportImportJSON(paper.project);
  });

  it.skip('Rectangle testing', () => {
    const point1 = new Point(10, 10);
    const size1 = new Size(50, 50);
    const rectangle1 = new Rectangle(point1, size1);
    const path1 = new Path.Rectangle(rectangle1);
    path1.strokeColor = 'black';
    path1.fillColor = 'red';
    path1.name = 'square1';
    path1.strokeCap = 'square';
    path1.opacity = 0.1;
    path1.dashArray = [5, 2];
    path1.dashOffset = 0;

    const point2 = new Point(75, 75);
    const point22 = new Point(100, 100);
    const path2 = new Path.Rectangle(point2, point22);
    path2.strokeColor = 'red';
    path2.strokeWidth = 4;
    path2.fillColor = 'blue';
    path2.name = 'square2';
    path2.strokeCap = 'butt';

    const point3 = new Point(150, 150);
    const size3 = new Size(50, 50);
    const rectangle3 = new Rectangle(point3, size3);
    const path3 = new Path.Rectangle(rectangle3);
    path3.strokeColor = 'blue';

    const point4 = new Point(200, 200);
    const size4 = new Size(100, 100);
    const rectangle4 = new Rectangle(point4, size4);
    const cornerSize4 = new Size(30, 30);
    const path4 = new Path.Rectangle(rectangle4, cornerSize4);
    path4.strokeColor = 'yellow';
    path4.fillColor = 'purple';

    testExportImportJSON(paper.project);
  });

  it('RectanglSymbolsesting', () => {
    const ellipse = new Path.Ellipse({
      from: [0, 0],
      to: [200, 100],
      fillColor: 'red',
    });
    const definition = new SymbolDefinition(ellipse);
    const p1 = definition.place([100, 100]);
    p1.rotate(45);
    const p2 = definition.place([300, 200]);
    p2.rotate(-30);

    testExportImportJSON(paper.project);
  });

  it('PointText testing', () => {
    const text = new PointText(new Point(50, 100));
    text.fillColor = 'black';
    text.content = 'This is a test';

    const text2 = new PointText(new Point(100, 150));
    text2.fillColor = 'red';
    text2.strokeWidth = '4';
    text2.content = 'This is also a test';

    text.rotate(45);
    text.shear(0.85, 0.15);
    text.scale(0.85, 2);

    testExportImportJSON(paper.project);
  });

  it('transform test 1', () => {
    const circlePath = new Path.Circle(new Point(280, 100), 25);
    circlePath.strokeColor = 'black';
    circlePath.fillColor = 'white';

    const clones = 30;
    const angle = 360 / clones;

    for (let i = 0; i < clones; i++) {
      const clonedPath = circlePath.clone();
      clonedPath.rotate(angle * i, circlePath.bounds.topLeft);
    }
    testExportImportJSON(paper.project);
  });

  it('transform test 2', () => {
    const path = new Path.Rectangle(new Point(50, 50), new Size(100, 50));
    path.style = {
      fillColor: 'white',
      strokeColor: 'black',
    };
    const copy = path.clone();
    copy.strokeColor = 'red';
    copy.rotate(-45);
    copy.scale(0.5);
    testExportImportJSON(paper.project);
  });

  it('Item#name', () => {
    new Path({
      name: 'dave',
    });
    testExportImportJSON(paper.project);
  });

  it('Item#data', () => {
    const path = new Path();
    path.data = {
      string: '----',
      number: 1234,
      array: ['a ray', 'some rays'],
      bool: true,
      nil: null,
      point: new Point(12, 34),
      size: new Size(12, 34),
      rectangle: new Rectangle([12, 34], [56, 78]),
      deep: {
        deeper: {
          deepest: true,
        },
      },
    };
    testExportImportJSON(paper.project);
  });

  it('Color', () => {
    new Path({
      fillColor: new Color(1, 1, 0, 0.5),
    });
    testExportImportJSON(paper.project);
  });

  it('Color#importJSON()', () => {
    const topLeft = [100, 100];
    const bottomRight = [200, 200];

    const path = new Path.Rectangle({
      topLeft: topLeft,
      bottomRight: bottomRight,
      // Fill the path with a gradient of three color stops
      // that runs between the two points we defined earlier:
      fillColor: {
        gradient: {
          stops: [
            ['yellow', 0],
            ['red', 0.5],
            ['blue', 1],
          ],
        },
        origin: topLeft,
        destination: bottomRight,
      },
    });

    const json = path.fillColor.exportJSON();
    const id = path.fillColor.gradient._id;
    const color = new Color();
    const str =
      '[["dictionary",{"#' +
      id +
      '":["Gradient",[[[1,1,0],0],[[1,0,0],0.5],[[0,0,1],1]],false]}],["Color","gradient",["#' +
      id +
      '"],[100,100],[200,200]]]';

    equals(json, str);

    equals(function () {
      return color.importJSON(json) === color;
    }, true);

    equals(function () {
      return color.equals(path.fillColor);
    }, true);
  });

  it('Path#importJSON()', () => {
    const path = new Path();
    const layer = paper.project.activeLayer;
    equals(function () {
      return path.parent === layer;
    }, true);
    path.importJSON(
      '["Path",{"segments":[[[50,100],[0,27.61424],[0,-27.61424]],[[100,50],[-27.61424,0],[27.61424,0]],[[150,100],[0,-27.61424],[0,27.61424]],[[100,150],[27.61424,0],[-27.61424,0]]],"closed":true,"fillColor":[1,0,0]}]'
    );
    // TODO: why these are broken?
    // equals(
    //   function () {
    //     return path.bounds;
    //   },
    //   { x: 50, y: 50, width: 100, height: 100 }
    // );
    // equals(
    //   function () {
    //     return path.fillColor;
    //   },
    //   { red: 1, green: 0, blue: 0 }
    // );
    equals(function () {
      return layer.firstChild === path;
    }, true);
    equals(function () {
      return path.parent === layer;
    }, true);
  });

  it('Item#importJSON() does not override Item#insert()', () => {
    const path = new Path();
    equals(typeof path.insert, 'function');
    path.importJSON(path.exportJSON());
    equals(typeof path.insert, 'function');
  });
});
