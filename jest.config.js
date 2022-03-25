module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/test/setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup-after-env.ts'],
  moduleNameMapper: {
    '\\.(md)$': '<rootDir>/test/mocks/file-mock.js'
  },
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/pgmmv-entry.ts', '!src/**/index.ts'],
  coverageReporters: ['text', 'text-summary', 'html']
};
