
# element-ui 全局改变组件尺寸及单页应用刷新方式

在 Vue 项目入口文件中：

```js
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // 设置默认和刷新浏览器设置为你指定的大小
  locale: enLang, // 如果使用中文，无需设置，请删除
})
```

更改组件尺寸大小的事件

```js
methods:{
    handleSetSize(size) {
      this.$ELEMENT.size = size  // 这一步很关键，这是 Element-UI 向 Vue 暴露的实例属性，下面会源码分析
      this.$store.dispatch('app/setSize', size) // 这里就是把尺寸写入 cookie ：Cookies.set('size', size)，供页面刷新时使用
      this.refreshView() // 主要为了及时当前页面生效，这个刷新单页应用的方案值得学习，下面也会分析源码
      this.$message({
        message: 'Switch Size Success',
        type: 'success',
      })
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route)

      const { fullPath } = this.$route
      // 这里使用 nextTick 是为了确保上面的 dispatch 里 promise 异步清除的任务完成
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        })
      })
    },
}
```


重定向路由定义

```js
{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)', // 这里是重点,见下图路由前后对比
      component: () => import('@/views/backup/redirect/index'),
    },
  ],
},
```