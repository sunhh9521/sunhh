// 导入 express
const express = require('express');
// 创建应用对象
const app = express();
// 获取请求的路由规则
app.get('/request', (request, response) => {
  // 1、获取报文的方式与原生 HTTP 获取方式是兼容的
  // 原生操作
  console.log(request.method);
  console.log(request.url);
  console.log(request.httpVersion);
  console.log(request.headers);
  // 2、express 独有的获取报文的方式
  // express 操作
  console.log(request.path);
  // 获取查询字符串
  console.log(request.query); // 『相对重要』
  // 获取 ip
  console.log(request.ip)
  // 获取指定的请求头
  console.log(request.get('host'));
  response.send('请求报文的获取');
});
// 启动服务
app.listen(3000, () => {
  console.log('启动成功....')
})