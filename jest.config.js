module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/cypress/**',
    '!**/dist/**',
    '!**/public/**',
    '!**/src/plugins/**',
    '!**/src/main.js',
    '!**/**.config.js',
    '!**/server.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  setupFiles: ['./tests/unit/browserMocks.js']
}
