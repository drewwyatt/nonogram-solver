module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/lib/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/fixtures/'],
}
