# 手写call、apply、bind及new操作符

### call

##### call 实现思路

不考虑使用 call、apply、bind 方法，上面例子 fn 函数如何能拿到 obj 里面的 value 值呢？改造一下上面的例子

```js
const obj = {
  value: 1,
  fn: function() {
    console.log(this.value); // 1
  }
}
obj.fn();
```

这样一改，this 就指向了 obj，根据这个思路，可以封装一个方法，将传入的 this，转换成这样的方式，那么当前 this 的指向就是我们想要的结果。需要注意fn函数不能写成箭头函数，因为箭头函数没有this。所以模拟的步骤为：

1、将函数设置为传入对象的属性；
2、执行该函数；
3、删除该属性；

##### call代码实现

```js
Function.prototype.call1 = function() {
  const [context, ...args] = arguments;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res;
}
```

### apply

##### apply 实现思路

从定义上知道，apply 相比于 call 方法，区别在与 this 后面的参数,call 后面的有一个或多个参数，而 apply 只有两个参数，第二个参数是一个数组

apply 的实现思路和 call 一样，需要考虑的是 apply 只有两个参数。

##### apply 代码实现

```js
Function.prototype.apply1 = function(context, args) {
  context.fn = this;
  let res = !args ? context.fn() : context.fn(...args);
  delete context.fn;
  return res;
}
```

### new 操作符

##### new到底做了哪些事情

我们先写一段很简单的代码，定义一个Person类, 使用new来创建一个Person的实例

```js
function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;
}

Person.prototype.getFullName = function () {
  return `${this.firtName} ${this.lastName}`;
};

const tb = new Person('Chen', 'Tianbao');
console.log(tb);
```

查看一个控制台中tb实例的

![](./img/16d0b06a46b74d3e.image)

从图中我们可以看到.实例里面有以下东西

- 两个属性, firtName和lastName, 并均以赋值

- 原型上有一个getFullName方法和一个构造器

##### 分析完实例后, 我们就很容易知道, new到底做了什么

- 创建一个新的对象

- 添加父类的属性到新的对象上并初始化.

- 继承父类原型上的方法.

- 返回新对象. 但是? 上面的描述完全正确吗?

我将我们的demo代码, 做一点点更改. 在构造器上添加一个return.

```js
function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;

  return {
    fullName: `${this.firtName} ${this.lastName}`
  };
}
```

控制台中，看看有什么不一样.

![](./img/16d0b12a41616b93.image)

我们发现, 这是执行后, 实际的实例, 返回的就是一个普通的object对象. 这个对象就是执行return时的结果

我们进一步探索, 如果返回的不是一个对象, 而是一个Nubmer和String, 会怎么样呢?

```js
function Person(firtName, lastName) {
  this.firtName = firtName;
  this.lastName = lastName;

  return 'demo';
}
```

从控制台中, 可以看到, 和没有写return是一样的. 返回的都是新创建的Person实例

![](./img/16d0b06a46b74d3e1.image)

##### 经过上面的分析, new到底做了什么事情, 我们就很容易归纳了

- 创建一个新的对象

- 为新创建的对象添加属性` __proto__ `，将该属性链接至构造函数的原型对象，继承构造函数原型上的属性及方法.

- 将新创建的对象作为this的上下文，执行构造行数并传入参数. 保存方法的执行结果.

- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象

##### new操作符代码实现如下：

实现方式1

```js
function _new(Fn){
  // 获取入参
  let args = Array.prototype.slice.call(arguments, 1);
  // 创建一个新的对象
  const newObj = {}; // step1
  // 为新创建的对象添加属性 __proto__ ，将该属性链接至构造函数的原型对象，继承构造函数原型上的属性及方法
  newObj.__proto__ = Fn.prototype // step2
  // 将新创建的对象作为this的上下文，执行构造行数并传入参数. 保存方法的执行结果
  const result = Fn.apply(newObj, args); // step3
  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === 'object' ? result : newObj; // step4
}
```

实现方法2

```js
function _new(Fn){
  // 获取入参
  let args = Array.prototype.slice.call(arguments, 1);
  // 基于Fn的原型创建一个新的对象
  const newObj = Object.create(Fn.prototype);
  // 添加属性到新创建的newObj上, 并获取obj函数执行的结果.
  const result = obj.apply(newObj, args);
  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof result === 'object' ? result : newObj;
}
```

### bind

##### bind 实现思路

bind 相比于 call、apply 有较大的区别，bind 方法会创建一个新的函数，返回一个函数，并允许传入参数。首先看一个例子。

```js
const obj = {
  value: 1,
  fn: function () {
    return this.value;
  },
};
const func = obj.fn;
console.log(func()); // undefined
```

为什么值是 undefined 呢？这会涉及到 this 的问题，简单来讲，函数的调用决定 this 的值，即运行时绑定。这里声明了 func 用于存放 obj.fn,再执行 func()方法时，当前的 this 指向的是 window 是，故值为 undefined。改如何处理才能达到预期的值呢？这时 bind 即将登场。

```js
const obj = {
  value: 1,
  fn: function () {
    return this.value;
  },
};
const func = obj.fn;
const bindFunc = func.bind(obj);
console.log(bindFunc()); // 1
```

##### 模拟 bind 第一版

```js
Function.prototype.bind1 = function (context) {
  // 将当前函数的this存放起来
  const _self = this;
  // 绑定bind传入的参数，从第二个开始
  const args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // 绑定bind返回新的函数，执行所带的参数
    const bindArgs = Array.prototype.slice.apply(arguments);
    // 改变this
    return _self.apply(context, [...args, ...bindArgs]);
  };
};
```

到这里，bind 的模拟已经完成一半，为什么说完成一半呢？功能已经实现，考虑到有这样一种情况，将绑定的 bind 返回的新函数作为构造函数使用，使用new操作符去创建一个由目标函数创建的新实例。当绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。什么意思呢？先看下面例子：

```js
var value = 1;
var obj = {
  value: 100,
};
function Person(name, age) {
  this.name = name;
  this.age = age;

  console.log(this.value); // undefined
  console.log(name); // jack
  console.log(age); // 35
}
var bindPerson = Person.bind1(obj, "jack");
var bp = new bindPerson(35);
```

从上面的结果可以看出，尽管已经在全局和 obj 上定义了 value 值，但是构造函数 Person 中拿到的 this.value 仍然是 undefined 值，说明 this 的绑定失效了，为什么会出现这样的情况呢？出现这样的情况是因为关键字new造成的，当程序遇到 new 会进行如下的操作：

- 创建一个新的对象

- 为新创建的对象添加属性` __proto__ `，将该属性链接至构造函数的原型对象，继承构造函数原型上的属性及方法.

- <font color=red>将新创建的对象作为this的上下文，执行构造行数并传入参数. 保存方法的执行结果.</font>

- 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象

##### bind 终版

```js
Function.prototype.bind1 = function (context) {
  // 将当前函数的this存放起来(调用bind函数本身)
  var _self = this;
  // 绑定bind传入的参数，从第二个开始
  var args = Array.prototype.slice.call(arguments, 1);
  // 声明一个空的构造函数
  function fNOP() {}
  var fBound = function () {
    // 绑定bind返回新的函数，执行所带的参数
    const bindArgs = Array.prototype.slice.apply(arguments);
    // 作为普通函数，this指向Window
    // 作为构造函数，this指向实例
    return _self.apply(this instanceof fNOP ? this : context, [...args, ...bindArgs]);
  };
  if (this.prototype) {
    // 修改返回函数的prototype为绑定函数的prototype，实例就可以继承绑定函数的原型中的值
    fNOP.prototype = this.prototype;
  }
  // FNOP继承fBound
  fBound.prototype = new fNOP();
  return fBound;
};
```