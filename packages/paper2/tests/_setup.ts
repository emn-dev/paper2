import { beforeEach } from 'vitest';
// import '~/jsdom-canvas-setup';
// import { paper } from '~/index-core';

beforeEach(async () => {
  await import('~/jsdom-canvas-setup.js');
  const { paper } = await import('~/index-core.js');
  paper.setup(new paper.Size(100, 100));
});
