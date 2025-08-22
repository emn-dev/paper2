import { describe, it } from 'vitest';
import { Rectangle, Point, Size } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Rectangle Util', () => {
  it('new Rectangle(Point, Size);', () => {
    const rect = new Rectangle(new Point(10, 20), new Size(30, 40));
    equals(rect, new Rectangle(10, 20, 30, 40));
  });

  it('new Rectangle({ point, size });', () => {
    const rect = new Rectangle({ point: [10, 20], size: [30, 40] });
    equals(rect, new Rectangle(10, 20, 30, 40));
    const rect2 = new Rectangle({ point: new Point(10, 20), size: new Size(30, 40) });
    equals(rect2, new Rectangle(10, 20, 30, 40));
  });

  it('new Rectangle(Array, Array);', () => {
    const rect = new Rectangle([10, 20], [30, 40]);
    equals(rect, new Rectangle(10, 20, 30, 40));
  });

  it('new Rectangle(Point, Point);', () => {
    const rect = new Rectangle(new Point(10, 20), new Point(30, 40));
    equals(rect, new Rectangle(10, 20, 20, 20));
  });

  it('new Rectangle({ from, to });', () => {
    const rect = new Rectangle({ from: [10, 20], to: [30, 40] });
    equals(rect, new Rectangle(10, 20, 20, 20));
  });

  it('new Rectangle(x, y, width, height);', () => {
    const rect = new Rectangle(10, 20, 30, 40);
    equals(rect, new Rectangle(10, 20, 30, 40));
  });

  it('new Rectangle({ x, y, width, height });', () => {
    const rect = new Rectangle({ x: 10, y: 20, width: 30, height: 40 });
    equals(rect, new Rectangle(10, 20, 30, 40));
  });

  it('new Rectangle(object)', () => {
    const expected = new Rectangle(100, 50, 100, 200);

    equals(function () {
      return new Rectangle({
        top: expected.top,
        right: expected.right,
        bottom: expected.bottom,
        left: expected.left,
      });
    }, expected);

    function testProperties(key1, key2) {
      const obj = {};
      obj[key1] = expected[key1];
      obj[key2] = expected[key2];
      const rect = new Rectangle(obj);
      equals(rect, expected, 'new Rectangle({ ' + key1 + ', ' + key2 + ' });');
    }

    const tests = [
      ['center', 'size'],
      ['topLeft', 'size'],
      ['topRight', 'size'],
      ['bottomRight', 'size'],
      ['bottomLeft', 'size'],
      ['leftCenter', 'size'],
      ['topCenter', 'size'],
      ['rightCenter', 'size'],
      ['bottomCenter', 'size'],
      ['topLeft', 'bottomRight'],
      ['topRight', 'bottomLeft'],
      ['topLeft', 'bottomCenter'],
      ['topLeft', 'rightCenter'],
      ['topRight', 'bottomCenter'],
      ['topRight', 'leftCenter'],
      ['bottomLeft', 'topCenter'],
      ['bottomLeft', 'rightCenter'],
      ['bottomRight', 'topCenter'],
      ['bottomRight', 'leftCenter'],
    ];

    tests.forEach(function (test) {
      testProperties(test[0], test[1]);
      testProperties(test[1], test[0]);
    });
  });

  it('rect.left / rect.top VS rect.right / rect.bottom', () => {
    const rect = new Rectangle({
      point: [0, 0],
      size: [100, 100],
    });
    rect.left -= 10;
    rect.top -= 10;
    equals(rect.right, 90);
    equals(rect.bottom, 90);

    const rect2 = new Rectangle([0, 0], [100, 100]);
    rect2.left -= 10;
    rect2.top -= 10;
    equals(rect2.right, 90);
    equals(rect2.bottom, 90);

    const rect3 = new Rectangle({
      topLeft: [0, 0],
      bottomRight: [100, 100],
    });
    rect3.left -= 10;
    rect3.top -= 10;
    equals(rect3.right, 100);
    equals(rect3.bottom, 100);
  });

  it('rect.size', () => {
    const rect = new Rectangle(10, 10, 20, 30);
    equals(function () {
      return rect.size.equals([20, 30]);
    }, true);
    rect.size = [30, 40];
    equals(rect, new Rectangle(10, 10, 30, 40));
  });

  it('rect.center', () => {
    const rect = new Rectangle(10, 10, 20, 30);
    equals(
      function () {
        return rect.size;
      },
      new Size(20, 30)
    );
    equals(
      function () {
        return rect.center;
      },
      new Point(20, 25)
    );
    rect.center = [100, 100];
    equals(
      function () {
        return rect.center;
      },
      new Point(100, 100)
    );
    equals(
      function () {
        return rect.size;
      },
      new Size(20, 30)
    );
    rect.center = [200, 200];
    equals(
      function () {
        return rect.center;
      },
      new Point(200, 200)
    );
    equals(
      function () {
        return rect.size;
      },
      new Size(20, 30)
    );
  });

  it('rect.topLeft', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.topLeft;
    equals(point, { x: 10, y: 10 });

    rect.topLeft = [10, 15];
    const point2 = rect.topLeft;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.topRight', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.topRight;
    equals(point, { x: 30, y: 10 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.topRight = [10, 15];
    const point2 = rect2.topRight;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.bottomLeft', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.bottomLeft;
    equals(point, { x: 10, y: 30 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.bottomLeft = [10, 15];
    const point2 = rect2.bottomLeft;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.bottomRight', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.bottomRight;
    equals(point, { x: 30, y: 30 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.bottomRight = [10, 15];
    const point2 = rect2.bottomRight;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.bottomCenter', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.bottomCenter;
    equals(point, { x: 20, y: 30 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.bottomCenter = [10, 15];
    const point2 = rect2.bottomCenter;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.topCenter', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.topCenter;
    equals(point, { x: 20, y: 10 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.topCenter = [10, 15];
    const point2 = rect2.topCenter;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.leftCenter', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.leftCenter;
    equals(point, { x: 10, y: 20 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.leftCenter = [10, 15];
    const point2 = rect2.leftCenter;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect.rightCenter', () => {
    const rect = new Rectangle(10, 10, 20, 20);
    const point = rect.rightCenter;
    equals(point, { x: 30, y: 20 });

    const rect2 = new Rectangle(10, 10, 20, 20);
    rect2.rightCenter = [10, 15];
    const point2 = rect2.rightCenter;
    equals(point2, { x: 10, y: 15 });
  });

  it('rect1.intersects(rect2)', () => {
    let rect1 = new Rectangle(160, 270, 20, 20);
    let rect2 = new Rectangle(195, 301, 19, 19);
    equals(function () {
      return rect1.intersects(rect2);
    }, false);

    rect1 = new Rectangle(160, 270, 20, 20);
    rect2 = new Rectangle(170.5, 280.5, 19, 19);
    equals(function () {
      return rect1.intersects(rect2);
    }, true);
  });

  it('rect1.contains(rect2)', () => {
    let rect1 = new Rectangle(160, 270, 20, 20);
    let rect2 = new Rectangle(195, 301, 19, 19);
    equals(function () {
      return rect1.contains(rect2);
    }, false);

    rect1 = new Rectangle(160, 270, 20, 20);
    rect2 = new Rectangle(170.5, 280.5, 19, 19);
    equals(function () {
      return rect1.contains(rect2);
    }, false);

    rect1 = new Rectangle(299, 161, 137, 129);
    rect2 = new Rectangle(340, 197, 61, 61);
    equals(function () {
      return rect1.contains(rect2);
    }, true);
    equals(function () {
      return rect2.contains(rect1);
    }, false);
  });

  it('rect.contains(point)', () => {
    const rect = new Rectangle(160, 270, 20, 20);
    const point = new Point(166, 280);
    equals(function () {
      return rect.contains(point);
    }, true);

    const point2 = new Point(30, 30);
    equals(function () {
      return rect.contains(point2);
    }, false);
  });

  it('rect1.intersect(rect2)', () => {
    const rect1 = new Rectangle(160, 270, 20, 20);
    const rect2 = new Rectangle(170.5, 280.5, 19, 19);
    const intersected = rect1.intersect(rect2);
    equals(function () {
      return intersected.equals(new Rectangle(170.5, 280.5, 9.5, 9.5));
    }, true);
  });

  it('rect1.unite(rect2)', () => {
    const rect1 = new Rectangle(160, 270, 20, 20);
    const rect2 = new Rectangle(170.5, 280.5, 19, 19);
    const united = rect1.unite(rect2);
    equals(function () {
      return united.equals(new Rectangle(160, 270, 29.5, 29.5));
    }, true);
  });

  it('rect.include(point)', () => {
    const rect1 = new Rectangle(95, 151, 20, 20);
    const included = rect1.include([50, 50]);
    equals(function () {
      return included.equals(new Rectangle(50, 50, 65, 121));
    }, true);
  });

  it('rect.toString()', () => {
    const string = new Rectangle(10, 20, 30, 40).toString();
    equals(string, '{ x: 10, y: 20, width: 30, height: 40 }');
  });
});
