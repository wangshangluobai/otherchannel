# 安装 Rust

1. 点击下面官方下载页面，根据系统类型选择 `64-BIT` 或 `32-BIT`
2. Rust 将默认安装在 `C:\Users\用户名\` 目录下, 如果无需调整则跳转至步骤 4
3. 设置环境变量，以控制 Rust 安装位置
   - win10 环境变量设置
     - 右键单击 Windows 徽标->关于->相关设置->高级系统设置->环境变量->系统变量下新建两个变量
     - 变量名：`RUSTUP_HOME` 变量值：`your path\.rustup`
     - 变量名：`CARGO_HOME` 变量值：`your path\.cargo`
   - 其他类型的系统可以在百度或语言模型上寻找安装方式
4. 双击从官网下载的 `rustup-init.exe` 进行安装，会提示以下信息

   ```
   Rust requires a linker and Windows API libraries but they don't seem to be available.

   These components can be acquired through a Visual Studio installer.

   1) Quick install via the Visual Studio Community installer
     (free for individuals, academic uses, and open source).

   2) Manually install the prerequisites
     (for enterprise and advanced users).

   3) Don't install the prerequisites
     (if you're targeting the GNU ABI).
   ```

   大致是意思是缺少一些依赖，可以选择以下三种方式处理，这里我选择第三种方式，在命令行输入 `3` 并确认

5. 会提示以下信息

   ```
   Welcome to Rust!

   This will download and install the official compiler for the Rust
   programming language, and its package manager, Cargo.

   Rustup metadata and toolchains will be installed into the Rustup
   home directory, located at:

     your path\.rustup

   This can be modified with the RUSTUP_HOME environment variable.

   The Cargo home directory is located at:

     your path\.cargo

   This can be modified with the CARGO_HOME environment variable.

   The cargo, rustc, rustup and other commands will be added to
   Cargo's bin directory, located at:

     your path\.cargo\bin

   This path will then be added to your PATH environment variable by
   modifying the HKEY_CURRENT_USER/Environment/PATH registry key.

   You can uninstall at any time with rustup self uninstall and
   these changes will be reverted.

   Current installation options:


      default host triple: x86_64-pc-windows-msvc
        default toolchain: stable (default)
                  profile: default
     modify PATH variable: yes

   1) Proceed with standard installation (default - just press enter)
   2) Customize installation
   3) Cancel installation
   ```

   主要信息包括

   1. 如果你进行了步骤 3 ，则可以在这时检查一下，安装路径是否正确
   2. 给出的三条选项，第三条是退出安装，第二条是自定义安装，第一条是默认上述信息安装
      这里直接选择 2 ，需要调整一下信息，在命令行输入 `2` 并确认

6. 会提示以下信息

   ```
   I'm going to ask you the value of each of these installation options.
   You may simply press the Enter key to leave unchanged.

   Default host triple? [x86_64-pc-windows-msvc]
   ```

   默认情况下，Windows 上的 rustup 将 Rust 配置为以 MSVC ABI 为目标，即 i686 pc Windows MSVC、x86_64-pc-Windows-MSVC 或 aarch64 pc Windows MSVC
   之后可以任意添加：

   ```
   $ rustup target add x86_64-pc-windows-msvc
   $ rustup target add x86_64-pc-windows-gnu
   $ rustup target add i686-pc-windows-msvc
   $ rustup target add i686-pc-windows-gnu
   ```

   都不重要，在命令行输入 `x86_64-pc-windows-gnu` 并确认

7. 会提示以下信息

   ```
   Default toolchain? (stable/beta/nightly/none) [stable]
   ```

   这次就直接确认，使用默认值

8. 会提示以下信息

   ```
   Profile (which tools and data to install)? (minimal/default/complete) [default]
   ```

   这次就直接确认，使用默认值

9. 会提示以下信息

   ```
   Modify PATH variable? (Y/n)
   ```

   在命令行输入 `y` 并确认

10. 会提示以下信息

    ```
    Current installation options:


      default host triple: x86_64-pc-windows-gnu
        default toolchain: stable
                  profile: default
      modify PATH variable: yes

    1) Proceed with selected options (default - just press enter)
    2) Customize installation
    3) Cancel installation
    ```

    确认上述提示信息无误之后，在命令行输入 `1` 并确认

11. 接下来会进行安装下载相关文件及工具
    - 如果网络不太好，可能出现下载错误或中断，需要执行上述步骤重新安装
12. 安装成功后会提示以下信息

    ```
    ...
    info: default toolchain set to 'stable-x86_64-pc-windows-gnu'

      stable-x86_64-pc-windows-gnu installed - rustc 1.77.2 (25ef9e3d8 2024-04-09)


    Rust is installed now. Great!

    To get started you may need to restart your current shell.
    This would reload its PATH environment variable to include
    Cargo's bin directory (D:\otherchannel\Rust\.cargo\bin).

    Press the Enter key to continue.
    ```

    安装结束

13. 此时如果你执行了步骤 3 ，则在你设定的路径下会生成两个文件夹 `.rustup` 和 `.cargo`
14. 打开任意命令行页面
    - 输入 `rustc --version`
      显示 `rustc 1.77.2 (25ef9e3d8 2024-04-09)` 后面的日期代表最新的稳定版本发布日期，版本对 Rust 影响不大
    - 输入 `cargo --version`
      显示 `cargo 1.77.2 (e52e36006 2024-03-26)`
15. 恭喜你，安装完成
16.

## 参考链接

- [官方下载页面](https://www.rust-lang.org/tools/install)
