module.exports = {
  parserOptions: {
    ecmaVersion: 2023,
  },
  extends: ['plugin:eslint-plugin/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'eslint/interface-name-prefix': 'off',
    'eslint/explicit-function-return-type': 'off',
    'eslint/explicit-module-boundary-types': 'off',
    'eslint/no-explicit-any': 'off',
  },
};
