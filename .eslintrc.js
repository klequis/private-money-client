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
    ]
  },
  parser: 'babel-eslint',
  rules: {
    'jsdoc/require-jsdoc': 1
  }
}
