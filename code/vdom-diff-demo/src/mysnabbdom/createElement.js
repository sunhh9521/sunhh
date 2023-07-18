// 真正创建节点。将vnode创建为DOM，是孤儿节点，不进行插入
export default function createElement(vnode) {
  console.log('目的是把虚拟节点', vnode, '变为真正的DOM，但是没有上树')
  // 创建一个DOM节点，这个节点现在还是一个孤儿节点
  let domNode = document.createElement(vnode.sel);
  // 有子节点还是文本？？
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 它内部是文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 它内部是子节点，就是递归创建子节点
    for (let i=0; i<vnode.children.length; i++) {
      let ch = vnode.children[i];
      let chDom = createElement(ch);
      domNode.appendChild(chDom);
    }
  }
  // 补充elm属性
  vnode.elm = domNode;
  return vnode.elm
}