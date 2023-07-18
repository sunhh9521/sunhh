// 1、导入http模块keyword
const http = require('http');

// 导入url模块
const url = require('url');

// 2、创建服务对象
const server = http.createServer((request, response) => {
  //http请求：http://127.0.0.1:9000/search?keyword=h5
  // let res = url.parse(request.url); // 查询字字符串返回是一个字符串
  let res = url.parse(request.url, true); // 查询字字符串返回是一个对象
  console.log(res);
  // 路径
  let pathname = res.pathname;
  console.log('pathname:', pathname);
  // 查询字符串
  let keyword = res.query.keyword;
  console.log('keyword:', keyword);
  response.end('http end');
});

// 3、监听端口，启动服务
server.listen(9000, () => {
  console.log('服务已经启动，端口9000监听中。。。');
})