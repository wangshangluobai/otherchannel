
# 数据结构

## 链表
链表是一种常见的数据结构，它由一系列节点组成，每个节点包含数据部分和指向下一个节点的指针。以下是链表的一些主要特性以及适用环境的总结：

### 链表的特性：

1. **动态大小**：链表的大小可以在运行时动态变化，不需要在创建时指定固定大小。

2. **无需连续内存**：链表的每个节点可以独立存储在内存的任何位置，它们通过指针连接起来，因此不需要像数组那样连续的内存空间。

3. **插入和删除操作高效**：在链表中插入或删除节点通常只需要改变相邻节点的指针，不需要移动其他元素，这使得这些操作的时间复杂度为O(1)，前提是你已经有了要插入或删除节点位置的引用。

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

8. **特定算法实现**：某些算法在链表上实现更为自然和高效，如LRU缓存淘汰算法。

然而，链表也有其局限性，例如不支持高效的随机访问，这使得在需要频繁访问特定位置元素的场景下，链表可能不是最佳选择。此外，链表的空间开销较大，因为它需要额外的指针存储空间。在选择数据结构时，需要根据具体的应用场景和需求来权衡利弊。


## 队列
队列是一种基本的数据结构，遵循先进先出（First In First Out, FIFO）原则。在JavaScript中，队列常用于处理需要按顺序执行的任务。

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
  网页浏览器的HTTP请求队列。
3. 消息队列  
  分布式系统中解耦服务间通信。
4. 事件循环  
  JavaScript 运行环境中的事件循环机制。
5. 广度优先搜索  
  算法中存储待访问的节点。







# JSDoc（JavaScript Documentation）

JSDoc 是一种用于 JavaScript 代码的注释规范，它使用特定的标签（如 @param、@returns 等）来描述函数、类、变量等的结构、参数、返回值和用途。这样，开发者可以使用工具自动生成文档，或者让 IDE 和代码编辑器提供更好的智能提示和类型检查。

1. @param - 描述函数参数：

```js
   /**
    * @param {string} name - 传入的名字
    * @param {number} age - 传入的年龄
    */
   function greet(name, age) {
     console.log(`Hello, ${name}. You are ${age} years old.`);
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
     this.name = name;
     this.age = age;
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
     return text.toUpperCase();
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
     if (typeof a !== 'number' || typeof b !== 'number') {
       throw new TypeError('Both arguments must be numbers');
     }
     return a + b;
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
