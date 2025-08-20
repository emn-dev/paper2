import { describe, it } from 'vitest';
import { Matrix, Point, paper } from '~/index-core';
import { equals } from './_helpers';

describe('Given: Matrix Class', () => {
  it('Decomposition: rotate()', () => {
    function testAngle(a, ea = undefined) {
      const m = new Matrix().rotate(a);
      const s = 'new Matrix().rotate(' + a + ')';

      equals(m.getRotation(), paper.Base.pick(ea, a), s + '.getRotation()');
      equals(m.getScaling(), new Point(1, 1), s + '.getScaling()');
    }

    testAngle(0);
    testAngle(1);
    testAngle(45);
    testAngle(90);
    testAngle(135);
    testAngle(180);
    testAngle(270, -90);
    testAngle(-1);
    testAngle(-45);
    testAngle(-90);
    testAngle(-135);
    testAngle(-180);
    testAngle(-270, 90);
  });

  it('Decomposition: scale()', () => {
    function testScale(sx, sy, ex = undefined, ey = undefined, ea = undefined) {
      const m = new Matrix().scale(sx, sy);
      const s = 'new Matrix().scale(' + sx + ', ' + sy + ')';

      equals(m.getRotation(), ea || 0, s + '.getRotation()');
      equals(m.getScaling(), new Point(paper.Base.pick(ex, sx), paper.Base.pick(ey, sy)), s + '.getScaling()');
    }

    testScale(1, 1);
    testScale(1, -1);
    testScale(-1, 1, 1, -1, -180); // Decomposing results in correct flipping
    testScale(-1, -1, 1, 1, -180); // Decomposing results in correct flipping
    testScale(2, 4);
    testScale(2, -4);
    testScale(4, 2);
    testScale(-4, 2, 4, -2, -180); // Decomposing results in correct flipping
    testScale(-4, -4, 4, 4, -180); // Decomposing results in correct flipping
  });

  it('Decomposition: scale() & rotate()', () => {
    function testAngleAndScale(sx, sy, a, ex = undefined, ey = undefined, ea = undefined) {
      const m = new Matrix().rotate(a).scale(sx, sy);
      const s = 'new Matrix().scale(' + sx + ', ' + sy + ').rotate(' + a + ')';
      equals(m.getRotation(), ea || a, s + '.getRotation()');
      equals(m.getScaling(), new Point(paper.Base.pick(ex, sx), paper.Base.pick(ey, sy)), s + '.getScaling()');
    }

    testAngleAndScale(2, 4, 45);
    testAngleAndScale(2, -4, 45);
    testAngleAndScale(-2, 4, 45, 2, -4, -135);
    testAngleAndScale(-2, -4, 45, 2, 4, -135);
  });
});
