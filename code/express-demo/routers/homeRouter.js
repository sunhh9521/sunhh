// 导入 express
const express = require('express');

// 创建路由对象
const router = express.Router();

// 创建路由
router.get('/home', (request, response) => {
  response.send('前台首页');
})

router.get('/search', (request, response) => {
  response.send('前台搜索');
})

module.exports = router