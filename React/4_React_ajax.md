# React ajax

## 4.1. 理解

### 4.1.1. 前置说明

1.	React本身只关注于界面, 并不包含发送ajax请求的代码
2.	前端应用需要通过ajax请求与后台进行交互(json数据)
3.	react应用中需要集成第三方ajax库(或自己封装)

### 4.1.2. 常用的ajax请求库

1、jQuery: 比较重, 如果需要另外引入不建议使用
2、axios: 轻量级, 建议使用
- 封装XmlHttpRequest对象的ajax
- promise风格
- 可以用在浏览器端和node服务器端

## 4.2. axios

### 4.2.1. 文档

[https://github.com/axios/axios](https://github.com/axios/axios)

### 4.2.2. 相关API

1、GET请求

```js
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

2、POST请求

```js
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
```

```js
// code/react/react_staging/05_src_github搜索案例_axios
```

## 4.3. 案例—github用户搜索

### 4.3.1. 效果

![](./img/react_4.gif)

请求地址: [https://api.github.com/search/users?q=xxxxxx](https://api.github.com/search/users?q=xxxxxx)

## 4.4. 消息订阅-发布机制

1、工具库: PubSubJS
2、下载: npm install pubsub-js --save
3、使用: 
- import PubSub from 'pubsub-js' //引入
- PubSub.subscribe('delete', function(data){ }); //订阅
- PubSub.publish('delete', data) //发布消息

```js
// code/react/react_staging/06_src_github搜索案例_pubsub
```

## 4.5. 扩展：Fetch

### 4.5.1. 文档

1、[https://github.github.io/fetch/](https://github.github.io/fetch/)
2、[https://segmentfault.com/a/1190000003810652](https://segmentfault.com/a/1190000003810652)

### 4.5.2. 特点

1.	fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求
2.	老版本浏览器可能不支持

### 4.5.3. 相关API

1、GET请求

```js
fetch(url).then(function(response) {
  return response.json()
}).then(function(data) {
  console.log(data)
}).catch(function(e) {
  console.log(e)
});
```

2、POST请求

```js
fetch(url, {
  method: "POST",
  body: JSON.stringify(data),
}).then(function(data) {
  console.log(data)
}).catch(function(e) {
  console.log(e)
})
```

```js
// code/react/react_staging/07_src_github搜索案例_fetch
```