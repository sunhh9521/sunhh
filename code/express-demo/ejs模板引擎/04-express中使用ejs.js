const express = require('express');
const fs = require('fs');
const path = require('path');

// 创建应用对象
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
// 设置模板文件存放位置  模板文件：具有模板语法内容的文件
app.set('views', path.resolve(__dirname, './views'));

app.get('/home', (request, response) => {
  let title = '尚硅谷，让天下没有难学的技术';
  response.render('home', { title });
})

// 监听端口，启动服务
app.listen(3000, () => {
  console.log('服务已经启动，端口3000正在监听中。。。')
})