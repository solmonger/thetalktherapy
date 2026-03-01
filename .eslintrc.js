module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Best practices
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'no-alert': 'warn',
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'no-unused-vars': ['warn', { args: 'none' }],
    
    // Code style
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    
    // ES6+
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'object-shorthand': 'error',
    
    // Accessibility
    'jsx-a11y/alt-text': 'off', // Not using JSX
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/aria-props': 'off',
    'jsx-a11y/aria-role': 'off',
    
    // Performance
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
  },
  overrides: [
    {
      files: ['*.test.js', '*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};