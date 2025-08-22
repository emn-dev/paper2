import { describe, it } from 'vitest';
import { paper } from '~/index-full';
import { equals } from './_helpers';

describe('Given: PaperScript', () => {
  async function executeCode(code, expected) {
    const PaperScript = await paper.Base.exports.PaperScript;
    // try {
    equals(PaperScript.execute(code, paper), expected, code);
    // } catch (err) {
    //   // ok(false, err + '');
    // }
  }

  it('PaperScript with prefix decrement operators', () => {
    executeCode('var j = 0; for (var i = 10; i > 0; i--) { j++ }; module.exports = j', 10);
    executeCode('var x = 1; var y = 4 * --x; y; module.exports = x + " " + y', '0 0');
  });

  it('PaperScript with suffix increment operators', () => {
    executeCode('var j = 0; for (var i = 0; i < 10; ++i) { j++ }; module.exports = j', 10);
    // #691
    executeCode('var x = 1; x = x++; module.exports = x', 1);
    executeCode('var x = 1; var y = 4 * x++; y; module.exports = x + " " + y', '2 4');
  });
});
