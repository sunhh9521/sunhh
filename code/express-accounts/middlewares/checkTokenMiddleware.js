const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

// 声明中间件检测token
module.exports = checkTokenMiddleware = (req, res, next) => {
  // 获取token
  let token = req.get('token');
  if (!token) {
    return res.json({
      code: '2003',
      msg: 'token缺失',
      data: null
    })
  }
  // 校验token
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: '2004',
        msg: 'token 检验失败',
        data: null
      })
    }
    // 保存用户的信息
    req.user = data;
    next();
  });
}