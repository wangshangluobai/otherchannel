## warn

### vite 中 sass 警告 JS API 过期

**问题描述**
在 Vite 创建项目中引入 Sass 弹出 `The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0`  
警告提示表明你当前正在使用的 Dart Sass 版本中，旧的 JavaScript API 已经被弃用

**产生原因**

[SASS 官网描述](https://sass-lang.com/documentation/breaking-changes/legacy-js-api/#bundlers) Vite 仍然默认使用传统的 API，但您可以通过将 api 设置为"modern"或"modern-compiler"来类似地切换它。

[Vite 官方文档描述](https://vitejs.cn/vite5-cn/config/shared-options.html#css-preprocessoroptions) 指定传递给 CSS 预处理器的选项。文件扩展名用作选项的键。默认值是 "legacy"

**解决方法**
在 vite.config.js 中添加这一配置即可。

```js
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'  // or 'modern'
      }
    }
  },
```
