## CSS 技巧

### CSS 中边距折叠及相关问题

垂直元素之间的 margin 有有互相重叠的情况  
这其中涉及到几个概念：可替换元素，不可替换元素，包含块（盒子模型），块级格式上下文(BFC)

1. **替换元素就可以理解为需要一些外部内容来嵌入它的空间的元素，反之不可替换元素（non-replaced element）就是不需要外部内容来填充它的空间的元素。**  
   根据 CSS1 中所述，可替换元素就是浏览器根据元素的标签和属性，来决定元素的具体显示内容  
   例如：浏览器会根据 \<img> 标签的 src 属性的值来读取图片信息并显示出来，如果查看源代码，是看不到图片的实际内容。  
   根据\<input>标签的 type 属性来决定是显示输入框，还是单选按钮等  
   html 中的\<img>、\<input>、\<textarea>、\<select>、\<object>都是替换元素。

   在新的规范中 HTML5 涉及到的\<video>、\<canvas>、\<menu>元素也被认为是替换元素。因此可以把“替换”理解为“嵌入”

2. **在 CSS2.1 中，很多框的定位和尺寸的计算，都取决于一个矩形的边界，这个矩形，被称作是包含块( containing block )。**  
   (元素)生成的框会扮演它子孙元素包含块的角色，换言之既是：一个(元素的)框为它的子孙节点建造了包含块  
   包含块是一个相对的概念，每个框关于它的包含块都有一个位置，但是它不会被包含块限制；它可以溢出(包含块)  
   包含块上可以通过设置 ‘overflow’ 特性达到处理溢出的子孙元素的目的

3. **BFC，英文全称叫做 Block Formatting contexts，中文叫块级格式化上下文**  
   块级元素：当元素的 CSS 属性 display 为 block，list-item 或 table 时，它是块级元素 block-level。块级元素会生成块级盒，块级盒参与块格式化上下文 \
   行内级元素：当元素的 CSS 属性 display 的计算值为 inline, inline-block 或 inline-table 时，称它为行内级元素  
   可以将 BFC 理解为一个箱子，这个箱子中的元素与外部元素隔离，箱子里的元素不会影响外部的元素，也不受外部元素的影响  
   利用这个特性可以消除浮动元素对其非浮动的兄弟元素和其子元素带来的影响  
   BFC 中只有块级水平的盒子参与（block-level box：display 属性为 block, list-item, table 的元素，会生成 block-level box）

   **BFC 布局规则**  
   内部的 Box 会在垂直方向，一个接一个地放置。  
   Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠  
   每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此  
   BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此  
   BFC 的区域不会与 float box 重叠  
   计算 BFC 的高度时，浮动元素也参与计算

   **如何建立或触发 BFC**  
   W3C 中定义： 浮动元素和绝对定位元素，*非块级盒子*的块级容器（例如 inline-blocks, table-cells, 和 table-captions）  
   以及 overflow 值不为“visiable”的块级盒子，都会为他们的内容创建新的 BFC（这时这个元素中的内容就同处在一个 BFC 中）  
   匿名盒：CSS 引擎自动生成的盒子，没有名字，不能被 CSS 选择符选中，不能被 CSS 选择符选中意味着不能用样式表添加样式  
   这意味着所有继承的 CSS 属性值为 inherit ，所有非继承的 CSS 属性值为 initial

   - float: left/right/inherit 也就是除 none 以外的浮动元素
   - position: absolute/fixed 绝对定位元素，fixed 是 absolute 的一个子类，也属于绝对定位
   - display: inline-block、table-cell、table-captions 需要注意的是 display: table 本身不可以触发 BFC，但是由于 table 会产生匿名盒，而匿名盒的 display: table-cell 特性会触发 BFC，产生新的格式化上下文。
   - overflow: hidden/auto/scroll/inherit

4. **margin 的基本用途就是控制元素与周围其他元素的间隔**  
   margin 的值类型有：auto | length | percentage

   - 常规流中的块级元素的 margin 设置为 auto 时，则 margin-left、margin-right 的值相等。这个可以用来居中一个块级元素
   - 浮动的元素的 margin 值为 auto 时，它的 margin-left、margin-right 的取值为 0
   - 绝对定位的元素的 margin 值设置为 auto 时：如果这个元素的 left、right、width 都是 auto，那么它的 margin-left、margin-right 的值为 0；  
     如果这个元素的 left、right、width 值不是 auto，那么 margin-right、margin-left 的值相等  
     如果只有一个'margin-left'或者'margin-right'有一个是'auto'，则根据公式可计算出另外一个 margin 的值  
     除以上这几种情况外，margin-left 和 margin-right 取值为 0

   > W3C 规范中提到的 margin 为 auto 时的取值规范  
   > css2.1 规范中提到的以下元素 margin 设置为 auto'的水平方向的'margin-left'或者'margin-right'对应的值为'0'
   >
   > - 内联的不可替换元素（non-replaced inline element）：既是内联元素，又是不可替换元素，如 span, strong, i, b, em、cite
   > - 内联的可替换元素：如：a
   > - 浮动的不可替换元素（block 元素和 inline 元素）
   > - 浮动的可替换元素（block 元素和 inline 元素）
   > - 常规流中的不可替换的 inline-block 元素
   > - 常规流中可替换的 inline-block 元素
   >
   > 常规流中的块级不可替换元素、常规流中的块级可替换元素， 若 margin-left'和'margin-right'都是'auto'，那么它们的应用值相等  
   > 这会让该元素相对于其包含块的边水平居中
   >
   > 绝对定位的不可替换元素和绝对定位的可替换元素，取值根据一个公式得出  
   >  'left' + 'margin-left' + 'border-left-width' + 'padding-left' + 'width' + 'padding-right' + 'border-right-width' + 'margin-right' + 'right' = 包含块的宽度。
   >
   > - 如果'left'，'width'和'right'全都是'auto'：则'margin-left'和'margin-right'的值为 0
   > - 如果'left'，'width'和'right'都不是'auto'：如果'margin-left'和'margin-right'都是'auto，则他们的应用值相等（根据这个规则可以使绝对定位的元素水平居中）
   > - 如果'margin-left'或者'margin-right'有一个是'auto'，则根据上述公式求出另外一个 margin 的值
   > - 除以上规则外，'margin-left'和'margin-right'值为 0

   设置为 length 的话很好理解，就是实际设置的值，单位可以是 px、em 等长度值。另外 margin 值可以设置为负值  
   percentage：百分比是由被应用 box 的包含块 containing block 的大小所决定。对于 margin-top 和 margin-bottom 也同样成立

#### margin 外边距重叠

外边距重叠指的是，当两个垂直外边距相遇时（有可能是同辈或者后辈），它们将形成一个外边距。  
重叠后的外边距的高度计算如下：

1. 两个相邻的外边距都是正数时，重叠结果是它们两者之间较大的值
2. 两个相邻的外边距都是负数时，重叠结果是两者绝对值的较大值
3. 两个外边距一正一负时，重叠结果是两者的相加的和

W3C 中提到的边距重叠必要条件：

1. 必须是常规文档流（不是 float 和绝对定位，注意绝对定位包含 absolute 和 fixed）中的块级盒子，并且处于同一个 BFC 当中；
2. 没有行盒-即 linebox（行盒由一行中所有的内联元素所组成）， 没有 padding 和 border 将他们隔开；
3. 都属于垂直方向上相邻的外边距 。

W3C 中提到的边距重叠的几种情况：

1. 常规文档流中，一个盒子如果没有上补白(padding-top)和上边框(border-top)，那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距合并，这个子元素不能包含间隙（clearance：样式中有 clear：right|left|both）。
2. 常规文档流中，一个盒子如果没有下补白(padding-top)和下边框(border-top)，那么这个盒子下边距会跟他的下一个兄弟盒子的的上边距合并，除非他们之间存在间隙（clearance）。
3. 常规文档流中，height 为 auto 的盒子的下边距会与它的最后一个子元素的下边距合并；
4. 常规文档流中，一个盒子的高度为 0 并且最小高度也为 0，且不包含常规文档流的子元素，并且自身没有建立新的 BFC 的，那么它自身的上边距和下边距会合并。

根据上面的条件，不发生外边距重叠的情况有以下几种：

1. 水平方向上永远不会发生外边距合并
2. 垂直方向上，创建了新的 BFC 的元素与它的子元素的外边距不会重叠（注意区别：BFC 内部的子元素与子元素之间边距是会发生折叠）
3. 一个浮动的元素不与任何元素的外边距产生重叠，包括其父元素及子元素及兄弟元素；（分析：浮动元素脱离了常规文档流，且建立了 BFC，他不会影响周围其他元素、也不会被其他元素影响）
4. overflow 设置为 hidden|scroll|auto 的元素不会与它的子元素的外边距重叠；（分析：overflow 不是 visible 的元素建立了 BFC，他不会影响周围其他元素、也不会被其他元素影响）
5. 绝对定位的元素不与任何元素的外边距产生重叠（包括其父元素及子元素及兄弟元素）（分析，脱离了常规文档流，且建立了 BFC，他不会影响周围其他元素、也不会被其他元素影响）
6. 行内块级（inline-block）元素不与任何元素的外边距产生重叠（包括其父元素及子元素及兄弟元素）（分析：行内块级元素不符合发生边距重叠的第一个必要条件‘块级盒子’，块级盒子的 display 属性必须是以下三种之一：'block'， 'list-item'， 和 'table'）

外边距重叠产生的影响：  
盒子的显示大小= border +content+padding+正 margin 值。负的 margin 值不会影响 box 的实际大小，  
但是负的 top 或 left 值会引起 box 的向上或向左位置移动，如果是 bottom 或 right 只会影响下面 box 的显示的参考线

### CSS3 中如何解决子元素继承父元素的 opacity 属性

css3 中的 opacity 属性是用来设置 div 元素的不透明级别的

但是我们往往会遇到因为父级元素设定 opacity 后，子元素也跟着透明了,但是有时候我们只是想让背景是透明的

直接给子元素的 opacity 设定为 1 是错误的，子元素中的文字也会受到父元素的 opacity 的影响

```css
.opacity {
  position: relative;
  width: 400px;
  height: 300px;
  color: black;
  background: red;
  opacity: 0.5;
}
.opacity-child {
  position: relative;
  opacity: 1;
}
```

解决方案：

1. 使用 rgba()间接的设定 opacity 的值，这个属性不会向下继承
   rgba()有四个参数，最后一个参数就是 opacity 的值，和 opacity 单独设定效果一样，但是这个是有 background 属性来控制的，background 不会向下继承

   下图所示代码子元素中的文字不受父元素 opacity 的影响，但是低版本的浏览器比如 ie6/7 等对 rgba 不兼容

   ```css
   .opacity {
     position: relative;
     width: 400px;
     height: 300px;
     color: black;
     background: rgba(255, 0, 0, 0.5);
   }
   .opacity-child {
   }
   ```

2. 把 opacity 属性放到同级元素实现，本质就是通过脱离文档流，改变层叠顺序实现，简单一点可以直接子元素的伪元素相对定位+背景色，设置 z-index 的值实现
   通过 z-index 来控制层级覆盖，通过设置一个同级的 absolute 的 div 元素放置到父级元素的上面，然后把这个 div 作为背景

   其他的通过设定 position 为 relative 和 z-index 来实现浮于背景 div 上面

   ```CSS
   .opacity {
     position: relative;
     width: 400px;
     height: 300px;
     color: black;
   }
   .opacity-child {
     position: relative;
     z-index: 1;
     width: 100%;
     height: 100%;
   }
   .opacity-child-background {
     position: absolute;
     top: 0px;
     left: 0px;
     width: 100%;
     height: 100%;

     background: red;
     opacity: 0.5;
     z-index: 0;
   }
   // 或
   .opacity {
     position: relative;
     width: 400px;
     height: 300px;
     color: black;
   }
   .opacity-child::before {
     background: red;
     content: "";
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     opacity: 0.5;
     z-index: -1;
   }
   ```

### 使用 JS 控制 CSS 变量

这种写法我初次尝试是在 `Vue` 项目中，使用 `scss` 。但是这种写法同样适用于 `css` ， `less` 等，所以就记录在这里。

关键几点就在于高亮处

```js{2,9,16,27,32}
<template>
  <div :style="{ '--primary-color': primaryColor }">这是一段文本</div>
  {/* 将 js 变量链接到 CSS */}
</template>

export default {
  data() {
    return {
      primaryColor: '#409eff'
    };
  },
  computed: {
    // 将JavaScript变量映射为CSS变量
    cssVars() {
      return {
        '--primary-color': this.primaryColor
        // 控制变量变化 最好使用计算属性
      };
    }
  }
};

<style lang="scss" scoped>
  {/* CSS 变量原生写法 */}
:root {
  // 定义CSS变量
  --primary-color: #409eff;
}

.colorful-class {
  {/* CSS 变量使用 */}
  color: var(--primary-color);
}
</style>
```

### 纯 CSS 实现三角形的 3 种方式

1. 给定一个宽度和高度都为 0 的元素，其 border 的任何值都会直接相交，我们可以利用这个交点来创建三角形。也就是说，border 属性是三角形组成的，下面给每一边都提供不同的边框颜色

```css
.triangle {
  width: 0;
  height: 0;
  border: 100px solid;
  border-color: orangered skyblue gold yellowgreen;
}
```

得到一个长高为 100px 的正方形, 正方形中相对的四角连线，将正方形分隔为四个等腰直角三角形。

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 50px solid skyblue;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

此时，将任意三个边框的颜色设置为透明色，就可以得到一个等腰直角三角形。

合并整理写法为

```css
.triangle {
  border-style: solid;
  border-color: transparent;
  border-width: 50px 0 50px 50px;
  border-left-color: skyblue;
}
```

隐藏两个相邻等腰直角三角形也可以得到一个正方形的斜切等腰三角形

```css
.triangle {
  width: 0;
  height: 0;
  border-top: 100px solid skyblue;
  border-right: 100px solid transparent;
}
```

调整长度也可以得到等边三角形

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 69px solid transparent;
  border-right: 69px solid transparent;
  border-bottom: 120px solid skyblue;
}
```

参考链接

- [使用 CSS 绘制三角形](https://juejin.cn/post/7075884138900750372)

### 文字悬浮下划线过渡效果

鼠标悬浮显示下划线，下划线从左侧过渡至右侧，当鼠标移出时隐藏下划线，下划线从左侧过渡至右侧。

```css
span {
  background: linear-gradient(to right, tomato 0%, tomato) no-repeat right bottom;
  background-size: 0 2px;
  transition: background-size 350ms;
}
span:hover {
  background-size: 100% 2px;
  background-position: left bottom;
}
```

::: details 样式演示

<p>鼠标悬浮下列文字(抖动异常是VitePress渲染问题)</p>
<span :class="$style.text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni debitis non vitae voluptates et recusandae, ab, laborum nam eos incidunt error ullam asperiores aliquam, harum magnam laboriosam? Numquam porro possimus, obcaecati quam placeat laboriosam voluptatum. Consectetur magnam totam eaque doloribus tempora. Asperiores quo esse obcaecati accusantium incidunt adipisci nisi! Obcaecati maxime reprehenderit similique tempore ab!</span>
:::

<style module>
.text {
  background: linear-gradient(to right, tomato 0%,tomato) no-repeat right bottom;
  background-size: 0 2px;
  transition: background-size 350ms;
}
.text:hover {
  background-size: 100% 2px;
  background-position: left bottom;
}
</style>
