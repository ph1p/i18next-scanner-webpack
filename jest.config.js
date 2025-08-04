export default {
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transformIgnorePatterns: ['/node_modules/(?!(i18next-parser)/)'],
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 60,
      lines: 75,
      statements: -10
    }
  },
  bail: true,
  verbose: true,
  collectCoverageFrom: ['index.js', '!**/node_modules/**', '!**/coverage/**', '!**/vendor/**'],
  coverageDirectory: './coverage'
};
