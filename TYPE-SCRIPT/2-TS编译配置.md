# TS编译配置

## 配置选项

### include

定义希望被编译文件所在的目录

默认值：["**/*"]

示例

\*\* ：代表任意目录

\* ：代表任意文件

```ts
"include": ["src/**/*", "tests/**/*"]
```

上述示例中，所有src目录和tests目录下的文件都会被编译

### exclude

定义需要排除在外的目录

默认值：["node_modules", "brwer_components", "jspm_packages"]

示例

\*\* ：代表任意目录

\* ：代表任意文件

```ts
"exclude": ["./src/hello/**/*"]
```

上述示例中，src下hello目录下的文件都不会被编译

### extends

定义被继承的配置文件

示例

```ts
"extends": "./configs/base"
```

上述示例中，当前配置文件中会自动包含config目录下base.json中的所有配置

### files

指定被编译文件的列表，只有需要编译的文件少时才会用到

示例

```ts
"files": [
  "core.ts",
  "sys.ts",
  "types.ts",
  "scanner.ts",
  "parser.ts",
  "utilities.ts",
  "binder.ts",
  "checker.ts",
  "emitter.ts",
  "program.ts",
  "commandLineParser.ts",
  "tsc.ts",
  "diagnosticInformationMap.generated.ts"
]
```

上述示例中，列表中的文件都会被TS编译器所编译

#### compilerOptions

编译选项是配置文件中非常重要也比较复杂的配置选项

在compilerOptions中包含多个子选项，用来完成对编译的配置

```ts
/*
  tsconfig.json 是ts编译器的配置文件，ts编译器可以根据它的信息来对代码进行编译
  "include" 用来指定哪些ts文件需要被编译
  路径：** 表示任意目录
        * 表示任意文件
  "exclude" 不需要被编译的文件目录
      默认值：["node_modules", "brwer_components", "jspm_packages"]
*/

{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
    "target": "es5", // 用来指定ts被编译为的ES版本
    // "module": "ES2015", // 指定要使用的模块化规范
    // "lib": [], // 用来指定项目中要使用的库, 默认值有'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2019.intl', 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl', 'es2022.object', 'es2022.sharedmemory', 'es2022.string', 'es2022.regexp', 'es2023.array', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref', 'decorators', 'decorators.legacy'
    "outDir": "./dist", // 用来指定编译后文件所在的目录
    // outFile：将代码合并为一个文件后，输出到指定目录的文件中
    // 设置 outFile 后，所有的全局作用域中的代码会合并到同一个文件中
    // 设置了outFile后，module只能设置为 amd 或 system 否则会报错
    // "outFile": "./dist/app.js", 
    "allowJs": false, // 是否对js文件进行编译，默认值是false
    "checkJs": false, // 是否检查js代码是否符合语法规范，默认值是false
    "removeComments": false, // 是否移除注释
    "noEmit": false, // 是否生成编译后的文件 true: 不生成，false：生成
    "noEmitOnError": false, // 当有错误时，是否生成编译后的文件  true: 不生成，false：生成
    "strict": false, // 所有严格检查的总开关
    "alwaysStrict": true, // 用来设置编译后的文件是否使用严格模式，默认false（当代码中有es6模块代码时（例如import、export），默认就是严格模式了，不会在编译后的文件中添加 "use strict"）
    "noImplicitAny": false, // 变量不指定类型时默认是any   true：不允许隐式的any类型
    "noImplicitThis": false, // 不允许不明确类型的this
    "strictNullChecks": false, // 严格的检查空值
  }
}
```



