import globals from 'globals';

/**
 * All of our files in our project should be typescript/vue except for misc scripts
 * Those are likely node scripts so we need to manually add the node globals to it
 * We also want to allow console logs in these files
 */

export default {
  name: 'add node globals to js files',
  files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  languageOptions: {
    globals: globals.node,
  },
  rules: {
    'no-console': 'off',
  },
};
