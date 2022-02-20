module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 0,
    'linebreak-style': 0,
    'arrow-body-style': 0,
    'import/prefer-default-export': 'off',
    'object-shorthand': 'off',
    'prefer-destructuring': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
  },
};
