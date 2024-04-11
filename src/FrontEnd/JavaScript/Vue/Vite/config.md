

使用 `Vite` 搭建项目，打开对应的 `host` 端口 浏览器显示*页面找不到localhost的网页*

处理思路
- 和 `webpack` 不同，`Vite` 的入口文件是 `index.html`，所以 `index.html` 应该是在根目录下
  同 `package.json` 文件同级
- 端口号被占用，在命令行输入`netstat -aon|findstr "<端口号>"` 查询端口占用情况
  找到占用端口的进程，用`taskkill -f -pid <进程号>` 杀死进程
  正常来讲，上述原因是不会产生的，对于 `Vite` 来说端口号如果被占用，`Vite` 会自动尝试下一个可用端口
  设置 `Vite` 参数 `server.strictPort` 为 `true` 若端口已被占用则会直接退出，而不是尝试下一个可用端口
- 打开*我的电脑*，选择左上角的计算机中的*卸载或更改程序*，点击*启用或关闭Windows功能*
  Windows10版本的位置在，【WIN + I】快捷键打开Windows设置页面，找到<应用–程序和功能>路径下）
  启用 `Internet Information Services` 服务，重启电脑
- `Vite` 配置中 `root` 的值 `/` 和 `./` 的意义是不同的，前者指的是项目根目录，后者指的是当前目录

参考文章
- [【异常解决】vue项目localhost:8080无法访问此网站或者无法访问此页面，localhost拒绝了我们的连接请求](http://t.csdnimg.cn/l2tbV)