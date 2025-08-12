import { beforeAll, beforeEach } from 'vitest';
import { initialize } from '~/index-core';

let paper2 = null;

beforeAll(async () => {
  const { env, jsdom, nodeCanvas, paper } = await initialize();
  paper2 = paper;
  console.log('env =', env);
  console.log('jsdom =', jsdom);
  console.log('nodeCanvas =', nodeCanvas);
});

beforeEach(async () => {
  paper2.setup(new paper2.Size(100, 100));
});
