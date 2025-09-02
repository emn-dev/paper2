import { describe, it } from 'vitest';
import { paper, Group, Path, Rectangle, Point, PointText } from '~/index-core';
import { equals, comparePixels } from './_helpers';

describe('Given: Group', () => {
  it('new Group()', () => {
    const group = new Group();
    equals(function () {
      return paper.project.activeLayer.children[0] == group;
    }, true);
  });

  it('new Group([])', () => {
    const group = new Group([]);
    equals(function () {
      return paper.project.activeLayer.children[0] == group;
    }, true);
    equals(function () {
      return group.children.length;
    }, 0);
  });

  it('new Group([item])', () => {
    const path = new Path();
    const group = new Group([path]);
    equals(function () {
      return paper.project.activeLayer.children.length;
    }, 1);
    equals(function () {
      return group.children[0] == path;
    }, true);
  });

  it('new Group({children:[item]})', () => {
    const path = new Path();
    const group = new Group({
      children: [path],
    });
    equals(function () {
      return paper.project.activeLayer.children.length;
    }, 1);
    equals(function () {
      return path.parent == group;
    }, true);
    equals(function () {
      return group.children[0] == path;
    }, true);
  });

  it('Group bounds', () => {
    paper.project.currentStyle = {
      strokeWidth: 5,
      strokeColor: 'black',
    };

    const path = new Path.Circle([150, 150], 60);
    const secondPath = new Path.Circle([175, 175], 85);
    const group = new Group([path, secondPath]);
    equals(group.bounds, new Rectangle(90, 90, 170, 170), 'group.bounds');
    equals(group.strokeBounds, new Rectangle(87.5, 87.5, 175, 175), 'group.strokeBounds');

    group.rotate(20);
    equals(group.bounds, new Rectangle(89.97687, 82.94085, 170.04627, 177.08228), 'rotated group.bounds');
    equals(group.strokeBounds, new Rectangle(87.47687, 80.44085, 175.04627, 182.08228), 'rotated group.strokeBounds');
    group.rotate(20, new Point(50, 50));
    equals(group.bounds, new Rectangle(39.70708, 114.9919, 170.00396, 180.22418), 'rotated group.bounds');
    equals(group.strokeBounds, new Rectangle(37.20708, 112.4919, 175.00396, 185.22418), 'rotated group.strokeBounds');
  });

  it('group.addChildren(otherGroup.children)', () => {
    const group = new Group();
    group.addChild(new Path());
    group.addChild(new Path());
    equals(function () {
      return group.children.length;
    }, 2);

    const secondGroup = new Group();
    secondGroup.addChildren(group.children);
    equals(function () {
      return secondGroup.children.length;
    }, 2);
    equals(function () {
      return group.children.length;
    }, 0);
  });

  it('group.insertChildren(0, otherGroup.children)', () => {
    const group = new Group();
    group.addChild(new Path());
    group.addChild(new Path());
    equals(function () {
      return group.children.length;
    }, 2);

    const secondGroup = new Group();
    secondGroup.insertChildren(0, group.children);
    equals(function () {
      return secondGroup.children.length;
    }, 2);
    equals(function () {
      return group.children.length;
    }, 0);
  });

  it('group.addChildren()', () => {
    const group = new Group();
    const path1 = new Path();
    const path2 = new Path();
    let children = [path1, path2];
    group.addChildren(children);
    equals(group.children.length, 2, 'group.children.length after adding 2 children');
    group.removeChildren();
    equals(group.children.length, 0, 'group.children.length after removing all children');
    children.splice(1, 0, null);
    equals(children.length, 3, 'children array length after inserting null at index 1');
    group.addChildren(children);
    equals(
      group.children.length,
      2,
      'calling group.addChildren() with an array with 3 entries, ' +
        'of which 2 are valid, group.children.length should be 2'
    );
    children = [path1, path1, path2];
    group.addChildren(children);
    equals(group.children.length, 2, 'adding the same item twice should only add it once.');
  });

  // TODO: Not sure if this test is doing anything?
  it('group.setSelectedColor() with selected bound and position', () => {
    // Working: Set selected color first then add child.
    const group1 = new Group();
    group1.bounds.selected = true;
    group1.position.selected = true;
    group1.selectedColor = 'black';
    group1.addChild(new Path.Circle([50, 50], 40));
    // Failing: Add child first then set selected color.
    const group2 = new Group();
    group2.bounds.selected = true;
    group2.position.selected = true;
    group2.addChild(new Path.Rectangle([50, 50], 40));
    group2.selectedColor = 'black';

    comparePixels(group1, group2);
  });

  it('Group#isEmpty(recursively)', () => {
    const group = new Group();
    equals(true, group.isEmpty());
    equals(true, group.isEmpty(true));

    const group2 = new Group(new Group());
    equals(false, group2.isEmpty());
    equals(true, group2.isEmpty(true));

    const group3 = new Group(new Path());
    equals(false, group3.isEmpty());
    equals(true, group3.isEmpty(true));

    const group4 = new Group(new PointText());
    equals(false, group4.isEmpty());
    equals(true, group4.isEmpty(true));
  });

  it('group.internalBounds with clip item without clip.applyMatrix = false', () => {
    const point = new Point(100, 100);
    const translation = new Point(100, 100);
    const item = new Path.Circle({
      center: point,
      radius: 50,
      fillColor: 'orange',
    });
    const clip = new Path.Rectangle({
      from: point.subtract(translation),
      to: point.add(translation),
    });
    clip.applyMatrix = false;
    clip.translate(translation);
    const group = new Group(clip, item);
    group.clipped = true;
    const expected = new Rectangle(point, point.add(translation.multiply(2)));
    equals(group.internalBounds, expected);
  });

  it('group.matrix with parent matrix applied (#1711)', () => {
    const child = new Group({ applyMatrix: false });
    const parent = new Group({ applyMatrix: true, children: [child] });
    const scale = 1.1;
    const initial = child.scaling.x;
    parent.scale(scale);
    equals(child.scaling.x, initial * scale);
  });

  it('Nested group.matrix.apply(true, true) with matrices not applied', () => {
    const path = new Path({ applyMatrix: false });
    const group = new Group({ applyMatrix: false, children: [path] });
    const parent = new Group({ applyMatrix: false, children: [group] });
    const grandParent = new Group({ applyMatrix: false, children: [parent] });
    equals(function () {
      return grandParent.applyMatrix;
    }, false);
    equals(function () {
      return group.applyMatrix;
    }, false);
    equals(function () {
      return path.applyMatrix;
    }, false);
    grandParent.matrix.apply(true, true);
    equals(function () {
      return grandParent.applyMatrix;
    }, true);
    equals(function () {
      return group.applyMatrix;
    }, true);
    equals(function () {
      return path.applyMatrix;
    }, true);
  });
});
