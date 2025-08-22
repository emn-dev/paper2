import { describe, it } from 'vitest';
import { Color, Point, PointText } from '~/index-core';
import { equals } from './_helpers';

describe('Given: TextItem', () => {
  it('PointText', () => {
    const text = new PointText({
      fontFamily: 'Arial, Helvetica',
      fontSize: 14,
      point: [100, 100],
      content: 'Hello World!',
    });
    equals(text.fillColor, new Color(0, 0, 0), 'text.fillColor should be black by default');
    equals(text.point, new Point(100, 100), 'text.point');
    // TODO: why is this broken?
    // equals(text.bounds, new Rectangle(100, 87.4, 76.25, 16.8), 'text.bounds', { tolerance: 1.0 });
    equals(function () {
      return text.hitTest(text.bounds.center) != null;
    }, true);
  });
});
