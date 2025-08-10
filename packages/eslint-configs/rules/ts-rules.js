/**
 * This is where we can store custom eslint / typescript-eslint rules that are not defined in their recommended configs
 * When adding a rule, add a brief description of what the rule does and a link to the documentation
 *
 * Vue extends some of these rules to make them work for Vue templates.
 * If you add a rule here, double check to see if Vue has their own version of the rule
 * For example, Vue has their own version of 'eqeqeq' called 'vue/eqeqeq'.
 * We enable 'eqeqeq' here and we need to enable 'vue/eqeqeq' in the vue.js file
 *
 * Typescript-eslint also has their own version of some rules.
 * If you add a rule here, double check to see if typescript-eslint has their own version of the rule
 * For example, typescript-eslint has their own version of 'no-shadow' called '@typescript-eslint/no-shadow'.
 * In this case, we want to make sure 'no-shadow' is disabled and then enable '@typescript-eslint/no-shadow'.
 * The exception to this is if a typescript-eslint rule requires type checking. We don't have that set up yet, so just use the base eslint rule.
 *
 * Also note that some of these rules are copied and pasted from https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
 */

import confusingBrowserGlobals from 'confusing-browser-globals';

const rules = {
  // enforces return statements in callbacks of array's methods
  // https://eslint.org/docs/rules/array-callback-return
  'array-callback-return': ['warn', { allowImplicit: true }],

  // require return statements to either always or never specify values
  // https://eslint.org/docs/rules/consistent-return
  'consistent-return': 'warn',

  // require default case in switch statements
  // https://eslint.org/docs/rules/default-case
  'default-case': 'warn',

  // Enforce default clauses in switch statements to be last
  // https://eslint.org/docs/rules/default-case-last
  'default-case-last': 'warn',

  // https://eslint.org/docs/rules/default-param-last
  'default-param-last': 'warn',

  // encourages use of dot notation whenever possible
  // https://eslint.org/docs/rules/dot-notation
  'dot-notation': 'warn',

  // require the use of === and !==
  // https://eslint.org/docs/rules/eqeqeq
  eqeqeq: 'warn',

  // Require grouped accessor pairs in object literals and classes
  // https://eslint.org/docs/rules/grouped-accessor-pairs
  'grouped-accessor-pairs': 'warn',

  // make sure for-in loops have an if statement
  // https://eslint.org/docs/rules/guard-for-in
  'guard-for-in': 'warn',

  // enforce a maximum number of classes per file
  // https://eslint.org/docs/rules/max-classes-per-file
  'max-classes-per-file': ['warn', 1],

  // disallow the use of alert, confirm, and prompt
  // https://eslint.org/docs/rules/no-alert
  'no-alert': 'warn',

  // disallow use of arguments.caller or arguments.callee
  // https://eslint.org/docs/rules/no-caller
  'no-caller': 'warn',

  // Disallow returning value in constructor
  // https://eslint.org/docs/rules/no-constructor-return
  'no-constructor-return': 'warn',

  // disallow else after a return in an if
  // https://eslint.org/docs/rules/no-else-return
  'no-else-return': ['warn', { allowElseIf: true }],

  // disallow empty functions, except for standalone funcs/arrows
  // https://eslint.org/docs/rules/no-empty-function
  'no-empty-function': [
    'warn',
    {
      allow: ['arrowFunctions', 'functions', 'methods'],
    },
  ],

  // disallow use of eval()
  // https://eslint.org/docs/rules/no-eval
  'no-eval': 'warn',

  // disallow adding to native types
  // https://eslint.org/docs/rules/no-extend-native
  'no-extend-native': 'warn',

  // disallow unnecessary function binding
  // https://eslint.org/docs/rules/no-extra-bind
  'no-extra-bind': 'warn',

  // disallow Unnecessary Labels
  // https://eslint.org/docs/rules/no-extra-label
  'no-extra-label': 'warn',

  // disallow use of eval()-like methods
  // https://eslint.org/docs/rules/no-implied-eval
  'no-implied-eval': 'warn',

  // disallow usage of __iterator__ property
  // https://eslint.org/docs/rules/no-iterator
  'no-iterator': 'warn',

  // disallow use of labels for anything other than loops and switches
  // https://eslint.org/docs/rules/no-labels
  'no-labels': ['warn', { allowLoop: false, allowSwitch: false }],

  // disallow unnecessary nested blocks
  // https://eslint.org/docs/rules/no-lone-blocks
  'no-lone-blocks': 'warn',

  // disallow creation of functions within loops
  // https://typescript-eslint.io/rules/no-loop-func/
  '@typescript-eslint/no-loop-func': 'warn',

  // disallow use of multiline strings
  // https://eslint.org/docs/rules/no-multi-str
  'no-multi-str': 'warn',

  // disallow use of new operator when not part of the assignment or comparison
  // https://eslint.org/docs/rules/no-new
  'no-new': 'warn',

  // disallow use of new operator for Function object
  // https://eslint.org/docs/rules/no-new-func
  'no-new-func': 'warn',

  // disallows creating new instances of String, Number, and Boolean
  // https://eslint.org/docs/rules/no-new-wrappers
  'no-new-wrappers': 'warn',

  // disallow use of octal escape sequences in string literals, such as
  // var foo = 'Copyright \251';
  // https://eslint.org/docs/rules/no-octal-escape
  'no-octal-escape': 'warn',

  // disallow usage of __proto__ property
  // https://eslint.org/docs/rules/no-proto
  'no-proto': 'warn',

  // disallow certain object properties
  // https://eslint.org/docs/rules/no-restricted-properties
  'no-restricted-properties': [
    'warn',
    {
      object: 'arguments',
      property: 'callee',
      message: 'arguments.callee is deprecated',
    },
    {
      object: 'global',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'self',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'window',
      property: 'isFinite',
      message: 'Please use Number.isFinite instead',
    },
    {
      object: 'global',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'self',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      object: 'window',
      property: 'isNaN',
      message: 'Please use Number.isNaN instead',
    },
    {
      property: '__defineGetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      property: '__defineSetter__',
      message: 'Please use Object.defineProperty instead.',
    },
    {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead.',
    },
  ],

  // disallow use of `javascript:` urls.
  // https://eslint.org/docs/rules/no-script-url
  'no-script-url': 'warn',

  // disallow comparisons where both sides are exactly the same
  // https://eslint.org/docs/rules/no-self-compare
  'no-self-compare': 'warn',

  // disallow use of comma operator
  // https://eslint.org/docs/rules/no-sequences
  'no-sequences': 'warn',

  // restrict what can be thrown as an exception
  // https://eslint.org/docs/rules/no-throw-literal
  'no-throw-literal': 'warn',

  // disallow unmodified conditions of loops
  // https://eslint.org/docs/rules/no-unmodified-loop-condition
  'no-unmodified-loop-condition': 'off',

  // disallow useless string concatenation
  // https://eslint.org/docs/rules/no-useless-concat
  'no-useless-concat': 'warn',

  // disallow redundant return; keywords
  // https://eslint.org/docs/rules/no-useless-return
  'no-useless-return': 'warn',

  // disallow use of void operator
  // https://eslint.org/docs/rules/no-void
  'no-void': 'warn',

  // require using Error objects as Promise rejection reasons
  // https://eslint.org/docs/rules/prefer-promise-reject-errors
  'prefer-promise-reject-errors': ['warn', { allowEmptyReject: true }],

  // https://eslint.org/docs/rules/prefer-regex-literals
  'prefer-regex-literals': [
    'warn',
    {
      disallowRedundantWrapping: true,
    },
  ],

  // require use of the second argument for parseInt()
  // https://eslint.org/docs/rules/radix
  radix: 'warn',

  // require or disallow Yoda conditions
  // https://eslint.org/docs/rules/yoda
  yoda: 'warn',

  'no-await-in-loop': 'warn',

  // disallow function or variable declarations in nested blocks
  'no-inner-declarations': 'warn',

  // Disallow returning values from Promise executor functions
  // https://eslint.org/docs/rules/no-promise-executor-return
  'no-promise-executor-return': 'warn',

  // Disallow template literal placeholder syntax in regular strings
  // https://eslint.org/docs/rules/no-template-curly-in-string
  'no-template-curly-in-string': 'warn',

  // Disallow loops with a body that allows only one iteration
  // https://eslint.org/docs/rules/no-unreachable-loop
  'no-unreachable-loop': [
    'warn',
    {
      ignore: [], // WhileStatement, DoWhileStatement, ForStatement, ForInStatement, ForOfStatement
    },
  ],

  // Disallow specified names in exports
  // https://eslint.org/docs/rules/no-restricted-exports
  'no-restricted-exports': [
    'warn',
    {
      restrictedNamedExports: [
        'default', // use `export default` to provide a default export
        'then', // this will cause tons of confusion when your module is dynamically `import()`ed, and will break in most node ESM versions
      ],
    },
  ],

  // disallow useless computed property keys
  // https://eslint.org/docs/rules/no-useless-computed-key
  'no-useless-computed-key': 'warn',

  // disallow unnecessary constructor
  // https://typescript-eslint.io/rules/no-useless-constructor/
  '@typescript-eslint/no-useless-constructor': 'warn',

  // disallow renaming import, export, and destructured assignments to the same name
  // https://eslint.org/docs/rules/no-useless-rename
  'no-useless-rename': [
    'warn',
    {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false,
    },
  ],

  // require method and property shorthand syntax for object literals
  // https://eslint.org/docs/rules/object-shorthand
  'object-shorthand': [
    'warn',
    'always',
    {
      ignoreConstructors: false,
      avoidQuotes: true,
    },
  ],

  // Prefer destructuring from arrays and objects
  // https://eslint.org/docs/rules/prefer-destructuring
  'prefer-destructuring': [
    'warn',
    {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: false,
      },
    },
    {
      enforceForRenamedProperties: false,
    },
  ],

  // disallow parseInt() in favor of binary, octal, and hexadecimal literals
  // https://eslint.org/docs/rules/prefer-numeric-literals
  'prefer-numeric-literals': 'warn',

  // suggest using template literals instead of string concatenation
  // https://eslint.org/docs/rules/prefer-template
  'prefer-template': 'warn',

  // require a Symbol description
  // https://eslint.org/docs/rules/symbol-description
  'symbol-description': 'warn',

  // require camel case names
  camelcase: ['warn', { properties: 'never', ignoreDestructuring: false }],

  // require function expressions to have a name
  // https://eslint.org/docs/rules/func-names
  'func-names': 'warn',

  // require a capital letter for constructors
  'new-cap': [
    'warn',
    {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
    },
  ],

  // disallow use of bitwise operators
  // https://eslint.org/docs/rules/no-bitwise
  'no-bitwise': 'warn',

  // disallow use of the continue statement
  // https://eslint.org/docs/rules/no-continue
  'no-continue': 'warn',

  // disallow if as the only statement in an else block
  // https://eslint.org/docs/rules/no-lonely-if
  'no-lonely-if': 'warn',

  // disallow use of chained assignment expressions
  // https://eslint.org/docs/rules/no-multi-assign
  'no-multi-assign': ['warn'],

  // disallow nested ternary expressions
  'no-nested-ternary': 'warn',

  // disallow use of the Object constructor
  'no-object-constructor': 'warn',

  // disallow use of unary operators, ++ and --
  // https://eslint.org/docs/rules/no-plusplus
  'no-plusplus': 'warn',

  // disallow certain syntax forms
  // https://eslint.org/docs/rules/no-restricted-syntax
  'no-restricted-syntax': [
    'warn',
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
  ],

  // disallow dangling underscores in identifiers
  // https://eslint.org/docs/rules/no-underscore-dangle
  'no-underscore-dangle': [
    'warn',
    {
      allowAfterThis: true,
    },
  ],

  // disallow the use of Boolean literals in conditional expressions
  // also, prefer `a || b` over `a ? a : b`
  // https://eslint.org/docs/rules/no-unneeded-ternary
  'no-unneeded-ternary': ['warn', { defaultAssignment: false }],

  // allow just one var statement per function
  'one-var': ['warn', 'never'],

  // require assignment operator shorthand where possible or prohibit it entirely
  // https://eslint.org/docs/rules/operator-assignment
  'operator-assignment': ['warn', 'always'],

  // Disallow the use of Math.pow in favor of the ** operator
  // https://eslint.org/docs/rules/prefer-exponentiation-operator
  'prefer-exponentiation-operator': 'warn',

  // Prefer use of an object spread over Object.assign
  // https://eslint.org/docs/rules/prefer-object-spread
  'prefer-object-spread': 'warn',

  // require or disallow the Unicode Byte Order Mark
  // https://eslint.org/docs/rules/unicode-bom
  'unicode-bom': ['warn', 'never'],

  // disallow labels that share a name with a variable
  // https://eslint.org/docs/rules/no-label-var
  'no-label-var': 'warn',

  // disallow specific globals
  'no-restricted-globals': [
    'warn',
    {
      name: 'isFinite',
      message: 'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
    },
    {
      name: 'isNaN',
      message: 'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
    },
  ].concat(
    confusingBrowserGlobals.map(g => ({
      name: g,
      message: `Use window.${g} instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md`,
    }))
  ),

  // disallow declaration of variables already declared in the outer scope
  // https://typescript-eslint.io/rules/no-shadow/
  '@typescript-eslint/no-shadow': 'warn',

  // disallow shadowing of names such as arguments
  'no-shadow-restricted-names': 'warn',

  // disallow use of undefined when initializing variables
  'no-undef-init': 'warn',

  // disallow use of variables before they are defined
  // https://typescript-eslint.io/rules/no-use-before-define/
  '@typescript-eslint/no-use-before-define': 'warn',

  '@typescript-eslint/no-empty-function': 'warn',

  '@typescript-eslint/no-explicit-any': 'warn',

  '@typescript-eslint/ban-ts-comment': 'warn',
};

export default {
  name: 'our own js/ts rules',
  rules,
};
