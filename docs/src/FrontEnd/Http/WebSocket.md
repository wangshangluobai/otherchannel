# WebSocket
  1. `WebSocket` 是一种用于H5的实时通讯协议，可以做到数据的实时推送。它出现的目的是为了处理 `HTTP` 请求的功能缺失，`HTTP` 只能由前端发起请求，后端服务器无法主动推送数据。
  2. 当然前端也可以通过 "轮询" 来替代后端服务器无法主动推送数据的影响，但是轮询会增加服务器的负载，所以 `WebSocket` 应运而生。
  3. `WebSocket` 是建立再 `TCP` 协议之上的, 默认端口是 `80` 和 `443`， 可以发送文本，二进制数据，没有同源策略限制，其标识符是 `ws` 或 `wss`。

## WebSocket 示例

```js
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
}; 
```

### API 参考

- webSocket.readyState 链接状态
  - CONNECTING：值为0，表示正在连接。
  - OPEN：值为1，表示连接成功，可以通信了。
  - CLOSING：值为2，表示连接正在关闭。
  - CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
- webSocket.onopen 实例对象的 `onopen` 属性，用于指定连接成功后的回调函数。
  
  ```js
  ws.onopen = function () {
    ws.send('Hello Server!');
  }
  ```
  如果要指定多个回调函数，可以使用addEventListener方法。

  ```js
  ws.addEventListener('open', function (event) {
    ws.send('Hello Server!');
  });
  ```
- webSocket.onclose 实例对象的onclose属性，用于指定连接关闭后的回调函数。
  
  ```js
  ws.onclose = function(event) {
    var code = event.code;
    var reason = event.reason;
    var wasClean = event.wasClean;
    // handle close event
  };

  ws.addEventListener("close", function(event) {
    var code = event.code;
    var reason = event.reason;
    var wasClean = event.wasClean;
    // handle close event
  });
  ```
  注意: 后端服务器存在关闭方法和错误处理方法，这两个容器出现冲突，导致后端服务器出现错误。

- webSocket.onmessage 实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
  
  ```js
  ws.onmessage = function(event) {
    var data = event.data;
    // 处理数据
  };

  ws.addEventListener("message", function(event) {
    var data = event.data;
    // 处理数据
  });
  ```

  注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。

  ```js
  ws.onmessage = function(event){
    if(typeof event.data === String) {
      console.log("Received data string");
    }

    if(event.data instanceof ArrayBuffer){
      var buffer = event.data;
      console.log("Received arraybuffer");
    }
  }
  ```

  除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

  ```js
  // 收到的是 blob 数据
  ws.binaryType = "blob";
  ws.onmessage = function(e) {
    console.log(e.data.size);
  };

  // 收到的是 ArrayBuffer 数据
  ws.binaryType = "arraybuffer";
  ws.onmessage = function(e) {
    console.log(e.data.byteLength);
  };
  ```

- webSocket.send() 实例对象的 `send()` 方法用于向服务器发送数据。
  
  发送文本的例子。

  ```js
  ws.send('your message')
  ```

  发送 `Blob` 对象的例子。

  ```js
  var file = document
    .querySelector('input[type="file"]')
    .files[0];
  ws.send(file);
  ```

  发送 `ArrayBuffer` 对象的例子。

  ```js
  // Sending canvas ImageData as ArrayBuffer
  var img = canvas_context.getImageData(0, 0, 400, 320);
  var binary = new Uint8Array(img.data.length);
  for (var i = 0; i < img.data.length; i++) {
    binary[i] = img.data[i];
  }
  ws.send(binary.buffer);
  ```

- webSocket.bufferedAmount 实例对象的 `bufferedAmount` 属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
  
  ```js
  var data = new ArrayBuffer(10000000);
  socket.send(data);

  if (socket.bufferedAmount === 0) {
    // 发送完毕
  } else {
    // 发送还没结束
  }
  ```
- webSocket.onerror 实例对象的 `onerror` 属性，用于指定报错时的回调函数。
  
  ```js
  socket.onerror = function(event) {
    // handle error event
  };

  socket.addEventListener("error", function(event) {
    // handle error event
  });
  ```


## 参考文章

- [mdn WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [阮一峰的网络日志](https://www.ruanyifeng.com/blog/2017/05/websocket.html)