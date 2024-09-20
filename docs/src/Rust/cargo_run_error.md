## 在 VSCode 中运行 cargo run 后报错

错误信息：

> cargo : 无法将“cargo”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。

异常原因：

- 执行脚本命令需要管理员权限

解决方法：

1. 右键 VSCode 图标，选择属性，在兼容性相关中选中 `以管理员身份运行此程序`
2. 重启 VSCode 程序

其他备注：

1. 该方法可解决此问题，但 VSCode 会提示不支持更新，且开启 VSCode 后会有弹窗提示

---

错误信息：

> error: linker `link.exe` not found

异常原因：

- 缺少编译器相关文件
- 在安装 rust 的第四步时选择了 `3) Don't install the prerequisites` 且  
  第五步时选择的是第一条规则 `1) Proceed with standard installation (default - just press enter)` 会产生此异常

解决方法：  
弥补第五步选择时产生的影响

1. 执行命令 `rustup toolchain install stable-x86_64-pc-windows-gnu` 下载相关文件程序
2. 执行命令 `rustup default stable-x86_64-pc-windows-gnu` 设置默认编译方式
