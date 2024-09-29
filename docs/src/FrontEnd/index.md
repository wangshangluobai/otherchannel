### FrontEnd

在 IOS 系统中使用 uniapp 的 u-popup 组件时，如果使用了 position:fixed|absolute 时其 zindex

#### HTML

##### H5 页面手机端禁止缩放的正确方式

1. 通过 meta 方式实现  
   `<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />`  
   这个写法一抓一大把，因为使用以后发现页面变形严重，很多人直接丢弃了该方式，实际上是由于 width=device-width 这一段代码引起的屏幕自适应
   有些浏览器是强制开启允许缩放的，于是，使用 js 的方式在一定的延迟之后将该 meta 写入 header 中也是一种方法，但是有些浏览器是无效的
2. 通过 js 实现,该方式在手机端适用良好，并且不影响第三方地图的缩放，建议使用  
   对于双击放大和双指放大，本质上是一种 js，找了好久，找到了使用 js 禁止的方式

   - 禁止双指放大

     ```js
     document.documentElement.addEventListener(
       "touchstart",
       function (event) {
         if (event.touches.length > 1) {
           event.preventDefault()
         }
       },
       false
     )
     ```

   - 禁止双击放大
     ```js
     var lastTouchEnd = 0
     document.documentElement.addEventListener(
       "touchend",
       function (event) {
         var now = Date.now()
         if (now - lastTouchEnd <= 300) {
           event.preventDefault()
         }
         lastTouchEnd = now
       },
       false
     )
     ```

参考来源：

- [H5 页面手机端禁止缩放的正确方式](https://www.cnblogs.com/liuyuhangCastle/p/10517067.html)
