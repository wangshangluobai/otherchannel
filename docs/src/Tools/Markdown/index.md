# Markdown

相关链接

- [Markdown 语法参考](https://www.imooc.com/wiki/markdownlesson/markdowntable.html)

## typora 使用

1. 标题
   选中文本，Ctrl+数字 (1、2、3、4、5、6) ，一共六个数字代表由大到小六个标题等级
2. 分割线
   三个`+++`、`***`、`---` 加回车可以生成一道分割线
3. 下划线
   `Ctrl+U`或`<u>`包裹文本可以给选中文本加下划线
4. 删除线
   `Alt+Shift+5`或`~`包裹 表示加删除线
5. 斜体
   `Ctrl+I`或`_`或`*`包裹文本可以给选中文本加斜体
6. 粗体
   `Ctrl+B`或`**`或`__`包裹文本可以给选中文本加粗
7. 粗体斜体
   `Ctrl+Shift+B`或`***`包裹文本可以给选中文本加粗和斜体
8. 字体颜色及大小
   示例：<font size=2 color="bule">设置字体大小为 2，颜色为蓝色</font>
   <font size=3 color="yellow">设置字体大小为 3，颜色为黄色</font>
   <font size=4 color="red">设置字体大小为 4，颜色为红色</font>
9. 字体高亮
   需要在偏好设置中设置，Markdown 扩展语法中选中高亮，重启即可
   使用`==`包裹文本可以给选中文本高亮
10. 文本对齐
    示例：<p align="lift">左对齐</p>
    <p align="center">居中对齐</p>
    <p align="right">右对齐</p>
11. 插入链接
    - 当链接为地址为一个外部地址时 :格式：\[taobao\](https://taotbao.com) 其中描述可以写也可以不写。快捷键为`Ctrl+K`。
    - 当链接地址为本地地址时，其中本地地址可以时相对地址和绝对地址
12. 插入图片

    - 快捷键：`Ctrl+Shift+I` 格式 !\[图片演示\](图片演示.png) 和链接文件、文档差不多，只是在前面加了一个!
    - \<img src="./图片演示.png"\>
    - 直接就行拖拽、复制 ，也可以进行图片链接 `typora` 默认链接的是绝对地址，图片没有复制到.md 文件同一目录下

      移动了.md 文件或者图片位置，都会丢失图片,修改设置（文件->偏好设置->图像->对本地位置的图片 应用上述规则->下拉框中勾选其中一个）

13. 插入表格
    快捷键方式 Ctrl+T
14. 快捷键

    | 功能                                     | 快捷键               |
    | ---------------------------------------- | -------------------- |
    | 新建一个新的窗口                         | Ctrl+N               |
    | 创建一个新的窗口                         | Ctrl+Shift+N         |
    | 打开资源管理器（初始在.md 文件）         | Ctrl+O               |
    | 快速打开近期使用过的 Markdown 文件搜索框 | Ctrl+P               |
    | 保存                                     | Ctrl+S               |
    | 保存为（另存为                           | Ctrl+Shift+S         |
    | 打开偏好设置界面                         | Ctrl+,               |
    | 关闭当前窗口                             | Ctrl+W               |
    | 开始一个新段落                           | Enter                |
    | 开始一个新行                             | Shift+Enter          |
    | 复制选中的文本为 Markdown 语言           | Ctrl+Shift+C         |
    | 将复制的内容以纯文本的格式粘贴           | Ctrl+Shift+V         |
    | 在段落内选中一句/在表内选中一行          | Ctrl+L               |
    | 删除表中的一行                           | Ctrl+Shift+Backspace |
    | 选中一个段元格                           | Ctrl+E               |
    | 选择一个单元格                           | Ctrl+D               |
    | 跳转到文章最顶部                         | Ctrl+Home            |
    | 跳转到文章底部                           | Ctrl+End             |
    | 跳转到光标所在位置                       | Ctrl+J               |
    | 删除一个单词                             | Ctrl+Shift+D         |
    | 查找                                     | Ctrl+F               |
    | 查找已经查找的的上一个单词               | Shift+F3/Shift+Enter |
    | 查找当前查找的的下一个单词               | F3/Enter             |
    | 替换                                     | Ctrl+H               |
    | 设置文本为标题 1-6                       | Ctrl+ 1/2/3/4/5/6    |
    | 设置文本为段落                           | Ctrl+0               |
    | 给标题升 1 级                            | Ctrl+=               |
    | 给标题降 1 级                            | Ctrl±                |
    | 插入表                                   | Ctrl+T               |
    | 插入代码块                               | Ctrl+Shift+k         |
    | 插入数学符号的文本                       | Ctrl+Shift+M         |
    | 插入引用代码                             | Ctrl+Shift+Q         |
    | 插入有序列表                             | Ctrl+Shift+[         |
    | 插入无序列表                             | Ctrl+Shift+]         |
    | 缩进                                     | Tab / Ctrl+[         |
    | 取消缩进                                 | Shift+Tab / Ctrl+]   |
    | 加粗字体                                 | Ctrl+B               |
    | 文本删除线                               | Alt+Shift+5          |
    | 斜体                                     | Ctrl+I               |
    | 下划线                                   | Ctrl+U               |
    | 标记为代码                               | Ctrl+Shift+5         |
    | 插入超链接                               | Ctrl+K               |
    | 插入图片链接                             | Ctrl+Shift+I         |
    | 消除文本格式                             | Ctrl+\               |
    | 切换侧边栏                               | Ctrl+Shift+L         |
    | 切换成出大纲                             | Ctrl+Shift+1         |
    | 切换到文件栏                             | Ctrl+Shift+2         |
    | 展示文件目录                             | Ctrl+Shift+3         |
    | 切换成源码格式（Markdown）               | Ctrl+/               |
    | 专注模式                                 | F8                   |
    | 打字机模式                               | F9                   |
    | 全屏模式                                 | F11                  |
    | 扩大                                     | Ctrl+Shift+=         |
    | 缩小                                     | Ctrl+Shift±          |
    | 重置大小（好像 windows 有快捷键冲突）    | Ctrl+Shift+0         |
    | 在两个打开的文件进行切换                 | Ctrl+Tab             |

15. 快捷键设置
    - (文件)->(偏好设置)->(通用)->(打开高级设置) 选择`conf.user.json`
    - 找到`keyBinding` ,在它的大括号里面添加快捷键名称和快捷键组合
    - 重启 typora 不然不会生效

## typora 激活

### typora 在 windows 序列号生成方法

1. 在[typora 官网](https://typoraio.cn/)下载最新版本，并安装
2. 获取生成序列号工具(在 Tools 工具包中)
3. 或许序列号
   - 将工具包中的两个 `exe` 可执行文件复制到 `typora` 的安装目录下
   - 使用管理员身份运行 `cmd` 打开命令行，进入 typora 安装目录
   - 依次执行 node_inject.exe、license-gen.exe 得到序列号
   - 打开 typora 激活页面，email 可以任意输入，将上一步得到的激活码输入，点击激活即可

参考链接

- [typora 序列号生成方法](https://blog.csdn.net/niceBCZZ/article/details/137568047?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-5-137568047-blog-139095261.235^v43^pc_blog_bottom_relevance_base9&spm=1001.2101.3001.4242.4&utm_relevant_index=8)
