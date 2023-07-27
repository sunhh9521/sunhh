var express = require('express');
var router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/UserModel');
const { secret } = require('../../config/config');

// 登录
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  console.log(req.body);
  UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
    if (err) {
      res.status(500).send('登录失败');
      res.json({
        code: '2001',
        msg: '数据库读取失败',
        data: null
      })
      return
    }
    if (!data) {
      return res.json({
        code: '2002',
        msg: '用户名或密码错误',
        data: null
      })
    }
    // 创建token
    let token = jwt.sign({
      username: data.username,
      _id: data._id,
    }, secret, {
      expiresIn: 60*60*24*7
    })
    // 响应token
    res.json({
      code: '0000',
      msg: '登录成功',
      data: token
    })
  })
});

// 退出登录
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' });
  })
});

module.exports = router;
