import next from 'eslint-config-next';

export default [
  ...next(),
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/no-unknown-property': 'off',
    },
  },
];
