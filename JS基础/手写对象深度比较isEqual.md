# 手写对象深度比较isEqual

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>test</title>
  </head>
  <body>
    <script>
      function isObject(obj) {
        return typeof obj === 'object' && obj !== null
      }
      function isEqual(obj1, obj2) {
        if (!isObject(obj1) || !isObject(obj2)) {
          return obj1 === obj2
        }
        if (obj1 === obj2) return true
        const obj1KeysLength = Object.keys(obj1).length;
        const obj2KeysLength = Object.keys(obj2).length;
        if (obj1KeysLength !== obj2KeysLength) return false
        for(let key in obj1) {
          const result = isEqual(obj1[key], obj2[key])
          if (!result) return false
        }
        return true
      }
      const obj1 = {
        a: 100,
        b: {
          x: 100,
          y: 200
        }
      }
      const obj2 = {
        a: 100,
        b: {
          x: 100,
          y: 200
        }
      }
      console.log(isEqual(obj1, obj2))
    </script>
  </body>
</html>
```