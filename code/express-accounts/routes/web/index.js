const express = require('express');
const router = express.Router();
const moment = require('moment');
const checkLoginMiddleware = require('../../middlewares/checkLoginMiddleware');
const AccountModel = require('../../models/AccountModel');

// 首页
router.get('/', (req, res) => {
  res.redirect('/account');
})

// 记账本的列表
router.get('/account', checkLoginMiddleware, function(req, res, next) {
  // 获取所有的账单信息
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if (err) {
      console.log('读取失败');
      return
    }
    res.render('list', { accounts: data, moment })
  })
});

// 添加记录
router.get('/account/create', checkLoginMiddleware, function(req, res, next) {
  res.render('create')
});

// 新增记录
router.post('/account', checkLoginMiddleware, function(req, res, next) {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    res.render('success', {msg: '添加成功了哦', url: '/account'})
  })
});

// 删除记录
router.get('/account/:id', checkLoginMiddleware, function(req, res) {
  // 获取 params 参数
  let id = req.params.id;
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if (err) {
      res.status(500).send('删除失败');
      return
    }
    res.render('success', {msg: '删除成功', url: '/account'})
  })
});

module.exports = router;
