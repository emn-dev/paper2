import { beforeEach } from 'vitest';
import './mocks/canvas';
import '~/index';
import { ref } from '~/globals';

beforeEach(() => {
  ref.paper.setup(new ref.paper.Size(100, 100));
});
