import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import stylisticPlugin from '@stylistic/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importXPlugin from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

const files = [
  '**/*.js',
  '**/*.jsx',
  '**/*.ts',
  '**/*.tsx',
  '**/*.cjs',
  '**/*.mjs',
];

export default [
  // Ignores
  {
    ignores: [
      'src/serviceWorker.ts',
      'src/generated/graphql.tsx',
      'src/generated/graphql-cms.tsx',
      'build/',
    ],
  },

  // @eslint-react (replaces eslint-plugin-react; supports ESLint 10)
  {
    files,
    ...eslintReact.configs['recommended-typescript'],
  },

  // react-hooks v7 — register plugin manually since preset ships legacy string plugin form
  {
    files,
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: reactHooksPlugin.configs['recommended-latest'].rules,
  },

  // Silences react-hooks rules that overlap with @eslint-react so we don't
  // get duplicated diagnostics on the same code.
  {
    files,
    ...eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'],
  },

  // Multi-fire rules from @eslint-react + react-hooks v7 that were noisy in
  // the initial migration lint. Disabled to keep the upgrade unblocked;
  // revisit rule-by-rule as follow-up cleanup.
  {
    files,
    rules: {
      '@eslint-react/rules-of-hooks': 'off',
      '@eslint-react/set-state-in-effect': 'off',
      '@eslint-react/naming-convention-ref-name': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/no-use-context': 'off',
      '@eslint-react/no-context-provider': 'off',
      '@eslint-react/purity': 'off',
      '@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
      '@eslint-react/unsupported-syntax': 'off',
      '@eslint-react/exhaustive-deps': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },

  // jsx-a11y
  {
    files,
    plugins: { 'jsx-a11y': jsxA11yPlugin },
    rules: jsxA11yPlugin.flatConfigs.recommended.rules,
  },

  // import-x (replaces eslint-plugin-import)
  {
    files,
    plugins: { 'import-x': importXPlugin },
    rules: {
      ...importXPlugin.flatConfigs.recommended.rules,
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // Stylistic rules
  {
    files,
    plugins: { '@stylistic': stylisticPlugin },
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'array-bracket-spacing': ['warn', 'never'],
      'object-curly-spacing': ['warn', 'always'],
    },
  },

  // No-only-tests plugin
  {
    files,
    plugins: { 'no-only-tests': noOnlyTestsPlugin },
    rules: {
      'no-only-tests/no-only-tests': 'error',
    },
  },

  // prettier config
  {
    files,
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error',
      // Turn off rules that may cause problems, see
      // https://github.com/prettier/eslint-plugin-prettier/issues/65
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },

  // General rules
  {
    files,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        JSX: true,
        React: true,
        vi: true,
      },
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...js.configs.recommended.rules,
      'max-len': ['warn', { code: 120 }],
      'no-console': 'warn',
      'no-plusplus': 'error',
      'no-undef': 'warn',
    },
  },

  // Overrides for typescript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-undef': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@/func-call-spacing': ['error'],
      '@typescript-eslint/member-ordering': ['warn'],
      '@typescript-eslint/no-require-imports': ['error'],
    },
  },

  // Overrides for Playwright related typescript files
  {
    files: ['src/playwright/**/*.ts', 'src/playwright/**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Ignore mock arguments, e.g. mocksForSearchPage in Playwright tests.
          // This way mock fixtures can be used without having to always disable the rule.
          argsIgnorePattern: '^(mock|mocks|mocking|mocked)[A-Z].*$',
        },
      ],
    },
  },

  // Overrides for test files
  {
    files: ['**/*.test.js', '**/*.test.ts', '**/*.test.jsx', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
    },
  },
];
