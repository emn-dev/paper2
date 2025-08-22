import { describe, it } from 'vitest';
import { Point, Path, Group, Layer, paper, Size } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Layer', () => {
  it('#previousSibling / #nextSibling', () => {
    const project = paper.project;
    const firstLayer = project.activeLayer;
    const secondLayer = new Layer();
    equals(function () {
      return secondLayer.previousSibling == firstLayer;
    }, true);
    equals(function () {
      return secondLayer.nextSibling == null;
    }, true);

    // Move another layer into secondLayer and check nextSibling /
    // previousSibling:
    const path = new Path();
    const thirdLayer = new Layer();
    secondLayer.insertChild(0, thirdLayer);
    equals(function () {
      return secondLayer.children.length;
    }, 2);
    equals(function () {
      return thirdLayer.nextSibling === path;
    }, true);
    secondLayer.addChild(thirdLayer);
    equals(function () {
      return thirdLayer.nextSibling;
    }, null);
    equals(function () {
      return thirdLayer.previousSibling === path;
    }, true);
    equals(function () {
      return project.layers.length;
    }, 2);

    firstLayer.addChild(secondLayer);
    equals(function () {
      return project.layers.length;
    }, 1);
  });

  it('#insertAbove() / #insertBelow()', () => {
    const project = paper.project;
    const firstLayer = project.activeLayer;
    firstLayer.name = 'first';
    const secondLayer = new Layer();
    secondLayer.name = 'second';
    const thirdLayer = new Layer();
    thirdLayer.name = 'third';

    thirdLayer.insertBelow(firstLayer);
    equals(function () {
      return thirdLayer.previousSibling == null;
    }, true);
    equals(function () {
      return thirdLayer.nextSibling == firstLayer;
    }, true);

    secondLayer.insertBelow(firstLayer);
    equals(function () {
      return secondLayer.previousSibling == thirdLayer;
    }, true);
    equals(function () {
      return secondLayer.nextSibling == firstLayer;
    }, true);

    const path = new Path();
    firstLayer.addChild(path);

    // move the layer above the path, inside the firstLayer.
    // 'Above' means visually appearing on top, thus with a larger index.
    secondLayer.insertAbove(path);
    equals(function () {
      return path.nextSibling == secondLayer;
    }, true);
    equals(function () {
      return secondLayer.parent == firstLayer;
    }, true);
    // There should now only be two layers left:
    equals(function () {
      return project.layers.length;
    }, 2);
  });

  it('#addChild() / #insertBelow() with nesting', () => {
    const project = paper.project;
    const firstLayer = project.activeLayer;
    const secondLayer = new Layer();
    // There should be two layers now in project.layers
    equals(function () {
      return project.layers.length;
    }, 2);
    firstLayer.addChild(secondLayer);
    equals(function () {
      return secondLayer.parent == firstLayer;
    }, true);
    // There should only be the firsLayer now in project.layers
    equals(function () {
      return project.layers.length;
    }, 1);
    equals(function () {
      return project.layers[0] == firstLayer;
    }, true);
    // Now move secondLayer bellow the first again, in which case it should
    // reappear in project.layers
    secondLayer.insertBelow(firstLayer);
    // There should be two layers now in project.layers again now
    equals(function () {
      return project.layers.length;
    }, 2);
    equals(function () {
      return project.layers[0] == secondLayer && project.layers[1] == firstLayer;
    }, true);
  });

  it('#remove() with named layers', function () {
    const name = 'my layer';
    new Layer({ name: name }); // layer 1
    new Layer({ name: name }); // layer 2
    let removeCount = 0;
    while (paper.project.layers[name]) {
      paper.project.layers[name].remove();
      if (++removeCount > 2) break;
    }
    equals(removeCount, 2, 'project.layers[name].remove(); should be called twice');
  });

  it('#bounds with nested empty items', () => {
    const item = new Path.Rectangle(new Point(10, 10), new Size(10));
    new Group(new Group());
    equals(item.bounds, paper.project.activeLayer.bounds);
  });
});
