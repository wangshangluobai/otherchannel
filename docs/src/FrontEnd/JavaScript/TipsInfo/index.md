

# JavaScript 提示信息

1. Scripts may close only the windows that were opened by it
  时机： 脚本关闭窗口
  描述： 脚本只能关闭由脚本自己打开的窗口
  ```js
  function closePage(){
    if(navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1){
      window.location.href = "about:blank";
      window.close();
    }else{
      window.opener = null;
      window.open("", "_self");
      window.close();
    }
  }
  ```
