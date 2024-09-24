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
