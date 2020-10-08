module.exports = {
  extends: 'react-app',
  "env": {
    mocha: true
  },
  "plugins": ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
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
  "parser": "babel-eslint"
}
