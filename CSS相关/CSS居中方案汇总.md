# CSS居中方案汇总

## 水平居中

对于水平居中一般可以使用如下四种方式

- 对于行内元素我们可以在父元素上设置text-align:center;来实现。
- 对于定长块级元素我们可以使用margin: 0 auto;来实现。
- 我们可以在父元素上使用flex布局来实现。
- 我们可以在父元素上使用grid布局来实现。

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      .div1 {
        text-align: center;
      }
      .div2 {
        display: flex;
        justify-content: center;
      }
      .div3 {
        display: grid;
        justify-content: center;
      }
      .div4 {
        width: 130px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div class="div1">
      <span>行内元素水平居中</span>
    </div>
    <div class="div2">
      <span>行内元素水平居中</span>
      <div>块级元素水平居中</div>
    </div>
    <div class="div3">
      <span>行内元素水平居中</span>
      <div>块级元素水平居中</div>
    </div>
    <div class="div4">块级元素水平居中</div>
  </body>
</html>
```

## 垂直居中

对于垂直居中一般可以使用如下三种方式

- 我们可以在父元素上设置line-height等于height来实现。
- 我们可以在父元素上使用flex布局来实现。
- 我们可以在父元素上使用grid布局来实现。
- 我们可以在父元素上使用table布局来实现。

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      .div1 {
        height: 100px;
        background: lightgreen;
        line-height: 100px;
      }
      .div2 {
        height: 100px;
        background: lightblue;
        display: flex;
        align-items: center;
      }
      .div3 {
        height: 100px;
        background: lightgreen;
        display: grid;
        align-content: center;
      }
      .div4 {
        height: 100px;
        background: lightblue;
        display: table-cell;
        vertical-align: middle;
      }
    </style>
  </head>
  <body>
    <div class="div1">
      <span>行内元素垂直居中</span>
    <!-- <div>块级元素垂直居中</div> -->
    </div>
    <div class="div2">
      <span>行内元素垂直居中</span>
      <div>块级元素垂直居中</div>
    </div>
    <div class="div3">
      <span>行内元素垂直居中</span>
      <div>块级元素垂直居中</div>
    </div>
    <div class="div4">
      <span>行内元素垂直居中</span>
      <div>块级元素垂直居中</div>
    </div>
  </body>
</html>
```

## 水平垂直居中

实现水平垂直同时居中我们可以使用绝对定位、table布局、flex布局 或 grid布局来实现。

- **纯绝对定位**

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      .box {
        position: absolute;
        width: 200px;
        height: 100px;
        background: red;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

- **绝对定位加负外边距**

这种方式需要知道居中元素的具体宽高，不然负的margin没法设置。

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      .box {
        position: absolute;
        width: 200px;
        height: 100px;
        background: red;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -50px;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

- **绝对定位加平移**

这种平移的方式就不需要考虑居中盒子的具体宽高了。

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      .box {
        position: absolute;
        width: 200px;
        height: 100px;
        background: red;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

- **使用flex实现**

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      html,body {
        height: 100%; 
      }
      body {
        background: gray;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .box {
        width: 200px;
        height: 100px;
        background: red;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

- **使用grid实现**

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
      html,body {
        height: 100%; 
      }
      body {
        background: gray;
        display: grid;
        /* align-content: center;
        justify-content: center; */
        
        /* align-content和justify-content的简写 */
        place-content: center;
      }
      .box {
        width: 200px;
        height: 100px;
        background: red;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```