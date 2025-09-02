import { describe, it } from 'vitest';
import { Path, Color, Group, paper } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Style', () => {
  it('Style defaults', () => {
    const path = new Path();
    equals(function () {
      return path.strokeWidth;
    }, 1);
    equals(function () {
      return path.strokeCap;
    }, 'butt');
    equals(function () {
      return path.strokeJoin;
    }, 'miter');
    equals(function () {
      return path.miterLimit;
    }, 10);
    equals(function () {
      return path.dashOffset;
    }, 0);
    equals(function () {
      return path.dashArray + '';
    }, [] + '');
  });

  it('Project#currentStyle', () => {
    paper.project.currentStyle.fillColor = 'black';
    const path = new Path();
    equals(path.fillColor, new Color('black'), 'path.fillColor');

    // When changing the current style of the project, the style of
    // paths created using project.currentStyle should not change.
    paper.project.currentStyle.fillColor = 'red';
    equals(path.fillColor, new Color('black'), 'path.fillColor');
  });

  it('setting Project#currentStyle to an object', () => {
    paper.project.currentStyle = {
      fillColor: 'red',
      strokeColor: 'green',
    };
    const path = new Path();
    equals(path.fillColor, new Color('red'), 'path.fillColor');
    equals(path.strokeColor, new Color('green'), 'path.strokeColor');
  });

  it('setting Path#style to an object', () => {
    const path = new Path();
    path.strokeWidth = 10;
    path.style = {
      fillColor: 'red',
      strokeColor: 'green',
    };
    equals(path.fillColor, new Color('red'), 'path.fillColor');
    equals(path.strokeColor, new Color('green'), 'path.strokeColor');
    equals(path.strokeWidth, 10, 'path.strokeWidth, set outside object should not be cleared');
    equals(path.style.fillColor, new Color('red'), 'path.style.fillColor');
    equals(path.style.strokeColor, new Color('green'), 'path.style.strokeColor');
    equals(path.style.strokeWidth, 10, 'path.style.strokeWidth, set outside object should not be cleared');
  });

  it('setting Group#style to an object', () => {
    const group = new Group();
    const path = new Path();
    group.addChild(path);
    group.strokeWidth = 10;
    group.style = {
      fillColor: 'red',
      strokeColor: 'green',
    };
    equals(path.fillColor, new Color('red'), 'path.fillColor');
    equals(path.strokeColor, new Color('green'), 'path.strokeColor');
    equals(path.strokeWidth, 10, 'path.strokeWidth, set outside object should not be cleared');
    equals(path.style.fillColor, new Color('red'), 'path.style.fillColor');
    equals(path.style.strokeColor, new Color('green'), 'path.style.strokeColor');
    equals(path.style.strokeWidth, 10, 'path.style.strokeWidth, set outside object should not be cleared');
  });

  it('getting Group#fillColor', () => {
    const group = new Group();
    const path = new Path();
    path.fillColor = 'red';
    group.addChild(path);

    equals(group.fillColor, new Color('red'), 'group.fillColor');

    const secondPath = new Path();
    secondPath.fillColor = 'black';
    group.addChild(secondPath);

    // the group now contains two paths with different fillColors and therefore
    // should return undefined:
    equals(function () {
      return group.fillColor;
    }, undefined);

    //If we remove the first path, it should now return 'black':
    group.children[0].remove();
    equals(group.fillColor, new Color('black'), 'group.fillColor');
  });

  it('getting Groupy#fillColor 2', () => {
    const star = new Path.Circle({
      center: [100, 100],
      radius: 40,
      fillColor: 'red',
    });

    const circle = new Path.Circle({
      center: [100, 100],
      radius: 25,
      strokeColor: 'black',
    });
    // Create a group of the two items and clip it:
    const group = new Group(circle, star);

    equals(function () {
      return group.fillColor;
    }, undefined);
  });

  it('setting Group#fillColor and #strokeColor', () => {
    const group = new Group();
    const path = new Path();
    path.fillColor = 'red';
    group.addChild(path);

    const secondPath = new Path();
    secondPath.fillColor = 'blue';
    secondPath.strokeColor = 'red';
    group.addChild(secondPath);

    // Change the fill color of the group:
    group.fillColor = 'black';

    // the paths contained in the group should now both have their fillColor
    // set to black:
    equals(path.fillColor, new Color('black'), 'path.fillColor');
    equals(secondPath.fillColor, new Color('black'), 'secondPath.fillColor');

    // The second path still has its strokeColor set to red:
    equals(secondPath.strokeColor, new Color('red'), 'secondPath.strokeColor');
  });

  it('setting Group#fillColor and #strokeColor 2', () => {
    const group = new Group();
    const path = new Path();
    path.strokeColor = 'red';
    path.fillColor = 'red';
    group.addChild(path);

    equals(group.fillColor, new Color('red'), 'group.fillColor');

    const secondPath = new Path();
    secondPath.fillColor = 'blue';
    secondPath.strokeColor = 'red';
    group.addChild(secondPath);

    equals(secondPath.fillColor, new Color('blue'), 'secondPath.fillColor');
    equals(secondPath.strokeColor, new Color('red'), 'secondPath.strokeColor');

    // By appending a path with a different fillcolor,
    // the group's fillColor should return undefined:
    equals(group.fillColor, undefined, 'group.fillColor');

    // But, both paths have a red strokeColor, so:
    equals(group.strokeColor, new Color('red'), 'group.strokeColor');

    // Change the fill color of the group's style:
    group.style.fillColor = 'black';

    // the paths contained in the group should now both have their fillColor
    // set to black:
    equals(path.fillColor, new Color('black'), 'path.fillColor');
    equals(secondPath.fillColor, new Color('black'), 'secondPath.fillColor');

    // The second path still has its strokeColor set to red:
    equals(secondPath.strokeColor, new Color('red'), 'secondPath.strokeColor');
  });

  it('Color change propagation (#1672)', () => {
    // We use this trick to take a snapshot of the current canvas content
    // without any kind of side effect that `item.rasterize()` or other
    // techniques would have.
    function getDataURL() {
      paper.view.update();
      return paper.view.context.canvas.toDataURL();
    }

    const item = new Path.Circle({
      center: paper.view.center,
      radius: 70,
      fillColor: 'red',
    });
    const imageDataBefore = getDataURL();

    // Change style property and check that change was detected.
    item.fillColor.hue += 100;
    const imageDataAfter = getDataURL();

    // We are limited to check that both snapshots are different.
    equals(imageDataBefore !== imageDataAfter, true, 'Canvas content should change after a change of item.fillColor.');
  });
});
