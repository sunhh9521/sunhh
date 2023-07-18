import createElement from "./createElement.js";
import updateChildren from "./updateChildren.js";

export default function patchVnode(oldVnode, newVnode) {
  // 判断新旧vnode是否是同一个对象
  if (oldVnode === newVnode) return
  // 判断新vnode有没有text属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    console.log('新vnode有text属性');
    // 新vnode有text属性
    if (oldVnode.text !== newVnode.text) {
      // 如果新虚拟节点中的text和老的虚拟节点中的text不相同，那么直接就让新节点的text写入老节点的elm中即可。如果老的节点中elm有children，那么children也会消失掉。
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode没有text属性(则认为新节点有children)
    console.log('新vnode没有text属性');
    // 所有未处理节点的指针
    let un = 0;
    // 判断老vnode有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      // 新老节点都有children，此时就是最复杂的情况。
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 老的没有children，新的有children
      // 第一步：清空老的节点内容
      oldVnode.elm.innerText = null;
      // 第二步：遍历新节点的children，创建DOM，上树
      for (let i=0; i<newVnode.children.length; i++) {
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}