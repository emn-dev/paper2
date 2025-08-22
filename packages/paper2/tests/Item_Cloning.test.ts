import { describe, it } from 'vitest';
import {
  Point,
  Path,
  Color,
  CompoundPath,
  Gradient,
  Group,
  paper,
  PointText,
  Shape,
  SymbolDefinition,
  SymbolItem,
} from '~/index-core';
import { equals } from './_helpers';

describe('Given: Item_Cloning', () => {
  function cloneAndCompare(item) {
    const copy = item.clone();
    equals(function () {
      return item.parent == copy.parent;
    }, true);
    equals(function () {
      // Cloned items appear above the original.
      return item.nextSibling == copy;
    }, true);
    if (item.name) {
      equals(function () {
        return copy.parent.children[copy.name] == copy;
      }, true);
    }
    equals(copy, item, 'item.clone()', { cloned: true });
    // Remove the cloned item to restore the document:
    copy.remove();
  }

  it('Path#clone()', () => {
    const path = new Path([10, 20], [30, 40]);
    path.closed = true;
    path.name = 'test';
    path.style = {
      strokeCap: 'round',
      strokeJoin: 'round',
      dashOffset: 10,
      dashArray: [10, 2, 10],
      fillColor: new Color(0, 0, 1),
      strokeColor: new Color(0, 0, 1),
      miterLimit: 5,
    };
    path.clockwise = false;
    path.opacity = 0.5;
    path.locked = true;
    path.visible = false;
    path.blendMode = 'multiply';
    path.clipMask = true;
    path.selected = true;
    cloneAndCompare(path);
  });

  it('Path#clone() with gradient Color', () => {
    const colors = ['red', 'green', 'black'];
    const gradient = new Gradient(colors, true);
    const color = new Color(gradient, [0, 0], [20, 20], [10, 10]);
    const path = new Path([10, 20], [30, 40]);
    path.fillColor = color;
    cloneAndCompare(path);
  });

  it('CompoundPath#clone()', () => {
    const path1 = new Path.Rectangle([200, 200], [100, 100]);
    const path2 = new Path.Rectangle([50, 50], [200, 200]);
    const compound = new CompoundPath(path1, path2);
    cloneAndCompare(compound);
  });

  it('Layer#clone()', () => {
    new Path.Rectangle([200, 200], [100, 100]);
    cloneAndCompare(paper.project.activeLayer);
  });

  it('Layer#clone() - check activeLayer', () => {
    const project = paper.project,
      activeLayer = project.activeLayer;
    activeLayer.clone();
    // The active layer should not change when cloning layers.
    equals(function () {
      return activeLayer == project.activeLayer;
    }, true);
  });

  it('Group#clone()', () => {
    const path = new Path.Circle([150, 150], 60);
    path.style = {
      strokeCap: 'round',
      strokeJoin: 'round',
      dashOffset: 10,
      dashArray: [10, 2, 10],
      fillColor: new Color(0, 0, 1),
      strokeColor: new Color(0, 0, 1),
      miterLimit: 5,
    };
    const secondPath = new Path.Circle([175, 175], 85);
    const group = new Group([path, secondPath]);
    cloneAndCompare(group);
  });

  it('PointText#clone()', () => {
    const pointText = new PointText(new Point(50, 50));
    pointText.content = 'test';
    pointText.position = pointText.position.add(100);
    pointText.style = {
      fontFamily: 'serif',
      fontSize: 20,
    };
    pointText.justification = 'center';
    cloneAndCompare(pointText);
  });

  it('SymbolItem#clone()', () => {
    const path = new Path.Circle([150, 150], 60);
    const definition = new SymbolDefinition(path);
    const item = new SymbolItem(definition);
    item.position = [100, 100];
    item.rotate(90);
    cloneAndCompare(item);
  });

  it('Symbol#clone()', () => {
    const path = new Path.Circle([150, 150], 60);
    path.style = {
      strokeCap: 'round',
      strokeJoin: 'round',
      dashOffset: 10,
      dashArray: [10, 2, 10],
      fillColor: new Color(0, 0, 1),
      strokeColor: new Color(0, 0, 1),
      miterLimit: 5,
    };
    path.selected = true;
    const definition = new SymbolDefinition(path);
    const copy = definition.clone();
    equals(definition.item, copy.item, 'definition.item');
    equals(function () {
      return definition.project == copy.project;
    }, true);
  });

  it('Raster#clone()', () => {
    const path = new Path.Circle([150, 150], 60);
    path.style = {
      fillColor: new Color(0, 0, 1),
      strokeColor: new Color(0, 0, 1),
    };
    const raster = path.rasterize(72);
    raster.opacity = 0.5;
    raster.locked = true;
    raster.visible = false;
    raster.blendMode = 'multiply';
    raster.rotate(20).translate(100);
    cloneAndCompare(raster);
  });

  it('Group with clipmask', () => {
    const path = new Path.Circle([100, 100], 30);
    const path2 = new Path.Circle([100, 100], 20);
    const group = new Group([path, path2]);
    group.clipped = true;
    cloneAndCompare(group);
  });

  it('Item#clone() Hierarchy', () => {
    const path1 = new Path.Circle([150, 150], 60);
    const path2 = new Path.Circle([150, 150], 60);
    const clone = path1.clone();
    equals(function () {
      return path2.isAbove(path1);
    }, true);
    equals(function () {
      return clone.isAbove(path1);
    }, true);
    equals(function () {
      return clone.isBelow(path2);
    }, true);
  });

  it('Item#clone() and #applyMatrix (#1225)', () => {
    const group = new Group({
      applyMatrix: false,
      children: [
        new Shape.Rectangle({
          size: [100, 100],
          point: [100, 100],
          strokeColor: 'red',
        }),
      ],
    });

    group.translate(300, 300);

    equals(
      function () {
        return group.clone().matrix.translation;
      },
      new Point(300, 300)
    );
  });
});
