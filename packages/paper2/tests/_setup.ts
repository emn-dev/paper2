import { beforeEach } from 'vitest';
import { paper } from '~/index-core';

beforeEach(() => {
  paper.setup(new paper.Size(100, 100));
});
