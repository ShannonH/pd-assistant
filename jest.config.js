module.exports = {
  coverageDirectory: 'jest/coverage',
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        ancestorSeparator: ': ',
        classNameTemplate: '{classname}',
        output: 'jest/junit/test-results.xml',
        suiteName: 'Unit Tests',
        titleTemplate: '{classname} > {title}'
      }
    ]
  ],
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/src/'],
  testMatch: ['**/__tests__/*.(jsx|js)']
};
