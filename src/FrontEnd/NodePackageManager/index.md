### 常用命令

```sh
$ npm init
# 初始化项目 生成相关文件

$ npm help
# 查看 npm 命令列表

$ npm config list -l
# 查看 npm 的配置

$ npm info
# 命令可以查看每个模块的具体信息

$ npm search <search keyword>
# 命令用于搜索 npm 仓库，它后面可以跟字符串，也可以跟正则表达式

$ npm update <package name>
# 命令用于更新本地安装的模块

$ npm uninstall <package name>
# 命令用于卸载已安装的模块

$ npm root
# 命令用于查看 node_modules 的路径

$ npm config set registry
# 命令用于设置 npm 远程仓库地址

$ npm dedupe
# 命令用于合并重复的依赖模块

$ npm audit
# 命令用于查看依赖模块的漏洞

$ npm cache clean
# 命令用于清除缓存

```

### 相关文件功能

- `package.json` 项目包管理文件
- `node_modules` 项目依赖模块
- `package-lock.json` 项目依赖模块版本锁定文件

### 命令参数及简写

- install (i) 安装模块
- global (-g) 全局安装模块
- save (-S) 保存模块到 `package.json`
- save-dev (-D) 保存模块到 `package.json` 中的 `devDependencies`
- version (-v) 查看版本
- list (-l) 列出模块
- -yes (-y) 自动确认安装
