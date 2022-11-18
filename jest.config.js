/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  coverageDirectory: '<rootDir>/jest/coverage'
}

module.exports = config
