import { describe, it } from 'vitest';
import { Numerical } from '~/util/Numerical';
import { equals } from './_helpers';

describe('Given: Numerical Util', () => {
  it('Numerical.solveQuadratic()', () => {
    function solve(s) {
      const roots = [];
      Numerical.solveQuadratic(s, 0, -s, roots);
      return roots;
    }

    const expected = [1, -1];

    equals(solve(1), expected, 'Numerical.solveQuadratic().');
    equals(
      solve(Numerical.EPSILON),
      expected,
      'Numerical.solveQuadratic() with an identical set of' + 'coefficients at different scale.'
    );
  });

  it('Numerical.solveCubic()', () => {
    function solve(s) {
      const roots = [];
      Numerical.solveCubic(0.5 * s, -s, -s, -s, roots);
      return roots;
    }

    const expected = [2.919639565839418];

    equals(solve(1), expected, 'Numerical.solveCubic().');
    equals(
      solve(Numerical.EPSILON),
      expected,
      'Numerical.solveCubic() with an identical set of' + 'coefficients at different scale.'
    );
  });
});
