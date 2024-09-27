### 踩坑记录

1. 有些浏览器，接口调试工具(apiFox) 不会自动进行编码转换，如果一些 `query` 关键参数需要后端校验，则注意转码问题。  
   js 有原生转码方法 [encodeURI()](<[encodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)>)
