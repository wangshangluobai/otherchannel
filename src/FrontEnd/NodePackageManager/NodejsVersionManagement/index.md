### 常用命令

```sh
$ nvm arch
# 显示node是运行在32位还是64位。

$ nvm install <version> [arch]
# 安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。

$ nvm list [available]
# 显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。

$ nvm on
# 开启node.js版本管理。

$ nvm off
# 关闭node.js版本管理。

$ nvm proxy [url]
# 设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。

$ nvm node_mirror [url]
# 设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

$ nvm npm_mirror [url]
# 设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。

$ nvm uninstall <version>
# 卸载指定版本node。

$ nvm use [version] [arch]
# 使用制定版本node。可指定32/64位。

$ nvm root [path]
# 设置存储不同版本node的目录。如果未设置，默认使用当前目录。

$ nvm version
# 显示nvm版本。version可简化为v。
```

### 镜像切换

1. 通过修改文件修改
   在 nvm 的安装路径下，找到 settings.txt，设置 node_mirro 与 npm_mirror 为国内镜像地址。

   ```text
    root: D:\nvm
    path: D:\nodejs
    nvm npm_mirror https://npmmirror.com/mirrors/npm/
    nvm node_mirror https://npmmirror.com/mirrors/node/
    或者：
    node_mirror: https://npm.taobao.org/mirrors/node/
    npm_mirror: https://npm.taobao.org/mirrors/npm/
   ```

2. 通过命令行修改
   ```text
   阿里云镜像
   nvm npm_mirror https://npmmirror.com/mirrors/npm/
   nvm node_mirror https://npmmirror.com/mirrors/node/
   腾讯云镜像
   nvm npm_mirror http://mirrors.cloud.tencent.com/npm/
   nvm node_mirror http://mirrors.cloud.tencent.com/nodejs-release/
   ```

打开链接查看可以 node 版本：https://registry.npmmirror.com/binary.html?path=node/

### 相关链接

- [github](https://github.com/coreybutler/nvm-windows)
- [文档](https://nvm.uihtm.com/)

```

```
