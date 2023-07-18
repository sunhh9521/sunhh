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