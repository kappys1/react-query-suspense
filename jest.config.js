/** @type {import('jest').Config} */
const config = {
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  coverageDirectory: '<rootDir>/jest/coverage'
}

module.exports = config
