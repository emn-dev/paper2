import nodeConfig from '@paper2/eslint-configs/node';
// import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  ...nodeConfig,

  // // cypress recommended rules
  // {
  //   ...pluginCypress.configs.recommended,
  //   files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
  // },
];
