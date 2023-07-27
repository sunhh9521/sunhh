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
  // 6、更新文档，更新一条
  // BookModel.updateOne({name: '红楼梦'}, {price: 9.9}, (err, data) => {
  //   // 判断
  //   if (err) {
  //     console.log('更新失败');
  //     return
  //   }
  //   console.log(data);
  // })
  // 6、批量更新
  BookModel.updateMany({author: '余华'}, {is_hot: false}, (err, data) => {
    // 判断
    if (err) {
      console.log('更新失败');
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