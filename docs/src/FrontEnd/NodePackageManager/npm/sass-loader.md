
# 在 `node` 中愉快的使用 `scss`

自从用了 `SCSS` 之后，`node-sass`版本 ， `sass-loader` 版本和 `node` 版本总是不能很好的配合。还记得当时正是因为这个问题，我才了解使用了 `nvm` 管理 `node` 版本。

想要正常使用 scss 还要去查阅 `node-sass` 和 `sass-loader` 的支持版本，最近重启了两年前写的一个项目，发现 `node-sass` 和 `sass-loader` 的版本不兼容，导致编译失败。让我回忆起了当年初学时的痛苦，查阅了相关资料，发现目前 `node-sass` 已经废弃, 可以直接用 `sass` 包。

```
npm install sass
```

`sass` 包解决了 `node-sass` 不支持特定版本之外 `node` 的问题，就是说 `sass` 包是兼容新旧 `node` 版本的。

以下是我的配置 `node` 版本为 16.17.1

```json
  "sass": "^1.54.0",
  "sass-loader": "^13.0.0",
```

放弃 node-sass，使用 sass 代替它。