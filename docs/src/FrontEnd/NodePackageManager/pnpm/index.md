### 差异

- 与 npm 不同，pnpm 会验证所有参数。
- 使用 pnpm 全局安装依赖时，会提示 `Unable to find the global bin directory` (无法找到全局 bin 路径) 需要使用 `pnpm setup` 来创建该路径文件

### 常用命令

```sh
$ pnpm install
# 安装依赖

$ pnpm run <cmd>
# 运行脚本

$ pnpm update
# 更新依赖

$ pnpm remove
# 移除依赖
```
