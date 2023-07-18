# Buffer（缓冲器）

## 1、概念

Buffer是一个类似于数组的对象，用于表示固定长度的字节序列

Buffer本质是一段内存空间，专门用来处理<font color=red>二进制数据</font>

![](./img/20230708093316.png)

## 2、特点

1. Buffer的大小固定且无法调整

2. Buffer性能较好，可以直接对计算机内存进行操作

3. 每个元素的大小为1字节(byte)

![](./img/20230708093647.png)

## 使用

```node
// 1. alloc
let buf = Buffer.alloc(10000); // 内容中的数据会初始化为0
console.log("buf：", buf);
// 2.allocUnsafe
let buf2 = Buffer.allocUnsafe(10000); // 不初始化内存中的数据
console.log("buf2：", buf2);
// 3. from
let buf3 = Buffer.from("hello");
let buf4 = Buffer.from([105,108,111,118,101,121,111,117]);
console.log("buf3：", buf3);
console.log("buf4：", buf4);
// buffer与字符串之间的转换
console.log("转换的字符串为：", buf4.toString()); // iloveyou
// 获取指定元素数据
let buf5 = buf4[0];
console.log("log打印的为10进制数字，buf5：", buf5); // log打印的为10进制数字
// 修改指定元素
buf4[0] = 73;
console.log("修改指定元素后转换字符串：", buf4.toString()); // Iloveyou
// 转换为二进制
let buf6 = buf5.toString(2);
console.log("转换为二进制，buf6：", buf6);
// 溢出
let newBuf = Buffer.from("hello");
newBuf[0] = 361; // 舍弃高位的数字 0001 0110 1001（361的二进制） => 0110 1001（舍弃高位，只取8位）
console.log(newBuf.toString()); // 字符串变为了 iello
// 中文
let newBuf1 = Buffer.from("你好");
console.log(newBuf1); // <Buffer e4 bd a0 e5 a5 bd>  utf-8中文，一个字符占3个字节
```