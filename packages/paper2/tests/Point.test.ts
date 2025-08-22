import { describe, it } from 'vitest';
import { Point, Size } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Point', () => {
  it('new Point(10, 20)', () => {
    const point = new Point(10, 20);
    equals(point.x, 10, 'point.x');
    equals(point.y, 20, 'point.y');
  });

  it('new Point([10, 20])', () => {
    const point = new Point([10, 20]);
    equals(point.x, 10, 'point.x');
    equals(point.y, 20, 'point.y');
  });

  it('new Point({x: 10, y: 20})', () => {
    const point = new Point({ x: 10, y: 20 });
    equals(point.x, 10, 'point.x');
    equals(point.y, 20, 'point.y');
  });

  it('new Point(new Size(10, 20))', () => {
    equals(new Point(new Size(10, 20)), new Point(10, 20));
  });

  it('new Point({ width: 10, height: 20})', () => {
    equals(new Point({ width: 10, height: 20 }), new Point(10, 20));
  });

  it('new Point({ angle: 45, length: 20})', () => {
    equals(new Point({ angle: 40, length: 20 }), new Point(15.32089, 12.85575));
  });

  it('new Point("10, 20")', () => {
    equals(new Point('10, 20'), new Point(10, 20));
    equals(new Point('10,20'), new Point(10, 20));
    equals(new Point('10 20'), new Point(10, 20));
    // Make sure it's integer values from the string:
    equals(new Point('10 20').add(10), new Point(20, 30));
  });

  it('normalize(length)', () => {
    const point = new Point(0, 10).normalize(20);
    equals(point, new Point(0, 20));
  });

  it('set length', () => {
    const point = new Point(0, 10);
    point.length = 20;
    equals(point, new Point(0, 20));
  });

  it('get angle', () => {
    const angle = new Point(0, 10).angle;
    equals(angle, 90);
  });

  it('getAngle(point)', () => {
    const angle = new Point(0, 10).getAngle([10, 10]);
    equals(Math.round(angle), 45);
  });

  it('rotate(degrees)', () => {
    const point = new Point(100, 50).rotate(90);
    equals(point, new Point(-50, 100));
  });

  it('set angle', () => {
    const point = new Point(10, 20);
    point.angle = 92;
    equals(point.angle, 92);
    equals(
      point,
      new Point({
        angle: 92,
        length: Math.sqrt(10 * 10 + 20 * 20),
      })
    );
  });

  it('set angle & length', () => {
    const point1 = new Point();
    point1.length = Math.SQRT2;
    point1.angle = -45;

    const point2 = new Point();
    point2.angle = -45;
    point2.length = Math.SQRT2;

    equals(point2, point1);
  });

  it('getting angle after x / y change', () => {
    const vector = new Point(1, 0);
    equals(vector.angle, 0, 'angle before x / y change');
    vector.x = 0;
    vector.y = 1;
    equals(vector.angle, 90, 'angle after x / y change');
  });

  it('getDirectedAngle(point)', () => {
    equals(function () {
      return new Point(10, 10).getDirectedAngle(new Point(1, 0));
    }, -45);

    equals(function () {
      return new Point(-10, 10).getDirectedAngle(new Point(1, 0));
    }, -135);

    equals(function () {
      return new Point(-10, -10).getDirectedAngle(new Point(1, 0));
    }, 135);

    equals(function () {
      return new Point(10, -10).getDirectedAngle(new Point(1, 0));
    }, 45);
  });

  it('equals()', () => {
    equals(function () {
      return new Point(10, 10).equals([10, 10]);
    }, true);

    equals(function () {
      return new Point(0, 0).equals({});
    }, false);

    equals(function () {
      return new Point(0, 0).equals(null);
    }, false);
  });

  it('isCollinear()', () => {
    equals(function () {
      return new Point(10, 5).isCollinear(new Point(20, 10));
    }, true);
    equals(function () {
      return new Point(5, 10).isCollinear(new Point(-5, -10));
    }, true);
    equals(function () {
      return new Point(10, 10).isCollinear(new Point(20, 10));
    }, false);
    equals(function () {
      return new Point(10, 10).isCollinear(new Point(10, -10));
    }, false);
  });

  it('isOrthogonal()', () => {
    equals(function () {
      return new Point(10, 5).isOrthogonal(new Point(5, -10));
    }, true);
    equals(function () {
      return new Point(5, 10).isOrthogonal(new Point(-10, 5));
    }, true);
    equals(function () {
      return new Point(10, 10).isOrthogonal(new Point(20, 20));
    }, false);
    equals(function () {
      return new Point(10, 10).isOrthogonal(new Point(10, -20));
    }, false);
  });
});
