# Git

## GIT 使用经验

## GIT 基础信息

### 常用 Git 命令

#### 1. 配置与初始化
- **配置用户信息**
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```
- **初始化仓库**
  ```bash
  git init
  ```

#### 2. 克隆仓库
- **克隆远程仓库**
  ```bash
  git clone <repository-url>
  ```

#### 3. 分支管理
- **查看分支**
  ```bash
  git branch
  ```
- **创建分支**
  ```bash
  git branch <branch-name>
  ```
- **切换分支**
  ```bash
  git checkout <branch-name>
  ```
- **创建并切换到新分支**
  ```bash
  git checkout -b <branch-name>
  ```
- **合并分支**
  ```bash
  git merge <branch-name>
  ```
- **删除分支**
  ```bash
  git branch -d <branch-name>
  ```

#### 4. 提交管理
- **查看状态**
  ```bash
  git status
  ```
- **添加文件到暂存区**
  ```bash
  git add <file-name>
  ```
- **添加所有文件到暂存区**
  ```bash
  git add .
  ```
- **提交更改**
  ```bash
  git commit -m "commit message"
  ```
- **查看提交历史**
  ```bash
  git log
  ```

#### 5. 远程操作
- **查看远程仓库**
  ```bash
  git remote -v
  ```
- **添加远程仓库**
  ```bash
  git remote add origin <repository-url>
  ```
- **推送本地分支到远程仓库**
  ```bash
  git push -u origin <branch-name>
  ```
- **拉取远程仓库的最新更改**
  ```bash
  git pull
  ```

#### 6. 标签管理
- **创建标签**
  ```bash
  git tag <tag-name>
  ```
- **推送标签到远程仓库**
  ```bash
  git push origin <tag-name>
  ```
- **删除标签**
  ```bash
  git tag -d <tag-name>
  ```

#### 7. 版本回退
- **回退到某个提交**
  ```bash
  git reset --hard <commit-hash>
  ```
- **回退到某个提交但保留工作目录**
  ```bash
  git reset --soft <commit-hash>
  ```
- 回退到上一个

### Git 提交规范

1. `WIP` (Work In Progress)  
    表示当前提交是一个正在进行中的工作，尚未完成。
2. `FIX` (Fix Bug)  
    表示当前提交修复了一个或多个 bug。
3. `FEAT` (Feature)  
    表示当前提交添加了一个新功能。
4. `REFACTOR` (Refactor)  
    表示当前提交进行了代码重构，没有添加新功能或修复 bug。
5. `DOCS` (Documentation)  
    表示当前提交更新了文档，如 README 文件、API 文档等。
6. `TEST`: (Test)  
    表示当前提交添加或更新了测试用例。
7. `CHORE` (Chore)  
    表示当前提交执行了一些常规任务，如更新依赖、配置文件等。
8. `STYLE` (Style)  
    表示当前提交进行了代码风格的调整，如格式化、删除空格等。
9. `PERF` (Performance)  
    表示当前提交优化了性能。
10. `REVERT` (Revert)  
    表示当前提交撤销了之前的某个提交。
11. `build`  
    打包  
12. `ci`  
    持续集成  

**使用建议**

明确性：提交信息应尽量明确，便于其他团队成员理解。  
一致性：团队内部应统一使用某种提交规范，如 Conventional Commits。  
简洁性：提交信息应简洁明了，避免冗长。  
