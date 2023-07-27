var express = require('express');
var path = require('path');
var router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

// 获取注册页面
router.get('/reg', (req, res) => {
  res.render('auth/reg')
});

// 获取登录页面
router.get('/login', (req, res) => {
  res.render('auth/login')
});

// 注册
router.post('/reg', (req, res) => {
  UserModel.create({ ...req.body, password: md5(req.body.password) }, (err, data) => {
    if (err) {
      res.status(500).send('注册失败');
      return
    }
    res.render('success', { msg: '注册成功', url: '/login'})
  })
});

// 登录
router.post('/login', (req, res) => {
  let { username, password } = req.body;
  UserModel.findOne({ username: username, password: md5(password) }, (err, data) => {
    if (err) {
      res.status(500).send('登录失败');
      return
    }
    if (!data) {
      return res.send('账号或密码错误');
    }
    req.session.username = data.username;
    res.render('success', { msg: '登录成功', url: '/account' });
  })
});

// 退出登录
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', { msg: '退出成功', url: '/login' });
  })
});

module.exports = router;
