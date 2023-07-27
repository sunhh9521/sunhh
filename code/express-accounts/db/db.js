// 导入 mongoose(mongoose 版本6)
const mongoose = require('mongoose');
const {DBHOST, DBPORT, DBNAME} = require('../config/config');

/**
 * 
 * @param {*} success 数据库连接成功的回调
 * @param {*} error 数据库连接失败的回调
 */
module.exports = function (success, error) {
  if (typeof error !== 'function') {
    error = () => {
      console.log('连接失败');
    }
  }
  mongoose.set('strictQuery', false);
  // 连接 mongodb 服务
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  // 设置回调
  mongoose.connection.once('open', () => {
    success();
  }); // 设置连接成功的回调
  mongoose.connection.on('error', () => {
    error();
  }); // 设置连接错误的回调
  mongoose.connection.on('close', () => {
    console.log('连接关闭')
  }); // 设置连接关闭的回调
}
