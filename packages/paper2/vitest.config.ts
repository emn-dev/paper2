// import { mergeConfig } from 'vite';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
// import viteConfig from './vite.config';

console.log('a=sd-fas=-fd=a-sdf=-as=f-as=-fd-a=s-fd-sa=df-=asd=f=sadf');
console.log('a=sd-fas=-fd=a-sdf=-as=f-as=-fd-a=s-fd-sa=df-=asd=f=sadf');
console.log(process.env);

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      enabled: true, // Comment this out to stop running the report when working locally
      include: ['lib/*'],
      reportsDirectory: '../../docs/test_coverage',
    },
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
