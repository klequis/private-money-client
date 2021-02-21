module.exports = {
  extends: ['react-app', 'plugin:jsdoc/recommended'],
  env: {
    mocha: true
  },
  plugins: ['react-hooks', 'jsdoc'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'jsdoc/require-jsdoc': 1
  },
  parser: 'babel-eslint'
}
