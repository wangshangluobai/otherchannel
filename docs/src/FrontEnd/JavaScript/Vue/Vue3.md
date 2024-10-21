### ref

vue3 中想要访问 DOM 和子组件可以使用 ref 进行模版引用，但是这个 ref 有一些让人迷惑的地方。比如定义的 ref 变量到底是一个响应式数据还是 DOM 元素？还有 template 中 ref 属性的值明明是一个字符串，比如 ref="inputEl"，怎么就和 script 中同名的 inputEl 变量绑到一块了呢？所以 `Vue3.5` 推出了一个 useTemplateRef 函数，完美的解决了这些问题。

```vue
<template>
  <input type="text" ref="input-ref" />
  <button @click="setInputValue">给input赋值</button>
</template>

<script setup>
  import { useTemplateRef } from "vue"

  const inputEl = useTemplateRef("input-ref")
  function setInputValue() {
    if (inputEl.value) {
      inputEl.value.value = "Hello, world!"
    }
  }
</script>
```

### emit

这里暂时只用 setup 语法糖

```vue
<script setup lang="ts">
  import { defineEmits } from "vue"

  const emit = defineEmits(["alertSome"])
  function clickButton() {
    //todo
    emit("alertSome", 6666)
  }
</script>
// setup语法糖不支持render函数
<template>
  <div>
    <button @click="clickButton">点击我</button>
  </div>
</template>
```

### props

**组合式 api props 父子组件传值**

在父组件中的写法没什么变化，依然是：`:message="parentMessage"` 这种格式  
子组件的接收和声明上有了一些变化，写法有很多，这里只写最常用的

```vue
<template>
  <p>{{ message }}</p>
</template>
<script setup>
  // defineProps 是一个内置的全局函数，不需要显式引入
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
  })

  // 解构 某些V3版本会出现失去响应式 使用toRefs解决
  // const { message } = defineProps({
  //   message: {
  //     type: String,
  //     required: true,
  //   },
  // })

  // 使用
  console.log(props.message)
</script>
```

#### 错误

**TypeError: Right-hand side of ‘instanceof‘ is not callable**

原因： `props` 定义 `type` 属性错误
`props` 里定义属性,`type` 属性有以下 7 种(注意：首字母要大写，不用加`""`)

- String
- Number
- Function
- Boolean
- Object
- Array
- Symbol

备注：遇见问题要冷静一点，仔细阅读代码，查找异常，不要因为觉得没问题就忽略

### vue-router 路由

**组合式 api 如何调用 router || route**

在组合式 `API` 中 `this` 指向为 `undefined`，不同于之前直接从 `this` 上取到 `router` 属性

```js
import { useRouter, useRoute } from "vue-router"
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function logout() {
      // 清空token
      window.sessionStorage.removeItem("token")
      // 重新导航到登录页
      router.push("/login")
    }

    return { logout }
  },
}
```

**路由懒加载**

使用路由懒加载，首屏组件加载速度更快一些，懒加载简单来说就是延迟加载或按需加载，即在需要的时候的时候进行加载。

1. 正常加载路由

   ```js
   // 官方文档：https://vue3js.cn/router4/guide/#html
   // 引入vue-router对象
   import { createRouter, createWebHistory, createWebHashHistory, ErrorHandler } from "vue-router"
   import view404 from "/@/views/404.vue "

   /**
    * 定义路由数组
    */
   const routes = [
     {
       // 404路由
       path: "/404",
       name: "404",
       component: view404,
     },
   ]

   /**
    * 创建路由
    */
   const router = createRouter({
     history: createWebHistory("/"),
     routes,
   })
   /**
    * 输出对象
    */
   export default router
   ```

2. `require` 实现懒加载

   ```js
   // 官方文档：https://vue3js.cn/router4/guide/#html
   // 引入vue-router对象
   import { createRouter, createWebHistory, createWebHashHistory, ErrorHandler } from "vue-router"
   /**
    * 定义路由数组
    */
   const routes = [
     {
       // 404路由
       path: "/404",
       name: "404",
       component: (resolve) => require(["/@/views/404.vue"], resolve),
     },
   ]

   /**
    * 创建路由
    */
   const router = createRouter({
     history: createWebHistory("/"),
     routes,
   })
   /**
    * 输出对象
    */
   export default router
   ```

3. ES6 语法实现
   这种方法似乎在拼接路径上有一定问题，之前遇到过，这次没有复现当时的环境，待补充

   ```js
   // 官方文档：https://vue3js.cn/router4/guide/#html
   // 引入vue-router对象
   import { createRouter, createWebHistory, createWebHashHistory, ErrorHandler } from "vue-router"
   /**
    * 定义路由数组
    */
   const routes = [
     {
       // 404路由
       path: "/404",
       name: "404",
       component: () => import("/@/views/404.vue"),
     },
   ]

   /**
    * 创建路由
    */
   const router = createRouter({
     history: createWebHistory("/"),
     routes,
   })
   /**
    * 输出对象
    */
   export default router
   ```

### 其他

**加载本地图片等静态资源**

Vue3 不支持 `require` 语法

1. 使用 <img> 标签引入静态图片
   1. 静态图片路径
      图片位于项目的 `public` 文件夹下，使用相对路径来引入。例如，如果你的图片位于 `public/images/logo.png` :
      ```vue
      <!-- 一定到绝对路径 打包后也能看见 -->
      <img src="/images/logo.png" alt="Logo">
      ```
   2. 动态图片路径
      需要动态地设置图片路径，可以使用 `v-bind` 绑定动态路径：
      ```vue
      <!-- logoPath 是一个计算属性或者数据属性，它的值指向图片的路径。 -->
      <img :src="logoPath" alt="Logo">
      ```
2. 使用 `import` 语句引入图片
   1. 单独引入图片
      使用 `ES6` 的 `import` 语句来引入图片。这通常用于需要在组件中直接访问图片的情况
      ```js
      import logo from "@/assets/images/logo.png"
      export default {
        data() {
          return { logoSrc: logo }
        },
      }
      ```
   2. 批量引入图片
      批量引入多个图片，可以使用 `import` 语句结合 `require.context` 或者使用其他工具如 `glob`
      ```js
      import { defineComponent } from "vue"
      const images = require.context("@/assets/images", false, /\.png$/)
      export default defineComponent({
        setup() {
          const imageList = images.keys().map((key) => images(key))
          return { imageList }
        },
      })
      ```
3. 使用 `Vite` 插件自动处理图片资源
   1. 配置 `Vite` 插件
      使用 `vite-plugin-vue2` 或 `vite-plugin-vue3` 等插件来自动处理图片资源
      ```js
      // vite.config.js
      import { defineConfig } from "vite"
      import vue from "@vitejs/plugin-vue"
      export default defineConfig({
        plugins: [vue()],
        build: {
          rollupOptions: {
            input: {
              main: "index.html",
            },
          },
        },
        optimizeDeps: {
          include: ["@/assets/images/*"],
        },
      })
      ```
   2. 使用 `vite-plugin-svg-icons` 插件
      `SVG` 图标，可以使用 `vite-plugin-svg-icons` 来将 `SVG` 文件转换为 `Vue` 组件
      ```js
      // vite.config.js
      import { defineConfig } from "vite"
      import vue from "@vitejs/plugin-vue"
      import svgIcons from "vite-plugin-svg-icons"
      export default defineConfig({
        plugins: [
          vue(),
          svgIcons({
            iconDirs: ["src/icons/svg"], // SVG 文件所在的目录
            symbolId: "icon-[dir]-[name]", // 生成的 Vue 组件的名字
          }),
        ],
      })
      ```
