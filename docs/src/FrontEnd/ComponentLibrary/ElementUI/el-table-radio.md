
# el-table中实现单选按钮 两种方法

## 方法一 复选框 在js中控制 保证复选框数组中只有一项，借此实现单选。

`el-tale` 的事件 `@selection-change` (当选择项发生变化时会触发该事件) 

该方法的缺陷是 `UI` 上不统一，会被误认为是多选

```js
onSelectionChange(val) {
  if (val.length > 1) {
    this.$refs.tableRef.clearSelection();
    this.$refs.tableRef.toggleRowSelection(val.pop());  
  }
},
```

## 方法二 借助 el-table 中有个选中行的点击事件 @row-click

`el-tale` 的事件 `@row-click` (当某一行被点击时会触发该事件)

该方法需要在模板中添加额外的结构代码

```html
<el-table-column label="选择" width="55" align="center">
  <template slot-scope="scope">
    <el-radio
      v-model="tenderProjectId">{{ '' }}
    </el-radio>
  </template>
</el-table-column>
```

或者使用 `&nbsp;` 但要注意无论使用哪种方法都要添加 `{{}} ` 胡子语法，否则配合某种情况会出现意外的省略号。


参考链接 

- [el-table中实现单选按钮 两种方法](https://juejin.cn/post/7021803438392475662)