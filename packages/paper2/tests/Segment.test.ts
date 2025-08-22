import { describe, it } from 'vitest';
import { Point, Path, Segment, Size } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Segment', () => {
  it('new Segment()', () => {
    const segment = new Segment(null, null, null);
    equals(segment.toString(), '{ point: { x: 0, y: 0 } }');
  });

  it('new Segment(point)', () => {
    const segment = new Segment(new Point(10, 10));
    equals(segment.toString(), '{ point: { x: 10, y: 10 } }');
  });

  it('new Segment(x, y)', () => {
    const segment = new Segment(10, 10);
    equals(segment.toString(), '{ point: { x: 10, y: 10 } }');
  });

  it('new Segment(undefined)', () => {
    const segment = new Segment(undefined);
    equals(segment.toString(), '{ point: { x: 0, y: 0 } }');
  });

  it('new Segment(object)', () => {
    const segment = new Segment({ point: { x: 10, y: 10 }, handleIn: { x: 5, y: 5 }, handleOut: { x: 15, y: 15 } });
    equals(segment.toString(), '{ point: { x: 10, y: 10 }, handleIn: { x: 5, y: 5 }, handleOut: { x: 15, y: 15 } }');
  });

  it('new Segment(point, handleIn, handleOut)', () => {
    const segment = new Segment(new Point(10, 10), new Point(5, 5), new Point(15, 15));
    equals(segment.toString(), '{ point: { x: 10, y: 10 }, handleIn: { x: 5, y: 5 }, handleOut: { x: 15, y: 15 } }');
  });

  it('new Segment(null, null, null)', () => {
    const segment = new Segment(null, null, null);
    equals(segment.toString(), '{ point: { x: 0, y: 0 } }');
  });

  it('new Segment(undefined, null, null)', () => {
    const segment = new Segment(undefined, null, null);
    equals(segment.toString(), '{ point: { x: 0, y: 0 } }');
  });

  it('new Segment(x, y, inX, inY, outX, outY)', () => {
    const segment = new Segment(10, 10, 5, 5, 15, 15);
    equals(segment.toString(), '{ point: { x: 10, y: 10 }, handleIn: { x: 5, y: 5 }, handleOut: { x: 15, y: 15 } }');
  });

  it('new Segment(size)', () => {
    const segment = new Segment(new Size(10, 10));
    equals(segment.toString(), '{ point: { x: 10, y: 10 } }');
  });

  it('segment.reverse()', () => {
    const segment = new Segment(new Point(10, 10), new Point(5, 5), new Point(15, 15));
    segment.reverse();
    equals(segment.toString(), '{ point: { x: 10, y: 10 }, handleIn: { x: 15, y: 15 }, handleOut: { x: 5, y: 5 } }');
  });

  it('segment.clone()', () => {
    const segment = new Segment(new Point(10, 10), new Point(5, 5), new Point(15, 15));
    const clone = segment.clone();
    equals(function () {
      return segment == clone;
    }, false);

    equals(function () {
      return segment.toString();
    }, clone.toString());
  });

  it('segment.remove()', () => {
    const path = new Path([10, 10], [5, 5], [10, 10]);
    path.segments[1].remove();
    equals(path.segments.toString(), '{ point: { x: 10, y: 10 } },{ point: { x: 10, y: 10 } }');
  });

  it('segment.selected', () => {
    const path = new Path([10, 20], [50, 100]);
    path.segments[0].point.selected = true;
    equals(function () {
      return path.segments[0].point.selected;
    }, true);
    path.segments[0].point.selected = false;
    equals(function () {
      return path.segments[0].point.selected;
    }, false);
  });
});
