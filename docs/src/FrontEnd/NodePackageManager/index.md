### NPM 包常见问题处理

- [sass-loader 和 node 版本问题终极处理](/FrontEnd/NodePackageManager/npm/sass-loader)

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

### 安装指定版本的 npm 包

**使用命令安装指定版本的包**

```sh
npm install <package-name>@<version>
```

npm 还支持使用版本范围符（^, ~, >, >=, <, <=）来安装满足特定条件的版本。

- ^（caret）：表示允许次要版本和补丁版本更新，但主要版本不变。
- ~（tilde）：表示允许补丁版本更新，但主要版本和次要版本不变。
- \> 和 >=：可以用来安装比指定版本号高的任何版本。
- < 和 <=：可以用来安装比指定版本号低的任何版本。

**版本控制符号详解**

- Caret (^)：这是一个非常灵活的符号，它允许你获取小版本和补丁版本的更新，同时保持主要版本不变。例如，^1.2.3 将匹配所有 1.x.x 系列的版本，直到下一个主要版本发布。
- Tilde (~)：与 caret 类似，但更为保守，只允许补丁版本更新。例如，~1.2.3 将匹配所有 1.2.x 系列的版本，但不会升级到 1.3.0。
- 大于 (>) 和 大于等于 (>=)：这两个符号用于指定最低版本要求。例如，>=1.2.3 将安装 1.2.3 或更高版本的软件包。
- 小于 (<) 和 小于等于 (<=)：这些符号用于限制版本上限。例如，<1.2.3 将安装低于 1.2.3 的任何版本。

**更新已有包至指定版本**

```sh
npm update <package-name>@<version>
```

**最佳实践**

明确指定版本：在 package.json 文件中，尽量明确指定依赖的版本，尤其是在生产环境中，这有助于确保应用的一致性和稳定性。  
定期审查依赖：定期检查项目依赖，了解是否有重要的安全更新或性能改进，并及时更新到合适的版本。  
使用版本控制符号：在开发阶段，可以利用版本控制符号（如 ^ 或 ~）来自动接收小版本的更新，减少手动更新的工作量。  
自动化测试：在升级依赖后，务必运行自动化测试，确保应用的功能没有受到影响。  
文档化依赖更改：在版本控制系统的提交信息中记录依赖版本的更改，便于追踪和理解版本更迭的原因。

### npm 镜像源查看/更改

若想查看当前 npm 使用的镜像源地址，使用以下命令

```sh
npm get registry
```

如果想切换镜像源，输入以下命令

```sh
npm config set registry {镜像源路径}
```
