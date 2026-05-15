const playwright = require('eslint-plugin-playwright')
const tsParser = require('@typescript-eslint/parser')

module.exports = [
  {
    ...playwright.configs['flat/recommended'],
    // Target only Playwright test files; Jest API tests live in api-tests/
    files: [
      'tests/e2e-tests/**/*.ts',
      'pages/e2e-tests/**/*.ts',
    ],
    ignores: ['tests/api-tests/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Allow console.log in tests (used to print lot details)
      'no-console': 'off',
      // Page-object methods contain the assertions — suppress false positives
      'playwright/expect-expect': 'warn',
    },
  },
]
