### watch

**功能描述**

watch() 方法相当于 Vue 根实例选项对象中的 watch 选项。该方法用于监听特定的数据，并在回调函数中应用。当被监听的数据发生变化时，才会调用回调函数。

1. watch() 方法可以接收两个参数。如果使用该方法监听的是一个 ref 对象，那么第一个参数需要监听的 ref 对象，第二个参数是当监听的数据发生变化时触发的回调函数。

   **使用语法**

   ```vue
   <script setup>
     //导入函数
     import { ref, watch } from "vue"

     //创建一个 ref 响应式代理对象
     const data = ref(0)

     //换算结果变量
     const result = ref("")

     //watch监听器
     watch(data, (newValue, oldValue) => {
       console.log("新值", newValue)
       console.log("旧值", oldValue)
       result.value = `${data.value} 米 = ${data.value * 100} 厘米`
     })
   </script>
   ```

2. 如果 watch() 方法监听的是一个 reactive 对象中的某个属性，那么第一个参数需要使用返回该属性的函数的方式。

   watch() 方法的两个额外参数：

   - immediate：是否立即执行。
   - deep：是否深度监听。

   如果要监听的属性值是一个对象，要想监听对象内部值的变化，需要在监听属性的选项参数中设置 deep 选项的值为 true（开启深度监听）。

   **使用语法**

   ```vue
   <script setup>
     //导入函数
     import { reactive, watch } from "vue"

     //创建一个 reactive 响应式代理对象
     const product = reactive({
       name: "华为手机",
       price: 6999,
       remark: "",
     })

     //watch监听器
     watch(
       () => product.price,
       (newValue, oldValue) => {
         product.remark = `原价格：${oldValue}元，新价格：${newValue}元`
       },
       //两个额外参数（非必填）
       {
         immediate: false, //关闭：立即监听；默认关闭
         deep: true, //开启：深度监听；如果监听对象是 reactive() 响应式对象，则默认自动开启
       }
     )

     //修改属性值
     product.price = 3999
   </script>
   ```

3. 监听多个属性
   监听属性通常用来实现数据之间的换算，如长度单位之间的换算、速度单位之间的换算、汇率之间的换算等。

   **使用语法**

   ```vue
   <script setup>
     //导入函数
     import { ref, watch } from "vue"

     //创建两个 ref 响应式代理对象
     const meter = ref(0)
     const kilometer = ref(0)

     //watch监听器：监听多个属性
     watch([meter, kilometer], ([newMeter, newKilometer], [oldMeter, oldKilometer]) => {
       if (newMeter != oldMeter) {
         kilometer.value = (newMeter * 3600) / 1000
       }

       if (newKilometer != oldKilometer) {
         meter.value = (newKilometer * 1000) / 3600
       }
     })
   </script>
   ```

### watchEffect()

watchEffect() 方法用来监听数据的变化，类似于 Vue 2.x 中的 watch 选项。该方法接收一个函数作为参数，它会立即执行一次，同时会跟踪函数里面用到的所有响应式状态，当状态发生变化时会重新运行该函数。

```vue
<script setup>
  //导入函数
  import { ref, watchEffect } from "vue"

  //创建一个 ref 响应式代理对象
  const data = ref(0)

  //换算结果变量
  const result = ref("")

  //watch监听器
  watchEffect(() => {
    result.value = `${data.value} 米 = ${data.value * 100} 厘米`
  })
</script>
```

**注意**

1. watch 和 watchEffect 的区别
   watch 和 watchEffect 是 Vue 3.0 中新增的两个响应式 API，用于监听数据的变化。watch 适用于需要获取新值和旧值，或者需要懒执行的场景，而 watchEffect 适用于需要监听多个数据源，并且需要立即执行的场景。它们之间的区别如下：
   - watch 是监听单个数据源，可以设置 immediate 和 deep 选项，可以获取新值和旧值；watchEffect 则是监听一组数据源，不能设置 immediate 和 deep 选项，不能获取新值和旧值。
   - watch 是懒执行的，只有在数据变化时才会执行回调函数，而 watchEffect 则是立即执行的，不管数据是否变化。
   - watch 可以监听计算属性，而 watchEffect 不能监听计算属性。

### computed

**功能描述**

在模板中绑定表达式只能用于简单的运算。如果运算比较复杂，可以使用 Vue.js 提供的计算属性，通过计算属性可以处理比较复杂的逻辑。  
通过计算属性可以实现各种复杂的逻辑，包括运算、函数调用等，只要最后返回一个计算结果就可以。当计算属性依赖的数据发生变化时，计算属性的值会自动更新，所有依赖该计算属性的数据绑定也会同步进行更新。

**使用语法**

```js
const computedValue = computed(() => {})
```

每一个计算属性都包含一个 getter 和一个 setter。getter 只要用来读取值，而 setter 主要用来设置值。getter 主要用来读取值，而 setter 主要用来设置值。当手动更新计算属性的值时，就会触发 setter，执行一些自定义的操作。

```js
let person = ref({
  firstName: "Jim",
  lastName: "Carrey",
})

// 计算属性 - 简写
// person.fullName = computed(() => {
//   return `${person.firstName} ${person.lastName}`
// })

person.fullname = computed({
  get() {
    return `${person.firstName} ${person.lastName}`
  },
  set(value) {
    const arr = value.split(" ")
    person.firstName = arr[0]
    person.lastName = arr[1]
  },
})
```

**注意**

1. Vue 中的 methods 方法与 computed 计算属性的区别是 methods 方法会实时计算，而 computed 计算属性是使用缓存数据。计算属性是基于它们的依赖进行缓存的。当页面重新渲染时，如果依赖的数据未发生改变，使用计算属性获取的值就是一直是缓存值。只有依赖的数据发生改变时才会重新获取值。如果使用的是方法，在页面重新渲染时，方法中的函数总会被重新调用。

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
