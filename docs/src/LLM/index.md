
### 本地部署大语言模型

#### 使用Ollama部署

此方式比较简单，执行命令即可，但没办法部署不支持GGUF二进制格式的大模型（GGUF旨在实现快速加载和保存大语言模型，并易于阅读）  
Ollama 是一个用于部署和运行各种开源大模型的工具。用户通过执行几条命令就能在本地运行开源大模型，极大简化了大模型在本地运行，类似于Docker。  

##### Mac安装

需要使用 homebrew 工具，使用 `brew -v` 命令来检查是否已安装 homebrew 工具

1. 执行 `brew install ollama` 下载并安装 ollama
    等待文件下载结束后，执行`ollama -v`命令查看，是否安装成功
2. Ollama上安装大模型
    进入 [ollama.com/library](https://ollama.com/library) 网站,选择想要安装的大模型，复制命令 如：`ollama run codellama:34b` 如果本地存在此大模型，则运行，不存在则拉取
    - 运行一个7B（70亿参数）的模型至少需要8GB的可用内存（RAM），而运行13B（130亿参数）的模型需要16GB内存，33B（330亿参数）的模型需要32GB的内存
    - 需要考虑提供足够的磁盘空间，大模型的文件大小可能比较大，建议至少为Ollama和其模型预留50GB磁盘空间。
    - 性能较高的CPU可以提供更好的运算速度和效率，多核处理器能够更好的处理并行任务，选择具有足够的核数的CPU
    - GPU，Ollama支持纯CPU运行，但可以利用GPU进行加速，提高模型的运行速度和性能。
3. 执行安装大模型命令后，以问答的形式结尾，即安装成功

##### Win安装

- 无

#### 安装docker

我在这里花了不少时间，因为对docker的不了解，我安装了docker 使用命令`docker -v`检验正常，但是docker的守护进程一直无法开启，并且我也没有正常安装docker desktop，不能使用ui交互执行，使用命令行执行则提示守护进程未开启，我可能忽略了什么，最终我使用另一种方式安装成功，并在此之前卸载了之前安装的docker  

执行 `docker info` 后提示以下异常

```shell
Client: Docker Engine - Community
 Version:    27.3.1
 Context:    default
 Debug Mode: false

Server:
ERROR: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
errors pretty printing info
otherchannel@shaadeMacBook-Pro ~ % sudo docker info
Client: Docker Engine - Community
 Version:    27.3.1
 Context:    default
 Debug Mode: false

Server:
ERROR: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
errors pretty printing info
```

1. 使用 Homebrew 来安装 Docker 执行命令 `brew install --cask --appdir=/Applications docker`  
    中途会让输入Mac密码，安装成功后状态栏会存在小鲸鱼的logo
2. 打开docker 同意服务协议，选择默认配置，跳过角色选择，
3. 执行`docker run -d -p 3210:3210 --name lobe-chat lobehub/lobe-chat` 安装LobeChat界面
4. 点击大脑图标配置本地大模型，会存在缓存，出现一些你本地不存在的异常UI问题，直接选择你已安装的大模型