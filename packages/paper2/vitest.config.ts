// import { mergeConfig } from 'vite';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
// import viteConfig from './vite.config';

const isCiServer = !!process.env.GITHUB_REF;

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['lib/*'],
      reportsDirectory: '../../docs/test_coverage',
    },
    mockReset: true,
    exclude: [...configDefaults.exclude, 'e2e/*'],
    setupFiles: ['./tests/_setup.ts'],
    environment: 'jsdom',
  },
  define: {
    'process.env.SHOW_JSDOM_LOG': isCiServer ? "''" : "'yes'",
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './lib'),
    },
  },
});
