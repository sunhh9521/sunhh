// 1、导入 express
const express = require('express');
const homeRouter = require('./routers/homeRouter');

// 2、创建应用对象
const app = express();

app.use(homeRouter);

app.get('/admin', (request, response) => {
  response.send('后台首页');
})

app.get('/setting', (request, response) => {
  response.send('后台设置');
})

// 4、监听端口，启动服务
app.listen(3000, () => {
  console.log('服务已经启动，端口3000正在监听中。。。')
})