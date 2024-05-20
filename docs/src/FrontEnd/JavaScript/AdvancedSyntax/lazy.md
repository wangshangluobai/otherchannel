
### 惰性函数
惰性函数，即函数 A 在第一次调用的时候，会定义一个函数 _A ，然后返回这个函数 _A ，以后每次调用这个函数 A ，都是调用这个函数 _A。

```js
function lazy(type) {
  if(type === 1){
    return function () {
      console.log('type1')
    }
  }else if(type === 2){
    return function () {
      console.log('type2')
    }
  }else {
    return function () {
      console.log('type else')
    }
  }
}
```

#### 什么场景下适合使用？

1. 判断当前环境适用什么函数处理
2. 性能优化：减少状态过滤