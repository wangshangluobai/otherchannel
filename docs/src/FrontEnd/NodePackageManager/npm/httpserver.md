# http-server

http-server 是一个简单的零配置命令行 http 服务器

应用场景：

- 局域网访问静态页面
- 处理页面跨域
  当页面含有跨域的请求，此时可以利用 http-server，使用命令

  ```shell
  # -p 本地运行端口  -P 将所有无法在本地解析的请求代理到给定的URL进行处理
  http-server -p 8080 -P https://google.com
  ```

1. 安装 `npm install http-server -g`
2. 验证安装情况 `http-server -v`
3. 使用命令行切换至需要开启服务器的文件目录
4. 执行 `npx http-server` 或 `http-server` 开启服务器

相关参数：

- -p 或--port 要使用的端口 默认为 8080
- -a 要使用的地址 默认为 0.0.0.0
- -d 显示目录列表 默认为 true
- -i 显示自动索引 默认 true
- -g 或者--gzip 当启用 (默认为 false) 时，它将./public/some-file.js.gz 代替./public/some-file.js 当文件的 gzip 压缩版本存在且请求接受 gzip 编码时。
- -e 或者 --ext 如果没有提供默认文件扩展名 默认为 html
- -s 或者 --silent 禁止控制台日志信息输出
- –cors 允许跨域资源共享
- -o 启动服务器后打开浏览器窗口
- -c 设置缓存 cache-control max-age heade 存留时间 以秒为单位，示例：-c10 是 10 秒，默认是 3600 秒，如果要禁用缓存就使用-c-1
- -U 或者 --utc 使用 UTC 格式，在控制台输出时间信息
- -P 或者将--proxy 所有无法在本地解析的请求代理到给定的 URL。例如：-P http://someurl.com
- -S 或--ssl 启用 https。
- -C 或--cert ssl 证书文件的路径， cert 文件的路径 默认值: cert.pem。
- -K 或--key ssl 密钥文件的路径 默认值: key.pem。
- -r 或--robots 提供/robots.txt 其内容默认为 User-agent: \*\nDisallow: /
- -h 或--help 显示帮助

## 开启 https 协议服务

1. 生成 ssl 证书文件命令

```shell
openssl genrsa -out key.pem 1024
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey key.pem -out cert.pem
```

执行命令异常，请查阅安装 OpenSSL 文档

在哪个路径下执行的上述命令，生成的三个证书都会在该路径下

2. 启动服务

   - 将生成的证书复制到项目根路径下
   - 启动命令
     http-server -S ./ //最方便
     http-server -S -C cert.pem -o //此命令使用自定义证书路径

3. 注意，这样生成的 https 服务器是不安全的，仅供调试使用，甚至在调试中，浏览器都会警告
   常规浏览器中选择 `高级 > 继续` 即可正常访问，特殊浏览器不知道

### 通过 express 框架开启 https 协议的服务

```js
let http = require("http")
let https = require("https")
let fs = require("fs")
let express = require("express")
let serveIndex = require("serve-index")

let app = express()
app.use(serveIndex("./static")) //资源路径
app.use(express.static("./static")) //资源路径

// http server
let http_server = http.createServer(app)
http_server.listen(80, "127.0.0.1")

// https server,证书路径
let options = {
  key: fs.readFileSync("./*.key"),
  cert: fs.readFileSync("./*.crt"),
}

let https_server = https.createServer(options, app)
https_server.listen(433, "127.0.0.1")
```

### 无法将“openssl”项识别为 cmdlet、函数、脚本文件或可运行程序的名称

```shell
PS C:\users\18289\desktop> openssl genrsa -out key.pem 1024
openssl : 无法将“openssl”项识别为 cmdlet、函数、脚本文件或可运行程序的名称
。请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
...
```

OpenSSL 是一个开放源代码的软件库包，应用程序可以使用这个包来进行安全通信，避免窃听，同时确认另一端连接者的身份。这个包广泛被应用在互联网的网页服务器上。  
默认的 Windows 系统是不带 openssl 功能的，因此当需要生成密钥或证书时需要先安装 openssl 库。

**安装**
由于 openssl 是开源的，因此可以直接下载源码，自己编译，但这一过程非常复杂，需要先安装 perl、vs 等软件，然后才能编译 openssl。  
另一种方式是利用其他人已经做好的便捷版安装包，直接运行即可，采用这种方式更加迅速，且不易出现问题。

1. 下载安装包：[安装包下载-OpenSSL](https://slproweb.com/products/Win32OpenSSL.html)
   列表中提供了 v3.0.2 v1.1.1 两个版本，OpenSSL 3.0 是 OpenSSL 的最新主要版本，服务支持直到 2026 年 9 月 7 日，是一个长期支持（LTS）版本。  
   此前的 LTS 版本（1.1.1 系列）将支持至 9 月 11 日 2023 年。  
   对于每个版本需要根据自己的电脑架构进行选择：
   - 电脑或者要安装的版本是 64 位，还是 32 位，通常基本都是 64 位；
   - 电脑架构是否是 arm，取决于 CPU，一般不是(Mac 是 arm 架构)；  
     此外，表格中也提供了轻量级版本，选择 Light 即可。
2. 安装，直接运行，点击下一步，自定义安装路径或默认(记住安装位置，设置环境变量)
3. 打开环境变量设置，新建系统变量，变量名为 `OPENSSL_HOME` 变量值是 `{安装路径}\bin`, 点击确定，应用
   然后还需要在 path 变量中添加该环境变量即： `%OPENSSL_HOME%` 完成后点击确定
4. 打开新的终端 键入命令 `openssl version` 查看是否安装成功
   ```shell
   PS C:\Users\18289> openssl version
   OpenSSL 3.3.2 3 Sep 2024 (Library: OpenSSL 3.3.2 3 Sep 2024)
   ```
