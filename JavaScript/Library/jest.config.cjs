module.exports = {
  testEnvironment: 'node',
  testRegex: '\\.(test|spec)\\.js$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
};