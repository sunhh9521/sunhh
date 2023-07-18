# 环境搭建-VScode中自动编译ts文件

命令行运行如下命令，全局安装 TypeScript：

```
npm install -g typescript
```

安装完成后，在控制台运行如下命令，检查安装是否成功：

```
tsc -V 
```

![](./img/20230625162806.png)

在vscode中自动编译ts

新建一个文件typescript-demo，在typescript-demo目录下执行命令 tsc --init

在目录下会生成tsconfig.json配置文件

![](./img/20230625195554.png)

修改配置文件内容如下：

![](./img/20230625195841.png)

![](./img/20230625200057.png)

启动监视任务


![](./img/20230625200453.png)

![](./img/20230625200622.png)

![](./img/20230625200718.png)

运行结果有报错如下：

![](./img/20230625201611.png)

忽略，不影响代码执行

typescript-demo目录下新建index.html、index.ts

index.html

```
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8" >
    <mate name="viewport" content="width=device-width,initial-scale=1.0">
    <mate http-equiv="X-UA-Compatible" content="ie=edge">
    <title>金刚葫芦飘</title>
  </head>
  <body>
    
    <script src="./js/index.js"></script>
  </body>
</html>
```

index.ts

```
(() => {
  function sayHi(str: string) {
    return '您好，' + str
  }
  let text = '金刚葫芦飘'
  console.log(sayHi(text))
})()
```

目录结构如下：

![](./img/20230625202556.png)

自动生成index.js 如下

![](./img/20230625202656.png)

至此环境搭建完成

