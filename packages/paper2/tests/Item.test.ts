import { describe, it } from 'vitest';
import { Base } from '~/straps';
import {
  Point,
  Path,
  Color,
  CompoundPath,
  Group,
  Layer,
  Matrix,
  paper,
  PointText,
  Project,
  Raster,
  Rectangle,
  Shape,
  Size,
  SymbolItem,
} from '~/index-core';
import { equals, comparePixels } from './_helpers';

describe('Given: Item', () => {
  it('copyTo(project)', () => {
    const project = paper.project;
    const path = new Path();
    const secondDoc = new Project();
    const copy = path.copyTo(secondDoc);
    equals(function () {
      return secondDoc.activeLayer.children.indexOf(copy) != -1;
    }, true);
    equals(function () {
      return project.activeLayer.children.indexOf(copy) == -1;
    }, true);
    equals(function () {
      return copy != path;
    }, true);
  });

  it('copyTo(layer)', () => {
    const project = paper.project;
    const path = new Path();
    const layer = new Layer();
    const copy = path.copyTo(layer);
    equals(function () {
      return layer.children.indexOf(copy) != -1;
    }, true);
    equals(function () {
      return project.layers[0].children.indexOf(copy) == -1;
    }, true);
  });

  it('clone()', () => {
    const project = paper.project;
    const path = new Path();
    const copy = path.clone();
    equals(function () {
      return project.activeLayer.children.length;
    }, 2);
    equals(function () {
      return path != copy;
    }, true);
  });

  it('addChild(item)', () => {
    const project = paper.project;
    const path = new Path();
    project.activeLayer.addChild(path);
    equals(function () {
      return project.activeLayer.children.length;
    }, 1);
  });

  it('setting item.parent', () => {
    const layer1 = paper.project.activeLayer;
    const layer2 = new Layer();
    layer1.activate();
    const group = new Group();

    const path = new Path();
    equals(
      function () {
        return path.parent === layer1;
      },
      true,
      'Path is a child of layer1 because it is active'
    );

    path.parent = layer2;
    equals(
      function () {
        return path.parent === layer2;
      },
      true,
      'The parent of path was set to layer2'
    );

    path.parent = group;
    equals(
      function () {
        return path.parent === group;
      },
      true,
      'The parent of path was set to group'
    );

    equals(
      function () {
        return layer2.children.indexOf(path) === -1;
      },
      true,
      'The path is no longer a child of layer2'
    );

    const path2 = new Path({
      parent: group,
    });
    equals(
      function () {
        return path2.parent === group;
      },
      true,
      'setting the parent in the constructor'
    );
    equals(
      function () {
        return group.children.indexOf(path2) == 1;
      },
      true,
      'the index of path2 is 1, because group already contains path from before'
    );
  });

  it('item.parent / item.isChild / item.isParent / item.layer', () => {
    const project = paper.project;
    const secondDoc = new Project();
    const path = new Path();
    project.activeLayer.addChild(path);
    equals(function () {
      return project.activeLayer.children.indexOf(path) != -1;
    }, true);
    equals(function () {
      return path.layer == project.activeLayer;
    }, true);
    secondDoc.activeLayer.addChild(path);
    equals(function () {
      return project.activeLayer.isChild(path);
    }, false);
    equals(function () {
      return path.layer == secondDoc.activeLayer;
    }, true);
    equals(function () {
      return path.isParent(project.activeLayer);
    }, false);
    equals(function () {
      return secondDoc.activeLayer.isChild(path);
    }, true);
    equals(function () {
      return path.isParent(secondDoc.activeLayer);
    }, true);
    equals(function () {
      return project.activeLayer.children.indexOf(path) == -1;
    }, true);
    equals(function () {
      return secondDoc.activeLayer.children.indexOf(path) === 0;
    }, true);
  });

  it('item.remove()', () => {
    const project = paper.project;
    const path = new Path();
    equals(function () {
      return project.activeLayer.children.length;
    }, 1);
    path.remove();
    equals(function () {
      return project.activeLayer.children.length;
    }, 0);
    const group = new Group(path);
    equals(function () {
      return group.children.length;
    }, 1);
    path.remove();
    equals(function () {
      return group.children.length;
    }, 0);
  });

  it('item.addChildren() / item.removeChildren()', () => {
    const project = paper.project,
      layer = project.activeLayer,
      path1 = new Path({ insert: false }),
      path2 = new Path({ insert: false, name: 'path2' });

    layer.addChildren([path1, path2]);
    equals(function () {
      return path1.index;
    }, 0);
    equals(function () {
      return path2.index;
    }, 1);
    equals(function () {
      return path1.parent === layer;
    }, true);
    equals(function () {
      return path2.parent === layer;
    }, true);
    equals(function () {
      return layer.children['path2'] === path2;
    }, true);
    layer.removeChildren();
    equals(function () {
      return path1.index;
    }, undefined);
    equals(function () {
      return path2.index;
    }, undefined);
    equals(function () {
      return path1.parent;
    }, null);
    equals(function () {
      return path2.parent;
    }, null);
    equals(function () {
      return layer.children['path2'] === undefined;
    }, true);

    layer.children = [path1, path2];
    equals(function () {
      return path1.index;
    }, 0);
    equals(function () {
      return path2.index;
    }, 1);
    equals(function () {
      return path1.parent === layer;
    }, true);
    equals(function () {
      return path2.parent === layer;
    }, true);
    equals(function () {
      return layer.children['path2'] === path2;
    }, true);
    layer.children = [];
    equals(function () {
      return path1.index;
    }, undefined);
    equals(function () {
      return path2.index;
    }, undefined);
    equals(function () {
      return path1.parent;
    }, null);
    equals(function () {
      return path2.parent;
    }, null);
    equals(function () {
      return layer.children['path2'] === undefined;
    }, true);
  });

  it('item.lastChild / item.firstChild', () => {
    const project = paper.project;
    const path1 = new Path();
    const path2 = new Path();
    equals(function () {
      return project.activeLayer.firstChild == path1;
    }, true);
    equals(function () {
      return project.activeLayer.lastChild == path2;
    }, true);
  });

  it('item.nextSibling / item.previousSibling', () => {
    const path1 = new Path();
    const path2 = new Path();
    equals(function () {
      return path1.previousSibling == null;
    }, true);
    equals(function () {
      return path1.nextSibling == path2;
    }, true);
    equals(function () {
      return path2.previousSibling == path1;
    }, true);
    equals(function () {
      return path2.nextSibling == null;
    }, true);
  });

  it('item.replaceWith(other)', () => {
    const project = paper.project;
    const path1 = new Path();
    const path2 = new Path();
    const path3 = new Path();
    equals(function () {
      return project.activeLayer.children.length;
    }, 3);
    equals(function () {
      return path1.replaceWith(path2) == path2;
    }, true);
    equals(function () {
      return project.activeLayer.children.length;
    }, 2);
    equals(function () {
      return path1.parent == null;
    }, true);
    equals(function () {
      return path2.previousSibling == null;
    }, true);
    equals(function () {
      return path2.nextSibling == path3;
    }, true);
  });

  it('item.replaceWith(item)', () => {
    const item = new Path();
    equals(function () {
      return item.replaceWith(item) == null;
    }, true);
    equals(function () {
      return item.getParent() != null;
    }, true);
  });

  it('item.insertChild(0, child)', () => {
    const project = paper.project;
    const path1 = new Path();
    const path2 = new Path();
    project.activeLayer.insertChild(0, path2);
    equals(function () {
      return path2.index < path1.index;
    }, true);
  });

  it('item.insertAbove(other)', () => {
    const path1 = new Path();
    const path2 = new Path();
    equals(function () {
      return path2.index > path1.index;
    }, true);
    equals(function () {
      return path1.insertAbove(path2) == path1;
    }, true);
    equals(function () {
      return path2.index < path1.index;
    }, true);
    equals(function () {
      return paper.project.activeLayer.lastChild == path1;
    }, true);
  });

  it('item.insertBelow(other)', () => {
    const path1 = new Path();
    const path2 = new Path();
    equals(function () {
      return path2.index > path1.index;
    }, true);
    equals(function () {
      return path2.insertBelow(path1) == path2;
    }, true);
    equals(function () {
      return path2.index < path1.index;
    }, true);
    equals(function () {
      return paper.project.activeLayer.lastChild == path1;
    }, true);
  });

  it('item.insertAbove(item)', () => {
    const path = new Path();
    equals(function () {
      return path.insertAbove(path) == null;
    }, true);
    equals(function () {
      return path.insertBelow(path) == null;
    }, true);
  });

  it('item.sendToBack()', () => {
    new Path();
    const path2 = new Path();
    path2.sendToBack();
    equals(function () {
      return path2.index === 0;
    }, true);
  });

  it('item.bringToFront()', () => {
    const path1 = new Path();
    new Path();
    path1.bringToFront();
    equals(function () {
      return path1.index == 1;
    }, true);
  });

  it('item.isDescendant(other) / item.isAncestor(other)', () => {
    const project = paper.project;
    const path = new Path();
    equals(function () {
      return path.isDescendant(project.activeLayer);
    }, true);
    equals(function () {
      return project.activeLayer.isDescendant(path);
    }, false);
    equals(function () {
      return path.isAncestor(project.activeLayer);
    }, false);
    equals(function () {
      return project.activeLayer.isAncestor(path);
    }, true);

    // an item can't be its own descendant:
    equals(function () {
      return project.activeLayer.isDescendant(project.activeLayer);
    }, false);
    // an item can't be its own ancestor:
    equals(function () {
      return project.activeLayer.isAncestor(project.activeLayer);
    }, false);
  });

  it('item.addChildren(items)', () => {
    const path1 = new Path(),
      path2 = new Path(),
      path3 = new Path(),
      group = new Group([path1, path2, path3]);

    function check(i1, i2, i3) {
      equals(function () {
        return group.children.length;
      }, 3);
      equals(function () {
        return path1.index;
      }, i1);
      equals(function () {
        return path2.index;
      }, i2);
      equals(function () {
        return path3.index;
      }, i3);
    }
    check(0, 1, 2);
    group.addChild(path1);
    check(2, 0, 1);
    group.addChild(path2);
    check(1, 2, 0);
    group.addChildren([path1, path2, path3]);
    check(0, 1, 2);
  });

  it('item.isGroupedWith(other)', () => {
    const path = new Path();
    const path2 = new Path();
    const group = new Group([path]);
    const secondGroup = new Group([path2]);

    equals(function () {
      return path.isGroupedWith(path2);
    }, false);
    secondGroup.addChild(path);
    equals(function () {
      return path.isGroupedWith(path2);
    }, true);
    equals(function () {
      return path.isGroupedWith(group);
    }, false);
    equals(function () {
      return path.isDescendant(secondGroup);
    }, true);
    equals(function () {
      return secondGroup.isDescendant(path);
    }, false);
    equals(function () {
      return secondGroup.isDescendant(secondGroup);
    }, false);
    equals(function () {
      return path.isGroupedWith(secondGroup);
    }, false);
    paper.project.activeLayer.addChild(path);
    equals(function () {
      return path.isGroupedWith(path2);
    }, false);
    paper.project.activeLayer.addChild(path2);
    equals(function () {
      return path.isGroupedWith(path2);
    }, false);
  });

  it('reverseChildren()', () => {
    const project = paper.project;
    const path = new Path();
    new Path();
    const path3 = new Path();
    equals(function () {
      return project.activeLayer.firstChild == path;
    }, true);
    project.activeLayer.reverseChildren();
    equals(function () {
      return project.activeLayer.firstChild == path;
    }, false);
    equals(function () {
      return project.activeLayer.firstChild == path3;
    }, true);
    equals(function () {
      return project.activeLayer.lastChild == path;
    }, true);
  });

  it('Check item#project when moving items across projects', () => {
    const doc1 = new Project();
    const path = new Path();
    const group = new Group();
    group.addChild(new Path());

    equals(function () {
      return path.project == doc1;
    }, true);
    const doc2 = new Project();
    doc2.activeLayer.addChild(path);
    equals(function () {
      return path.project == doc2;
    }, true);

    doc2.activeLayer.addChild(group);
    equals(function () {
      return group.children[0].project == doc2;
    }, true);
  });

  it('group.selected', () => {
    const path = new Path([0, 0]);
    const path2 = new Path([0, 0]);
    const group = new Group([path, path2]);
    path.selected = true;
    equals(function () {
      return group.selected;
    }, true);

    path.selected = false;
    equals(function () {
      return group.selected;
    }, false);

    group.selected = true;
    equals(function () {
      return path.selected;
    }, true);
    equals(function () {
      return path2.selected;
    }, true);

    group.selected = false;
    equals(function () {
      return path.selected;
    }, false);
    equals(function () {
      return path2.selected;
    }, false);
  });

  it('Check parent children object for named item', () => {
    const path1 = new Path({ name: 'test' });
    const layer = paper.project.activeLayer;
    equals(function () {
      return layer.children['test'] === path1;
    }, true);

    const path2 = new Path({ name: 'test' });

    equals(function () {
      return layer.children['test'] === path1;
    }, true);

    path2.remove();

    equals(function () {
      return layer.children['test'] === path1;
    }, true);

    path1.remove();

    equals(function () {
      return !layer.children['test'];
    }, true);
  });

  it('Named child access 1', () => {
    const path1 = new Path({ name: 'test' });
    const path2 = new Path({ name: 'test' });
    const layer = paper.project.activeLayer;

    equals(function () {
      return layer.children['test'] === path1;
    }, true);

    path1.remove();

    equals(function () {
      return layer.children['test'] === path2;
    }, true);

    path2.remove();

    equals(function () {
      return layer.children['test'] === undefined;
    }, true);
  });

  it('Named child access 2', () => {
    const path1 = new Path({ name: 'test' });
    const path2 = new Path({ name: 'test' });
    const layer = paper.project.activeLayer;

    const group = new Group();

    group.addChild(path2);

    equals(function () {
      return layer.children['test'] === path1;
    }, true);

    path1.remove();

    equals(function () {
      return layer.children['test'] === undefined;
    }, true);

    equals(function () {
      return group.children['test'] === path2;
    }, true);

    path2.remove();

    equals(function () {
      return group.children['test'] === undefined;
    }, true);

    group.addChild(path2);

    equals(function () {
      return group.children['test'] === path2;
    }, true);

    layer.appendTop(path2);

    equals(function () {
      return group.children['test'] === undefined;
    }, true);

    equals(function () {
      return layer.children['test'] === path2;
    }, true);

    layer.addChild(path1);

    equals(function () {
      return layer.children['test'] === path2;
    }, true);

    path2.remove();

    equals(function () {
      return layer.children['test'] === path1;
    }, true);
  });

  it('Setting name of child back to null', () => {
    const path1 = new Path({ name: 'test' });
    const path2 = new Path({ name: 'test' });
    const layer = paper.project.activeLayer;

    equals(function () {
      return layer.children['test'] == path1;
    }, true);

    path1.name = null;

    equals(function () {
      return layer.children['test'] == path2;
    }, true);

    path2.name = null;

    equals(function () {
      return layer.children['test'] === undefined;
    }, true);
  });

  it('Renaming item', () => {
    const path = new Path({ name: 'test' });
    path.name = 'test2';
    const layer = paper.project.activeLayer;

    equals(function () {
      return layer.children['test'] === undefined;
    }, true);

    equals(function () {
      return layer.children['test2'] == path;
    }, true);
  });

  it('Changing item#position.x', () => {
    const path = new Path.Circle(new Point(50, 50), 50);
    path.position.x += 5;
    equals(path.position.toString(), '{ x: 55, y: 50 }', 'path.position.x += 5');
  });

  it('Naming a removed item', () => {
    const path = new Path();
    path.remove();
    path.name = 'test';
    equals(function () {
      return path.name;
    }, 'test');
  });

  it('Naming a layer', () => {
    const layer = new Layer();
    layer.name = 'test';
    equals(function () {
      return layer.name;
    }, 'test');
  });

  it('Cloning a linked size', () => {
    const path = new Path([40, 75], [140, 75]);
    let error = null;
    try {
      path.bounds.size.clone();
    } catch (e) {
      error = e;
    }
    let description = 'Cloning a linked size should not throw an error';
    if (error) description += ': ' + error;
    equals(error == null, true, description);
  });

  it('Item#className', () => {
    equals(new Group().className, 'Group');
    equals(new Path().className, 'Path');
    equals(new CompoundPath().className, 'CompoundPath');
    equals(new Raster().className, 'Raster');
    equals(new SymbolItem().className, 'SymbolItem');
    equals(new paper.PlacedSymbol().className, 'SymbolItem'); // deprecated
    equals(new PointText().className, 'PointText');
  });

  it('Item#isInserted', () => {
    const item = new Path();
    equals(item.isInserted(), true);
    item.remove();
    equals(item.isInserted(), false);

    const group = new Group(item);
    equals(item.isInserted(), true);
    group.remove();
    equals(item.isInserted(), false);
  });

  it('Item#data', () => {
    let item = new Path();
    const description = 'When accessed before any data was set, a plain object is created for us';
    equals(Base.isPlainObject(item.data), true, description);

    item = new Path();
    item.data.test = true;
    equals(item.data.test, true, description);

    item = new Path();
    const point = new Point();
    item.data.point = point;
    equals(item.data.point, point, 'We can set basic types on data');

    item = new Path();
    item.data = {
      testing: true,
    };
    equals(item.data.testing, true, 'we can set data using an object literal');

    item = new Path({
      data: {
        testing: true,
      },
    });
    equals(item.data.testing, true, 'we can set data using an object literal constructor');

    // TODO: add tests to see if importing and exporting of Item#data works
  });

  it('Item#blendMode in a transformed Group', () => {
    const layer = new Layer();
    new Path.Rectangle({
      size: [100, 100],
      fillColor: new Color(1, 0, 0),
    });

    const path2 = new Path.Circle({
      radius: 25,
      center: [50, 50],
      fillColor: new Color(0, 1, 0),
      blendMode: 'screen',
    });

    const raster = layer.rasterize(72, false);
    equals(raster.getPixel(0, 0), new Color(1, 0, 0, 1), 'Top left pixel should be red');
    equals(raster.getPixel(50, 50), new Color(1, 1, 0, 1), 'Middle center pixel should be yellow');

    path2.position = [0, 0];

    const group = new Group(path2);
    group.position = [50, 50];

    const raster2 = layer.rasterize(72, false);
    equals(raster2.getPixel(0, 0), new Color(1, 0, 0, 1), 'Top left pixel should be red');
    equals(raster2.getPixel(50, 50), new Color(1, 1, 0, 1), 'Middle center pixel should be yellow');
  });

  it('Item#opacity', () => {
    const layer = new Layer();
    new Path.Rectangle({
      size: [100, 100],
      fillColor: 'white',
    });

    const circle = new Path.Circle({
      radius: 25,
      center: [50, 50],
      fillColor: 'red',
    });

    const red = new Color(1, 0, 0, 1);
    const white = new Color(1, 1, 1, 1);

    equals(layer.rasterize(72, false).getPixel(50, 50), red, 'Center pixel should be red');
    circle.opacity = 0;
    equals(layer.rasterize(72, false).getPixel(50, 50), white, 'Center pixel should be white');
    circle.opacity = -1;
    equals(layer.rasterize(72, false).getPixel(50, 50), white, 'Center pixel should be white');
    circle.opacity = 1;
    equals(layer.rasterize(72, false).getPixel(50, 50), red, 'Center pixel should be red');
    circle.opacity = 2;
    equals(layer.rasterize(72, false).getPixel(50, 50), red, 'Center pixel should be red');
  });

  it('Item#applyMatrix', () => {
    equals(function () {
      return new Path({ applyMatrix: true }).applyMatrix;
    }, true);
    equals(function () {
      return new Path({ applyMatrix: false }).applyMatrix;
    }, false);
    equals(function () {
      return new Raster({ applyMatrix: false }).applyMatrix;
    }, false);
    equals(function () {
      return new Raster({ applyMatrix: true }).applyMatrix;
    }, false);

    const applyMatrix = paper.settings.applyMatrix;
    paper.settings.applyMatrix = true;
    equals(function () {
      return new Path().applyMatrix;
    }, true);
    equals(function () {
      return new Raster().applyMatrix;
    }, false);
    paper.settings.applyMatrix = false;
    equals(function () {
      return new Path().applyMatrix;
    }, false);
    equals(function () {
      return new Raster().applyMatrix;
    }, false);
    paper.settings.applyMatrix = applyMatrix;

    const path = new Path.Rectangle({
      size: [100, 100],
      position: [0, 0],
    });

    path.applyMatrix = false;

    equals(path.matrix, new Matrix(), 'path.matrix before scaling');
    equals(path.bounds, new Rectangle(-50, -50, 100, 100), 'path.bounds before scaling');
    equals(path.segments[0].point, new Point(-50, 50), 'path.segments[0].point before scaling');

    path.scale(1, 2);

    equals(path.matrix, new Matrix().scale(1, 2), 'path.matrix after scaling');
    equals(path.bounds, new Rectangle(-50, -100, 100, 200), 'path.bounds after scaling');
    equals(path.segments[0].point, new Point(-50, 50), 'path.segments[0].point after scaling');

    path.applyMatrix = true;

    equals(path.matrix, new Matrix(), 'path.matrix after setting path.applyMatrix = true;');
    equals(path.bounds, new Rectangle(-50, -100, 100, 200), 'path.bounds after setting path.applyMatrix = true;');
    equals(
      path.segments[0].point,
      new Point(-50, 100),
      'path.segments[0].point after setting path.applyMatrix = true;'
    );
  });

  it('PaperScope#settings.insertItems', () => {
    const insertItems = paper.settings.insertItems;
    paper.settings.insertItems = true;

    let path1, path2;

    equals(function () {
      path1 = new Path();
      return path1.parent === paper.project.activeLayer;
    }, true);
    paper.settings.insertItems = false;

    equals(function () {
      path2 = new Path();
      return path2.parent === null;
    }, true);

    equals(function () {
      return paper.project.activeLayer.children.length;
    }, 1);

    paper.project.activeLayer.addChild(path2);

    equals(function () {
      return paper.project.activeLayer.children.length;
    }, 2);

    paper.settings.insertItems = insertItems;
  });

  it('Item#pivot', () => {
    const path1 = new Path.Rectangle({
      point: [50, 50],
      size: [100, 100],
      strokeColor: 'red',
      applyMatrix: false,
    });

    const path2 = new Path.Rectangle({
      point: [50, 50],
      size: [100, 100],
      strokeColor: 'green',
      applyMatrix: true,
    });

    const pivot = new Point(100, 100);

    path1.pivot = pivot;
    path1.position = [200, 200];
    equals(path1.pivot, pivot, 'Changing position of an item with applyMatrix = false should not change pivot');

    const difference = new Point(100, 100);
    path2.pivot = pivot;
    path2.position = path2.position.add(difference);
    equals(
      path2.pivot,
      pivot.add(difference),
      'Changing position of an item with applyMatrix = true should change pivot'
    );
  });

  it('Item#position with irregular shape, #pivot and rotation', () => {
    const path1 = new Path([
      [0, 0],
      [200, 100],
      [0, 100],
    ]);
    const path2 = path1.clone();
    path2.pivot = path2.position;
    equals(path1.position, new Point(100, 50), 'path1.position, before rotation');
    path1.rotate(45);
    equals(path1.position, new Point(64.64466, 50), 'path1.position, after rotation');
    equals(path2.position, new Point(100, 50), 'path2.position with pivot, before rotation');
    path2.rotate(45);
    equals(path2.position, new Point(100, 50), 'path2.position with pivot, after rotation');
  });

  it('Item#scaling, #rotation', () => {
    const expected = new Rectangle(100, 50, 100, 200);

    const rect1 = new Path.Rectangle({
      from: [100, 100],
      to: [200, 200],
      applyMatrix: false,
    });
    const rect2 = rect1.clone();

    rect1.scaling = [2, 1];
    rect1.rotation = 90;
    equals(rect1.bounds, expected, 'rect1.bounds, setting rect1.scaling before rect1.rotation');

    rect2.rotation = 90;
    rect2.scaling = [2, 1];
    equals(rect2.bounds, expected, 'rect2.bounds, setting rect2.scaling before rect2.rotation');

    const shape1 = new Shape.Rectangle({
      from: [100, 100],
      to: [200, 200],
    });
    const shape2 = shape1.clone();

    shape1.scaling = [2, 1];
    shape1.rotation = 90;
    equals(shape1.bounds, expected, 'shape1.bounds, setting shape1.scaling before shape1.rotation');

    shape2.rotation = 90;
    shape2.scaling = [2, 1];
    equals(shape2.bounds, expected, 'shape2.bounds, setting shape2.scaling before shape2.rotation');
  });

  it('Item#scaling = 0 (#1816)', () => {
    const circle = new Path.Circle({
      radius: 100,
      center: [100, 100],
      fillColor: 'red',
      applyMatrix: false,
    });

    circle.translate(100);
    circle.scaling = 0;
    equals(circle.bounds, new Rectangle(200, 200, 0, 0), 'circle.bounds, with scaling = 0');

    circle.scaling = 1;
    equals(circle.bounds, new Rectangle(100, 100, 200, 200), 'circle.bounds, with scaling = 1');

    circle.scaling = [0, 1];
    equals(circle.bounds, new Rectangle(200, 100, 0, 200), 'circle.bounds, with scaling = [0, 1]');

    circle.scaling = 1;
    equals(circle.bounds, new Rectangle(100, 100, 200, 200), 'circle.bounds, with scaling = 1');

    const rect = new Path.Rectangle({
      center: [100, 100],
      size: [200, 100],
      fillColor: 'red',
      applyMatrix: false,
    });

    rect.translate(100);
    rect.rotate(45);

    rect.scaling = 0;
    equals(rect.bounds, new Rectangle(200, 200, 0, 0), 'rect.bounds, with scaling = 0');
    equals(rect.rotation, 45);

    rect.scaling = 1;
    equals(rect.bounds, new Rectangle(93.93398, 93.93398, 212.13203, 212.13203), 'rect.bounds, with scaling = 1');
    equals(rect.rotation, 45);
  });

  it('Item#position pivot point and caching (#1503)', () => {
    const item = Path.Rectangle(new Point(0, 0), new Size(20));
    item.pivot = new Point(0, 0);
    item.bounds;
    item.translate(5, 5);
    equals(item.position, new Point(5, 5));
  });

  it('Children global matrices are cleared after parent transformation', () => {
    const item = Path.Rectangle(new Point(0, 0), new Size(100));
    const group = new Group({ children: [item], applyMatrix: false });
    equals(item.localToGlobal(item.getPointAt(0)), new Point(0, 100));
    group.translate(100, 0);
    equals(item.localToGlobal(item.getPointAt(0)), new Point(100, 100));
  });

  it('Item#rasterize() with empty bounds', () => {
    new Path.Line([0, 0], [100, 0]).rasterize();
    paper.view.update(); // This should not throw
    // expect(0); // TODO: what is this?
  });

  it('Item#rasterize() bounds', () => {
    const circle = new Path.Circle({
      center: [50, 50],
      radius: 5,
      fillColor: 'red',
    });
    equals(
      function () {
        return circle.bounds;
      },
      new Rectangle({ x: 45, y: 45, width: 10, height: 10 })
    );
    equals(
      function () {
        return circle.rasterize({ resolution: 72 }).bounds;
      },
      new Rectangle({ x: 45, y: 45, width: 10, height: 10 })
    );
    equals(
      function () {
        return circle.rasterize({ resolution: 144 }).bounds;
      },
      new Rectangle({ x: 45, y: 45, width: 10, height: 10 })
    );
    equals(
      function () {
        return circle.rasterize({ resolution: 200 }).bounds;
      },
      new Rectangle({ x: 45.14, y: 45.14, width: 9.72, height: 9.72 })
    );
    equals(
      function () {
        return circle.rasterize({ resolution: 400 }).bounds;
      },
      new Rectangle({ x: 45.05, y: 45.05, width: 9.9, height: 9.9 })
    );
    equals(
      function () {
        return circle.rasterize({ resolution: 600 }).bounds;
      },
      new Rectangle({ x: 45.02, y: 45.02, width: 9.96, height: 9.96 })
    );
    equals(
      function () {
        return circle.rasterize({ resolution: 1000 }).bounds;
      },
      new Rectangle({ x: 45.032, y: 45.032, width: 9.936, height: 9.936 })
    );
    equals(
      function () {
        const raster = circle.rasterize({ resolution: 1000 });
        // Reusing the raster for a 2nd rasterization should leave it in place.
        return circle.rasterize({ resolution: 1000, raster: raster }).bounds;
      },
      new Rectangle({ x: 45.032, y: 45.032, width: 9.936, height: 9.936 })
    );
  });

  it('Item#draw() with CompoundPath as clip item', () => {
    function createdClippedGroup(invertedOrder) {
      const compound = new CompoundPath({
        children: [new Path.Circle(new Point(50, 50), 50), new Path.Circle(new Point(100, 50), 50)],
        fillRule: 'evenodd',
      });

      const rectangle = new Shape.Rectangle(new Point(0, 0), new Point(150, 50));

      const group = new Group();
      group.children = invertedOrder ? [compound, rectangle] : [rectangle, compound];
      group.fillColor = 'black';
      group.clipped = true;
      return group;
    }

    comparePixels(createdClippedGroup(true), createdClippedGroup(false));
  });
});
