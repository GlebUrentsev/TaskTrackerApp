module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jsx-a11y'
  ],
  rules: {
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'comma-dangle': [2, 'never'],
    'no-underscore-dangle': 0,
    'arrow-parens': ['error', 'as-needed'],
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'no-use-before-define': 'off',
    'react/style-prop-object': 'off',
    'react/jsx-filename-extension': 'off'
  }
};
