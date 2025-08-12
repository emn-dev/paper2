import { beforeAll, beforeEach } from 'vitest';
import './mocks/canvas';
import { initialize } from '~/index-core';
// import '~/index';
import { ref } from '~/globals';

beforeAll(async () => {
  const { env, jsdom } = await initialize();
  console.log('env =', env);
  console.log('jsdom =', jsdom);
});

beforeEach(async () => {
  ref.paper.setup(new ref.paper.Size(100, 100));
});
