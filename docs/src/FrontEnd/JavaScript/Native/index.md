## javascript

### JS 双击触发 2 次单击问题解决方案/js 区分单击和双击/连续点击事件

开发过程中，我们可能会遇到单击（onclick）和双击（ondblclick）需要实现不同的交互效果。  
当我们在同一个对象同时绑定了 onclick 和 ondblclick 事件，双击对象会执行 2 次单击事件和 1 次双击事件。

1. 区分单双击事件
   在单击事件设置一个定时器，执行双击时，不会马上执行定时器里的内容（比如，延时 500ms），继而先执行双击事件内容，在双击事件中清除了定时器，这样双击事件就不会触发单击事件中 setTimeout 里面的方法。从而实现了单击和双击事件的区分。
   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>区分单双击</title>
     </head>
     <body>
       <div>
         <button onclick="clickFn()" ondblclick="dblClickFn()">点击</button>
       </div>
       <script>
         let timer = null
         function clickFn() {
           clearTimeout(timer)
           timer = setTimeout(function () {
             console.log("单击")
           }, 500)
         }
         function dblClickFn() {
           clearTimeout(timer)
           console.log("双击")
         }
       </script>
     </body>
   </html>
   ```
2. 实现连续点击事件
   js 仅提供了单击（onclick）和双击（ondblclick）方法，并没有提供多次点击的方法。如果我们需要连击 n 次后再触发事件，则需要自己封装点击事件。通过记录用户的点击次数以及设置定时器去实现。
   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>连击事件</title>
     </head>
     <body>
       <div>
         <button onclick="clickRepeatedly(5)">点击</button>
       </div>
       <script>
         let count = 0,
           timer
         function clickRepeatedly(num) {
           // num为设定触发事件的连击次数
           if (count < num - 1) {
             timer && clearTimeout(timer)
             count++
             console.log("count", count)
             timer = setTimeout(function () {
               count = 0
             }, 300) // 间隔300ms以内才算连续点击
           } else {
             // 5次连击后触发
             count = 0
             clearTimeout(timer)
             console.log("连续点击了5次")
           }
         }
       </script>
     </body>
   </html>
   ```

### 报错 SyntaxError: Failed to execute ‘querySelector’ on ‘Document’: “xxx” is not a valid selector."

原因：出现了数字为首的 `id` 形式，而 `querySelector` 不识别数字开头的命名，所以报错  
解决方案：改用 `getElementById()` 即可 或者不适用数字开头命名

### base64 图片转二进制及图片上传

1. 将 base64 转换为 二进制流

- 方法一

  ```js
  /**
   * Base64字符串转二进制流
   * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
   */
  export function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {
      type: mime,
    })
  }
  // 调用示例
  let dataurl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC"
  let blob = dataURLtoBlob(dataurl)
  ```

- 方法二
  ```js
  /**
   * Base64字符串转二进制流
   * @param {String} base64 Base64字符串(字符串不包含Data URI scheme)
   * @param {String} type 文件类型(例如：image/png)
   */
  function base64toBlob(base64, type) {
    // 将base64转为Unicode规则编码
    let bstr = atob(base64),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n) // 转换编码后才可以使用charCodeAt 找到Unicode编码
    }
    return new Blob([u8arr], {
      type,
    })
  }
  // 调用示例
  let dataurl =
    "iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC"
  let blob = base64toBlob(dataurl, "image/png")
  ```

2. Base64 转 File

- 方法一
  ```js
  /**
   * Base64字符串转File文件
   * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
   * @param {String} filename 文件名称
   */
  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(",")
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {
      type: mime,
    })
  }
  // 调用示例
  let dataurl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC"
  let file = dataURLtoFile(dataurl, "文件名称")
  ```
- 方法二
  ```js
  /**
   * Base64字符串转File文件
   * @param {String} base64 Base64字符串(字符串不包含Data URI scheme)
   * @param {String} filename 文件名称
   * @param {String} type 文件类型(例如：image/png)
   */
  function base64toFile(base64, filename, type) {
    // 将base64转为Unicode规则编码
    let bstr = atob(base64)
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n) // 转换编码后才可以使用charCodeAt 找到Unicode编码
    }
    return new File([u8arr], filename, {
      type: type,
    })
  }
  // 调用示例
  let dataurl =
    "iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC"
  let file = base64toFile(dataurl, "文件名称", "image/png")
  ```

3. 图片转 Base64
   ```js
   /**
    * 图片转换为base64
    * @param {Object} img 图片对象
    */
   function getBase64Image(img) {
     var canvas = document.createElement("canvas")
     canvas.width = img.width
     canvas.height = img.height
     var ctx = canvas.getContext("2d")
     ctx.drawImage(img, 0, 0, img.width, img.height)
     var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase()
     var dataURL = canvas.toDataURL("image/" + ext)
     return dataURL
   }
   // 调用示例
   let img = new Image()
   img.setAttribute("crossOrigin", "anonymous")
   // 图片地址
   img.src =
     "https://img2.baidu.com/it/u=1987571340,2982374133&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=500"
   img.onload = () => {
     // 获得Base64
     let base64Str = getBase64Image(img)
     console.log(base64Str)
   }
   ```
4. 二进制流转 Base64

- 方法一
  ```js
  /**
   * 二进制流转Base64(字符串包含Data URI scheme)
   * @param {Object} data 二进制流
   * @param {String} type 文件类型(例如：image/png)
   */
  function getDataURL(data, type) {
    return new Promise((resolve, reject) => {
      const blob = new Blob([data], {
        type,
      })
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  // 调用示例
  /**
   * Base64转二进制流
   * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
   */
  function getBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return {
      data: u8arr,
      type: mime,
    }
  }
  // 获得二进制流（就不调接口了，先用Base64转成二进制流进行测试）
  let dataurl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC"
  let blob = getBlob(dataurl)
  // 二进制流转Base64
  getDataURL(blob.data, blob.type).then((base64) => {
    console.log(base64)
  })
  ```
- 方法二
  ```js
  /**
   * 二进制流转Base64(字符串不包含Data URI scheme)
   * @param {Object} data 二进制流
   */
  function getBase64(data) {
    let base64 = btoa(
      new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), "")
    )
    return base64
  }
  // 调用示例
  // 获得二进制流（就不调接口了，先用Base64转成二进制流进行测试）
  let dataurl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC"
  let blob = getBlob(dataurl)
  // 二进制流转Base64
  let base64 = getBase64(blob.data)
  console.log(base64)
  ```

5. 补充相关内容

   - atob() 对经过 base-64 编码的字符串进行解码。你可以使用 window.btoa() 方法来编码一个可能在传输过程中出现问题的数据，并且在接受数据之后，使用 atob() 方法再将数据解码。例如：你可以编码、传输和解码操作各种字符，比如 0-31 的 ASCII 码值。
     ```js
     // 示例
     let encodedData = window.btoa("Hello, world") // 编码
     ```
   - btoa() 方法可以将一个二进制字符串（例如，将字符串中的每一个字节都视为一个二进制数据字节）编码为 Base64 编码的 ASCII 字符串。  
      你可以使用这个方法来对可能遇到通信问题的数据进行编码，然后使用 atob() 方法来对数据进行解码。例如，你可以对 ASCII 中的控制字符（值为 0 到 31 的字符）进行编码。
     ```js
     // 示例
     const encodedData = btoa("Hello, world") // 编码字符串
     const decodedData = atob(encodedData) // 解码字符串
     ```
   - charCodeAt() 方法可返回指定位置的字符的 Unicode 编码，返回值是 0 - 65535 之间的整数，表示给定索引处的 UTF-16 代码单元。  
      字符串中第一个字符的位置为 0， 第二个字符位置为 1，以此类推。
     ```js
     // 示例
     var str = "Hello, world"
     var code = str.charCodeAt(0)
     ```
   - fromCharCode() 可接受一个指定的 Unicode 值，然后返回一个字符串。  
      注意：该方法是 String 的静态方法，字符串中的每个字符都由单独的 Unicode 数字编码指定。使用语法： String.fromCharCode()。
     ```js
     // 示例
     var str = "Hello, world"
     var code = str.charCodeAt(0)
     var result = String.fromCharCode(code)
     ```

参考：

- [Base64 转二进制文件流以及转 File、图片转 Base64、二进制流转 Base64](https://blog.csdn.net/qq_39998026/article/details/129836241)

### ios/android webview 与 H5 通讯方案

1. 判断当前 H5 所处环境

   ```js
   var browser = {
     versions: (function () {
       var u = navigator.userAgent
       var app = navigator.appVersion
       return {
         trident: u.indexOf("Trident") > -1, //IE内核
         presto: u.indexOf("Presto") > -1, //opera内核
         webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
         gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
         mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
         ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
         android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, //android终端
         iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
         iPad: u.indexOf("iPad") > -1, //是否iPad
         webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
         weixin: u.indexOf("MicroMessenger") > -1, //是否微信 （2015-01-22新增）
         qq: u.match(/\sQQ/i) == " qq", //是否QQ
       }
     })(),
     language: (navigator.browserLanguage || navigator.language).toLowerCase(),
   }
   var IOS = browser.versions.ios
   var ANDROID = browser.versions.android
   export { IOS, ANDROID }
   ```

2. 通信方法 常规 jsBridge 和异步同步化模式

   ```html
   <script>
     // 原生映射方法
     let nativeCallbacks = new Map()

     function encap(callback_id) {
       return new Promise((res, rej) => {
         document.addEventListener(
           callback_id,
           (event) => {
             //
             console.log("nativeCall 执行了", event, event.detail)
             res(event)
           },
           false
         )
       })
     }
     function myFun() {
       console.log("myFun Run---")
     }
     window.onload = async function () {
       // 生成callback_id
       let callback_id1 = Math.floor(10000 + Math.random() * 90000).toString()

       // 将处理函数与callback_id关联
       nativeCallbacks.set(callback_id1, myFun)

       // 调用原生预留接口
       let paramsH5 = {
         code: "001", // 原生端指令码，根据此码执行对应的方法
         data: "{}", // 请求参数 JSON 格式
         callback_id: callback_id1, // 回调函数标识，用于标识 H5 端回调函数
       }
       // window.sendToNative({code, data, msg, callback_id})
       console.log("H5调用原生方法---")

       setTimeout(function () {
         // 通过异步模拟服务端调用本地预留方法,此定时器及内部代码不存在H5环境
         console.log("模拟原生端调用H5---")
         let paramsNative = {
           code: "200", // 此次交互状态码
           data: "{}", // 此次交互主体信息 JSON 格式
           msg: "success", // 此次交互信息
           callback_id: callback_id1, // 回调函数标识，用于标识 H5 端回调函数
         }
         sendToNative(paramsNative)
       }, 3000)

       // -----------异步处理------------
       /* 
           即：将后续代码放置myFun函数中处理，调用原生端后即本上下文结束，执行结果如下：
             H5调用原生方法---
             调用原生端后续代码执行---
             模拟原生端调用H5---
             myFun Run---
         */

       // -----------同步处理------------
       /* 
           即：将后续代码放置myFun函数中处理，调用原生端后即本上下文结束，执行结果如下：
             H5调用原生方法---
             模拟原生端调用H5---
             myFun Run---
             nativeCall 执行了 EventObject OtherMessage
             info EventObject
             调用原生端后续代码执行---
         */
       // let info = await encap(callback_id1)
       // console.log("info", info)

       // 模拟请求原生端后 后续代码执行
       console.log("调用原生端后续代码执行---")
     }
     function sendToNative(params) {
       const { code, data, msg, callback_id } = params || {}

       if (nativeCallbacks.has(callback_id)) {
         // 统一前置处理...
         nativeCallbacks.get(callback_id)(data)
         // 统一后置处理...
       } else {
         // 异常记录...
       }
       // 同步事件注册及触发...
       // 参数可以通过原型链访问到...
       const event = new CustomEvent(callback_id, {
         detail: "arguments",
         params,
       })
       document.dispatchEvent(event)
       // console.log("nativeCall")
     }
   </script>
   ```

### 原生 js 实现复制文本

一、如果需要复制的文本在 input 或者 textarea 中

1. 获取到 dom 后，使用 .select() 来选中。
2. 使用 document.execCommand("copy"); 来复制。

二、如果需要复制的文本不在 input 或者 textarea 中

1. 先获取到需要复制的文本.
2. 把文本赋值给 input 或者 textarea。
3. input 或者 textarea 的样式可以设置为 opacity:0; 这样就透明了。
4. 然后再进行上面「 一 」中的 1 和 2 步骤。

```html
<div id="copyText" style="padding: 20px 40px 0 40px;">账号：123456，密码：123457</div>
<input id="copyInput" style="opacity:0;"></input>
```

```js
var text = document.getElementById("copyText").innerText
var input = document.getElementById("copyInput")
document.getElementById("copyInput").value = text // 修改文本框的内容
input.select() // 选中文本
document.execCommand("copy") // 执行浏览器复制命令
```

## CSS 样式

### (css)原生 html 实现遮罩层弹窗

```css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 设置背景颜色为半透明黑色 */
  z-index: 9999; /* 设置 z-index 值确保遮罩层位于其他元素之上 */
  display: flex;
  justify-content: center;
}

.content {
  position: relative;
  z-index: 10000; /* 设置 z-index 值确保内容层位于遮罩层之上 */
  background-color: #01bdb2;
  width: 50%;
  height: 30%;
  margin-top: 10%;
}
```
