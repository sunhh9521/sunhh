const ejs = require('ejs');
const fs = require('fs');

let china = '中国';

let str = fs.readFileSync('./01-ejs初体验.html').toString();

// 使用ejs渲染
let result = ejs.render(str, { china });
console.log(result)