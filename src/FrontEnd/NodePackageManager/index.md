### 常用命令

```sh
$ npm help # 查看 npm 命令列表
$ npm -l # 查看各个命令的简单用法
$ npm -v # 查看 npm 的版本
$ npm config list -l # 查看 npm 的配置
$ npm list [package name] # 命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块
$ npm list -global # 加上 global 参数，会列出全局安装的模块
$ npm info # 命令可以查看每个模块的具体信息
$ npm search <搜索词> # 命令用于搜索 npm 仓库，它后面可以跟字符串，也可以跟正则表达式
```

$ npm search

npm update

npm update 命令可以更新本地安装的模块

# 升级当前项目的指定模块

$ npm update [package name]

# 升级全局安装的模块

$ npm update -global [package name]

npm uninstall

npm uninstall 命令，卸载已安装的模块

$ npm uninstall [package name]

# 卸载全局模块

$ npm uninstall [package name] -global

```

```
