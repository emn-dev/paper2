/**
 * Enable specific rules for test files.
 */

export default {
  name: 'test specific rules',
  files: ['**/*.spec.ts', '**/*.cy.ts', '**/*.test.ts'],
  rules: {
    // tests report that expect() is an unused expression
    '@typescript-eslint/no-unused-expressions': 'off',
  },
};
