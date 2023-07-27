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
    price: Number
  });
  // 5、创建模型对象，对文档操作的封装对象
  let BookModel = mongoose.model('books', BookSchema);
  // 6、新增
  BookModel.create({name: '西游记', author: '吴承恩', price: 99}, (err, data) => {
    // 判断是否有错误
    if (err) {
      console.log(err);
      return
    }
    // 如果没有出错，则输出插入后的文档对象
    console.log(data);
    // 7、关闭数据库连接(项目运行过程中，不会添加该代码)
    mongoose.disconnect();
  });
}); // 设置连接成功的回调
mongoose.connection.on('error', () => {
  console.log('连接失败')
}); // 设置连接错误的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭')
}); // 设置连接关闭的回调