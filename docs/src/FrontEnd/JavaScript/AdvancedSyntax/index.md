### 循环优化-并发

```js
await Promise.all(
  fackEnumList.map(async (el) => {
    const obj = {}

    await Promise.all(
      el.dictionaryList.map(async (jEl) => {
        obj[jEl.enCode] = jEl.fullName
      })
    )
    fackMap[el.enCode] = obj
  })
)
```

### 替代 eval 的方法

**模块化加载**

```js
// 字符串形式的代码

const dynamicCode = `
  export function greet(name) {
    console.log('Hello, ' + name + '!');
  }
`

// 将字符串形式的代码作为模块加载和执行
const moduleName = "dynamicModule"
const moduleURL = URL.createObjectURL(
  new Blob([dynamicCode], { type: "application/javascript" })
)

import(moduleURL)
  .then((module) => {
    const { greet } = module

    greet("World")
  })
  .catch((error) => {
    console.error("动态模块加载失败：", error)
  })
  .finally(() => {
    URL.revokeObjectURL(moduleURL)
  })
```

**Function**

```js
console.log(
  Function('"use strict";return(function(a){return a(5)})')()(function (a) {
    return "Monday Tuesday Wednesday Thursday Friday Saturday Sunday".split(
      " "
    )[a % 7 || 0]
  })
)
```

### 深度更新复杂数据类型 Vue

```js
changeComplexData(params) {
  const { value = {}, target } = params || {};
  const { newValue, fields } = value || {};

  if (newValue === undefined) return;
  if (Array.isArray(fields)) {
    for (let i = 0; i < fields.length; i++) {
      deepChange(fields[i], this[target], newValue);
    }
  } else {
    deepChange(fields[i], this[target], newValue);
  }

  const deepChange = (fields, target, newValue) => {
    fields.split(".").reduce((acc, key, index, array) => {
      if (index === array.length) {
        acc[key] = newValue;
      }
      return acc[key];
    }, target);
  };
}
```

### JS 实现链表

```js
const linkList = (function () {
  //生成链表中的成员
  class Node {
    constructor(element) {
      this.element = element
      this.next = null
    }
  }
  // 因为链表中的头部位置和长度为私有属性，所以用weakmap
  let head = new WeakMap()
  let len = new WeakMap()
  // 链表操作对象
  return class linkList {
    constructor() {
      len.set(this, 0)
      head.set(this, null)
    }
    //在最后增加链表对象
    append(element) {
      const node = new Node(element)
      if (this.getHead() === null) {
        head.set(this, node)
        this.addLen()
      } else {
        let lastNode = this.getHead()
        while (lastNode.next) {
          lastNode = lastNode.next
        }
        lastNode.next = node
        this.addLen()
      }
      return this.getHead()
    }
    // 在中间插入链表对象
    insert(position, element) {
      let _position = 0
      let node = new Node(element)
      let positionNode = this.getHead()
      let positionNextNode = null
      console.log(len.get(this))
      //位置大于初始位置且小于最后位置就正常插入
      if (position > 0 && position < len.get(this)) {
        while (_position !== position) {
          _position++
          positionNode = positionNode.next
        }
        positionNextNode = positionNode.next
        positionNode.next = node
        node.next = positionNextNode
        console.log(this.getHead())
      }
      //如果位置在末尾位置就直接调用append
      if (position === len.get(this)) {
        this.append(element)
      }
      //如果位置在初始位置则直接调用unshift
      if (position === 0) this.unshift(element)
      return this.getHead()
    }
    //删除链表对象
    del(index) {
      //index必须为有效的位置
      if (index <= len.get(this) && index > 0) {
        let position = 0
        let node = this.getHead()
        let parentNode = null
        while (position < index + 1) {
          position++
          parentNode = node
          node = node.next
        }
        parentNode.next = node.next
        node.next = null
        return this.getHead()
      }
    }
    //在链表的头部新增
    unshift(element) {
      let node = new Node(element)
      node.next = this.getHead()
      head.set(this, node)
      return this.getHead()
    }
    // 获取链表头部
    getHead() {
      return head.get(this)
    }
    // 修改链表的长度变量
    addLen() {
      let l = len.get(this)
      l++
      len.set(this, l)
    }
  }
})()
var list = new linkList()
list.append(0)
list.append(1)
list.append(2)
list.append(3)
list.insert(1, 1.5)
list.unshift(-1)
list.del(3)
```

### 根据 Map 生成对象 模拟类

```js
const js
export const WorkHourWriteEntity = new Map([
  [
    'CATEGORY',
    {
      type: 'String',
      default: '',
    },
  ],
  [
    'ID',
    {
      type: 'String',
      default: '',
    },
  ],
  [
    'MAJOR_NAME',
    {
      type: 'String',
      default: '',
    },
  ]
])

generate Object

const item = { CATEGORY: 123, ID: '232', MAJOR_NAME: '2334}
myObject({ entity: WorkHourWriteEntity, paylod: item })
const myObject = ({ entity, paylod }) =>
  Object.fromEntries(
    entity
      .entries()
      .map(([key, value]) => [
        key,
        paylod[key] === undefined ? value.default : paylod[key],
      ])
  );
```
