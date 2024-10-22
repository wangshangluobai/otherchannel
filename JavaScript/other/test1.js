// import crypto from "crypto"

// function encrypt(key, iv, data) {
//   let decipher = crypto.createCipheriv("aes-128-cbc", key, iv)
//   // decipher.setAutoPadding(true);
//   return decipher.update(data, "binary", "base64") + decipher.final("base64")
// }

// function decrypt(key, iv, crypted) {
//   crypted = new Buffer(crypted, "base64").toString("binary")
//   let decipher = crypto.createDecipheriv("aes-128-cbc", key, iv)
//   return decipher.update(crypted, "binary", "utf8") + decipher.final("utf8")
// }

// let key = "hu1FuSzPXCHz2Y+AHtKnUA=="
// console.log("加密的key:", key)
// let iv = "abcdefg123456789"
// console.log("加密的iv:", iv)
// let data = "This is an example"
// console.log("需要加密的数据:", data)
// let crypted = encrypt(key, iv, data)
// console.log("数据加密后:", crypted)
// let dec = decrypt(key, iv, crypted)
// console.log("数据解密后:", dec)

// 定义一个名为 callNative 的方法，用于在 JavaScript 中调用原生方法
function callNative(classMap, method, params) {
  return new Promise((resolve, reject) => {
    // 生成一个唯一的回调 ID
    const id = v4()
    // 将当前的回调函数保存到 __callbacks 对象中，以 callbackId 作为键
    this.__callbacks[id] = {
      resolve,
      reject,
      method: `${classMap} - ${method}`,
    }
    // 构造通信数据，包括原生类映射、要调用的方法、参数和 callbackId
    const data = {
      classMap,
      method,
      params: params === null ? "" : JSON.stringify(params),
      callbackId: id,
    }
    const dataStr = JSON.stringify(data)
    // 根据当前环境判断是 iOS 还是 Android，并调用相应平台的原生方法
    if (
      this.env.isIOS &&
      typeof window?.webkit?.messageHandlers?.callNative?.postMessage ===
        "function"
    ) {
      // 如果是 iOS 平台，则调用 iOS 的原生方法
      window.webkit.messageHandlers.callNative.postMessage(dataStr)
    } else if (
      this.env.isAndroid &&
      typeof window?.AppFunctions?.callNative === "function"
    ) {
      // 如果是 Android 平台，则调用 Android 的原生方法
      window.AppFunctions.callNative(dataStr)
    }
  })
}

// 回调处理

// 初始化桥接回调函数，该参数在 constructor 中调用
private initBridgeCallback() {
  // 保存旧的回调函数到 oldCallback 变量中
  const oldCallback = window.callBack;
  // 重新定义 window.callBack 方法，用于处理原生应用的回调数据
  window.callBack = (data) => {
      // 如果存在旧的回调函数，则调用旧的回调函数
      if (isFunction(oldCallback)) {
          oldCallback(data);
      }
      // 获取原生应用的回调信息，包括数据和回调 ID
      console.info('native callback', data, data.callbackId);
      // 从回调数据中获取回调 ID
      const { callbackId } = data;
      // 根据回调 ID 查找对应的回调函数
      const callback = this.__callbacks[callbackId];
      // 如果找到了对应的回调函数
      if (callback) {
          // 如果回调数据中的 code 为 0，则表示执行成功，调用 resolve 方法处理成功的结果
          if (data.code === 0) {
              callback.resolve(data.data);
          } else {
              // 否则，表示执行失败，构造一个错误对象并调用 reject 方法处理错误信息
              const error = new Error(data.msg) as Error & {response:unknown};
              error.response = data;
              callback.reject(error);
          }
          // 删除已经处理过的回调函数
          delete this.__callbacks[callbackId];
      }
  };
}

