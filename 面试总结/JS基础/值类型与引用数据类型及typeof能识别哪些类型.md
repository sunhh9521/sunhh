# 值类型与引用数据类型及typeof能识别哪些类型

### 值类型

```
let a;                     typeof a    // 'undefined'
const str = "str";         typeof str  // 'string'
const n = 100;             typeof n    // 'number'
const b = true;            typeof b    // 'boolean'
const s = Symbol('s');     typeof s    // symb'ol
```

### 引用类型

```
// 能识别函数
typeof function() {}  // function

//能识别引用类型（不能再继续识别）
typeof null          // 'object'
typeof ['a', 'b']    // 'object'
typof {x: 100}       // 'object'
```