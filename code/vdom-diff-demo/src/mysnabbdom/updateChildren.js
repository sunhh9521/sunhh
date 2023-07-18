import patchVnode from "./patchVnode.js";
import createElement from "./createElement.js";

// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key
}

export default function updateChildren(parentElm, oldCh, newCh) {
  console.log('我是updateChildren');
  console.log(oldCh, newCh)

  // 新前指针
  let newStartIdx = 0;
  // 新后指针
  let newEndIdx = newCh.length - 1;
  // 旧前指针
  let oldStartIdx = 0;
  // 旧后指针
  let oldEndIdx = oldCh.length - 1;
  // 新前节点
  let newStartVnode = newCh[0];
  // 新后节点
  let newEndVnode = newCh[newEndIdx];
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh [oldEndIdx];
  let keyMap = null;
  
  // 四种命中查找
  // ① 新前与旧前
  // ② 新后与旧后
  // ③ 新后与旧前（此种发生了，涉及移动节点，移动新前指向的这个节点到老节点的旧后的后面）
  // ④ 新前与旧后（此种发生了，涉及移动节点，移动新前指向的这个节点到老节点的旧前的前面）
  // 命中一种就不再进行命中判断了
  // 如果都没有命中，就需要用循环来寻找了。移动到oldStartIdx
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log('☆☆☆☆☆☆☆☆')
    // 首先不是判断 ① ② ③ ④ 命中，而是要略过已经加undefined标记的东西
    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      console.log(' ① ☆新前与旧前命中☆');
      // 新前与旧前命中
      patchVnode(oldStartVnode, newStartVnode)
      // 旧前指针后移，旧前节点更新
      oldStartVnode = oldCh[++oldStartIdx];
      // 新前指针后移，新前节点更新
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      console.log(' ② ☆☆新后与旧后命中☆☆');
      // 新后与旧后命中
      patchVnode(oldEndVnode, newEndVnode)
      // 旧后指针前移，旧后节点更新
      oldEndVnode = oldCh[--oldEndIdx];
      // 新后指针前移，新后节点更新
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log(' ③ ☆☆☆新后与旧前命中☆☆☆');
      // 新后与旧前命中
      patchVnode(oldStartVnode, newEndVnode)
      // 当 ③ 新后与旧前命中时，涉及移动节点，移动新前指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      // 旧前指针后移，旧前节点更新
      oldStartVnode = oldCh[++oldStartIdx];
      // 新后指针前移，新后节点更新
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log(' ④ ☆☆☆☆新前与旧后命中☆☆☆☆');
      // ④ 新前与旧后
      patchVnode(oldEndVnode, newStartVnode)
      // 当 ④ 新后与旧前命中时，涉及移动节点，移动新前指向的这个节点到老节点的旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      // 旧后指针前移，旧后节点更新
      oldEndVnode = oldCh[--oldEndIdx];
      // 新前指针后移，新前节点更新
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 四种命中都没有匹配到
      // 制作keyMap一个映射对象，这样就不用每次都遍历老对象了。
      if (!keyMap) {
        keyMap = {};
        // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
        for (let i= oldStartIdx; i<=oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key != undefined) {
            keyMap[key] = i
          }
        }
      }
      // 寻找当前这项（newStartidx）这项在keyMap中的映射的位置序号
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld == undefined) {
        // 判断，如果idxInOld是undfined表示它是全新的项
        // 被加入的项（就是newStartVnode这项）现在不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是undefined，不是全新的项，而是要移动
        const elmToMove = oldCh[idxInOld];
        if (elmToMove.elm.nodeType === 1) {
          patchVnode(elmToMove, newStartVnode);
          // 把这项设置为undefined，表示我已经处理完这项了
          oldCh[idxInOld] = undefined;
          // 移动，调用insertBefore也可以实现移动
          parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
        }
      }
      // 指针下移，只移动新的头
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 继续看看有没有剩余的。循环结束了start还是比old小
  if (newStartIdx <= newEndIdx) {
    console.log('new 还有剩余节点没有处理完，要加项')
    // 遍历新的newCh，添加到老的没有处理之前
    for (let i = newStartIdx; i<=newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾去。和appendChild是一致的了。
      // newCh[i]现在还没有真正的DOM，所以要调用createElement()函数变为DOM
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('old 还有剩余节点没有处理完，要删除项')
    // 批量删除oldStart和oldEnd指针之间的项
    for (let i=oldStartIdx; i<=oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}