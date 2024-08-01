
# 解决Navicat激活、注册时候出现No All Pattern Found的问题

用Navicat Keygen Patch v5.6.0.exe注册激活Navicat15时，出现No All Pattern Found的错误，具体原因是navicat注册表问题，或navicat之前已经安装过了，所以在注册时候，会出现这个错误。

解决方案如下：

1. 删除注册表中的Navicat安装信息：快捷键win+r命令，然后输入regedit，打开注册表，然后进行操作。
2. 搜索如下目录：计算机\HKEY_CURRENT_USER\Software\PremiumSoft
3. 找到Software的目录下的PremiumSoft文件。
4. 删除PremiumSoft文件夹，Data文件为连接记录信息。
5. 如果还出现错误，建议先卸载软件，然后再重新安装。找到安装目录，名字为：PremiumSoft的文件夹，将文件夹以及文件夹其中的内容全部删除
6. 如果第二次出现Error on Generate Activation Code…的错误，可能操作过程中没有断网，断网后重新操作就可以了。

注意：Navicat中存储的是你之前使用Navicat创建的连接,如果有用，强烈建议保留。生成注册码之后，再启动navicat，注册前最好不要启动Navicat程序。

## 参考链接

[解决Navicat激活、注册时候出现No All Pattern Found的问题](http://t.csdnimg.cn/MVcos)