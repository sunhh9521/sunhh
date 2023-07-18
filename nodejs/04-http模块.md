# http模块

## 创建 http 服务

```node
// 1、导入http模块
const http = require('http');

// 2、创建服务对象
// request 意为请求，是对请求报文的封装对象，通过request对象可以获得请求报文的数据
// response 意为响应，是对响应报文的封装对象，通过response对象可以设置响应报文
const server = http.createServer((request, response) => {
  response.end('hello http server');
});

// 3、监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动，端口9000监听中。。。');
})
```

## 注意事项

1. 命令行 <font color=red>ctrl + c</font> 停止服务

2. 当服务启动后，更新代码<font color=red>必须重启服务才能生效</font>

3. 响应内容中文乱码的解决办法
```node
response.setHeader('content-type','text/html;charset=utf-8');
```

4. 端口号被占用
```node
Error: listen EADDRINUSE: address already in use :::9000
```
1）关闭当前正在运行监听端口的服务 （<font color=red>使用较多</font>）
2）修改其他端口号

5. HTTP 协议默认端口是 80 。HTTPS 协议的默认端口是 443, HTTP 服务开发常用端口有 3000，
8080，8090，9000 等

如果端口被其他程序占用，可以使用资源监视器找到占用端口的程序，然后使用任务管理器关闭
对应的程序

## 获取 HTTP 请求报文

想要获取请求的数据，需要通过 <font color=red>request</font> 对象

含义|语法|重点掌握
---|---|---
请求方法|request.method|*
请求版本|request.httpVersion|
请求路径|request.url|*
URL路径|require('url').parse(request.url).pathname|*
URL查询字符串|require('url').parse(requset.url, true).query|*
请求头|request.headers|*
请求体|request.on('data', function(chunk){})<br>request.on('end', function(){})|

注意事项：

1. request.url 只能获取路径以及查询字符串，无法获取 URL 中的域名以及协议的内容
2. request.headers 将请求信息转化成一个对象，并将属性名都转化成了『小写』
3. 关于路径：如果访问网站的时候，只填写了 IP 地址或者是域名信息，此时请求的路径为『/ 』
4. 关于 favicon.ico：这个请求是属于浏览器自动发送的请求

**提取http报文请求体**

```node
// 1、导入http模块
const http = require('http');

// 2、创建服务对象
const server = http.createServer((request, response) => {
  // 1、声明一个变量
  let body = '';
  // 2、绑定 data 事件
  request.on('data', chunk => {
    body += chunk;
  })
  // 3、绑定 end 事件
  request.on('end', () => {
    console.log(body);
    // 响应
    response.end('http end')
  })
});

// 3、监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动，端口9000监听中。。。');
})
```

**提取http报文url路径及查询字符串**

```node
// 1、导入http模块keyword
const http = require('http');

// 导入url模块
const url = require('url');

// 2、创建服务对象
const server = http.createServer((request, response) => {
  //http请求：http://127.0.0.1:9000/search?keyword=h5
  // let res = url.parse(request.url); // 查询字字符串返回是一个字符串
  let res = url.parse(request.url, true); // 查询字字符串返回是一个对象
  console.log(res);
  // 路径
  let pathname = res.pathname;
  console.log('pathname:', pathname);
  // 查询字符串
  let keyword = res.query.keyword;
  console.log('keyword:', keyword);
  response.end('http end');
});

// 3、监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动，端口9000监听中。。。');
})
```

**提取http报文url路径及查询字符串(新)**

```node
// 1、导入http模块
const http = require('http');

// 导入url模块
const url = require('url');

// 2、创建服务对象
const server = http.createServer((request, response) => {
  //http请求：http://127.0.0.1:9000/search?keyword=h5
  // 实例化 URL 对象
  let url = new URL(request.url, 'http://127.0.0.1');
  console.log(url);
  // url路径
  let pathname = url.pathname;
  console.log('pathname:', pathname);
  // 查询字符串
  let keyword = url.searchParams.get('keyword');
  console.log('keyword:', keyword);
  response.end('http end');
});

// 3、监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动，端口9000监听中。。。');
})
```

## 设置 HTTP 响应报文

作用|语法
---|---
设置响应状态码|response.statusCode
设置响应状态描述|response.statusMessage
设置响应头信息|response.setHeader('头名', '头值')
设置响应体|response.write('xx')<br>response.end('xxx')

```node
// 导入 http 模块
const http = require('http');

const server = http.createServer((request, response) => {
  // 设置响应状态码
  response.statusCode = 200;
  // 设置响应状态的描述
  response.statusMessage = 'i love u';
  // 设置响应头
  response.setHeader('content-type', 'text/html;charset=utf-8');
  // 设置多个同名的响应头
  response.setHeader('test', ['a', 'b', 'c']);
  // 响应体的设置
  response.write('love');
  response.write('love');
  response.write('love');
  response.write('love');
  response.end(); // //每一个请求，在处理的时候必须要执行 end 方法的，一般write设置了内容，end就不需要再设置内容了
})

server.listen('9000', () => {
  console.log('服务已经启动，端口9000监听中。。。');
})
```

## 设置资源类型（mime类型）

媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

```node
mime 类型结构： [type]/[subType]
例如： text/html text/css image/jpeg image/png application/json
```
HTTP 服务可以设置响应头 Content-Type 来表明响应体的 MIME 类型，浏览器会根据该类型决定如何处理
资源

下面是常见文件对应的 mime 类型

```node
html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg',
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
```

对于未知的资源类型，可以选择 <font color=red>application/octet-stream</font> 类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的下载效果
