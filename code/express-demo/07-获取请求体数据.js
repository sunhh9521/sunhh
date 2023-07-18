/**
 * 按要求搭建 HTTP 服务
 *    GET /login 显示表单网页
 *    POST /login 获取表单中的 用户名 和 密码
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 解析 json 格式的请求体中间件
let jsonParser = bodyParser.json();
// 解析 querystring 格式请求体的中间件
let urlencodeParser = bodyParser.urlencoded({ extended: false })

// 创建路由规则
app.get('/login', (request, response) => {
  // 响应html文件内容
  response.sendFile(__dirname + '/login.html');
})

// 请求经过 urlencodeParser 中间件处理后会在 request 身上增加一个 body 属性
app.post('/login', urlencodeParser, (request, response) => {
  console.log(request.body.username) // [Object: null prototype] { username: '123', password: '111' }
  response.send('获取用户数据');
})

app.listen(3000, () => {
  console.log('server is running......')
})