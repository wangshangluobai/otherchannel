module.exports = {
  // 是否在出现第一个错误时停止整个测试
  bail: false,
  // 运行中打印每个单独的测试
  verbose: false,
  // 匹配运行文件
  testRegex: '\\.(test)\\.js$',
  // 匹配路径忽略
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // 测试环境 可选择 jsdom 或 node
  testEnvironment: 'node',
  // 按顺序匹配被省略后缀名的文件类型
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  // 通过babel进行预处理
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  }
};