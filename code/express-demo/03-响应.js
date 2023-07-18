// 1、导入 express
const express = require('express');

// 2、创建应用对象
const app = express();

// 3、创建路由
app.get('/response', (request, response) => {
  // 原生响应
  // response.statusCode = 404;
  // response.statusMessage = 'love';
  // response.setHeader('xxx', 'yyy');
  // response.write('hello express');
  // response.end('response');

  // express 响应
  // response.status(500);
  // response.set('aaa', 'bbb');
  // response.send('你好，express');

  //连贯操作
  // res.status(404).set('xxx','yyy').send('你好朋友')

  // 其他响应
  // response.redirect('https:www.baidu.com'); // 重定向
  // 下载响应
  // response.download(__dirname + '/package.json');
  // json响应
  // response.json({
  //   name: "孙悟空",
  //   age: 18
  // })
  // 响应文件内容
  response.sendFile(__dirname + '/package.json');
})

// 4、监听端口，启动服务
app.listen(3000, () => {
  console.log('服务已经启动，端口3000正在监听中。。。')
})