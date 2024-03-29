# 虚拟DOM及diff算法

    转载自：https://blog.csdn.net/weixin_44972008/article/details/115620198
    视频地址：https://www.bilibili.com/video/BV1v5411H7gZ?p=1&vd_source=065eef0e1a9908ea1d07233c188d9ced
    源码地址：code/vdom-diff-demo

## 文章目录

[0. 文章结构预览](#index0)
$\qquad$[0.1 虚拟DOM如何被渲染函数（h函数）产生](#index01)
$\qquad$[0.2 diff算法的原理](#index02)
$\qquad$[0.3 虚拟DOM如何通过diff变成真正的DOM](#index03)
[1. 介绍](#index1)
$\qquad$[1.1 diff算法](#index11)
$\qquad$[1.2 虚拟DOM](#index12)
$\qquad$[1.3 关系——diff是发生在虚拟DOM上的](#index13)
[2. snabbdom 简介 及 准备工作](#index2)
$\qquad$[2.1 简介](#index21)
$\qquad$[2.2 搭建初始环境](#index22)
$\qquad$$\qquad$[1. 安装snabbdom](#index221)
$\qquad$$\qquad$[2. 安装webpack5并配置](#index222)
$\qquad$$\qquad$[3. 复制官方demo Example](#index223)
[3. h函数的介绍与使用](#index3)
$\qquad$[3.1 介绍](#index31)
$\qquad$[3.2 使用h函数 创建虚拟节点](#index32)
$\qquad$[3.3 使用patch函数 将虚拟节点上DOM树](#index33)
$\qquad$[3.4 h函数嵌套使用，得到虚拟DOM树（重要）](#index34)
[4. 手写h函数](#index4)
$\qquad$[vnode.js](#index41)
$\qquad$[h.js](#index42)
$\qquad$[index.js](#index43)
$\qquad$[效果展示](#index44)
[5. 手写diff算法准备](#index5)
$\qquad$[5.1 diff算法原理](#index51)
$\qquad$[5.2 手写diff预备](#index52)
$\qquad$$\qquad$[5.2.1 源码中如何定义“同一个节点”](#index521)
$\qquad$$\qquad$[5.2.2 源码中创建子节点，需要递归](#index522)
[6. 手写diff——首次上DOM树`patch(container, myVnode1)](#index6)
$\qquad$[6.0 DOM 预备知识](#index61)
$\qquad$$\qquad$[6.0.1 Node.insertBefore()](#index611)
$\qquad$$\qquad$[6.0.2 Node.appendChild()](#index612)
$\qquad$$\qquad$[6.0.3 Element.tagName](#index613)
$\qquad$$\qquad$[6.0.4 Node.removeChild](#index614)
$\qquad$$\qquad$[6.0.5 document.createElement](#index615)
$\qquad$[6.1 patch.js](#index62)
$\qquad$[6.2 createElement.js](#index63)
$\qquad$[6.3 index.js](#index64)
$\qquad$[6.4 展示效果](#index65)
[7. 处理新旧节点 是同一个节点 的情况](#index7)
$\qquad$[7.1 分析](#index71)
$\qquad$[7.2 实现 新旧节点text不同情况](#index72)
$\qquad$$\qquad$[7.2.1 patch.js](#index721)
$\qquad$$\qquad$[7.2.3 patchVnode.js](#index722)
$\qquad$$\qquad$[7.2.2 index.js](#index723)
$\qquad$[7.3 展示](#index73)
[8. 分析 diff算法 更新子节点操作（重要）](#index8)
$\qquad$[8.1 循环四种命中查找](#index81)
$\qquad$$\qquad$[1. 比较 ① 新前newStart 与 旧前oldStart](#index811)
$\qquad$$\qquad$[2. 比较 ② 新后newEnd 与 旧后 oldEnd](#index812)
$\qquad$$\qquad$[3. 比较 ③ 新后newEnd 与 旧前oldStart 命中③复杂情况举例——倒序](#index813)
$\qquad$$\qquad$[4. 比较 ④ 新前newStart 与 旧后oldEnd](#index814)
$\qquad$$\qquad$[5. 四种都没命中 遍历oldVnode中的key](#index815)
$\qquad$[8.2 循环结束](#index82)
[9. 手写diff更新子节点操作](#index9)
$\qquad$[patchVnode.js](#index91)
$\qquad$[updateChildren.js](#index92)

## <span id='index0'>0. 文章结构预览</span>

![](./img/20210412141140612.png)

### <span id='index01'>0.1 虚拟DOM如何被渲染函数（h函数）产生</span>

目标：手写h函数

### <span id='index02'>0.2 diff算法的原理</span>

目标：手写diff算法

### <span id='index03'>0.3 虚拟DOM如何通过diff变成真正的DOM</span>

## <span id='index1'>1. 介绍</span>

### <span id='index11'>1.1 diff算法</span>

精细化比较

![](./img/20210412140606495.png)

### <span id='index12'>1.2 虚拟DOM</span>

本课程不涉及DOM如何变成虚拟DOM
这属于模板编译原理范畴,可参考[【尚硅谷】Vue源码解析之mustache模板引擎](https://www.bilibili.com/video/BV1EV411h79m/?spm_id_from=333.337.search-card.all.click&vd_source=065eef0e1a9908ea1d07233c188d9ced)
但是虚拟节点变成DOM节点在diff中可以做到

![](./img/20210412154812845.png)

### <span id='index13'>1.3 关系——diff是发生在虚拟DOM上的</span>

新虚拟DOM和旧虚拟DOM进行diff(精细化比较)，算出应该如何最小量更新，最后反映到真正的DOM上

![](./img/20210412155440459.png)

## <span id='index2'>2. snabbdom 简介 及 准备工作</span>

### <span id='index21'>2.1 简介</span>

snabbdom(瑞典语，“速度”)是著名的虚拟DOM库，是diff算法的鼻祖
Vue源码借鉴了snabbdom
源码使用TypeScript写的[https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)
从npm下载的是build出来的JavaScript版本

```
npm install -D snabbdom
```

### <span id='index22'>2.2 搭建初始环境</span>

#### <span id='index221'>1. 安装snabbdom</span>

```
cnpm install -S snabbdom
```

![](./img/2021041214225425.png)

#### <span id='index222'>2. 安装webpack5并配置</span>

```
cnpm i -D webpack@5 webpack-cli@3 webpack-dev-server@3
```

配置webpack5

```
module.exports = {
  // webpack5 不用配置mode
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    // 虚拟打包路径，文件夹不会真正生成，而是在8080端口虚拟生成
    publicPath: "xuni",
    // 打包出来的文件名
    filename: "bundle.js",
  },
  // 配置webpack-dev-server
  devServer: {
    // 静态根目录
    contentBase: 'www',
    // 端口号
    port: 8080,
  },
};
```

#### <span id='index223'>3. 复制官方demo Example</span>

src/index.js

```js
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

const container = document.getElementById("container");

const vnode = h("div#container.two.classes", { on: { click: function () { } } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode);

const newVnode = h(
  "div#container.two.classes",
  { on: { click: function () { } } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!"),
  ]
);
// Second `patch` invocation
patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state
```

![](./img/202104121523078.png)

## <span id='index3'> 3. h函数的介绍与使用</span>

### <span id='index31'>3.1 介绍</span>

用来产生虚拟节点(vnode)

![](./img/2021041216043170.png)

虚拟节点vnode的属性

```
{
	children: undefined// 子元素 数组
	data: {} // 属性、样式、key
	elm: undefined // 对应的真正的dom节点(对象)，undefined表示节点还没有上dom树
	key: // 唯一标识
	sel: "" // 选择器
	text: "" // 文本内容
}
```

### <span id='index32'>3.2 使用h函数 创建虚拟节点</span>

```
// 创建虚拟节点
var myVnode1 = h('a', { props: { href: 'https://www.baidu.com' } }, 'YK菌')
console.log(myVnode1)
```

![](./img/20210412161400494.png)

### <span id='index33'>3.3 使用patch函数 将虚拟节点上DOM树</span>

```
// 创建patch函数
const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

// 创建虚拟节点
var myVnode1 = h(
  "a",
  { props: { href: "https://www.baidu.com", target: "_blank" } },
  "YK菌"
);

// 让虚拟节点上树
let container = document.getElementById("container");
patch(container, myVnode1);
```

![](./img/20210412162149109.png)

### <span id='index34'>3.4 h函数嵌套使用，得到虚拟DOM树（重要）</span>

![](./img/20210412162603221.png)

```
const myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', '香蕉'),
  h('li', '西瓜'),
  h('li', '番茄'),
])

// 让虚拟节点上树
let container = document.getElementById("container");
patch(container, myVnode3);
```

![](./img/20210412162923791.png)

```
const myVnode3 = h('ul', [
  h('li', '苹果'),
  h('li', [
    h('div', [
      h('p', '香蕉'),
      h('p', '草莓')
    ])
  ]),
  h('li', h('span','西瓜')),
  h('li', '番茄'),
])
```

![](./img/20210412163345417.png)

![](./img/20210412163642392.png)

## <span id='index4'> 4. 手写h函数</span>

### <span id='index41'>vnode.js</span>

将传入的参数组合成对象返回

```
/**
 * 产生虚拟节点
 * 将传入的参数组合成对象返回
 * @param {string} sel 选择器
 * @param {object} data 属性、样式
 * @param {Array} children 子元素
 * @param {string|number} text 文本内容
 * @param {object} elm 对应的真正的dom节点(对象)，undefined表示节点还没有上dom树
 * @returns 
 */
export default function(sel, data, children, text, elm) {
  const key = data.key;
  return { sel, data, children, text, elm, key };
}
```

### <span id='index42'>h.js</span>

产生虚拟DOM树，返回的是一个对象

```
import vnode from "./vnode";
/**
 * 产生虚拟DOM树，返回的一个对象
 * 低配版本的h函数，这个函数必须接受三个参数，缺一不可
 * @param {*} sel
 * @param {*} data
 * @param {*} c
 * 调用只有三种形态 文字、数组、h函数
 * ① h('div', {}, '文字')
 * ② h('div', {}, [])
 * ③ h('div', {}, h())
 */
export default function (sel, data, c) {
  // 检查参数个数
  if (arguments.length !== 3) {
    throw new Error("请传且只传入三个参数！");
  }
  // 检查第三个参数 c 的类型
  if (typeof c === "string" || typeof c === "number") {
    // 说明现在是 ① 文字
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 说明是 ② 数组
    let children = [];
    // 遍历 c 数组
    for (let item of c) {
      if (!(typeof item === "object" && item.hasOwnProperty("sel"))) {
        throw new Error("传入的数组有不是h函数的项");
      }
      // 不用执行item, 只要收集数组中的每一个对象
      children.push(item);
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === "object" && c.hasOwnProperty("sel")) {
    // 说明是 ③ h函数 是一个对象（h函数返回值是一个对象）放到children数组中就行了
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error("传入的参数类型不对！");
  }
}
```

### <span id='index43'>index.js</span>

```
import h from "./my_snabbdom/h";

const myVnode1 = h("div", {}, [
  h("p", {}, "嘻嘻"),
  h("p", {}, "哈哈"),
  h("p", {}, h('span', {}, '呵呵')),
]);
console.log(myVnode1);
```

### <span id='index44'>效果展示</span>

![](./img/20210412194521859.png)

## <span id='index5'>5. 手写diff算法准备</span>

### <span id='index51'>5.1 diff算法原理</span>

最小量更新，key很关键。key是这个节点的唯一标识，告诉diff算法，在更改前后它们是同一个DOM节点。

只是同一个虚拟节点，才进行精细化比较（往ul中的 li 添加 li），否则就是暴力删除旧的、插入新的（ul中的li 换到在 ol 中去）

问题： 如何定义是同一个虚拟节点

答：选择器相同且key相同

只进行同层比较，不会进行跨层比较。即使是同一片 虚拟节点，但是跨层了，diff就是暴力删除旧的，然后插入新的

![](./img/20210413203439569.png)

![](./img/2021041220160893.png)

### <span id='index52'>5.2 手写diff预备</span>

![](./img/20210412203424571.png)

### <span id='index521'>5.2.1 源码中如何定义“同一个节点</span>

![](./img/20210412203615676.png)

### <span id='index522'>5.2.2 源码中创建子节点，需要递归</span>

![](./img/20210412225456960.png)

## ### <span id='index6'>6. 手写diff——首次上DOM树patch(container, myVnode1)</span>

### <span id='index61'>6.0 DOM 预备知识</span>

### <span id='index611'>6.0.1 Node.insertBefore()</span>

```
var insertedNode = parentNode.insertBefore(newNode, referenceNode);
```

insertedNode ：被插入节点(newNode)

parentNode ：新插入节点的父节点

newNode ：用于插入的节点

referenceNode ：newNode 将要插在这个节点之前

在当前节点下增加一个子节点 Node，并使该子节点位于参考节点的前面。

### <span id='index612'>6.0.2 Node.appendChild()</span>

```
element.appendChild(aChild)
```

将一个节点附加到指定父节点的子节点列表的末尾处。

如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置（不需要事先移除要移动的节点）。

### <span id='index613'>6.0.3 Element.tagName</span>

返回当前元素的标签名

```
elementName = element.tagName
```

elementName 是一个字符串,包含了element元素的标签名.

在HTML文档中, tagName会返回其大写形式

### <span id='index614'>6.0.4 Node.removeChild</span>

从DOM中删除一个子节点。返回删除的节点

```
let oldChild = node.removeChild(child);

//OR

element.removeChild(child);
```

child 是要移除的那个子节点.

node 是child的父节点.

oldChild保存对删除的子节点的引用. oldChild === child.

### <span id='index615'>6.0.5 document.createElement</span>

```
var element = document.createElement(tagName[, options]);
```

tagName：指定要创建元素类型的字符串, 创建元素时的 nodeName 使用 tagName 的值为初始化，该方法不允许使用限定名称(如:“html:a”)，在 HTML 文档上调用 createElement() 方法创建元素之前会将tagName 转化成小写，在 Firefox、Opera 和 Chrome 内核中，createElement(null) 等同于 createElement(“null”)

返回 新建的元素（Element）

### <span id='index62'>6.1 patch.js</span>

```
import vnode from "./vnode";
import createElement from "./createElement";

export default function (oldVnode, newVnode) {
  // 判断传入的第一个参数是 DOM节点 还是 虚拟节点
  if (oldVnode.sel == "" || oldVnode.sel === undefined) {
    // 说明oldVnode是DOM节点，此时要包装成虚拟节点
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(), // sel
      {}, // data
      [], // children
      undefined, // text
      oldVnode // elm
    );
  }
  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log("是同一个节点，需要精细化比较");
  } else {
    console.log("不是同一个节点，暴力 插入新节点，删除旧节点");
    // 创建 新虚拟节点 为 DOM节点
    // 要操作DOM，所以都要转换成 DOM节点
    let newVnodeElm = createElement(newVnode);
    let oldVnodeElm = oldVnode.elm;
    // 插入 新节点 到 旧节点 之前
    if (newVnodeElm) {
      // 判断newVnodeElm是存在的 在旧节点之前插入新节点
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm);
    }
    // 删除旧节点
    oldVnodeElm.parentNode.removeChild(oldVnodeElm);
  }
}
```

### <span id='index63'>6.2 createElement.js</span>

创建节点。将vnode虚拟节点创建为DOM节点

```
/**
 * 创建节点。将vnode虚拟节点创建为DOM节点
 * 是孤儿节点，不进行插入操作
 * @param {object} vnode
 */
export default function createElement(vnode) {
  // 根据虚拟节点sel选择器属性 创建一个DOM节点，这个节点现在是孤儿节点
  let domNode = document.createElement(vnode.sel);
  // 判断是有子节点还是有文本
  if (
    vnode.text !== "" &&
    (vnode.children === undefined || vnode.children.length === 0)
  ) {
    // 说明没有子节点，内部是文本
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 说明内部是子节点，需要递归创建节点 
    // 遍历数组
    for (let ch of vnode.children) {
      // 递归调用 创建出它的DOM，一旦调用createElement意味着创建出DOM了。并且它的elm属性指向了创建出的dom，但是没有上树，是一个孤儿节点
      let chDOM = createElement(ch); // 得到 子节点 表示的 DOM节点 递归最后返回的一定是文本节点
      console.log(ch);
      // 文本节点 上domNode树
      domNode.appendChild(chDOM);
    }
  }
  // 补充虚拟节点的elm属性
  vnode.elm = domNode;
  // 返回domNode DOM对象
  return domNode;
}
```

### <span id='index64'>6.3 index.js</span>

```
import h from "./my_snabbdom/h";
import patch from "./my_snabbdom/patch";

let container = document.getElementById("container");
let btn = document.getElementById("btn");

// const myVnode1 = h("h1", {}, "你好");

const myVnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);
// 上树
patch(container, myVnode1);
```

### <span id='index65'>6.4 展示效果</span>

![](./img/20210413213226447.png)

## <span id='index7'>7. 处理新旧节点 是同一个节点 的情况</span>

### <span id='index71'>7.1 分析</span>

![](./img/20210414151721159.png)

### <span id='index72'>7.2 实现 新旧节点text不同情况</span>

#### <span id='index721'>7.2.1 patch.js</span>

```
// 判断 oldVnode 和 newVnode 是不是同一个节点
if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
  console.log("是同一个节点，需要精细化比较");
  patchVnode(oldVnode, newVnode);
}
```

### <span id='index722'>7.2.2 index.js</span>

```
import h from "./my_snabbdom/h";
import patch from "./my_snabbdom/patch";

let container = document.getElementById("container");
let btn = document.getElementById("btn");

const myVnode1 = h("h1", {}, "你好");

// 上树
patch(container, myVnode1);

const myVnode2 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

btn.onclick = function () {
  patch(myVnode1, myVnode2);
}
```

#### <span id='index723'>7.2.3 patchVnode.js</span>

```
export default function patchVnode(oldVnode, newVnode) {
  // 1. 判断新旧 vnode 是否是同一个对象
  if (oldVnode === newVnode) return;
  // 2. 判断 newVndoe 有没有 text 属性
  if (
    newVnode.text !== undefined &&
    (newVnode.children === undefined || newVnode.children.length === 0)
  ) {
    // newVnode 有 text 属性
    // 2.1 判断 newVnode 与 oldVnode 的 text 属性是否相同
    if (newVnode.text !== oldVnode.text) {
      // 如果newVnode中的text和oldVnode的text不同，那么直接让新text写入老elm中即可。
      // 如果oldVnode中是children，也会立即消失
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // newVnode 没有text属性 有children属性
    // 2.2 判断 oldVnode 有没有 children 属性
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // oldVnode有children属性 最复杂的情况，新老节点都有children
 
    } else {
      // oldVnode没有children属性 说明有text;  newVnode有children属性
      // 清空oldVnode的内容
      oldVnode.elm.innerHTML = "";
      // 遍历新的vnode虚拟节点的子节点，创建DOM，上树
      for (let ch of newVnode.children) {
        let chDOM = createElement(ch);
        oldVnode.elm.appendChild(chDOM);
      }
    }
  }
}
```

### <span id='index73'>7.3 展示</span>

![](./img/2021041416201479.gif)

## <span id='index8'>8. 分析 diff算法 更新子节点操作（重要）</span>

这里老师ppt有问题，③应该不是新前而是新后

![](./img/20210414191540816.png)

### <span id='index81'>8.1 循环四种命中查找</span>

#### <span id='index811'>1. 比较 ① 新前newStart 与 旧前oldStart</span>

如果命中①了，patch之后就移动头指针 newStart++ oldStart++

![](./img/20210415165044761.png)

```
if (checkSameVnode(oldStartVnode, newStartVnode)) {
    // 新前与旧前
    console.log(" ①1 新前与旧前 命中");
    // 精细化比较两个节点 oldStartVnode现在和newStartVnode一样了
    patchVnode(oldStartVnode, newStartVnode);
    // 移动指针，改变指针指向的节点，这表示这两个节点都处理（比较）完了
    oldStartVnode = oldCh[++oldStartIdx];
    newStartVnode = newCh[++newStartIdx];
}
```

如果没命中就接着比较下一种情况

#### <span id='index812'>2. 比较 ② 新后newEnd 与 旧后 oldEnd</span>

如果命中②了，patch后就移动尾指针 newEnd-- oldEnd–

![](./img/20210415165115541.png)

```
if (checkSameVnode(oldEndVnode, newEndVnode)) {
    patchVnode(oldEndVnode, newEndVnode);
    oldEndVnode = oldCh[--oldEndIdx];
    newEndVnode = newCh[--newEndIdx];
}
```

如果没命中就接着比较下一种情况

#### <span id='index813'>3. 比较 ③ 新后newEnd 与 旧前oldStart</span>

如果命中③了，将 新后newEnd 指向的节点移动到 旧后oldEnd 之后

![](./img/20210415175903445.png)

```
if (checkSameVnode(oldStartVnode, newEndVnode)) {
    // 新后与旧前
    console.log(" ③3 新后与旧前 命中");
    patchVnode(oldStartVnode, newEndVnode);
    // 当③新后与旧前命中的时候，此时要移动节点。移动 新后（旧前） 指向的这个节点到老节点的 旧后的后面
    // 移动节点：只要插入一个已经在DOM树上 的节点，就会被移动
    parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
    oldStartVnode = oldCh[++oldStartIdx];
    newEndVnode = newCh[--newEndIdx];
}
```

命中③复杂情况举例——倒序

![](./img/202104151801013.png)

如果没命中就接着比较下一种情况

#### <span id='index814'>4. 比较 ④ 新前newStart 与 旧后oldEnd</span>

如果命中④了，将 新前newStart 指向的节点，移动到 旧前oldStart 之前

![](./img/20210415165916702.png)

```
if (checkSameVnode(oldEndVnode, newStartVnode)) {
    // 新前与旧后
    console.log(" ④4 新前与旧后 命中");
    patchVnode(oldEndVnode, newStartVnode);
    // 当④新前与旧后命中的时候，此时要移动节点。移动 新前（旧后） 指向的这个节点到老节点的 旧前的前面
    // 移动节点：只要插入一个已经在DOM树上的节点，就会被移动
    parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
    oldEndVnode = oldCh[--oldEndIdx];
    newStartVnode = newCh[++newStartIdx];
}
```

如果没命中就表示四种情况都没有命中

#### <span id='index815'>5. 四种都没命中 遍历oldVnode中的key</span>

找到了就 移动位置 移动指针newStart++

![](./img/20210415172642236.png)

没找的就是新节点，直接插入所有未处理旧节点之前

```
// 四种都没有匹配到，都没有命中
console.log("四种都没有命中");
// 寻找 keyMap 一个映射对象， 就不用每次都遍历old对象了
if (!keyMap) {
  keyMap = {};
  // 记录oldVnode中的节点出现的key
  // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
  for (let i = oldStartIdx; i <= oldEndIdx; i++) {
    const key = oldCh[i].key;
    if (key !== undefined) {
      keyMap[key] = i;
    }
  }
}
console.log(keyMap);
// 寻找当前项（newStartIdx）在keyMap中映射的序号
const idxInOld = keyMap[newStartVnode.key];
if (idxInOld === undefined) {
  // 如果 idxInOld 是 undefined 说明是全新的项，要插入
  // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
  parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
} else {
  // 说明不是全新的项，要移动
  const elmToMove = oldCh[idxInOld];
  patchVnode(elmToMove, newStartVnode);
  // 把这项设置为undefined，表示我已经处理完这项了
  oldCh[idxInOld] = undefined;
  // 移动，调用insertBefore也可以实现移动。
  parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
}

// newStartIdx++;
newStartVnode = newCh[++newStartIdx];
```

### <span id='index82'>8.2 循环结束</span>

结束后

1、newVnode中还有剩余

新节点中剩余的都 插入 旧节点oldEnd后面 或 oldStart之前

![](./img/20210415164815345.png)

![](./img/20210415165004148.png)

2、oldVnode中还有剩余节点

![](./img/2021041516485799.png)

![](./img/20210415164931952.png)

![](./img/2021041516472238.png)

```
// 循环结束
if (newStartIdx <= newEndIdx) {
  // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
  for (let i = newStartIdx; i <= newEndIdx; i++) {
    // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
    parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
  }
} else if (oldStartIdx <= oldEndIdx) {
  // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
  for (let i = oldStartIdx; i <= oldEndIdx; i++) {
    if (oldCh[i]) {
      parentElm.removeChild(oldCh[i].elm);
    }
  }
}
```

## <span id='index9'>9. 手写diff更新子节点操作</span>

### <span id='index91'>patchVnode.js</span>

```
// 2.2 判断 oldVnode 有没有 children 属性
if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
  // oldVnode有children属性 最复杂的情况，新老节点都有children
  updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
}
```

### <span id='index92'>updateChildren.js</span>

```
import createElement from "./createElement";
import patchVnode from "./patchVnode";
/**
 * 
 * @param {object} parentElm Dom节点
 * @param {Array} oldCh oldVnode的子节点数组
 * @param {Array} newCh newVnode的子节点数组
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  console.log("updateChildren()");
  console.log(oldCh, newCh);

  // 四个指针
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;

  // 指针指向的四个节点
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx];
  // 新前节点
  let newStartVnode = newCh[0];
  // 新后节点
  let newEndVnode = newCh[newEndIdx];

  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    console.log("**循环中**");
    // 首先应该不是判断四种命中，而是略过已经加了undefined标记的项
    if (oldStartVnode === null || oldCh[oldStartIdx] === undefined) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode === null || oldCh[oldEndIdx] === undefined) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode === null || newCh[newStartIdx] === undefined) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode === null || newCh[newEndIdx] === undefined) {
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 新前与旧前
      console.log(" ①1 新前与旧前 命中");
      // 精细化比较两个节点 oldStartVnode现在和newStartVnode一样了
      patchVnode(oldStartVnode, newStartVnode);
      // 移动指针，改变指针指向的节点，这表示这两个节点都处理（比较）完了
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 新后与旧后
      console.log(" ②2 新后与旧后 命中");
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      // 新后与旧前
      console.log(" ③3 新后与旧前 命中");
      patchVnode(oldStartVnode, newEndVnode);
      // 当③新后与旧前命中的时候，此时要移动节点。移动 新后（旧前） 指向的这个节点到老节点的 旧后的后面
      // 移动节点：只要插入一个已经在DOM树上 的节点，就会被移动
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      // 新前与旧后
      console.log(" ④4 新前与旧后 命中");
      patchVnode(oldEndVnode, newStartVnode);
      // 当④新前与旧后命中的时候，此时要移动节点。移动 新前（旧后） 指向的这个节点到老节点的 旧前的前面
      // 移动节点：只要插入一个已经在DOM树上的节点，就会被移动
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 四种都没有匹配到，都没有命中
      console.log("四种都没有命中");
      // 寻找 keyMap 一个映射对象， 就不用每次都遍历old对象了
      if (!keyMap) {
        keyMap = {};
        // 记录oldVnode中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);
      // 寻找当前项（newStartIdx）在keyMap中映射的序号
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld === undefined) {
        // 如果 idxInOld 是 undefined 说明是全新的项，要插入
        // 被加入的项（就是newStartVnode这项)现不是真正的DOM节点
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 说明不是全新的项，要移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动，调用insertBefore也可以实现移动。
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm);
      }

      // newStartIdx++;
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 循环结束
  if (newStartIdx <= newEndIdx) {
    // 说明newVndoe还有剩余节点没有处理，所以要添加这些节点
    // // 插入的标杆
    // const before =
    //   newCh[newEndIdx + 1] === null ? null : newCh[newEndIdx + 1].elm;
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null，如果是null就会自动排到队尾，和appendChild一致
      parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 说明oldVnode还有剩余节点没有处理，所以要删除这些节点
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm);
      }
    }
  }
}

// 判断是否是同一个节点
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}
```

![](./img/20210415222737884.png)