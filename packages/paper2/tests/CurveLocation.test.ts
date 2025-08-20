import { describe, it } from 'vitest';
import { Point, Path } from '~/index-core';
import { equals } from './_helpers';

describe('Given: CurveLocation Class', () => {
  it('CurveLocation#offset', () => {
    const path = new Path();
    path.add(new Point(100, 100));
    path.add(new Point(200, 100));
    path.add(new Point(300, 100));
    path.add(new Point(400, 100));

    for (let i = 0; i < 4; i++) {
      equals(path.segments[i].location.offset, i * 100);
    }
  });
});
