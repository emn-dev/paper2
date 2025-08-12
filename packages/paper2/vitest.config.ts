// import { mergeConfig } from 'vite';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
// import viteConfig from './vite.config';

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    exclude: [...configDefaults.exclude, 'e2e/*'],
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './lib'),
    },
  },
});
