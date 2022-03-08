/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/.build/', '/.serverless/'],
  modulePaths: ['<rootDir>'],

  testMatch: [
    '<rootDir>/**/*.test.js?(x)',
    '<rootDir>/**/*.test.ts?(x)',
  ],
  transform: {
    '^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest',
  }
}
