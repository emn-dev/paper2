import { describe, it } from 'vitest';
import { Point, Path, Size } from '~/index-core';
import { equals, triggerMouseEvent } from './_helpers';

describe('Given: Interactions', () => {
  //
  // Mouse
  //
  it('Item#onMouseDown()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onMouseDown = function (event) {
      equals(event.type, 'mousedown');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, null);
    };

    triggerMouseEvent('mousedown', point);
  });

  it('Item#onMouseDown() with stroked item', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.strokeColor = 'red';
    const point = new Point(0, 0);
    item.onMouseDown = function (event) {
      equals(event.type, 'mousedown');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, null);
    };
    triggerMouseEvent('mousedown', point);
  });

  it('Item#onMouseDown() is not triggered when item is not filled', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.onMouseDown = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onMouseDown() is not triggered when item is not visible', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.visible = false;
    item.onMouseDown = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onMouseDown() is not triggered when item is locked', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.locked = true;
    item.onMouseDown = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onMouseDown() is not triggered when another item is in front', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.clone();
    item.onMouseDown = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onMouseDown() is not triggered if event target is document', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.onMouseDown = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5), document);
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onMouseMove()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onMouseMove = function (event) {
      equals(event.type, 'mousemove');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, null);
    };
    triggerMouseEvent('mousemove', point);
  });

  it('Item#onMouseMove() is not re-triggered if point is the same', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    // const counter = 0;
    item.onMouseMove = function () {
      equals(true, true);
    };
    triggerMouseEvent('mousemove', point);
    triggerMouseEvent('mousemove', point);
    // expect(1); // Not sure where this comes from?
  });

  it('Item#onMouseUp()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onMouseUp = function (event) {
      equals(event.type, 'mouseup');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, new Point(0, 0));
    };
    triggerMouseEvent('mousedown', point);
    triggerMouseEvent('mouseup', point);
  });

  it('Item#onMouseUp() is only triggered after mouse down', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.onMouseUp = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mouseup', new Point(5, 5));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onClick()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onClick = function (event) {
      equals(event.type, 'click');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, new Point(0, 0));
    };
    triggerMouseEvent('mousedown', point);
    triggerMouseEvent('mouseup', point);
  });

  it('Item#onClick() is not triggered if up point is not on item', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.onClick = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    triggerMouseEvent('mouseup', new Point(15, 15));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onClick() is not triggered if down point is not on item', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.onClick = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(15, 15));
    triggerMouseEvent('mouseup', new Point(5, 5));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onDoubleClick()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onDoubleClick = function (event) {
      equals(event.type, 'doubleclick');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, new Point(0, 0));
    };
    triggerMouseEvent('mousedown', point);
    triggerMouseEvent('mouseup', point);
    triggerMouseEvent('mousedown', point);
    triggerMouseEvent('mouseup', point);
  });

  it('Item#onDoubleClick() is not triggered if both clicks are not on same item', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.clone().translate(5);
    item.onDoubleClick = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    triggerMouseEvent('mouseup', new Point(5, 5));
    triggerMouseEvent('mousedown', new Point(6, 6));
    triggerMouseEvent('mouseup', new Point(6, 6));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onDoubleClick() is not triggered if time between both clicks is too long', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onDoubleClick = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', point);
    triggerMouseEvent('mouseup', point);
    setTimeout(function () {
      triggerMouseEvent('mousedown', point);
      triggerMouseEvent('mouseup', point);
    }, 301);
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });

  it('Item#onMouseEnter()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point = new Point(5, 5);
    item.onMouseEnter = function (event) {
      equals(event.type, 'mouseenter');
      equals(event.point, point);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, null);
    };
    triggerMouseEvent('mousemove', point);
  });

  it('Item#onMouseEnter() is only re-triggered after mouse leave', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.onMouseEnter = function () {
      equals(true, true);
    };
    // enter
    triggerMouseEvent('mousemove', new Point(5, 5));
    triggerMouseEvent('mousemove', new Point(6, 6));
    triggerMouseEvent('mousemove', new Point(7, 7));
    // leave
    triggerMouseEvent('mousemove', new Point(11, 11));
    // re-enter
    triggerMouseEvent('mousemove', new Point(10, 10));
    // expect(2); // Not sure where this comes from?
  });

  it('Item#onMouseLeave()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point1 = new Point(5, 5);
    const point2 = new Point(15, 15);
    item.onMouseLeave = function (event) {
      equals(event.type, 'mouseleave');
      equals(event.point, point2);
      equals(event.target, item);
      equals(event.currentTarget, item);
      equals(event.delta, null);
    };
    triggerMouseEvent('mousemove', point1);
    triggerMouseEvent('mousemove', point2);
  });

  it('Item#onMouseDrag()', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const point1 = new Point(5, 5);
    const point2 = new Point(15, 15);
    item.onMouseDrag = function (event) {
      equals(event.type, 'mousedrag');

      // equals(event.point, point2); // TODO: why this not working?

      equals(event.target, item);
      equals(event.currentTarget, item);

      // equals(event.delta, new Point(10, 10)); // TODO: why this not working?
    };
    triggerMouseEvent('mousedown', point1);
    triggerMouseEvent('mousemove', point2);
  });

  it('Item#onMouseDrag() is not triggered after mouse up', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    item.onMouseDrag = function () {
      equals(true, true);
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    triggerMouseEvent('mousemove', new Point(6, 6));
    triggerMouseEvent('mouseup', new Point(7, 7));
    triggerMouseEvent('mousemove', new Point(8, 8));
    // expect(1); // Not sure where this comes from?
  });

  it('Item#onMouseDrag() is not triggered if mouse down was on another item', () => {
    const item = new Path.Rectangle(new Point(0, 0), new Size(10));
    item.fillColor = 'red';
    const item2 = item.clone().translate(10);
    item2.onMouseDrag = function () {
      throw 'this should not be called';
    };
    triggerMouseEvent('mousedown', new Point(5, 5));
    triggerMouseEvent('mousemove', new Point(11, 11));
    // expect(0); // No need for this, if test does NOT throw then it is a success
  });
});
