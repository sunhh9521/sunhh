// 1、导入http模块
const http = require('http');

// 导入url模块
const url = require('url');

// 2、创建服务对象
const server = http.createServer((request, response) => {
  //http请求：http://127.0.0.1:9000/search?keyword=h5
  // 实例化 URL 对象
  let url = new URL(request.url, 'http://127.0.0.1');
  console.log(url);
  // url路径
  let pathname = url.pathname;
  console.log('pathname:', pathname);
  // 查询字符串
  let keyword = url.searchParams.get('keyword');
  console.log('keyword:', keyword);
  response.end('http end');
});

// 3、监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动，端口9000监听中。。。');
})