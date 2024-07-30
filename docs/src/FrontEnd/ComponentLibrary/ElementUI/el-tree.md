
## 修改 `el-tree` 的 `icon`

```vue
<template>
  <el-tree
    class="left-tree"
    :data="leftTabList"
    :props="{ label: 'fullName', children: 'children' }"
    show-checkbox
    @check-change="handleLeftTabClick"
  ></el-tree>
</template>
<style lang="scss" scoped>
::v-deep.left-tree {
  width: 200px;
  padding-left: 6px;

  .el-icon-caret-right:before,
  .expanded:before {
    content: "\e6e0";
    font-size: 14px;
  }
  .el-tree-node__content {
    width: 100%;
    .el-tree-node__label {
      width: calc(100% - 46px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
    }
    .el-tree-node__expand-icon {
      position: absolute;
      right: 0px;
    }
  }
}
</style>
```