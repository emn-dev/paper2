/**
 * This adds eslint-plugin-import and the rules from it we want to enable.
 */

import importPlugin from 'eslint-plugin-import';

export default {
  name: 'add import plugin',
  plugins: {
    import: importPlugin,
  },
  rules: {
    'import/no-mutable-exports': 'warn',
    'import/first': 'warn',
    'import/no-duplicates': 'warn',
    'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }],
    'import/newline-after-import': 'warn',
    'import/no-absolute-path': 'warn',
    'import/no-dynamic-require': 'warn',
    'import/no-self-import': 'warn',
    'import/no-useless-path-segments': 'warn',

    // todo change to error later
    'import/no-extraneous-dependencies': 'warn',
    'import/no-relative-packages': 'warn',
  },
  settings: {
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
};
