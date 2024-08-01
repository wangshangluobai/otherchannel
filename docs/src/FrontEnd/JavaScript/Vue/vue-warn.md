

# vue解决报错Unable to preventDefault inside passive event listener invocation.

**报错触发原因** `Unable to preventDefault inside passive event listener invocation` 是浏览器开发中的一个警告信息。这个警告通常出现在使用 `passive` 事件监听器时，当在事件处理函数中调用 `preventDefault()` 方法时会引发该警告。

在传统的事件监听模型中，当事件被触发时，浏览器会等待事件处理函数执行完毕后再继续执行默认的操作。而 `passive` 事件监听器是一种新的事件处理机制，它允许开发者在事件处理函数执行之前告诉浏览器不要等待事件处理函数执行完毕就可以继续执行默认的操作，这样可以提高页面的响应性能。

然而，在 `passive` 事件监听器中调用 `preventDefault()` 方法是无效的，并且会引发上述警告。这是因为在 `passive` 事件监听器中，浏览器假设你不会调用 `preventDefault()` 方法，所以不会等待它的执行结果。如果确实需要阻止默认行为，可以改用非 `passive` 事件监听器或者在其他地方处理。

**报错处理方法**
如果你不想看到这个警告，可以考虑以下几种解决方法：

1. 使用非 `passive` 事件监听器：
将 `passive` 属性设置为 `false` ，使事件处理函数能够正确地调用 `preventDefault()` 方法。

2. 在事件处理函数外部使用 `preventDefault()` 方法：
将 `preventDefault()` 方法的调用放在 `passive` 事件监听器之外的地方，例如在事件处理函数的父级元素上进行事件委托。

3. 避免在 `passive` 事件监听器中调用 `preventDefault()` 方法：
如果你的业务逻辑不依赖于阻止默认行为，可以考虑不调用 `preventDefault()` 方法，或者通过其他方式处理。

需要注意的是，这个警告只是一个提醒，不会影响代码的正常执行。然而，在某些情况下，忽视这个警告可能会导致意外的行为或性能问题，所以建议开发者根据具体情况选择合适的解决方案。

**报错解决方法**
1. 添加 `{ passive: false }` 选项

    在注册事件监听器时，将选项对象作为第三个参数传递给addEventListener方法，指定passive属性为false。
    ```js
    element.addEventListener('touchstart', onTouchStart, { passive: false })
    ```
    这样做会将事件监听器设置为非passive，允许在事件处理函数中调用preventDefault()方法。
2. 使用 `Vue` 的修饰符

    `Vue` 提供了一些事件修饰符，可以通过在事件绑定中使用 `.passive` 修饰符来指定事件监听器的 `passive` 属性为 `false`
    ```vue
    <!-- template -->
    <div @touchstart.passive="onTouchStart"></div>
    ```
    该修饰符等同于上述的 `{ passive: false }` 选项。
3. 使用事件委托

    如果无法直接在Vue组件中解决该警告，可以尝试在父级元素上使用事件委托，并在事件处理函数中调用preventDefault()方法。
    ```js
    <!-- template -->
    <div @touchstart="onParentTouchStart">
      <div></div>
    </div>

    // script
    methods: {
      onParentTouchStart(event) {
        event.preventDefault();
        // 处理事件逻辑
      }
    }
    ```

需要注意的是，具体采用哪种方法解决要根据你的业务需求和代码结构来决定。如果你确定需要阻止默认行为，建议采用第一种或第二种方法来显式地设置事件监听器的passive属性为false。

## 参考链接

[vue解决报错Unable to preventDefault inside passive event listener invocation.](http://t.csdnimg.cn/X1jmO)
