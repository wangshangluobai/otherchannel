

打开CMD界面的几种方式

1.  开始 -> 系统 -> 命令提示符
2.  Win键 + R  -> 输入cmd 打开控制台
3. 在任意的文件夹下面，按住shift + 鼠标右键， 选择在此处打开命令行窗口
4. 资源管理器的地址栏前面加上 cmd 路径

### 常用的DOS命令

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

### Mac OS Java开发环境配置

1. 首先检查本地是否存在 JDK 或 JVM

打开终端输入 `java -version` 提示如下则代表不存在

> The operation couldn’t be completed. Unable to locate a Java Runtime.  
> Please visit http://www.java.com for information on installing Java.  