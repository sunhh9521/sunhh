import h from './mysnabbdom/h.js'

var myVnode1 = h('div', {}, [
  h('p', {}, '哈哈'),
  h('p', {}, '嘻嘻'),
  h('p', {}, '呵呵'),
  h('p', {}, h('span', {}, 'A'))
]);
console.log(myVnode1)