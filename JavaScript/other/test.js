// let resolveCallback = new Map() // 用于存储Promise的resolve函数

// // 函数A：向服务端传递信息并返回一个Promise
// function callFunctionA() {
//   return new Promise((resolve, reject) => {
//     // resolveCallback = resolve // 存储resolve，用于稍后在函数B中调用
//     resolveCallback.set("test", resolve)

//     // 模拟调用服务端请求的逻辑
//     console.log("向服务端传递信息...")

//     // 假设服务端完成处理后会异步调用本地函数B
//     setTimeout(() => {
//       console.log("服务端开始处理...")
//       // 模拟服务端异步调用本地函数B
//       callFunctionB("服务端处理完成")
//     }, 2000) // 假设服务端处理需要2秒
//   })
// }

// // 函数B：接收服务端处理的结果，并通知Promise
// function callFunctionB(response) {
//   console.log("收到服务端的通知：", response)
//   // resolveCallback(response) // 通知Promise完成，解除阻塞
//   resolveCallback.get("test")(response)
// }

// // 使用async/await等待函数A的完成
// async function main() {
//   const result = await callFunctionA() // 等待函数A的Promise完成
//   console.log("服务端处理完成，继续后续逻辑：", result)
// }

// // 调用主函数
// main()

// 封装resolve回调的管理逻辑
// function createResolveManager() {
//   const resolveMap = new Map()

//   return {
//     store: (key, resolve) => resolveMap.set(key, resolve),
//     retrieveAndClear: (key) => {
//       const resolve = resolveMap.get(key)
//       resolveMap.delete(key)
//       return resolve
//     },
//   }
// }

// // 创建一个resolve管理器实例
// const resolveManager = createResolveManager()

// // 函数A：向服务端传递信息并返回一个Promise
// function callFunctionA(message) {
//   return new Promise((resolve, reject) => {
//     const uniqueKey = `request-${Date.now()}-${Math.random()}`
//     resolveManager.store(uniqueKey, resolve)

//     console.log("向服务端传递信息...")

//     setTimeout(() => {
//       console.log("服务端开始处理...")
//       callFunctionB(uniqueKey, "服务端处理完成")
//     }, 2000) // 假设服务端处理需要2秒
//   })
// }

// // 函数B：接收服务端处理的结果，并通知Promise
// function callFunctionB(key, response) {
//   try {
//     const resolve = resolveManager.retrieveAndClear(key)
//     if (resolve) {
//       console.log("收到服务端的通知：", response)
//       resolve(response)
//     } else {
//       console.error("无法找到对应的resolve回调")
//     }
//   } catch (error) {
//     console.error("处理响应时出错:", error)
//   }
// }

// // 使用async/await等待函数A的完成
// async function main() {
//   try {
//     const result = await callFunctionA()
//     console.log("服务端处理完成，继续后续逻辑：", result)
//   } catch (error) {
//     console.error("处理过程中出现错误:", error)
//   }
// }

// // 调用主函数
// main()

// 秘钥：hu1FuSzPXCHz2Y+AHtKnUA==
// 明文：hello gcm
// 密文：+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w==
// 向量长度12
// 偏移量16， auth tag长度 128
// import crypto from "crypto"

// const keyStr = "hu1FuSzPXCHz2Y+AHtKnUA=="

// export function encrypt(word) {
//   const iv = crypto.randomBytes(12)
//   const cipher = crypto.createCipheriv("aes-128-gcm", keyStr, iv)
//   const encrypted = cipher.update(word, "utf8")
//   const end = cipher.final()
//   const tag = cipher.getAuthTag()
//   const res = Buffer.concat([iv, encrypted, end, tag])
//   return res.toString("base64")
// }

// export function decrypt(data) {
//   var bData = Buffer.from(data, "base64")
//   const iv = bData.slice(0, 12)
//   const tag = bData.slice(-16)
//   console.log(
//     "%c [ tag ]-121",
//     "font-size:13px; background:#b35460; color:#f798a4;",
//     tag
//   )
//   const cdata = bData.slice(12, bData.length - 16)
//   const decipher = crypto.createDecipheriv("aes-128-gcm", keyStr, iv)
//   decipher.setAuthTag(tag)
//   var msg = decipher.update(cdata)
//   const fin = decipher.final()
//   const decryptedStr = new TextDecoder("utf8").decode(Buffer.concat([msg, fin]))
//   return decryptedStr
// }

// const encryptpw = encrypt("hello gcm")
// console.log(
//   "加密",
//   encryptpw,
//   "密文: +gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="
// )
// const decryptpw = decrypt(
//   "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="
// )
// console.log("解密", decryptpw, "明文: hello gcm")

// import crypto from "crypto"

// // 给定的密钥
// const keyStr = "hu1FuSzPXCHz2Y+AHtKnUA=="
// const key = Buffer.from(keyStr, "base64") // 解码密钥

// // 给定的密文
// const data = "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="
// const bData = Buffer.from(data, "base64")

// // 解析密文
// const iv = bData.slice(0, 12)
// const tag = bData.slice(bData.length - 16)
// const cdata = bData.slice(12, bData.length - 16)

// // 解密函数
// export function decrypt(data) {
//   const bData = Buffer.from(data, "base64")
//   const iv = bData.slice(0, 12)
//   const tag = bData.slice(bData.length - 16)
//   const cdata = bData.slice(12, bData.length - 16)
//   const decipher = crypto.createDecipheriv("aes-128-gcm", key, iv)
//   decipher.setAuthTag(tag)
//   const msg = decipher.update(cdata)
//   const fin = decipher.final()
//   const decryptedStr = new TextDecoder("utf8").decode(Buffer.concat([msg, fin]))
//   return decryptedStr
// }

// 测试解密
// const decryptpw = decrypt(data)
// console.log("解密", decryptpw, "明文: hello gcm")

// import crypto from "crypto"
// // const crypto = require('crypto');

// function encrypt(text, key) {
//   const iv = crypto.randomBytes(12) // 随机初始化向量
//   const cipher = crypto.createCipheriv("aes-128-gcm", Buffer.from(key), iv)
//   let encrypted = cipher.update(text, "utf8", "base64")
//   encrypted += cipher.final("base64")
//   const tag = cipher.getAuthTag()
//   return `${iv.toString("base64")}${encrypted}${tag.toString("base64")}`
// }
// function decrypt(encryptedText, key) {
//   try {
//     const hexText = encryptedText.toString("base64")
//     const iv = Buffer.from(hexText.substring(0, 24), "base64") // 取前12个字节
//     const tag = Buffer.from(
//       hexText.substring(hexText.length - 32, hexText.length),
//       "base64"
//     ) // 取最后16个字节
//     const encryptedTextWithoutIvAndTag = hexText.substring(
//       24,
//       hexText.length - 32
//     )

//     const decipher = crypto.createDecipheriv(
//       "aes-128-gcm",
//       Buffer.from(key),
//       iv
//     )
//     decipher.setAuthTag(tag)
//     let decrypted = decipher.update(
//       encryptedTextWithoutIvAndTag,
//       "base64",
//       "utf8"
//     )
//     decrypted += decipher.final("utf8")
//     return decrypted
//   } catch (err) {
//     console.error("Decryption error:", err)
//     return null
//   }
// }

// const key = "hu1FuSzPXCHz2Y+AHtKnUA=="
// const encryptedText = "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="

// // 解密
// const decryptedText = decrypt(encryptedText, key)
// console.log(
//   "%c [ decryptedText ]-222",
//   "font-size:13px; background:#f6be24; color:#ffff68;",
//   decryptedText
// )
// let testStr = encrypt("hello gcm", key)

// console.log("Decrypted text:", testStr)

// import crypto from "crypto"

// // Base64 解码的密钥
// const keyStr = Buffer.from("hu1FuSzPXCHz2Y+AHtKnUA==", "base64")
// // const key = keyStr.slice(0, 16) // AES-128 需要 16 字节的密钥
// // const key = keyStr
// const key = "hu1FuSzPXCHz2Y+AHtKnUA=="

// // 加密函数
// export function encrypt(plainText) {
//   const iv = crypto.randomBytes(12) // GCM 模式使用 12 字节的随机 IV
//   const cipher = crypto.createCipheriv("aes-128-gcm", key, iv)

//   const encrypted = Buffer.concat([
//     cipher.update(plainText, "utf8"),
//     cipher.final(),
//   ])
//   const authTag = cipher.getAuthTag()

//   // 返回 IV + 加密内容 + authTag 的 Base64 编码
//   return Buffer.concat([iv, encrypted, authTag]).toString("base64")
// }

// // 解密函数
// export function decrypt(encryptedBase64) {
//   const bData = Buffer.from(encryptedBase64, "base64")

//   const iv = bData.slice(0, 12) // 取出 IV
//   const authTag = bData.slice(-16) // 取出 authTag
//   const encryptedText = bData.slice(12, bData.length - 16) // 取出加密内容

//   const decipher = crypto.createDecipheriv("aes-128-gcm", key, iv)
//   decipher.setAuthTag(authTag)

//   const decrypted = Buffer.concat([
//     decipher.update(encryptedText),
//     decipher.final(),
//   ])

//   return decrypted.toString("utf8")
// }

// // 测试示例
// const plainText = "hello gcm"
// const encryptedText = encrypt(plainText)
// console.log("加密结果:", encryptedText)

// const decryptedText = decrypt(
//   encryptedText /* "hyUlKECWzWed7eEjaSlhmru4v4ieoWNFoP3D4+PfQCnufhsBOA==" */
// )
// console.log("解密结果:", decryptedText)

// import forge from "node-forge"

// let keyStr = "hu1FuSzPXCHz2Y+AHtKnUA=="
// // 加密
// function encrypt(someBytes) {
//   var iv = forge.random.getBytesSync(12) // 生成随机iv 12字节
//   var cipher = forge.cipher.createCipher("AES-GCM", keyStr) // 生成AES-GCM模式的cipher对象 并传入密钥
//   cipher.start({
//     iv: iv,
//   })
//   cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(someBytes)))
//   cipher.finish()
//   var encrypted = cipher.output
//   var tag = cipher.mode.tag
//   return btoa(iv + encrypted.data + tag.data)
// }

// function decrypt(someBytes) {
//   someBytes = atob(someBytes)
//   const iv = someBytes.slice(0, 12)
//   const tag = someBytes.slice(-16)
//   const data = someBytes.slice(12, someBytes.length - 16)
//   var decipher = forge.cipher.createDecipher("AES-GCM", keyStr)
//   decipher.start({
//     iv: iv,
//     tag: tag,
//   })
//   decipher.update(forge.util.createBuffer(data))
//   const pass = decipher.finish()
//   if (pass) {
//     return decipher.output.toString()
//   }
// }

// // var str = "我是密码123.！"
// // var en = encrypt(str)
// // console.log(en)
// let de = decrypt(
//   /* en */ "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="
// )
// console.log("解密", de)

// import { Buffer } from "buffer"
// import crypto from "crypto"

// /**
//  * aes-128-gcm 加密
//  * @param {String} msg 加密字符串
//  * @param {String} key 密钥
//  * @returns 加密后的字符串，16进制
//  */
// function Encrypt(msg, key) {
//   try {
//     var pwd = Buffer.from(key, "base64")
//     var iv = crypto.randomBytes(12)
//     var cipher = crypto.createCipheriv("aes-128-gcm", pwd, iv)

//     var enc = cipher.update(msg, "utf8", "base64")
//     enc += cipher.final("base64")
//     //cipher.getAuthTag() 方法返回一个 Buffer，它包含已从给定数据计算后的认证标签。
//     //cipher.getAuthTag() 方法只能在使用 cipher.final() 之后调用 这里返回的是一个十六进制后的数组
//     var tags = cipher.getAuthTag()
//     enc = Buffer.from(enc, "base64")
//     // 由于和java对应的AES/GCM/PKCS5Padding模式对应 所以采用这个拼接
//     var totalLength = iv.length + enc.length + tags.length
//     var bufferMsg = Buffer.concat([iv, enc, tags], totalLength)
//     return bufferMsg.toString("base64")
//   } catch (e) {
//     console.log("Encrypt is error", e)
//     return null
//   }
// }

// /**
//  * aes-128-gcm 解密
//  * @param {String} serect 密文 16进制
//  * @param {String} key 密钥 16进制
//  * @returns
//  */
// function Decrypt(serect, key) {
//   try {
//     var tmpSerect = Buffer.from(serect, "base64")
//     var pwd = Buffer.from(key, "base64")
//     // 读取数组
//     var iv = tmpSerect.slice(0, 12)
//     var cipher = crypto.createDecipheriv("aes-128-gcm", pwd, iv)
//     // 这边的数据为 去除头的iv12位和尾部的tags的16位
//     var msg = cipher.update(tmpSerect.slice(12, tmpSerect.length - 16))
//     return msg.toString("utf8")
//   } catch (e) {
//     console.log("Decrypt is error", e)
//     return null
//   }
// }

// let deCode = Decrypt(
//   "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w==",
//   "hu1FuSzPXCHz2Y+AHtKnUA=="
// )
// console.log(
//   "%c [ deCode ]-374",
//   "font-size:13px; background:#034930; color:#478d74;",
//   deCode
// )

// let enCode = Encrypt("hello gcm", "hu1FuSzPXCHz2Y+AHtKnUA==")
// console.log(
//   "%c [ enCode ]-379",
//   "font-size:13px; background:#f2a97e; color:#ffedc2;",
//   enCode
// )
// let deCode = Decrypt(enCode, "hu1FuSzPXCHz2Y+AHtKnUA==")
// console.log(
//   "%c [ deCode ]-381",
//   "font-size:13px; background:#c554a0; color:#ff98e4;",
//   deCode
// )

// import {  } from "module";
// /**
//  * 加密（需要先加载lib/aes/aes.min.js文件）
//  * @param word
//  * @returns {*}
//  */
// function encrypt(word){
//   var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
//   var srcs = CryptoJS.enc.Utf8.parse(word);
//   var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//   return encrypted.toString();
// }

// /**
// * 解密
// * @param word
// * @returns {*}
// */
// function decrypt(word){
//   var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12");
//   var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }
// -----------------------------------------------------------------------------
// 将 Base64 编码的密钥和密文转换为字节数组
// function base64ToArrayBuffer(base64) {
//   const binaryString = window.atob(base64)
//   const len = binaryString.length
//   const bytes = new Uint8Array(len)
//   for (let i = 0; i < len; i++) {
//     bytes[i] = binaryString.charCodeAt(i)
//   }
//   return bytes.buffer
// }

// // 将字节数组转换为 Base64 字符串
// function arrayBufferToBase64(buffer) {
//   let binary = ""
//   const bytes = new Uint8Array(buffer)
//   for (let i = 0; i < bytes.byteLength; i++) {
//     binary += String.fromCharCode(bytes[i])
//   }
//   return window.btoa(binary)
// }

// // 密钥和密文
// const keyBase64 = "hu1FuSzPXCHz2Y+AHtKnUA==" // 秘钥 Base64
// const ciphertextBase64 = "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w==" // 密文 Base64
// const iv = new Uint8Array([
//   0xba, 0x0b, 0x58, 0xb3, 0xa7, 0x55, 0x7b, 0x2d, 0x8a, 0x94, 0xb5, 0x6f,
// ]) // IV (12 字节)

// // 解密函数
// async function decrypt(ciphertextBase64, keyBase64, iv) {
//   // 将 Base64 格式的密钥和密文解码为字节数组
//   const keyRaw = base64ToArrayBuffer(keyBase64)
//   const ciphertext = base64ToArrayBuffer(ciphertextBase64)

//   // 将密钥导入为 AES-GCM 格式的 CryptoKey
//   const key = await window.crypto.subtle.importKey(
//     "raw",
//     keyRaw,
//     { name: "AES-GCM" },
//     false,
//     ["decrypt"]
//   )

//   // 分离密文和认证标签
//   const authTagLength = 128 / 8 // 认证标签长度为 16 字节
//   const data = ciphertext.slice(0, -authTagLength) // 获取密文部分
//   const authTag = ciphertext.slice(-authTagLength) // 获取认证标签部分

//   // 拼接密文和认证标签，用于解密
//   const dataWithTag = new Uint8Array([
//     ...new Uint8Array(data),
//     ...new Uint8Array(authTag),
//   ])

//   // 解密
//   try {
//     const decrypted = await window.crypto.subtle.decrypt(
//       {
//         name: "AES-GCM",
//         iv: iv,
//         tagLength: 128,
//       },
//       key,
//       dataWithTag
//     )

//     // 返回解密后的明文
//     return new TextDecoder().decode(decrypted)
//   } catch (err) {
//     console.error("解密失败：", err)
//   }
// }

// // 调用解密函数
// decrypt(ciphertextBase64, keyBase64, iv)
//   .then((plaintext) => {
//     console.log("解密后的明文：", plaintext) // 预期应输出：hello gcm
//   })
//   .catch((err) => {
//     console.error("解密失败：", err)
//   })

// SubtleCrypto.encrypt

// --------------------------------
// caotamade 手写实现吧

// 秘钥：hu1FuSzPXCHz2Y+AHtKnUA==
// 明文：hello gcm
// 密文：+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w==
// 向量长度12
// 偏移量16， auth tag长度 128

// import crypto from "crypto"

// const key = "hu1FuSzPXCHz2Y+AHtKnUA=="
// const iv = crypto.randomBytes(12)
// function encrypt(data, key) {
//   // const iv = crypto.randomBytes(12)
//   // const cipher = crypto.createCipheriv("aes-128-gcm", key, iv)
//   // const enc = cipher.update(data, "utf8", "hex")
//   // const tags = cipher.final("hex")
//   // const totalLength = Buffer.byteLength(iv) + Buffer.byteLength(enc) + Buffer.byteLength(tags)
//   const cipher = crypto.createCipheriv("aes-128-gcm", key, iv)
//   const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()])
//   const tag = cipher.getAuthTag()
//   return Buffer.concat([iv, encrypted, tag]).toString("base64")
// }

// let enString = encrypt("hello gcm", key)
// console.log(
//   "%c [ enString ]-539",
//   "font-size:13px; background:#5a063f; color:#9e4a83;",
//   enString
// )

// ---------------------------------------------------------------

// 秘钥：hu1FuSzPXCHz2Y+AHtKnUA==
// 明文：hello gcm
// 密文：+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w==
// 向量长度12
// 偏移量16， auth tag长度 128
// import crypto from "crypto"

// const keyStr = "hu1FuSzPXCHz2Y+AHtKnUA=="

// export function encrypt(word) {
//   const iv = crypto.randomBytes(12)
//   const cipher = crypto.createCipheriv("aes-128-gcm", keyStr, iv)
//   const encrypted = cipher.update(word, "utf8")
//   const end = cipher.final()
//   const tag = cipher.getAuthTag()
//   const res = Buffer.concat([iv, encrypted, end, tag])
//   return res.toString("base64")
// }

// export function decrypt(data) {
//   var bData = Buffer.from(data, "base64")
//   const iv = bData.slice(0, 12)
//   const tag = bData.slice(-16)
//   console.log(
//     "%c [ tag ]-121",
//     "font-size:13px; background:#b35460; color:#f798a4;",
//     tag
//   )
//   const cdata = bData.slice(12, bData.length - 16)
//   const decipher = crypto.createDecipheriv("aes-128-gcm", keyStr, iv)
//   decipher.setAuthTag(tag)
//   var msg = decipher.update(cdata)
//   const fin = decipher.final()
//   const decryptedStr = new TextDecoder("utf8").decode(Buffer.concat([msg, fin]))
//   return decryptedStr
// }

// const encryptpw = encrypt("hello gcm")
// console.log(
//   "加密",
//   encryptpw,
//   "密文: +gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="
// )
// const decryptpw = decrypt(
//   "+gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w=="
// )
// console.log("解密", decryptpw, "明文: hello gcm")

// -----------------------成功成功-------------------------------

import crypto from "crypto"

// Base64 解码的密钥
// const keyStr = Buffer.from("hu1FuSzPXCHz2Y+AHtKnUA==", "base64")
// const key = keyStr.slice(0, 16) // AES-128 需要 16 字节的密钥
// const key = keyStr
// const key = "hu1FuSzPXCHz2Y+AHtKnUA==".slice(0, 16)

// JAVA
// const key = "12ff53e3eaf78777773adead20c42d34".slice(0, 16)
// PHP
const key = "cbb3586665ebdbc6ebadd796e3ba5bcf" /* .slice(0, 16) */
// const key = "88f2cfef3db34fb5a58dc283f48956d5"

// 加密串
const str =
  "0DgjLiz379nLWST4nlx2Zs7Cvbsg3Bd2VcQzxJ7nnjILv1V8SWpA7DEPbd0UIuCAGlSxz9Cs7bEkzz7KRLqiLME1PRC3gQSxva1f/1BXPC6VC7/wJ5HB7B1Z5rk7vk60hid_HrDJj_dciSCg7TxByLHaEpC_7XOS4rW5kDRt"
/* 0DgjLiz379nLWST4nlx2Zs7Cvbsg3Bd2VcQzxJ7nnjILv1V8SWpA7DEPbd0UIuCAGlSxz9Cs7bEkzz7KRLqiLME1PRC3gQSxva1f/1BXPC6VC7/wJ5HB7B1Z5rk7vk60hid+HrDJj+dciSCg7TxByLHaEpC+7XOS4rW5kDRt */

// 加密函数
function encrypt(plainText) {
  const iv = crypto.randomBytes(12) // GCM 模式使用 12 字节的随机 IV
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)

  const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()

  // 返回 IV + 加密内容 + authTag 的 Base64 编码
  return Buffer.concat([iv, encrypted, authTag]).toString("base64")
}

// 解密函数
function decrypt(encryptedBase64) {
  const bData = Buffer.from(encryptedBase64, "base64")

  const iv = bData.slice(0, 12) // 取出 IV
  const authTag = bData.slice(-16) // 取出 authTag
  const encryptedText = bData.slice(12, bData.length - 16) // 取出加密内容

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(authTag)
  console.log(
    "%c [ decipher ]-632",
    "font-size:13px; background:#13e751; color:#57ff95;",
    authTag.length
  )

  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()])

  return decrypted.toString("utf8")
}

// 测试示例
// const plainText = "hello gcm"
// const encryptedText = encrypt(plainText)
// console.log("加密结果:", encryptedText)

const decryptedText = decrypt(str)
// "/getEpisodes?slP16o4puFKwEMs+hwUgc4uMsNZKNM083X0hRbLO1lyu6aPpSpKOsYJ6oxUSQXDrT/Fq2m2hKly+gW/dEtS3YO2hpxQldy/PzppNyvFSoVBMG3AL8VPzszh3QV/5umuq15fmF9aTRY5u4hVGmysl8uoXL1DTiYgBhj9VcU7m=null"
// const decryptedText = decrypt(
//   /* encryptedText */ "Er0/AL2yHfoAdL2uPb8qoRHSNMKtZ18ByqXMlP9Tgm+stemgzViOEN4SorXw+UiYREi5ofJeQd6BB8zabZR2Dqw4WxgsLQ8PO33HpK9UXb0nhNCNmllw0Y49fMxbsJJzlPyfKxgkHkUmi84b/TZtHwdam47PNonwlDA6Oz5gq5s="
// )
// const decryptedText = decrypt("mz2ThB1336JOyLEaMvKvSQcA7Sa8b90iFyYi+5hH7TiXxOFQs+Berw==")
// js 生成  B8F4KNIWxforaEoCfFs0+UF2muXlVypfPMKGU+VcUoYFjlseMQ==
//          DYz5gtP/d2BnKEhELlLddHiNZZ7f86A6ryhUbRzrOnldQpOd0Q==
// java 生成 +gtYs6dVey2KlLVvusYN7uEOLA/hUQWtCpLd68K6xEJlSVrx3w==
//          4HvobOXn32C1Den1y5n7sz19oK3oTZ7xqu6jnGwSJDJdNlbjckwtlmE=
// PHP 生成 mz2ThB1336JOyLEaMvKvSQcA7Sa8b90iFyYi+5hH7TiXxOFQs+Berw==
//          Er0/AL2yHfoAdL2uPb8qoRHSNMKtZ18ByqXMlP9Tgm+stemgzViOEN4SorXw+UiYREi5ofJeQd6BB8zabZR2Dqw4WxgsLQ8PO33HpK9UXb0nhNCNmllw0Y49fMxbsJJzlPyfKxgkHkUmi84b/TZtHwdam47PNonwlDA6Oz5gq5s=
/* 
KCO0XsWl9VE8KIlMnMx8Uwa7YhwU5VK5OdjLiV2t6XP+9+SROyeHp5seNWn+4w9ddvSWJzWrPB+PNGT9VrJaIUfieAfAZXb+aPu/ifb/3sQmiZaSemzZxCogKXcL2/etB7TdcIMu7SO2UKqNsYeeat5nkdvOPlUf4VkjSPSdKe2Fz/JA/skKBJbREbkhBCKA2caXOhzk2XSHNU0sKfMugCVG2m+hgcKzD5FbAAf95riIyXVGWJIa3+Z5S5PWwAMW9TxG5+WEM0ZmXn4Y5Xsgp94zmM8W2S9x24DJuWKPN1vsHjdQxImebmCPDjJZME7N1Wv9K5Q+x8GkUcGg4asXrAdeS2r9fW30JmwmyVjLXOj/t+NE0ZdNxScPbUzVsRWazMyU+DQigwdG0OfOYUoMhQ==
  */
console.log("解密结果:", decryptedText, "密钥:", key)

// ----------------------------------------------------
