const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// 设置cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('name', 'zhangsan'); // 设置cookie 会在浏览器关闭的时候销毁
  // res.cookie('name', 'rose', { maxAge: 60*1000 }); // 设置cookie失效时间
  res.send('set-cookie')
})

// 删除cookie
app.get('/remove-cookie', (req, res) => {
  res.clearCookie('name'); // 移除 cookie 中的 name 属性
  res.send('remove-cookie')
})

// 读取cookie（通过cookie-parser中间件）
app.get('/get-cookie', (req, res) => {
  console.log(req.cookies); // 读取 cookie 中的 name 属性
  res.send('get-cookie')
})

app.listen(3000)