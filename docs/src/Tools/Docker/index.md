## docker 国内镜像源配置

`docker` 默认的镜像源是 `Dockerhub`  
`docker` 的镜像源文件配置在 `/etc/docker/daemon.json` 处，如果没有的话我们就创建一个然后再修改。

`sudo vim  /etc/docker/daemon.json`

**常见的国内镜像源**

> Docker 国内镜像源：https://registry.docker-cn.com  
> 中科大源：https://docker.mirrors.ustc.edu.cn  
> 网易源：https://hub-mirror.c.163.com  
> 百度源：https://mirror.baidubce.com  
> 腾讯源：https://ccr.ccs.tencentyun.com  
> 阿里源：需要登陆 cr.console.aliyun.com 创建单独的镜像源链接

在配置文件中添加需要的镜像源链接

```json
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://ccr.ccs.tencentyun.com"
  ]
}
```

重启 `docker`，注意由于走的是守护程序 `daemon`，所以 `daemon` 进程也需要重启。

```shell
sudo systemctl daemon-reload		#重启daemon进程
sudo systemctl restart docker		#重启docker
```

验证修改结果

```shell
docker info
# Registry Mirrors:
```
