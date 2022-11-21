/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./test/setupTests.ts'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  coverageDirectory: '<rootDir>/jest/coverage'
}

module.exports = config
