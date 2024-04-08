# Prettier 代码格式化工具

支持 JS/JSX/TS/Flow/JSON/CSS/LESS 等文件格式

```js
module.exports = {
  printWidth: 100, //单行长度
  tabWidth: 2, //缩进长度
  useTabs: false, //使用空格代替tab缩进
  semi: true, //句末使用分号
  singleQuote: true, //使用单引号
  quoteProps: "as-needed", //仅在必需时为对象的key添加引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: "all", //多行时尽可能打印尾随逗号
  bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
  jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  arrowParens: "always", //单参数箭头函数参数周围使用圆括号-eg: (x) => x
  requirePragma: false, //无需顶部注释即可格式化
  insertPragma: false, //在已被preitter格式化的文件顶部加上标注
  proseWrap: "preserve", //不知道怎么翻译
  htmlWhitespaceSensitivity: "ignore", //对HTML全局空白不敏感
  vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
  endOfLine: "lf", //结束行形式
  embeddedLanguageFormatting: "auto", //对引用代码进行格式化
}
```

### 配置项

Experimental Ternaries(三元格式-问号位置)

- 可选项
  - 默认值 `false`
  - `true`: 问号和条件在同一行
  - `false`: 问号和结果在同一行
- API 配置
  experimentalTernaries: \<bool\>

Print Width(换行宽度)

- 可选项
  - 默认值 `80`
- API 配置
  printWidth: \<int\>

Tab Width(换行缩进长度)

- 可选项
  - 默认值 `2`
- API 配置
  tabWidth: \<int\>

Tab Width(换行缩进长度)

- 可选项
  - 默认值 `false`
  - `true`: 使用 tab 缩进
  - `false`: 使用空格缩进
- API 配置
  useTabs: \<bool\>

Semicolons(句末分号)

- 可选项
  - 默认值 `true`
  - `true`: 使用分号
  - `false`: 不使用分号(仅在可能出现语法错误的地方添加分号)
- API 配置
  semi: \<bool\>

Quotes(单引号或双引号)

- 注意
  - JSX 引号忽略此配置
  - 引号嵌套可能出现问题(待核实)
- 可选项
  - 默认值 `false`
  - `true`: 使用单引号
  - `false`: 使用双引号
- API 配置
  singleQuote: \<bool\>

Quote Props(对象属性使用引号包裹)

- 注意
  - 关于框架中的数值属性(待核实)
- 可选项
  - 默认值 `as-needed`
  - `as-needed`: 仅在必需时使用引号
  - `consistent`: 总是使用引号
  - `preserve`: 保留原有引号
- API 配置
  quoteProps: "<as-needed|consistent|preserve>"

JSX Quotes(JSX 属性使用引号包裹)

- 可选项
  - 默认值 `false`
  - `false`: 使用双引号
  - `consistent`: 总是使用引号
  - `preserve`: 保留原有引号
- API 配置
  jsxSingleQuote: \<bool\>

Trailing Commas(尾随逗号)

- 可选项
  - 默认值 `all`
  - all: 总是添加尾随逗号
  - es5: 在 ES5 中添加尾随逗号
  - none: 总是不添加尾随逗号
- API 配置
  trailingComma: "<all|es5|none>"

Bracket Spacing(对象前后添加空格)

- 可选项
  - 默认值 `true`
  - `true`: 对象前后添加空格
  - `false`: 对象前后不添加空格
- API 配置
  bracketSpacing: \<bool\>

Bracket Line(HTML 标签换行)
将多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）

- 可选项
  - 默认值 `false`
  - `true`: > 和最后的属性在同一行
  - `false`: > 单独一行
- API 配置
  bracketSameLine: \<bool\>

Arrow Function Parentheses(箭头函数参数周围使用圆括号)

- 可选项
  - 默认值 `always`
  - always: 总是添加圆括号
  - avoid: 总是不添加圆括号
- API 配置
  arrowParens: "<always|avoid>"

Range(代码格式化范围)
没啥用，详见官网配置描述

Parser(解析器)
在各种语言夹杂的文件中，Prettier 会自动检测文件类型，并使用对应的解析器进行格式化。
但某些情况下，Prettier 无法自动检测文件类型，这时就需要手动指定解析器。
不重要

File Path(文件路径)
不重要

Require Pragma(文件头部包含特殊注释才格式化)

```js
/**
 * @prettier
 * 或
 * @format
 */
```

- 可选项
  - 默认值 `false`
  - `true`: 需要顶部注释才格式化
  - `false`: 格式化生效不需要顶部注释
- API 配置
  requirePragma: \<bool\>

Insert Pragma(在已被 preitter 格式化的文件顶部加上标注)
没用过，不重要

- 可选项
  - 默认值 `false`
  - `true`:
  - `false`:
- API 配置
  insertPragma: \<bool\>

Prose Wrap(markdown 换行)
没用过，不重要

- 可选项
  - 默认值 `preserve`
  - `preserve`: 默认行为
  - `always`: 始终换行
  - `never`: 始终不换行
- API 配置
  proseWrap: "<preserve|always|never>"

HTML Whitespace Sensitivity(html 全局空白不敏感)

- 可选项
  - 默认值 `css`
  - `css`: CSS 属性周围的空格是重要的
  - `strict`: 所有标签周围的空格（或缺少空格）被认为是重要的
  - `ignore`: 所有标签周围的空格（或缺少空格）被认为是微不足道的
- Api 配置
  htmlWhitespaceSensitivity: "<css|strict|ignore>"

Vue files script and style tags indentation(vue 文件中 script 和 style 标签缩进)

- 可选项
  - 默认值 `false`
  - `true`: 缩进 Vue 文件中的脚本和样式标签
  - `false`: 不要在 Vue 文件中缩进脚本和样式标签

### 相关链接

- [Prettier 官网](https://www.prettier.cn/)
