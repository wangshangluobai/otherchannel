## 组件使用注意事项

### vant tabs 组件滚动、吸顶效果失效

`van-tabs` 组件中 `scrollspy` 模式，是不支持固定高度的，它只能支持组件铺满全屏。  
换言之，父元素不管是第几层的父元素 `overflow` 属性，`overflow` 不能为 `auto` 和 `hidden`。
如果需要在自定义的高度，位置实现电梯导航，需要自定义实现。

## 异常及报错

### van-field 组件失去焦点后，自动清空输入框

解决方案：

1. 在微信小程序中可以尝试添加特性 `maxlength="50"`
2. 页面报错或异常也会影响这个现象的出现
3. 我尝试将 `:value` 改为 `v-model` 便解决了这个问题

参考：
[失去焦点后自动清空输入框（BUG）](https://blog.csdn.net/yuan_618859/article/details/121718541)

## 样式处理方案

### Vant 修改 field 中的 placeholder 样式

关键在于 `::-webkit-input-placeholder` 使用此伪类选择器，修改 placeholder 的样式

```css
.van-field__control::-webkit-input-placeholder {
  color: tomato;
}
```
