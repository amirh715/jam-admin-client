module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'arrow-paren': 'off',
    'no-shadow': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-param-reassign': 'off',
    'dot-notation': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-template': 'off',
    'operator-linebreak': 'off',
    'class-methods-use-this': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
