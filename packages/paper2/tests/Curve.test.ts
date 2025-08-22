import { describe, it } from 'vitest';
import { Curve, Path, Point } from '~/index-core';
import { equals } from './_helpers';

function testClassify(curve, expeced) {
  const info = curve.classify();
  if (expeced.type) {
    equals(info.type, expeced.type, "info.type == '" + expeced.type + "'");
  }
  if (expeced.roots !== undefined) {
    equals(info.roots, expeced.roots, 'info.roots == ' + (expeced.roots ? '[' + expeced.roots + ']' : expeced.roots));
  }
}

describe('Given: Curve Class', () => {
  describe('WHEN Curve#classify()', () => {
    it('THEN should return expected numbers', () => {
      const point = new Curve([100, 100], null, null, [100, 100]);
      const line = new Curve([100, 100], null, null, [200, 200]);
      const cusp = new Curve([100, 200], [100, -100], [-100, -100], [200, 200]);
      const loop = new Curve([100, 200], [150, -100], [-150, -100], [200, 200]);
      const single = new Curve([100, 100], [50, 0], [-27, -46], [200, 200]);
      const double = new Curve([100, 200], [100, -100], [-40, -80], [200, 200]);
      const arch = new Curve([100, 100], [50, 0], [0, -50], [200, 200]);

      testClassify(point, { type: 'line', roots: null });
      testClassify(line, { type: 'line', roots: null });
      testClassify(cusp, { type: 'cusp', roots: [0.5] });
      testClassify(loop, {
        type: 'loop',
        roots: [0.17267316464601132, 0.8273268353539888],
      });
      testClassify(single, { type: 'serpentine', roots: [0.870967741935484] });
      testClassify(double, {
        type: 'serpentine',
        roots: [0.15047207654837885, 0.7384168123405099],
      });
      testClassify(arch, { type: 'arch', roots: null });
    });
  });

  describe('WHEN Curve#getPointAtTime()', () => {
    it('THEN should return expected numbers', () => {
      let curve = new Path.Circle({
        center: [100, 100],
        radius: 100,
      }).firstCurve;

      const points = [
        [0, new Point(0, 100)],
        [0.25, new Point(7.8585, 61.07549)],
        [0.5, new Point(29.28932, 29.28932)],
        [0.75, new Point(61.07549, 7.8585)],
        [1, new Point(100, 0)],
      ];

      for (let i = 0; i < points.length; i++) {
        const entry = points[i];
        equals(curve.getPointAtTime(entry[0]), entry[1], 'curve.getPointAtTime(' + entry[0] + ');');

        // Legacy version:
        equals(curve.getPointAt(entry[0], true), entry[1], 'Legacy: curve.getPointAt(' + entry[0] + ', true);');
      }

      equals(curve.getPointAt(curve.length + 1), null, 'Should return null when offset is out of range.');

      // #960:
      curve = new Curve({
        segment1: [178.58559999999994, 333.41440000000006],
        segment2: [178.58559999999994, 178.58560000000008],
      });
      equals(curve.getPointAtTime(0).y, curve.point1.y, 'Point at t=0 should not deviate from the actual coordinates.');
      equals(curve.getPointAtTime(1).y, curve.point2.y, 'Point at t=1 should not deviate from the actual coordinates.');
    });
  });

  describe('WHEN Curve#getTangentAtTime()', () => {
    it('THEN should return expected numbers', () => {
      const curve = new Path.Circle({
        center: [100, 100],
        radius: 100,
      }).firstCurve;

      const tangents = [
        // [0, new Point(0, 999)], // FOR_TESTING: force an error
        [0, new Point(0, -165.68542)],
        [0.25, new Point(60.7233, -143.56602)],
        [0.5, new Point(108.57864, -108.57864)],
        [0.75, new Point(143.56602, -60.7233)],
        [1, new Point(165.68542, 0)],
      ];

      for (let i = 0; i < tangents.length; i++) {
        const entry = tangents[i];

        equals(curve.getTangentAtTime(entry[0]), entry[1].normalize(), 'curve.getTangentAtTime(' + entry[0] + ');');

        equals(curve.getWeightedTangentAtTime(entry[0]), entry[1], 'curve.getWeightedTangentAtTime(' + entry[0] + ');');

        // Legacy version:
        equals(
          curve.getTangentAt(entry[0], true),
          entry[1].normalize(),
          'Legacy: curve.getTangentAt(' + entry[0] + ', true);'
        );

        equals(
          curve.getWeightedTangentAt(entry[0], true),
          entry[1],
          'Legacy: curve.getWeightedTangentAt(' + entry[0] + ', true);'
        );
      }
    });
  });
});
