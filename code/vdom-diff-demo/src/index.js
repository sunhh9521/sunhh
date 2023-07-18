import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js'

const btn = document.getElementById('btn');

// const myVnode1 = h('section', {}, '你好');
const myVnode1 = h('ul', {}, [
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E')
]);
const container = document.getElementById('container');
// 第一次上树
patch(container, myVnode1)

// const myVnode2 = h('section', {}, '你好')
const myVnode2 = h('ul', {}, [
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'T' }, 'T'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'Z' }, 'Z'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
]);

btn.addEventListener('click', () => {
  patch(myVnode1, myVnode2)
})
