import { hi } from './m';

function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(123,456));

console.log(hi);

const obj = {
  name: "孙悟空",
  age: 33
}

console.log(obj); 

obj.age = 18;

console.log(obj)