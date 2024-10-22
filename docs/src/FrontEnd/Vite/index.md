# Vite

vite 是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成

- 一个开发服务器，它基于原生 ES 模块提供了丰富的内建功能，如速度快到惊人的模块热更新（HMR）。
- 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

**兼容性**

Vite3+ 版本需要 Node.js 版本 18+，20+。然而，有些模板需要依赖更高的 Node 版本才能正常运行  
Vite2 版本 需要 Node.js 版本 >= 12.0.0

## 相关链接

[Vite 中文官网](https://cn.vite.dev/)
[Vite 中文文档](https://vitejs.cn/vite3-cn/)

## 使用 Vite 创建项目

1. 键入构建命令

   ```sh
   # npm 当前指令会使用最新版本的vite
   npm create vite@latest
   # or
   npm init vite@latest

   # 若想使用固定版本的vite,可以使用以下指令
   npm create vite@2
   # or
   npm init vite@2
   ```

2. 按照流程选择配置项
   1. 输入项目名称，该项目名称会构建为当前目录下的文件夹名称
   2. 选择项目模板，空格按钮确认
   3. 选择语言变体
   4. 初始化成功，按照提示命令依次执行
   5. 最终运行成功后生成一个本地链接，是一个简易的页面

生成的项目目录结构是最简单的，依靠自己的需求去调整

### 添加 vue-router 路由控制

```sh
npm install vue-router@next
```

**创建路由配置文件**

```js
// router/index.js

// 组合式API引入
import { createRouter, createWebHistory } from "vue-router"

// 引入单页面文件
import Home from "../home.vue"

// 配置路由信息
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    // 懒加载路由
    component: () => import("../About.vue"),
  },
]

// 生成路由实力
const router = createRouter({
  // 使用不同的路由模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 导出实例
export default router
```

[Vue Router 官方文档](https://v3.router.vuejs.org/zh/guide/)

**使用路由**

```vue
<template>
  <!-- 路由跳转链接 会渲染成 a 标签 -->
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view />
</template>
```

**构建 permission 控制文件**

```js
// /permission.js

// 引入 router/index.js
import router from "./router"

// 设置白名单
let whiteList = []
// 设置token
let token = ""

// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 校验token
  if (token) {
    next()
  } else {
    // 是否白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 路由重置，保留重定向参数
      next({ path: "/login", query: { redirect: to.fullPath } })
    }
  }
})

// 路由后置守卫
router.afterEach((to, from) => {
  // 设置页面标题
  document.title = `xxx-${to.meta.title}`
})
```

**挂载路由**

```js
// main.js

// 引入根页面
import App from "./App.vue"
// 引入 router/index.js
import router from "./router"
// 引入权限控制文件 /permission
import "./permission.js"

// 创建Vue实例
const app = createApp(App)
// 使用路由插件
app.use(router)

app.mount("#app")
```

### vite.config.js 配置文件

**声明环境变量配置文件**

在根目录下新建文件 .env.development 以及 .env.production 环境变量配置文件。

```shell
# 开发环境
VITE_MODE='development'

## 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_BASE_API = 'https://vitejs.dev.cn/'
```

```shell
# 生产环境
VITE_MODE='production'

## 变量必须以 VITE_ 为前缀才能暴露给外部读取
VITE_BASE_API = 'https://vitejs.prod.cn/'
```

**defineConfig() & loadEnv()**

defineConfig() 工具函数默认支持 `ts` 的类型提示。
可以接收一个配置对象`{}`为参数，也可以接收一个函数`()=>{}`为参数；当接收一个函数为参数时，函数的参数为一个条件对象

```js
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

// css 插件 自动添加 CSS3 前缀，px2rem，
import autoprefixer from "autoprefixer"
import postCssPxToRem from "postcss-pxtorem"
// vite不支持commonjs的语法 `npm install @rollup/plugin-commonjs`
// vite-plugin-commonjs官方已经说了只能在开发环境下使用
import commonjs from "@rollup/plugin-commonjs"

export default defineConfig(({ conditionalConfig }) => {
  // mode 对象包含4个字段
  const { mode, command, isSsrBuild, isPreview } = conditionalConfig

  // 根据 mode 来判断当前是何种环境 process.cwd() === __dirname
  const env = loadEnv(mode, process.cwd() /* __dirname */)

  // 需要返回一个对象
  return {
    // 插件配置
    plugins: [
      commonjs(), //要放在第一行,
      vue(),
    ], // 默认配置vue插件
    // 服务代理配置
    server: {
      host: "0.0.0.0", // 指定服务器应该监听哪个 IP 地址，默认localhost，可设置为'0.0.0.0'或 true
      port: 5173, // 端口号，默认5173
      open: true, // 开发服务器启动时，自动在浏览器中打开应用程序
      // 本地代理
      proxy: {
        // 模拟数据配置
        "/mock": env.VITE_BASE_API,
        // 接口配置
        "/api": {
          target: env.VITE_BASE_API, // 从环境变量文件取值
          changeOrigin: true, // 支持跨域
          rewrite: (path) => path.replace(/^\/api/, ""), // 路径重写 祛除 /api
        },
        // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
        "/socket.io": {
          target: "ws://localhost:5174",
          // 支持 websocket
          ws: true,
        },
      },
    },
    // 资源查找配置
    resolve: {
      // 路径映射
      alias: {
        // 第一种方式（最简洁） 常用
        "@": path.resolve(__dirname, "./src"),
        // 第二种方式 需要引入 import { fileURLToPath, URL } from 'node:url'
        "@style": fileURLToPath(new URL("./src/assets/style", import.meta.url)),
        "@images": fileURLToPath(new URL("./src/assets/images", import.meta.url)),
      },
      // 数组配置
      // alias: [
      //   {
      //   find: '@',
      //   replacement: path.resolve(__dirname, './src')
      //   }
      // ]
      // 导入时想要省略的扩展名列表。 vite官方不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
    // css 配置
    css: {
      devSourcemap: true, // 查看 CSS 的源码
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
          }),
          postCssPxToRem({
            rootValue: 72, // 设计图宽度的十分之一
            propList: ["*"], // 需要转换的属性 * 通配符代表全部
            replace: true,
            mediaQuery: true,
            minPixelValue: 3, // 最小转换值
            exclude: /node_modules/, // 排除转换项
          }),
        ],
      },
    },
    // 打包配置
    build: {
      minify: "terser", //启用terser压缩
      // 设置为false，便不会出现源码，
      sourcemap: false,
      terserOptions: {
        compress: {
          //pure_funcs:['console'],//只清除console
          drop_console: true, //清除所有console
          drop_debugger: true, //清除所有drop_debugger
        },
      },
    },
  }
})
```

**环境变量**
process.cwd() 和 \_\_dirname 用于获取文件系统路径的全局变量和方法，process.cwd()是在启动项目时动态获取的，\_\_dirname 则是根据当前文件的目录结构决定的， 区别在于：

- process.cwd() 是一个方法，用于获取 Node.js 进程的当前工作目录。它返回的是 Node.js 进程启动时所在的工作目录的绝对路径。这个路径通常是在启动 Node.js 应用程序时指定的，或者是在命令行中运行 Node.js 时的当前目录。
- \_\_dirname 是一个特殊的全局变量，用于获取当前模块的目录名。它返回的是包含当前模块文件目录的绝对路径。这个路径是相对于当前模块文件的位置的，所以它的值在不同模块中可能不同。

不同的环境变量对应着不同的启动命令下的模式：

```json
  "scripts": {
    "dev": "vite",
    "test": "vite --mode development", // --mode 后跟的参数，代表使用的环境配置文件
    "build": "vite build",
    "preview": "vite preview"
  },

```

**在 js 文件中获取环境变量**

```js
import.meta.env.[key]
```

[更多命令行参考](https://cn.vitejs.dev/guide/cli.html)

**服务代理**

host 默认值是 localhost，此时启动项目，只会监听本地服务  
将此设置为 '0.0.0.0' 或者 true 将监听所有地址，包括局域网和公网地址，此设置可以让同一局域网下的其他电脑访问本机 url 地址。

**CSS 配置**

Vite 的目标仅为现代浏览器，因此建议使用原生 CSS 变量和实现 CSSWG 草案的 PostCSS 插件（例如 postcss-nesting）来编写简单的、符合未来标准的 CSS  
Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持,须安装相应的预处理器依赖  
Vite 通过 postcss-import 预配置支持了 CSS @import 内联，在 CSS 文件中可以直接使用 @import 导入其他样式文件

## Error

### "Error: 'default' is not exported by..." when building with imported umd module

**错误描述**

```shell
PS D:\PubFile\xx-xx-h5\dist> npm run build

> xx-xx-h5@0.0.0 build
> vite build

vite v5.4.8 building for production...
✓ 790 modules transformed.
x Build failed in 9.83s
error during build:
node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js (8:8): "StringDecoder" is not exported by "node_modules/string_decoder/lib/string_decoder.js", imported by "node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js".
file: D:/PubFile/xx-xx-h5/node_modules/rollup-plugin-node-polyfills/polyfills/readable-stream/readable.js:8:8

 6: import {inherits, debuglog} from 'util';
 7: import BufferList from './buffer-list';
 8: import {StringDecoder} from 'string_decoder';
            ^
 9: import {Duplex} from './duplex';
10: import {nextTick} from 'process';

    at getRollupError (file:///D:/PubFile/xx-xx-h5/node_modules/rollup/dist/es/shared/parseAst.js:395:41)
    at error (file:///D:/PubFile/xx-xx-h5/node_modules/rollup/dist/es/shared/parseAst.js:391:42)
    ...
```

此错误在这次只出现在打包过程中，其原因大致是我引用了 node 环境中的东西，然后 commonJS 和 ES6 模块不兼容产生的影响。

经过查阅各种资料，在 [Vite 的 issues](https://github.com/vitejs/vite/issues/2679) 中得到答案

在 vite.config.js 中添加如下配置即可解决：

```js
build: {
  commonjsOptions: {
    include: ["eventemitter3"], // xgplayer 源码中引用了 node 环境中的模块，所以需要添加到 include 中
  },
},
```
