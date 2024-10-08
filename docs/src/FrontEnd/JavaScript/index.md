# JS 原生开发

## JS 基础注意事项

1. 全局作用域中，使用 const 和 let 声明的变量并没有在全局对象中，只是一个块级作用域（Script）中
   - 使用 var 生命的变量会直接挂载到全局对象的属性上，包括 function 形式生命的函数
   - let/const 也存在变量声明提升，只是没有初始化分配内存。 一个变量有三个操作，声明(提到作用域顶部)，初始化(赋默认值)，赋值(继续赋值)
   - let 是一开始变量声明提升，然后没有初始化分配内存，代码执行到那行初始化，之后对变量继续操作是赋值。因为没有初始化分配内存，所以会报错，这是暂时性死区
     注意： 因为是在块级作用域中，所以两个平级的块级作用域无法访问到
2. ..

## 文件上传

### input type="file" 的属性

1. accept 设置上传的文件类型，属性其实是表明服务器端可接受的文件类型，但是在前端这边表现就是会过滤文件类型  
   accept - 设置方式 **支持多种设置的方式**，如果有多个类型可以逗号(,)分隔，比如 image/png,.jpg
   1. 通配符。chrome 有个版本使用通配符会造成卡顿（最新版本已修复）
      1. audio/\*(所有音频文件)
      2. video/\*(所有视频文件)
      3. image/\*(所有图片文件)
   2. 有效的 MIME 类型
      1. image/png
      2. image/jpeg 。image/jpg 是不会识别的
   3. 文件扩展名
      1. .png
      2. .jpg
2. capture - 设置文件来源，主要用于移动端，文件内容从 相册、前摄像头拍摄、后摄像头拍摄。(不一定支持这么多)  
   capture - 设置方案
   1. user 前置
   2. environment 后置
   3. camera 相机
   4. camcorder 摄像机
   5. microphone 录音
   6. filesystem
3. multiple - 是否支持多选，设置上即为支持多选，但是在微信中支持有问题
4. webkitdirectory - 选择目录上传  
   并不是一个标准的属性，chrome 还是可以体验一下的

### 选择文件的事件及使用

1. onchange 事件监听，onchange 事件中可以获取到选择动作，选择的文件在 files 中保存。  
   注意：操作完成之后要记得清空，否则再次选择相同的文件不会触发 change 事件。
   ```js
   input.onchange = function (event) {
     event.target.files
     // ...
     this.value = ""
   }
   ```
2. File 文件上能获取到的内容
   1. 文件名
   2. 文件大小
   3. 文件类型
   4. 路径（假路径，有的返回的是空的）
3. File 文件获取内容&其他信息,比如说 图片宽高、视频宽高、音频时长、exif 之类的信息是不会返回的。  
    这里我们需要二次操作
   1. 比如说 URL.createObjectURL() 加载一下，然后加载，然后获取信息。
   2. 还可以 FileReader 读取成 arrayBuffer，然后分析字节，获取 exif 信息。

参考地址：

- [你不知道的 input 之文件选择（accept、capture、multiple、webkitdirectory）](https://segmentfault.com/a/1190000023460961)

# 数据结构

## 链表

链表是一种常见的数据结构，它由一系列节点组成，每个节点包含数据部分和指向下一个节点的指针。以下是链表的一些主要特性以及适用环境的总结：

### 链表的特性：

1. **动态大小**：链表的大小可以在运行时动态变化，不需要在创建时指定固定大小。

2. **无需连续内存**：链表的每个节点可以独立存储在内存的任何位置，它们通过指针连接起来，因此不需要像数组那样连续的内存空间。

3. **插入和删除操作高效**：在链表中插入或删除节点通常只需要改变相邻节点的指针，不需要移动其他元素，这使得这些操作的时间复杂度为 O(1)，前提是你已经有了要插入或删除节点位置的引用。

4. **随机访问性能差**：链表不支持像数组那样的随机访问，访问链表中的任意元素需要从头开始遍历，直到到达指定位置。

5. **空间开销**：每个链表节点除了存储数据外，还需要额外的空间来存储指向下一个节点的指针，这增加了每个节点的空间开销。

6. **双向和单向**：链表可以是单向的，即每个节点只包含指向下一个节点的指针；也可以是双向的，即每个节点包含指向前一个节点和下一个节点的指针。

7. **循环链表**：链表的最后一个节点的指针可以指向链表的头部，形成一个循环结构。

### 适用环境：

1. **频繁插入和删除**：当程序需要频繁地在数据集合中插入和删除元素时，链表是一个合适的选择，因为这些操作不需要移动其他元素。

2. **不确定数据量**：当数据集合的大小在运行时变化很大，或者事先不知道数据量时，链表可以根据需要动态地增长或缩小。

3. **内存使用优化**：在内存受限的环境中，链表可以更有效地使用内存，因为它不需要预先分配大块连续的内存空间。

4. **非顺序数据流**：当数据以非顺序的方式到达或处理时，链表可以方便地在任何位置添加新元素。

5. **实现队列和栈**：链表可以用来实现队列和栈这样的抽象数据类型，因为它们支持在一端进行插入和删除操作。

6. **构建复杂数据结构**：链表可以作为构建更复杂的数据结构的基础，如哈希表的桶、图的邻接表等。

7. **避免内存碎片**：在某些情况下，使用链表可以减少内存碎片，因为新节点可以在内存中找到合适的位置分配。

8. **特定算法实现**：某些算法在链表上实现更为自然和高效，如 LRU 缓存淘汰算法。

然而，链表也有其局限性，例如不支持高效的随机访问，这使得在需要频繁访问特定位置元素的场景下，链表可能不是最佳选择。此外，链表的空间开销较大，因为它需要额外的指针存储空间。在选择数据结构时，需要根据具体的应用场景和需求来权衡利弊。

## 队列

队列是一种基本的数据结构，遵循先进先出（First In First Out, FIFO）原则。在 JavaScript 中，队列常用于处理需要按顺序执行的任务。

### 队列的特点

1. 先进先出  
   元素总是添加到队列的末尾（入队），而移除则发生在队列的头部（出队）。
2. 无界/有界  
   队列可以是无界的，允许无限数量的元素加入，也可以是有界的，限制队列的最大容量。
3. 并发安全  
   在多线程或多进程环境下，队列可能需要实现线程安全机制，以防止数据竞争。

### 适用环境

1. 任务调度  
   操作系统中的作业调度、线程池管理等。
2. 缓存系统  
   网页浏览器的 HTTP 请求队列。
3. 消息队列  
   分布式系统中解耦服务间通信。
4. 事件循环  
   JavaScript 运行环境中的事件循环机制。
5. 广度优先搜索  
   算法中存储待访问的节点。

## 栈

栈（Stack）是一种数据结构，遵循后进先出（Last In First Out, LIFO）的原则。在栈中，新添加的元素成为栈顶元素，也是第一个被移除的元素。栈的操作通常包括压栈（push，将元素放入栈顶）和弹栈（pop，移除并返回栈顶元素）。

### 栈的特点

1. 后进先出  
   栈顶元素是最后加入的，也是最先被移除的。
2. 快速访问  
   栈顶元素可以快速访问，但访问栈底元素需要逐个移除栈顶元素，时间复杂度为 O(n)。
3. 有限的插入和删除位置  
   插入和删除操作仅限于栈顶。

### 适用环境

1. 括号匹配  
   在编译器和解释器中，用于检查括号、花括号、方括号等是否正确配对。
2. 递归调用  
   函数调用形成的调用栈就是一种天然的栈应用，每个函数调用形成一个新的栈帧，返回时栈帧被弹出。
3. 回溯算法  
   在解决问题时，如八皇后问题，用于尝试不同的路径并回退到上一步。
4. 深度优先搜索  
   在图论中，深度优先搜索（DFS）使用栈来存储待访问的节点。
5. 网页浏览历史  
   浏览器的前进和后退按钮功能，可以使用栈来存储用户的浏览历史。

## 哈希表

哈希表（Hash Table）是一种数据结构，它实现了关联数组的抽象数据类型，能够通过键（key）直接访问到其对应的值（value），而不需要遍历整个数据集。哈希表的核心在于哈希函数，它将键转换成一个索引，从而快速定位到值所在的存储位置。

### 哈希表的特点

1. 快速查找  
   平均情况下，哈希表的查找、插入和删除操作的时间复杂度为 O(1)。
2. 键值对存储  
   存储的是键值对，键唯一确定一个值。
3. 冲突解决  
   当两个键通过哈希函数映射到同一索引时发生冲突，需要采用开放地址法、链地址法等策略解决。
4. 动态大小  
   可以动态调整大小以适应更多的键值对存储需求。

### 适用环境

1. 字典/映射  
   快速根据关键词查找相关联的值，如配置信息存储。
2. 缓存  
   实现数据缓存，如最近访问的网页、计算结果缓存。
3. 集合操作  
   用于快速判断元素是否存在，如去重、交集、并集等操作。
4. 计数应用  
   如统计文本中单词出现次数。
5. 索引构建  
   数据库和搜索引擎中用于快速索引和检索数据。

# JSDoc（JavaScript Documentation）

JSDoc 是一种用于 JavaScript 代码的注释规范，它使用特定的标签（如 @param、@returns 等）来描述函数、类、变量等的结构、参数、返回值和用途。这样，开发者可以使用工具自动生成文档，或者让 IDE 和代码编辑器提供更好的智能提示和类型检查。

1. @param - 描述函数参数：

```js
/**
 * @param {string} name - 传入的名字
 * @param {number} age - 传入的年龄
 */
function greet(name, age) {
  console.log(`Hello, ${name}. You are ${age} years old.`)
}
```

2. @returns - 描述函数返回值：

```js
/**
 * @returns {boolean} - 返回操作是否成功
 */
function isPrime(number) {
  // ...
}
```

3. @class - 描述类：

```js
/**
 * @class Person
 * @constructor
 * @param {string} name - 人的名字
 * @param {number} age - 人的年龄
 */
function Person(name, age) {
  this.name = name
  this.age = age
}
```

4. @property - 描述对象的属性：

```js
/**
 * @class Person
 * @property {string} name - 人的名字
 * @property {number} age - 人的年龄
 */
```

5. @example - 提供代码示例：

```js
/**
 * @param {string} text - 要转换的文本
 * @returns {string} - 转换后的文本
 * @example
 * toUpperCase('hello') // returns 'HELLO'
 */
function toUpperCase(text) {
  return text.toUpperCase()
}
```

6. @typedef - 定义自定义数据类型：

```js
/**
 * @typedef {object} Address
 * @property {string} street - 街道地址
 * @property {string} city - 城市名
 * @property {string} zip - 邮政编码
 */
```

7. @throws - 描述函数可能抛出的错误：

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @throws {TypeError} - 如果传入的不是数字
 */
function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Both arguments must be numbers")
  }
  return a + b
}
```

8. @deprecated - 标记不再推荐使用的功能：

```js
/**
 * @deprecated since version 2.0 - Use `newMethod` instead.
 */
function oldMethod() {
  // ...
}
```

JSDoc 的完整规范可以在其官方文档中找到：https://www.jsdoc.com.cn/。这个文档提供了所有可用标签的详细说明和使用示例。

我一直很喜欢参数作为一个对象，我认为是一种更好的方式，因为这样可以避免参数的数量无限增长，而且可以避免参数顺序的问题。
但是，今天遇到了一个问题，函数 A 接收的参数本来是对象类型，但是如果只想简单传入一个参数，再去构建一个对象比较麻烦，且我也期望将参数支持单独传入。
这样会导致一个问题，如果用户传入的是一个对象参数，我无法判断用户传入的这个参数是我本来期望的对象，还是用户传如的一个简单参数。
我试图根据参数对象中某个必要属性判断，但这是误区，因为用户传入的简单参数对象中也可能存在该属性。
我本来这是一个很完美的，针对函数传参的解决方案，除了无条件的包裹一层对象之外。
这样做会导致参数固态，无法动态调整。麻了

逆波兰表达式（Reverse Polish Notation，RPN）是一种计算表达式的 notation，它将操作符和操作数分开，并使用后缀（postfix）的方式来计算表达式。

逆波兰表达式（Reverse Polish Notation, RPN），又称后缀表达式，是一种不需要括号来标识操作符优先级的数学表达式。在逆波兰表达式中，所有的操作符置于操作数的后面，因此也没有必要考虑操作符的优先级。

### 逆波兰表达式的特点：

1. **操作符在后**：每个运算符后面跟着它的两个操作数。
2. **无括号**：不使用括号来表示操作的顺序。
3. **简单结构**：表达式由操作符和操作数组成，结构简单。
4. **易于计算**：适合用栈数据结构进行计算。

### 逆波兰表达式的例子：

- 传统的算术表达式：`(3 + 4) * 5 - 6`
- 对应的逆波兰表达式：`3 4 + 5 * 6 -`

### 如何计算逆波兰表达式：

1. 从左到右扫描表达式。
2. 遇到数字时，将其压入栈中。
3. 遇到运算符时，从栈顶弹出所需数量的操作数（对于二元运算符是两个），执行运算，并将结果压回栈中。
4. 当表达式结束时，栈顶的数字就是表达式的结果。

### 示例计算过程：

假设我们要计算表达式 `3 4 + 5 * 6 -`

1. 扫描到 `3`，压入栈中。
2. 扫描到 `4`，压入栈中。
3. 遇到 `+`，弹出 `4` 和 `3`，计算 `3 + 4`，结果 `7` 压回栈中。
4. 扫描到 `5`，压入栈中。
5. 扫描到 `*`，压入栈中（因为下一个是操作数 `6`）。
6. 扫描到 `6`，压入栈中。
7. 再次遇到 `*`，弹出 `6` 和 `5`，计算 `5 * 6`，结果 `30` 压回栈中。
8. 遇到 `-`，弹出 `30` 和栈顶的 `7`，计算 `7 - 30`，结果 `-23` 压回栈中。

最终，栈中只剩下 `-23`，这就是表达式的结果。

逆波兰表达式在编程和计算机科学中非常有用，特别是在实现计算器和解析表达式时。它也常用于栈式计算器和某些编程语言的语法分析。

### JS 隐式转换

#### == 的隐式类型转换

- `null` == `undefined` 结果为 `true`
- `NaN` 不与任何值相等，包括它自己
- `null` 和 `undefined` 不会进行数据转换

数值和字符串，会将字符串转为数值，再进行比较
数值和布尔值，会将 `true` 转为数值 `1`， `false` 转化为 `0`
数值和数组(对象、函数)，数组会先通过调用 `toString()` 转换为字符串后，再转化为数值
布尔值和非布尔值，`0`、`''`、会被转化为 `false`
对象和原始值，首先会调用对象的 `valueOf()` 方法获取原始值，如果返回的是一个原始值，则将原始值转化为与待比较值相同类型后进行比较，如果返回的是一个对象，则会调用对象的 `toString()` 方法，将返回值转换为原始值进行比较

复杂数据类型和基本数据类型比较时都会先转换为字符串，再转换为相应的数据类型

#### 逻辑非 ！

在进行转换时会进行两步操作，先将数据类型转换为布尔类型，再进行取反 。

- `false`
- `undefined`
- `null`
- `0`
- `-0`
- `NaN`
- `''`

只有以上七个值会被逻辑非转为 `true`

`[] == []` 为 `false` 是引用地址的比较结果
`[] == ![]` 为 `true` 是因为 `!` 的运算优先级高于 `==` ，先将空数组转为 `true` ，再取反得 `false` ，即得
`[] == false` 布尔类型和非布尔类型比较，先将 `false` 转化为 `0`，然后调用对象得 `toString()` 方法，返回一个空对象 `''`
最后空对象转化为数值 `0` 即 `0 == 0` 结果为 `true`
