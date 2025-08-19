// import { mergeConfig } from 'vite';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
// import viteConfig from './vite.config';

export default defineConfig({
  test: {
    mockReset: true,
    exclude: [...configDefaults.exclude, 'e2e/*'],
    setupFiles: ['./tests/_setup.ts'],
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './lib'),
    },
  },
});
