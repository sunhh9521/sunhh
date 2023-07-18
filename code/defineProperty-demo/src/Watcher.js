import { parsePath } from './utils.js';
import Dep from './Dep.js';

var uid = 0;

export default class Watcher {
  constructor(target, expression, callback) {
    /**
     * target: 数据对象，如obj
     * expression：表达式，如b.c，根据data和expression就可以获取watcher依赖的数据
     * callback：依赖变化时触发的回调
     */
    console.log("我是Watcher类的构造器");
    this.id = uid++;
    this.target = target;
    this.getter = parsePath(expression);
    this.callback = callback;
    // 初始化watcher实例时订阅数据
    this.value = this.get();
  } 
  // 当收到数据变化的消息时执行该方法，从而调用cb
  update() {
    this.run();
  }
  get() {
    // 进入依赖收集阶段，让全局的Dep.target设置为Watcher本身，那么就是进入依赖收集阶段
    Dep.target = this;
    const obj = this.target;
    var value;
    try {
      value = this.getter(obj);
    } finally {
      Dep.target = null;
    }
    return value;
  }
  run() {
    this.getAndInvoke(this.callback);
  }
  getAndInvoke(cb) {
    const value = this.get();
    if (value !== this.value || typeof value === 'object') {
      const oldValue = this.value;
      this.value = value;
      cb.call(this.target, value, oldValue)
    }
  }
}