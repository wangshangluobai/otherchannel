### 通过原型的 toString 方法判断值类型

```js
Object.prototype.toString.call(42); // "[object Number]"
Object.prototype.toString.call("Hello"); // "[object String]"
Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(function() {}); // "[object Function]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call(/regex/); // "[object RegExp]"

 * 对于null和undefined的判断结果是"[object Null]" 和 "[object Undefined]"
 * 无法判断自定义的对象类型，会返回"[object Object]"无法区分具体的自定义类型
```
