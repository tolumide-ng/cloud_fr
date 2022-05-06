module.exports = {
  roots: ['<rootDir>/components', '<rootDir>/pages'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^api(.*)$': '<rootDir>/api$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // automock: true,
};
