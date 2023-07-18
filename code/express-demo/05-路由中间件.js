/**
 * 实现需求：
 *  针对/admin /setting 的请求，要求url携带code=521，否则提示暗号错误
 */
// 1、导入 express
const express = require('express');
const fs = require('fs');
const path = require('path');

// 2、创建应用对象
const app = express();

// 3、创建路由
app.get('/home', (request, response) => {
  response.send('前台首页');
})

// 声明中间件
let checkCodeMiddleware = (request, response, next) => {
  // 判断 url 中是否 code 参数为521
  if(request.query.code === '521') {
    next();
  }else {
    response.send('暗号错误');
  }
}

app.get('/admin', checkCodeMiddleware, (request, response) => {
  response.send('后台首页');
})

app.get('/setting', checkCodeMiddleware, (request, response) => {
  response.send('设置首页');
})

app.all('*', (request, response) => {
  response.send('<h1>404 Not Found</h1>');
})

// 4、监听端口，启动服务
app.listen(3000, () => {
  console.log('服务已经启动，端口3000正在监听中。。。')
})