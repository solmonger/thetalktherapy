module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // Custom rules
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': 'always',
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    
    // Accessibility
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['focus-visible'],
      },
    ],
    
    // Performance
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    'function-calc-no-unspaced-operator': true,
    'unit-no-unknown': true,
    'property-no-unknown': true,
    
    // Maintainability
    'declaration-block-no-duplicate-properties': true,
    'no-duplicate-selectors': true,
    'block-no-empty': true,
    'selector-max-id': 0,
    
    // Code style
    'indentation': 2,
    'string-quotes': 'single',
    'max-empty-lines': 1,
    'no-missing-end-of-source-newline': true,
    'no-eol-whitespace': true,
  },
};