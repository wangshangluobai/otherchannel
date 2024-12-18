# 使用 oh-my-zsh 美化终端

Oh My Zsh 是一款社区驱动的命令行工具，正如它的主页上说的，Oh My Zsh 是一种生活方式。它基于 zsh 命令行，提供了主题配置，插件机制，已经内置的便捷操作。给我们一种全新的方式使用命令行。  

- Oh My Zsh 是基于 zsh 命令行的一个扩展工具集，提供了丰富的扩展功能。
- 安装 Oh My Zsh 前提条件：必须已安装 zsh
- [oh my zsh 官网](https://ohmyz.sh/)

## 安装 oh-my-zsh 

- curl  `sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
- wget  `sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"`
- fetch `sh -c "$(fetch -o - https://install.ohmyz.sh/)"`
- 国内curl镜像  `sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"`
- 国内wget镜像  `sh -c "$(wget -O- https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)"`

任意选一种可行的安装方式，注意网络问题。  

## 配置 zsh

1. 查看主题 [GitHub 地址](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)  
    `cd ~/.oh-my-zsh/themes`  
    记录要更换的主题名称  

2. 更改相关配置  
    ```sh
    # 切换至用户目录
    cd ~
    # 使用 vim 编辑文件
    vim ./.zshrc 
    # 找到这一行修改
    ZSH_THEME="要修改的主题名称"
    ```
3. 刷新配置
    ```sh
    source ~/.zshrc
    ```
4. 安装自定义主题（powerlevel10k）
    ```sh
    # 使用 git 将文件 clone 只指定文件夹 ～/.oh-my-zsh/custom/themes/powerlevel10k
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
    ```
    在已经配置好powerlevel10k的情况下，重启初始化配置，修改zsh的主题样式。 `p10k configure`  
5. 安装插件，oh-my-zsh 已经内置了 git 插件，内置插件可以在 ～/.oh-my-zsh/plugins 中查看
    1. 把插件下载到本地的 ~/.oh-my-zsh/custom/plugins 目录  
        `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`
    2. 在 .zshrc 中，把 zsh-autosuggestions 加入插件列表 
        ```sh
        plugins=(
            # other plugins...
            zsh-autosuggestions  # 插件之间使用空格隔开
        )
        ``` 
    3. 开启新的 Shell 或执行 source ~/.zshrc，就可以开始体验插件

- zsh-autosuggestions   是一个命令提示插件，当你输入命令时，会自动推测你可能需要输入的命令，按下右键可以快速采用建议。
- zsh-syntax-highlighting   是一个命令语法校验插件，在输入命令的过程中，若指令不合法，则指令显示为红色，若指令合法就会显示为绿色。
- z 是一个文件夹快捷跳转插件，对于曾经跳转过的目录，只需要输入最终目标文件夹名称，就可以快速跳转，避免再输入长串路径，提高切换文件夹的效率。  
    由于 oh-my-zsh 内置了 z 插件，所以只需要在 .zshrc 中，把 z 加入插件列表

6. 设置 alias。 zsh 支持为较长命令设置一个别名，这样在使用时可以快捷输入。
    这里以 cd ~/Documents/Vue/demo/project/src/2023/blob 这个命令来举例  
    1. 在 .zshrc 中键入 `alias cdblob="cd ~/Documents/Vue/demo/project/src/2023/blob"`
    2. 开启新的 Shell 或 source ~/.zshrc，以使配置生效。生效后就可以使用 cdblog 进行跳转这个路径了。

        


### Tools

#### VSCode 插件

- YAML
