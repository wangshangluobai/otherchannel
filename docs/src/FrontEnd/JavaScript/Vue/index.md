
# Vue相关信息

1. [Vue 拖拽库](https://vue-draggable-plus.pages.dev/) B站相关视频 **BV1pm411y7ru**



### 冷门技巧


#### 重置 `Vue` 中 `data` 的数据为初始状态

在 `Vue` 中有时我们需要将 `data` 中的数据重置为初始状态，例如我们发布一篇文章，发布完成之后我们希望和表单双向绑定的对象重置为初始状态，方便发布下一篇文章。

```js
data(){
  return{
    Notica: {
      title: "",
      content: "",
    }
  }
}

// 调用它我们可以获取到页面 data 在刚初始化时的状态，即我们在编写代码时定义的字面值。
this.$options.data()

// 那么这样我们就可以将 data 中的某个数据重置到初始状态
this.Notica = this.$options.data().Notica

// 如果想把整个 data 都充值到初始化状态。
Object.assign(this.$data, this.$options.data.call(this))
// this.$data 获取的是当前的data对象 

// Tips 这里调用 options.data 时请用 call 调用并传入当前 this ，不这么做的话默认的 this 可能会指向全局 vue 对象，这就会导致它报错。

```

参考链接

- [如何重置 Vue 中 data 的数据为初始状态](https://juejin.cn/post/7045168454344638478)


### Vuex 语法糖

```js
import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
...mapMutations("moduleA",['changeName','changeTest'])

 * mapState,mapGetters必须放在computed里面, mapMutations,mapActions必须放在methods里面
```
