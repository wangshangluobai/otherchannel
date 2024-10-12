# 内嵌 H5 调试神器 vConsole

一个轻量、可拓展、针对手机网页的前端开发者调试面板，可用于 APP 内嵌 H5 及其他调试 H5 的地方。  
使用这个插件后，打印日志还是和之前一样，只是它会将日志额外输出到一个 `vConsole` 面板中，方便调试。

**注意**

在 `new VConsole()` 或 `Vue.use(Vconsole)` 之后，面板就会出现，如果想在开发/生产环境处理，最好在这里进行隔离。

## 安装使用

常见两种引入方式

### 方法一：cdn 方式引入

```html
<script src="{cdn-url}vconsole.min.js"></script>
<script>
  // 初始化
  var vConsole = new VConsole()
  console.log("Hello world")
</script>
```

### 方法二：Vue 中使用 npm 方式引入

```sh
npm install vconsole
```

```js
import Vconsole from 'vconsole'
// Vue全局调用
if (/* 测试环境 */) {
  const vConsole = new Vconsole()
  Vue.use(vConsole)
}
```

## 常用 api

```js
//当前 vConsole 的版本号。
vConsole.version
//显示 vConsole 主面板
vConsole.show()
//隐藏 vConsole 主面板
vConsole.hide()
//析构一个 vConsole 对象实例，并将 vConsole 面板从页面中移除。
var vConsole = new VConsole()
vConsole.destroy()
//显示 vConsole 的开关按钮。
vConsole.showSwitch()
//隐藏 vConsole 的开关按钮
vConsole.hideSwitch()
```

更多详见[文档](https://github.com/Tencent/vConsole/blob/dev/README_CN.md)
