import { describe, it } from 'vitest';
import { CompoundPath, Point, Path } from '~/index-core';
import { equals } from './_helpers';

describe('Given: CompoundPath Class', () => {
  it('moveTo() / lineTo()', () => {
    const path = new CompoundPath();

    const lists = [
      [new Point(279, 151), new Point(149, 151), new Point(149, 281), new Point(279, 281)],
      [new Point(319, 321), new Point(109, 321), new Point(109, 111), new Point(319, 111)],
    ];

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      for (let j = 0; j < list.length; j++) {
        path[!j ? 'moveTo' : 'lineTo'](list[j]);
      }
    }

    path.fillColor = 'black';

    equals(function () {
      return path.children.length;
    }, 2);
  });

  it('CompoundPath#reorient()', () => {
    const path1 = new Path.Rectangle([300, 300], [100, 100]);
    const path2 = new Path.Rectangle([50, 50], [200, 200]);
    const path3 = new Path.Rectangle([0, 0], [500, 500]);

    equals(function () {
      return path1.clockwise;
    }, true);
    equals(function () {
      return path2.clockwise;
    }, true);
    equals(function () {
      return path3.clockwise;
    }, true);

    const compound = new CompoundPath({
      children: [path1, path2, path3],
    }).reorient();

    equals(function () {
      return compound.lastChild == path3;
    }, true);
    equals(function () {
      return compound.firstChild == path1;
    }, true);
    equals(function () {
      return path1.clockwise;
    }, false);
    equals(function () {
      return path2.clockwise;
    }, false);
    equals(function () {
      return path3.clockwise;
    }, true);
  });
});
