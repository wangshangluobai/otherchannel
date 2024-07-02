
## CSS 技巧




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

1. 给定一个宽度和高度都为 0 的元素，其 border 的任何值都会直接相交，我们可以利用这个交点来创建三角形。也就是说，border属性是三角形组成的，下面给每一边都提供不同的边框颜色

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

- [使用CSS绘制三角形](https://juejin.cn/post/7075884138900750372)