module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue'],
  rules: {
    // Vue specific rules
    'vue/multi-word-component-names': 'off', // Allow single-word component names
    'vue/require-default-prop': 'off', // Don't require default values for props
    'vue/require-prop-types': 'off', // Don't require prop types
    'vue/prop-name-casing': ['error', 'camelCase'], // Enforce camelCase for prop names
    'vue/attribute-hyphenation': ['error', 'always'], // Enforce hyphenated attribute names
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // JavaScript rules
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'no-useless-rename': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-destructuring': ['error', { array: false, object: true }],
    'no-param-reassign': 'error',
    'no-else-return': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'no-extra-boolean-cast': 'error',
    'no-useless-return': 'error',
    'no-return-await': 'error',
    'require-await': 'error',
    'no-return-assign': 'error',
    'no-sequences': 'error',
    'no-cond-assign': 'error',
    'no-constant-condition': 'error',
    'no-constant-binary-expression': 'error',
    'no-dupe-else-if': 'error',
    'no-duplicate-imports': 'error',
    'no-import-assign': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-void': 'error',
    'prefer-regex-literals': 'error',
    'require-atomic-updates': 'error',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
      },
    },
  },
};
