// 1、导入 express
const express = require('express');

// 2、创建应用对象
const app = express();

// 静态资源中间件设置
app.use(express.static(__dirname + '/public'))

// 3、创建路由
app.get('/home', (request, response) => {
  response.send('前台首页');
})

// 4、监听端口，启动服务
app.listen(3000, () => {
  console.log('服务已经启动，端口3000正在监听中。。。')
})