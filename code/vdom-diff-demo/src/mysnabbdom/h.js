import vnode from './vnode.js'

// 编写一个低配版本的h函数，这个函数必须接收3个参数，缺一不可
// 相当于它的重载功能较弱。
// 也就是说，调用的时候形态必须是下面的三种之一：
// 形态1：h('div', {}, '文字')
// 形态2：h('div', {}, [])
// 形态3：h('div', {}, h())
export default function(sel, data, c) {
  // 检查参数的个数
  if (arguments.length !== 3) {
    throw new Error('对不起，h函数必须传入3个参数，我是低配版本')
  }
  // 检查参数c的类型
  if (typeof c === 'string' || typeof c === 'number') {
    // 说明现在调用h函数的是形态1
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 说明现在调用h函数的是形态2
    let children = [];
    // 遍历c
    for (let i=0; i<c.length; i++) {
      // 检查c[i]必须是一个对象
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('对不起，h函数传入的第三个参数，数组参数中有项目类型错误')
      }
      children.push(c[i]);
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 说明现在调用h函数的是形态3
    // 即，传入的c是唯一的children
    let children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('对不起，h函数传入的第三个参数类型错误')
  }
}