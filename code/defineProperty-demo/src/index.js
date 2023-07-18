import observe from './observe.js';
import Watcher from './Watcher.js';

var obj = {
  a: {
    m: {
      n: 5
    }
  },
  b: 10,
  c: [1, 2, 3, 4, 5]
}

observe(obj)
new Watcher(obj, 'a.m.n', (val) => {
  console.log("☆☆☆☆☆☆☆", val)
})
obj.a.m.n = 88;
console.log(obj)