## CSS 技巧

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
