# git 常用操作指令

转载自：https://juejin.cn/post/7133507623399194661

## git 安装

在使用Git前我们需要先安装 Git。Git 目前支持 Linux/Unix、Solaris、Mac和Windows 平台上运行。

Git 各平台安装包下载地址为：[https://git-scm.com/downloads](https://git-scm.com/downloads)

本文在windows系统安装git，安装后配置：[https://www.runoob.com/git/git-install-setup.html](https://www.runoob.com/git/git-install-setup.html)

## git 命令大全（整理成表格，方便查阅）

### 创建仓库命令

命令|说明
---|---
<font color=red>git init</font>|初始化仓库，在当前目录新建一个Git代码库，基本上是创建一个具有<font color=red>objects，refs/head，refs/tags</font>和模板文件的<font color=red>.git</font>目录
<font color=red>git clone [url]</font>|拷贝一份远程仓库，也就是下载一个项目和它的整个代码历史。

### 配置

命令|说明
---|---
<font color=red>git config --list</font>|显示当前的**Git配置**
git config -e [--global]|编辑Git配置文件
git config [--global] user.name "[name]"<br>git config [--global] user.email "[email address]"|设置提交代码时的**用户信息**

### 增加 / 删除文件

命令|说明
---|---
<font color=red>git add [file1] [file2] ...</font>|添加**指定文件**到暂存区
git add [dir]|添加**指定目录**到暂存区，包括子目录
git add .|添加当前目录的**所有文件**到暂存区
git add -p|添加每个变化前，都会要求确认<br>对于同一个文件的多处变化，可以实现分次提交
git rm [file1] [file2] ...|**删除**工作区文件，并且将这次删除放入暂存区
git rm --cached [file]|停止追踪指定文件，但该文件会保留在工作区
git mv [file-original] [file-renamed]|**改名**文件，并且将这个改名放入暂存区

### 代码提交

命令|说明
---|---
<font color=red>git commit -m [message]</font>|提交暂存区到仓库区
git commit [file1] [file2] ... -m [message]|提交暂存区的**指定文件**到仓库
git commit -a|提交工作区**自上次commit之后**的变化，直接到仓库区
git commit -v|提交时显示**所有diff**信息
git commit --amend -m [message]|使用一次新的commit，替代上一次提交<br>如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend [file1] [file2] ...|**重做上一次commit**，并包括指定文件的新变化

### 分支

命令|说明
---|---
git branch|列出所有**本地分支**
git branch -r|列出所有**远程分支**
git branch -a|列出所有**本地分支和远程分支**
git branch [branch-name]|新建一个分支，但依然停留在当前分支
git checkout -b [branch]|新建一个分支，并切换到该分支
git branch --track [branch] [remote-branch]|新建一个分支，与指定的远程分支建立追踪关系
git checkout [branch-name]|切换到指定分支，并更新工作区
git checkout -|**切换**到上一个分支
git branch --set-upstream [branch] [remote-branch]|建立追踪关系，在现有分支与指定的远程分支之间
git merge [branch]|**合并**指定分支到当前分支
git cherry-pick [commit]|选择一个commit，合并进当前分支
git branch -d [branch-name]|**删除分支**
git push origin --delete [branch-name]<br>或<br>git branch -dr [remote/branch]|**删除远程分支**

### 标签

命令|说明
---|---
git tag|列出所有tag
git tag [tag]|新建一个tag在当前commit
git tag [tag] [commit]|新建一个tag在指定commit
git tag -d [tag]|删除**本地tag**
git push origin :refs/tsgs/[tagName]|删除**远程tag**
git show [tag]|查看tag信息
git push [remote] [tag]|提交**指定tag**
git push [remote] --tags|提交**所有tag**
git checkout -b [branch] [tag]|新建一个分支，指向某个tag

### 查看信息和历史

命令|说明
---|---
git status|显示有变更的文件
git log|显示当前分支的版本历史
git log --stat|显示commit历史，以及每次commit发生变更的文件
git log -S [keywork]|搜索提交历史，根据关键词
git log [tag] HEAD --pretty=format:%s|显示某个commit之后的所有变动，每个commit占据一行
git log [tag] HEAD --grep feature|显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
git log --follow [file]<br>或<br>git whatchanged [file]|显示某个文件的版本历史，包括文件改名
git log -p [file]|显示指定文件相关的每一次diff
git log -5 --pretty --oneline|显示过去5次提交
git shortlog -sn|显示所有提交过的用户，按提交次数排序
git blame [file]|显示指定文件是什么人在什么时间修改过
git diff|显示**暂存区和工作区**的差异
git diff --cached [file]|显示**暂存区和上一个commit**的差异
git diff HEAD|显示**工作区与当前分支最新commit之间**的差异
git diff [first-branch]...[second-branch]|显示**两次提交之间**的差异
git diff --shortstat "@{0 day age}"|**显示今天你写了多少行代码**
git show [commit]|显示某次提交的元数据和内容变化
git show --name-only [commit]|显示某次提交发生变化的文件
git show [commit]:[filename]|显示某次提交时，某个文件的内容
git reflog|显示当前分支的最近几次提交

### 远程同步

命令|说明
---|---
git fetch [remote]|下载远程仓库的所有变动（**远程新增或删除分支都能显示**）
git remote -v|显示**所有远程仓库**
git config [--global] user.name "[name]"<br>或<br>git config [--global] user.email "[email address]"|设置提交代码时的用户信息
git remote show [remote]|显示某个远程仓库的信息
git remote add [shortname] [url]|增加一个新的远程仓库，并命名
git pull [remote] [branch]|取回远程仓库的变化，并与本地分支合并
git push [remote] [branch]|上传本地指定分支到远程仓库
git push [remote] --force|强行推送当前分支到远程仓库，即使有冲突
git push [remote] --all|推送所有分支到远程仓库

### 撤销

命令|说明
---|---
git checkout [file]|恢复暂存区的指定文件到工作区
git checkout [commit] [file]|恢复某个commit的指定文件到暂存区和工作区
git checkout .|恢复暂存区的所有文件到工作区
git reset [file]|重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
git reset --hard|重置暂存区与工作区，与上一次commit保持一致
git reset [commit]|重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
git reset --hard [commit]|重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
git reset --keep [commit]|重置当前HEAD为指定commit，但保持暂存区和工作区不变
git revert --keep [commit]|重置当前HEAD为指定commit，但保持暂存区和工作区不变
git revert [commit]|新建一个commit，用来撤销指定commit<br>后者的所有变化都将被前者抵消，并且应用到当前分支
git stash|暂时将未提交的变化一处，稍后再移入
git stash pop|将移除的变化恢复到工作区

### 其他

命令|说明
---|---
git archive|生成一个可供发布的压缩包
git repack|打包未归档文件
git count-objects|计算捷豹的对象数量
git help<br>或<br>git --help|**Git帮助**，查看git相关命令，如果想看某个特定命令的具体细节，可使用git[命令] --help，如 **git commit --help** 表示查看提交相关命令的帮助

## Git操作流程

git的操作往往都不是一个命令能解决的，就比如下图所示，单单**代码提交和同步代码**，就涉及到6个命令的组合。

看完了git的命令大全，这节列举了实际操作中的不同场景，为大家一一解答如何组合不同git命令进行git的操作流程。

代码的提交和同步代码

![](./img/7da4343a57a94243b47b08a625b16ef0.awebp)

代码撤销和撤销同步

![](./img/21863588e7b24bfa9ba858106a812c04.awebp)

### 1、代码提交和同步代码

- 第零步: 工作区与仓库保持一致
- 第一步: 文件增删改，变为已修改状态
- 第二步: git add ，变为已暂存状态

```conf
$ git status
$ git add --all # 当前项目下的所有更改
$ git add .  # 当前目录下的所有更改
$ git add xx/xx.py xx/xx2.py  # 添加某几个文件
```

- 第三步: git commit，变为已提交状态

```conf
$ git commit -m"<这里写commit的描述>"
```

- 第四步: git push，变为已推送状态

```conf
$ git push -u origin master # 第一次需要关联上
$ git push # 之后再推送就不用指明应该推送的远程分支了
$ git branch # 可以查看本地仓库的分支
$ git branch -a # 可以查看本地仓库和本地远程仓库(远程仓库的本地镜像)的所有分支
```

在某个分支下，我最常用的操作如下

```conf
$ git status
$ git add -a
$ git status
$ git commit -m 'xxx'
$ git pull --rebase
$ git push origin xxbranch` 
```

### 2、代码撤销和撤销同步

#### 一、已修改，但未暂存

```conf
$ git diff # 列出所有的修改
$ git diff xx/xx.py xx/xx2.py # 列出某(几)个文件的修改

$ git checkout # 撤销项目下所有的修改
$ git checkout . # 撤销当前文件夹下所有的修改
$ git checkout xx/xx.py xx/xx2.py # 撤销某几个文件的修改
$ git clean -f # untracked状态，撤销新增的文件
$ git clean -df # untracked状态，撤销新增的文件和文件夹

# Untracked files:
#  (use "git add <file>..." to include in what will be committed)
#
#	xxx.py
```

#### 二、已暂存，未提交

这个时候已经执行过git add，但未执行git commit，但是用git diff已经看不到任何修改。 因为git diff检查的是工作区与暂存区之间的差异。

```conf
$ git diff --cached # 这个命令显示暂存区和本地仓库的差异

$ git reset # 暂存区的修改恢复到工作区
$ git reset --soft # 与git reset等价，回到已修改状态，修改的内容仍然在工作区中
$ git reset --hard # 回到未修改状态，清空暂存区和工作区
```

git reset --hard 操作等价于 git reset 和 git checkout 2步操作

#### 三、已提交，未推送

执行完commit之后，会在仓库中生成一个版本号(hash值)，标志这次提交。之后任何时候，都可以借助这个hash值回退到这次提交。

```conf
$ git diff <branch-name1> <branch-name2> # 比较2个分支之间的差异
$ git diff master origin/master # 查看本地仓库与本地远程仓库的差异

$ git reset --hard origin/master # 回退与本地远程仓库一致
$ git reset --hard HEAD^ # 回退到本地仓库上一个版本
$ git reset --hard <hash code> # 回退到任意版本
$ git reset --soft/git reset # 回退且回到已修改状态，修改仍保留在工作区中。 
```

#### 四、已推送到远程

```conf
$ git push -f orgin master # 强制覆盖远程分支
$ git push -f # 如果之前已经用 -u 关联过，则可省略分支名
```

慎用，一般情况下，本地分支比远程要新，所以可以直接推送到远程，但有时推送到远程后发现有问题，进行了版本回退，旧版本或者分叉版本推送到远程，需要添加 -f参数，表示强制覆盖。

### 3、其它常见操作

#### 一、关联远程仓库

如果还没有Git仓库，你需要

```conf
$ git init
```

如果你想关联远程仓库

```conf
$ git remote add <name> <git-repo-url>
# 例如 git remote add origin https://github.com/xxxxxx # 是远程仓库的名称，通常为 origin 
```

如果你想关联多个远程仓库

```conf
$ git remote add <name> <another-git-repo-url>
# 例如 git remote add coding https://coding.net/xxxxxx 
```

忘了关联了哪些仓库或者地址

```conf
$ git remote -v
# origin https://github.com/gzdaijie/koa-react-server-render-blog.git (fetch)
# origin https://github.com/gzdaijie/koa-react-server-render-blog.git (push) 
```

如果远程有仓库，你需要clone到本地

```conf
$ git clone <git-repo-url>
# 关联的远程仓库将被命名为origin，这是默认的。
```

如果你想把别人仓库的地址改为自己的

```conf
$ git remote set-url origin <your-git-url>
```

#### 二、 切换分支

新建仓库后，默认生成了master分支

如果你想新建分支并切换

```conf
$ git checkout -b <new-branch-name>
# 例如 git checkout -b dev
# 如果仅新建，不切换，则去掉参数 -b
```

看看当前有哪些分支

```conf
$ git branch
# * dev
#   master # 标*号的代表当前所在的分支
```

看看当前本地&远程有哪些分支

```conf
$ git branch -a
# * dev
#   master
#   remotes/origin/master
```

切换到现有的分支

```conf
$ git checkout master
```

你想把dev分支合并到master分支

```conf
$ git merge <branch-name>
# 例如 git merge dev
```

你想把本地master分支推送到远程去

```conf
$ git push origin master
# 你可以使用git push -u origin master将本地分支与远程分支关联，之后仅需要使用git push即可。
```

远程分支被别人更新了，你需要更新代码

```conf
$ git pull origin <branch-name>
# 之前如果push时使用过-u，那么就可以省略为git pull
```

本地有修改，能不能先git pull

```conf
$ git stash # 工作区修改暂存
$ git pull  # 更新分支
$ git stash pop # 暂存修改恢复到工作区  
```

#### 三、 撤销操作

恢复暂存区文件到工作区

```conf
$ git checkout <file-name> 
```

恢复暂存区的所有文件到工作区

```conf
$ git checkout .
```

重置暂存区的某文件，与上一次commit保持一致，但工作区不变

```conf
$ git reset <file-name>
```

重置暂存区与工作区，与上一次commit保持一致

```conf
$ git reset --hard <file-name>
# 如果是回退版本(commit)，那么file，变成commit的hash码就好了。 
```

去掉某个commit

```conf
$ git revert <commit-hash>
# 实质是新建了一个与原来完全相反的commit，抵消了原来commit的效果 
```

reset回退错误恢复

```conf
$ git reflog #查看最近操作记录
$ git reset --hard HEAD{5} #恢复到前五笔操作
$ git pull origin backend-log #再次拉取代码
```

#### 四、版本回退与前进

查看历史版本

```conf
$ git log
```

你可能觉得这样的log不好看，试试这个

```conf
$ git log --graph --decorate --abbrev-commit --all
```

检出到任意版本

```conf
$ git checkout a5d88ea
# hash码很长，通常6-7位就够了
```

远程仓库的版本很新，但是你还是想用老版本覆盖

```conf
$ git push origin master --force
# 或者 git push -f origin master
```

觉得commit太多了? 多个commit合并为1个

```conf
$ git rebase -i HEAD~4
# 这个命令，将最近4个commit合并为1个，HEAD代表当前版本。将进入VIM界面，你可以修改提交信息。推送到远程分支的commit，不建议这样做，多人合作时，通常不建议修改历史。 
```

想回退到某一个版本

```conf
$ git reset --hard <hash>
# 例如 git reset --hard a3hd73r
# --hard代表丢弃工作区的修改，让工作区与版本代码一模一样，与之对应，--soft参数代表保留工作区的修改。
```

想回退到上一个版本，有没有简便方法?

```conf
$ git reset --hard HEAD^ 
```

回退到上上个版本呢?

```conf
$ git reset --hard HEAD^^
# HEAD^^可以换作具体版本hash值。
```

回退错了，能不能前进呀

```conf
$ git reflog
# 这个命令保留了最近执行的操作及所处的版本，每条命令前的hash值，则是对应版本的hash值。使用上述的git checkout 或者 git reset命令 则可以检出或回退到对应版本。
```

刚才commit信息写错了，可以修改吗

```conf
$ git commit --amend
```

看看当前状态吧

```conf
git status 
```

#### 五、配置属于你的Git

看看当前的配置

```conf
$ git config --list 
```

估计你需要配置你的名字

```conf
$ git config --global user.name "<name>
#  --global为可选参数，该参数表示配置全局信息` 
```

希望别人看到你的commit可以联系到你

```conf
$ git config --global user.email "<email address>" 
```

有些命令很长，能不能简化一下

```conf
$ git config --global alias.logg "log --graph --decorate --abbrev-commit --all"
# 之后就可以开心地使用 git log了
```

## 5. 参考资料

- [官方的git教程](https://git-scm.com/docs)
- 安装
  - [Git 安装配置|](https://www.runoob.com/git/git-install-setup.html)[菜鸟教程 (runoob.com)](https://www.runoob.com/git/git-install-setup.html)
- Git Pro 2
  - [Git Pro2英文Github仓库 (opens new window)](https://github.com/progit/progit2)
  - [Git Pro2中文Gitbook (opens new window)](https://bingohuang.gitbooks.io/progit2/content/01-introduction/sections/about-version-control.html)
  - [Git Pro2对应的中文Markdown版本的仓库地址 (opens new window)](https://github.com/bingohuang/progit2-gitbook)
  - [Git Pro中文阅读 (opens new window)](https://gitee.com/progit/index.html)
- 其它资料
  - [99%的时间在使用的Git命令 (opens new window)](http://imtuzi.com/post/most-used-git-cmd.html)
  - [GIT分支开发模型规范 (opens new window)](https://www.jianshu.com/p/cbd8cf5e232d)
  - [Git - 简明指南 (opens new window)](http://rogerdudler.github.io/git-guide/index.zh.html)
  - [图解 Git (opens new window)](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)
  - [廖雪峰 : Git 教程 (opens new window)](https://www.liaoxuefeng.com/wiki/896043488029600)
  - [Learn Git Branching (opens new window)](https://learngitbranching.js.org/?locale=zh_CN)