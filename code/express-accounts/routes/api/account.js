const express = require('express');
const router = express.Router();
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware');

// 记账本的列表
router.get('/account', checkTokenMiddleware,  function(req, res, next) {
  // 获取所有的账单信息
  AccountModel.find().sort({time: -1}).exec((err, data) => {
    if (err) {
      res.json({
        code: '1001',
        msg: '读取失败',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data
    })
  })
});

// 新增记录
router.post('/account', checkTokenMiddleware, function(req, res, next) {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate()
  }, (err, data) => {
    if (err) {
      res.json({
        code: '1001',
        msg: '创建失败',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '创建成功',
      data: data
    })
  })
});

// 删除记录
router.delete('/account/:id', checkTokenMiddleware, function(req, res) {
  // 获取 params 参数
  let id = req.params.id;
  AccountModel.deleteOne({_id: id}, (err, data) => {
    if (err) {
      res.json({
        code: '1003',
        msg: '删除账单失败',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '删除成功',
      data: {}
    })
  })
});

// 获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  AccountModel.findById(id, (err, data) => {
    if (err) {
      res.json({
        code: '1004',
        msg: '读取失败',
        data: null
      })
      return
    }
    res.json({
      code: '0000',
      msg: '读取成功',
      data: data
    })
  })
})

// 更新单个账单信息
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
  let { id } = req.params;
  AccountModel.updateOne({_id: id}, req.body, (err, data) => {
    if (err) {
      res.json({
        code: '1005',
        msg: '更新失败',
        data: null
      })
      return
    }
    AccountModel.findById(id, (err, data) => {
      res.json({
        code: '0000',
        msg: '更新成功',
        data: data
      })
    })
  })
})

module.exports = router;
