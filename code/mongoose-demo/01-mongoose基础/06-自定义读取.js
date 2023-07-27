// 1、导入 mongoose(mongoose 版本6)
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// 2、连接 mongodb 服务
mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

// 3、设置回调
mongoose.connection.once('open', () => {
  console.log('连接成功');
  // 4、创建文档的结构对象
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
  });
  // 5、创建模型对象，对文档操作的封装对象（mongoose 会使用集合名称的复数创建集合）
  let BookModel = mongoose.model('novel', BookSchema);
  // 6、字段筛选
  // 设置字段 1：需要读取的字段 0：不需要读取的字段
  // BookModel.find().select({name: 1, author: 1, _id: 0}).exec((err, data) => {
  //   // 判断
  //   if (err) {
  //     console.log('读取失败');
  //     return
  //   }
  //   console.log(data);
  // })
  // 6、数据排序 1：升序  0：降序
  // BookModel.find().select({name: 1, author: 1,price: 1, _id: 0}).sort({price: 1}).exec((err, data) => {
  //   // 判断
  //   if (err) {
  //     console.log('读取失败');
  //     return
  //   }
  //   console.log(data);
  // })
  // 6、数据截取
  // skip 跳过 limit 限定
  // 按照价格升序排序，取出4-6名排名
  BookModel.find().select({name: 1, author: 1,price: 1, _id: 0}).sort({price: 1}).skip(3).limit(3).exec((err, data) => {
    // 判断
    if (err) {
      console.log('读取失败');
      return
    }
    console.log(data);
  })
}); // 设置连接成功的回调
mongoose.connection.on('error', () => {
  console.log('连接失败')
}); // 设置连接错误的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭')
}); // 设置连接关闭的回调