// 1、导入 express
const express = require('express');
const fs = require('fs');
const path = require('path');

// 2、创建应用对象
const app = express();

// 声明中间件函数
function recordMiddleware(request, response, next) {
  // 获取url和ip
  const { url, ip } = request;
  // 将信息保存在文件中 access.log
  fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`);
  // 调用next()
  next();
}

// 使用中间件函数
app.use(recordMiddleware);

// 3、创建路由
app.get('/home', (request, response) => {
  response.send('前台首页');
})

app.get('/admin', (request, response) => {
  response.send('后台首页');
})

app.all('*', (request, response) => {
  response.send('<h1>404 Not Found</h1>');
})

// 4、监听端口，启动服务
app.listen(3000, () => {
  console.log('服务已经启动，端口3000正在监听中。。。')
})