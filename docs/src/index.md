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
    const event = new CustomEvent(callback_id, { detail: "arguments" })
    document.dispatchEvent(event)
    // console.log("nativeCall")
  }
</script>
```

### Windows 下如何查看某个端口被谁占用

1. 打开命令窗口(以管理员身份运行)  
   开始—->运行—->cmd，或者是 window+R 组合键，调出命令窗口。
2. 查找所有运行的端口  
   输入命令 `netstat -ano` 该命令列出所有端口的使用情况
3. 查看被占用端口对应的 PID
   输入命令：`netstat -aon|findstr "[端口号]"` 回车执行该命令，最后一位数字就是 PID
4. 查看指定 PID 的进程  
   输入命令：`tasklist|findstr "[PID]"` 查看是哪个进程或者程序占用了 8081 端口
5. 结束进程 强制（/F 参数）杀死 pid 为 9088 的所有进程包括子进程（/T 参数）
   输入命令：`taskkill /F /T /PID [PID]`  
   或者是我们打开任务管理器，切换到进程选项卡，在 PID 一列查看 9088 对应的进程是谁
