## 使用 SSH 链接本地与远程仓库

```sh
$ git init # 在 git bash 页面或者其他命令行页面初始化 git
```

执行上述命令之后会出现一个隐藏文件 `.git` 是 git 用来跟踪和管理版本库的

接下来查看在用户主目录下，是否存在 `.ssh` 文件

- 如果存在，查看该文件下是否包含 `id_rsa` 和 `id_rsa.pub` 如果两者都存在，可跳过下一步操作
- 如果不存在，则打开 git bash 页面或者其他命令行页面 键入执行下方命令

```sh
$ ssh-keygen -t rsa -C "[Email Text]" # 该邮箱需要是注册 github 使用的邮箱
```

执行后会提示
_Enter file in which to save the key ([File path])_
根据需要调整，无需调整则键入 Enter

接下来会让输入密码，以及确认密码 无需设置密码则键入 Enter ，默认为空

之后命令行页面会展示生成的 SSH 密钥，以及文件所在位置
如果未设置，则默认在用户主目录下

接下来打开 github 线上地址，鼠标单击头像选择 _Settings_ ，再选择 _SSH and GPG keys_ 菜单
选择 New SSH key
键入 Title ，Key
其中 Title 随意，建议告诉自己这是哪个客户端的 SSH 即可
后者填写 `id_rsa.pub` 文件内的全部内容
Add SSH key 确认保存

之后键入执行下方命令，验证 SSH

```sh
$ ssh -T git@github.com
```

会提示输入验证信息输入 yes 即可 然后会提示 successfully

将本地仓库设置远程仓库地址

```sh
$ git remote add origin [github remote path] # 路径以 .git 结尾
```

键入以下命令进行首次推送

```sh
$ git push -u origin master # 新建远程仓库是空的，所以加上 -u 参数，之后的推送就不用加了
```

如果在远程仓库中存在文件，可能是 `README` 文件，会导致本地仓库和线上仓库冲突
可以先拉取一下远程仓库的文件，同步到本地之后再进行提交推送

_团队开发时，推送之前一定要拉取，自己解决冲突。_

键入以下命令从远程仓库拉取文件

```sh
$ git pull --rebase origin master
```

知识引用

- [原文链接](https://blog.csdn.net/qq_29493173/article/details/113094143)

## 使用不同账号对应不同远程源

在 C 盘找到 `C:\Users\{用户名}\.ssh` 根据 【使用 SSH 链接本地与远程仓库】步骤生成两个 SSH 密钥

注意：密钥名称需要自己调整，不要混肴了

接下来打开 .ssh 下的 config 文件，添加以下配置信息

```text
Host github.com   #这是一个别名
    HostName github.com  # 这是远程仓库的域名 公司
    User otherchannel
    IdentityFile ~/.ssh/id_rsa_github   # 这个账号对应私钥的地址
Host starshinetechs.com     #这是一个别名
    HostName git.starshinetechs.com  # 这是远程仓库的域名 个人
    User wangshangmin
    IdentityFile ~/.ssh/id_rsa_gitlab  # 这个账号对应私钥的地址
```

调整 IdentityFile 值，对应生成好的私钥，调整 HostName 对应远程源域名或 IP

将 SSH 添加到远程源的方法，根据 【使用 SSH 链接本地与远程仓库】实现

注意：到此为止一切顺利的话，记录到远程源提交代码的名称是 `git config --global --unset user.name` 对应的值
如果要调整，则需要单独为项目配置，不添加 --global 参数即可

```sh
git config user.name "x"
git config user.email "x@x.com"
```
