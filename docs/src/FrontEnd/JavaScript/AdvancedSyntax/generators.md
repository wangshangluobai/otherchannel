
## 异步方案

同步任务 异步任务 异步宏任务 异步微任务这些是异步编程的基础概念

### 回调函数

回调函数的主要问题是可能会导致回调地狱（`Callback Hell`），即回调函数嵌套回调函数，使得代码难以阅读和维护。

基于事件的发布订阅, 先注册一系列回调事件 当异步任务完成 触发回调函数 执行操作。

```js
Event.subscribe('key', fn1)
Event.subscribe('key', fn2)


ajax(url, (res1) => {
  Event.publish('key', res1)
})


class Event{
  store=new Map();
  subscribe(name, callback){
      if(!store[name]){
        const s = new Set();
        s.add(callback)
        this.store.set(name, s)
        return;
      }
      store[name].add(callback)
  };
  unSubscribe(name, callback){
    if(!store[name]) return;
    store[name].delete(callback)
  }
  publish(name, data){
    if(!store[name]) return;
    store[name].forEach(fn=>fn(data))
  }
}

```


### `Promise` 

`Promise` 是异步编程的一种解决方案，比传统的解决方案**回调函数和事件**更合理和更强大。它由社区最早提出和实现，`ES6` 将其写进了语言标准，统一了用法，原生提供了 `Promise` 对象。`Promise` 对象就是为了解决回调地狱而提出的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。

当前主流的js异步编程方案中 都是基于promise的。`promise` 最大的优点就是统一了异步调用的 `api`，所有异步操作都可以使用相同的模式来处理问题。使用链式调用，避免了回调地狱。*本质*上和回调的方案并没有区别。

1. `promise` 本质是一个**存储回调的容器**和基于事件的发布订阅有点类似。
   - 状态 `state`

     `promsie` 内部维护了一个状态 可以从 `pendding` -> `fulfilled` || `pendding` -> `rejected` 。仅有这两种变化。且一旦状态改变，就不会再变，任何时候都可以得到这个结果。`promise` 与基于事件的发布订阅不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

   - 执行结果 `value`

     当执行器执行成功后需要设置结果 执行失败后需要设置失败原因 这都是运行的结果被保存在 `promise` 内部。

   - 回调函数列表 `handles`

     有成功的回调函数 通过 `then` ，`finally`注册的 可以是多个
     有失败的回调函数 通过 `then`，`catch`，`finally`注册的 可以是多个

   - 钩子函数 `onResolve`/`onReject`

     外部在 `promise` 构造函数中需要注入一个执行器, `promise` 需要对外提供一个钩子, 当执行器获取到异步结果后 需要通过钩子改变 `promise` 的状态 设置结果 触发回调函数执行。

   - `api`

     接受注册回调函数的各种api `then` `catch` `finally` 以及一些静态 `race` `all` `resolve` `reject`等。

2. `promise` 的用法可以分为两大步骤
   - 创建 `promise` 对象并传入执行器&同步运行执行器
     ```js
     const execute = (onResolve, onReject) => {
       setTimeout(() => {
         onResolve(123);
       }, 2000);
     };
     const p = new Promise(execute);

     ```
   - 注册异步回调函数，等待执行器返回结果，调用注册的函数。
     ```js
     // 成功的回调
     p.then((data)=>{
       console.log('第一个成功的异步回调 异步结果：', data)
     })
     // 失败的回调
     p.catch((reason)=>{
       console.log('第一个失败的异步回调 异步结果：', reason)
     })
     // 成功|失败都被执行的回调
     p.finally(()=>{
       console.log('第一个finally异步回调')
     })
     ```
3. `promise` 特性
  - 链式调用 

    `promise` 的这些 `api` 无论是静态的还是原型上的 都有一个特点即支持链式调用。实现链式调用的原理也很简单，每次都返回一个新的 `promise` 实例即可。

  - 值穿透

    `promise` 的值通过钩子函数 `onResolve`/`onReject` 设置 或者通过注册的回调函数获取结果,如果处理函数返回一个非 `Promise` 值，那么这个值会被直接传递到下一个，当没有对应的回调函数时透传当前的value。




### 生成器 Generators/yield

`Generator` 最大的特点就是可以交出函数的执行权，可暂停可恢复

在 `JavaScript` 中， `function*` \*关键字用来声明一个生成器函数（`generator function`）。生成器是一种特殊的函数，它允许你通过 `yield` 关键字返回一系列的值，而不必一次性返回它们。生成器函数使用 \* 号来标识，这个 \* 号放在 `function` 关键字之后。

生成器函数可以被调用，但它不会立即执行。相反，它会返回一个生成器对象。可以使用生成器对象的 `next()` 方法来逐个获取生成器函数的值。

```js
function* idMaker() {
  let index = 0;
  while (true) {
    yield index;
    index++;
  }
}

// 创建生成器对象
const gen = idMaker();

// 获取生成器的第一个值
console.log(gen.next().value); // 0

// 获取下一个值
console.log(gen.next().value); // 1

// 以此类推...
```


`yield` 表达式后面的表达式，只有当调用 `next` 方法、内部指针指向该语句时才会执行，因此等于为 `JavaScript` 提供了手动的“惰性求值”（`Lazy Evaluation`）的语法功能

```js
function* gen() {
  yield  123 + 456;
}

const g = gen() // 并不会计算求值
g.next() // 求值获得结果

```

`JavaScript` 代码运行时，会产生一个全局的上下文环境（`context`，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（`active`）的上下文，由此形成一个上下文环境的堆栈（`context stack`）。
这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。
`Generator` 函数不是这样，它执行产生的上下文环境，一旦遇到 `yield` 命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行 `next` 命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

### `async/await` `promise` 语法糖

`await/async` 是基于 `promise` 的，是 `Generator` 函数的语法糖，将 `Generator` 函数做了进一步的封装 内部实现了自动调用 `next` 直至拿到最终返回结果。相比于 `Generator`, `await/async`有更好的语义，更贴近同步的方法实现了异步调用。是目前主导的异步实现方案


# 参考
- [Generator 函数](https://juejin.cn/post/7316709300248150016)