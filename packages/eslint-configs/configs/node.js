import pluginVitest from '@vitest/eslint-plugin';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import ignoreSetup from '../rules/ignore.js';
import importSetup from '../rules/import.js';
import ourTsJsRulesSetup from '../rules/ts-rules.js';
import addGlobalsToJsFiles from '../rules/add-globals.js';
import testSpecificRules from '../rules/tests.js';

export default [
  // ignore dist, build, etc.
  ignoreSetup,

  // eslint recommended
  js.configs.recommended,

  // typescript eslint recommended rules
  ...tseslint.config(tseslint.configs.recommended),

  // sets up eslint-plugin-import and rules
  importSetup,

  // enables our own js/ts rules
  ourTsJsRulesSetup,

  // vitest recommended rules
  {
    ...pluginVitest.configs.recommended,
    files: ['**/*.test.ts', '**/*.spec.ts'],
  },

  // adds globals and console log to js files
  addGlobalsToJsFiles,

  // enable test specific rules
  testSpecificRules,
];
