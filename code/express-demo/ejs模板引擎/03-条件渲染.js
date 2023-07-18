/**
 * 通过 isLogin 决定最终的输出内容
 *    true 输出 <span>欢迎回来</span>
 *    false 输出 <button>登录</button> <button>注册</button>
 */

const ejs = require('ejs');

let isLogin = false;

let result = ejs.render(`
    <% if (isLogin) { %>
      <span>欢迎回来</span>
    <% }else { %>
      <button>登录</button> <button>注册</button>
      <% } %>
  `, { isLogin });
  
  console.log(result);