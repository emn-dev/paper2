import { describe, it } from 'vitest';
import { Path, Group, Layer, paper } from '~/index-core';
import { equals, getFunctionMessage } from './_helpers';

describe('Given: Item Order', () => {
  it('Item Order', () => {
    const line = new Path();
    line.add([0, 0], [100, 100]);
    line.name = 'line';

    const circle = new Path.Circle([50, 50], 50);
    circle.name = 'circle';

    const group = new Group([circle]);
    group.name = 'group';

    equals(function () {
      return circle.isAbove(line);
    }, true);
    equals(function () {
      return line.isBelow(circle);
    }, true);

    equals(function () {
      return group.isAbove(line);
    }, true);
    equals(function () {
      return line.isBelow(group);
    }, true);

    equals(function () {
      return group.isAncestor(circle);
    }, true);

    equals(function () {
      return circle.isDescendant(group);
    }, true);

    equals(function () {
      return group.isAbove(circle);
    }, false);

    equals(function () {
      return group.isBelow(circle);
    }, false);
  });

  it('Item#insertAbove(item) / Item#insertBelow(item)', () => {
    let item0, item1, item2;

    function testType(ctor) {
      function testMove(command, indexes) {
        paper.project.clear();
        if (ctor !== Layer) new Layer();
        item0 = new ctor();
        item1 = new ctor();
        item2 = new ctor();
        command();
        const str = getFunctionMessage(command);
        const name = item0.className.toLowerCase();
        equals(item0.index, indexes[0], str + ': ' + name + '0.index');
        equals(item1.index, indexes[1], str + ': ' + name + '1.index');
        equals(item2.index, indexes[2], str + ': ' + name + '2.index');
      }

      testMove(
        function () {
          item0.insertBelow(item0);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item0.insertBelow(item1);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item0.insertBelow(item2);
        },
        [1, 0, 2]
      );
      testMove(
        function () {
          item1.insertBelow(item0);
        },
        [1, 0, 2]
      );
      testMove(
        function () {
          item1.insertBelow(item1);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item1.insertBelow(item2);
        },
        [0, 1, 2]
      );

      testMove(
        function () {
          item2.insertBelow(item0);
        },
        [1, 2, 0]
      );
      testMove(
        function () {
          item2.insertBelow(item1);
        },
        [0, 2, 1]
      );
      testMove(
        function () {
          item2.insertBelow(item2);
        },
        [0, 1, 2]
      );

      testMove(
        function () {
          item0.insertAbove(item0);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item0.insertAbove(item1);
        },
        [1, 0, 2]
      );
      testMove(
        function () {
          item0.insertAbove(item2);
        },
        [2, 0, 1]
      );
      testMove(
        function () {
          item1.insertAbove(item0);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item1.insertAbove(item1);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item1.insertAbove(item2);
        },
        [0, 2, 1]
      );
      testMove(
        function () {
          item2.insertAbove(item0);
        },
        [0, 2, 1]
      );
      testMove(
        function () {
          item2.insertAbove(item1);
        },
        [0, 1, 2]
      );
      testMove(
        function () {
          item2.insertAbove(item2);
        },
        [0, 1, 2]
      );
    }

    testType(Group);
    testType(Layer);
  });

  it('Item#insertChild() with already inserted children', () => {
    new Group();
    new Group();
    new Group();
    const item4 = new Group();
    const newIndex = 1;
    const oldIndex = item4.index;
    item4.parent.insertChild(1, item4);
    equals(function () {
      return item4.index;
    }, newIndex);
    item4.parent.insertChild(oldIndex, item4);
    equals(function () {
      return item4.index;
    }, oldIndex);
  });

  it('Item#index getter setter', () => {
    new Group();
    new Group();
    new Group();
    const item4 = new Group();
    let newIndex = 2;
    item4.index = newIndex;
    equals(function () {
      return item4.index;
    }, newIndex);
    newIndex = 0;
    item4.index = newIndex;
    equals(function () {
      return item4.index;
    }, newIndex);
  });
});
