打开 CMD 界面的几种方式

1.  开始 -> 系统 -> 命令提示符
2.  Win 键 + R -> 输入 cmd 打开控制台
3.  在任意的文件夹下面，按住 shift + 鼠标右键， 选择在此处打开命令行窗口
4.  资源管理器的地址栏前面加上 cmd 路径

### 常用的 DOS 命令

```bash
# 盘符切换
D:

# 查看当前目录下的所有文件 directory
dir

# 切换目录 change directory
cd:
cd: /d D: # 切换盘符需要加 /d
cd: /d D:\someone # 盘符后跟路径，可以直接切换至指定路径下
cd: .. # 切换至父级/返回上级路径
cd: fileName # 切换至子级路径下

# 清理屏幕 clear screen
cls

# 退出终端
exit

# 查看电脑IP
ipconfig

# 打开计算器程序，记事本
calc
notepad

# 测试网络连接
ping
ping www.baidu.com # ping 域名
ping 127.0.0.1 # 直接 ping ip地址
# 在mac中使用 control + z 停止ping

# 创建目录
md fileName

# 删除目录
rd fileName

#创建文件
cd>fileName.txt

# 删除文件
del  fileName.txt
```

### Mac OS Java 开发环境配置

1. 首先检查本地是否存在 JDK 或 JVM

打开终端输入 `java -version` 提示如下则代表不存在

> The operation couldn’t be completed. Unable to locate a Java Runtime.  
> Please visit http://www.java.com for information on installing Java.

### Win OS Java 开发环境配置

1. 首先检查本地是否存在 JDK 或 JVM

打开终端输入 `java -version` 提示如下则代表不存在

> java : 无法将“java”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。  
> 请检查名称的拼写，如果包括路径，请确保路径正确，然后再试一次。

2. 下载 [JDK](https://www.oracle.com/java/technologies/downloads/?er=221886#jdk23-windows) 选择[64 位版本 exe](https://download.oracle.com/java/23/latest/jdk-23_windows-x64_bin.exe "sha256") 可执行文件

目前是 24 年 10 月 11 日，似乎没有 32 位的安装包了。我上书给的地址是 jdk-23 的

3. 打开下载好的 JDK，进行安装

点击下一步，直到选择目标文件时，按个人需求选择是否需要调整安装位置  
将输入框中的安装地址复制到剪切板
然后点击下一步，等待安装进度结束后点击完成关闭窗口

4. JDK 环境配置

找到环境变量设置，上边是用户变量，下面是系统变量

点击新建系统变量，变量名是 `JAVA_HOME` , 变量值是 `你刚才复制的安装地址`  
同样在系统变量中找到 Path 变量，在末尾添加 `%JAVA_HOME%\bin` (选择右侧新建也好，直接点击每一行也行，能新增就好)

扩展环境：

- `%JAVA_HOME%\bin`
- `%JAVA_HOME%\lib`
- `%JAVA_HOME%\jre\bin`
- `%JAVA_HOME%\lib\tools.jar`

5. 测试安装结果

新建终端输入 `java -version` 以下提示标识安装成功

> java version "23" 2024-09-17  
> Java(TM) SE Runtime Environment (build 23+37-2369)

6. 常见异常处理

在第五步的时候，键入了 `java -version` 或其他 java 命令 ，没有任何反应(没有像第一步一样有红色的提示信息)  
这是因为 java 环境配置出现了异常，安照第四步的操作，打开系统变量，找到 `path` ，双击打开  
将你刚定义的 `%JAVA_HOME%\bin` 选中，点击右侧上移，直接移动到顶层，一路确定保存，重新执行第五步就好了

补充：

你可能在环境变量 `path` 中注意到了另一个和 java 相关的变量 `C:\Program Files\Common Files\Oracle\Java\javapath` 大概是这个  
这个是系统默认的 jre 的路径(好像是)，应该是这个导致环境变量查找失败。
