
## 修改 `el-tree` 的 `icon`


## el-tree 文本溢出时，显示省略号以及修改 `el-tree` 的 `icon`

**使用插槽处理显示省略号**

在 `el-tree` 标签上设置一个 `class` 值 `class="custom-tree"` 。直接用 `el-tree` 也可以，不过最好和el的样式区分开
    ```vue
    <template>
      <el-tree :data="deptOptions" :props="defaultProps"  class="custom-tree">
        <template slot-scope="{ node, data }">
          <span>
            {{ node.label}}
          </span>
        </template>
      </el-tree>
    </template>
    <style lang="scss" scoped>
      .custom-tree .el-tree-node__content{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display:block;
      }
    </style>
    ```

**使用 el-tree API**

添加 `el-tree` 节点渲染方法,为自定义节点内容添加省略号样式

    ```vue
    <template>
      <el-tree
        class="left-tree"
        :data="leftTabList"
        :props="{ label: 'fullName', children: 'children' }"
        show-checkbox
        @check="handleLeftTabClick"
        node-key="enCode"
        :render-content="renderContent"
      ></el-tree>
    </template>
    <script>
      export default {
        methods: {
          renderContent(h, { node }) {
            return (
              <span
                class='jpwise-tree-node'
                title={node.label}>
                {node.label}
              </span>
            );
          },
        }
      }
    </script>
    <style lang="scss" scoped>
    ::v-deep.left-tree {
      width: 200px;
      height: 100%;
      // overflow: auto;
      overflow-x: hidden;
      overflow-y: auto;
      padding-left: 15px;

      .el-icon-caret-right:before,
      .expanded:before {
        content: "\e6e0";
        font-size: 14px;
      }
      .el-tree-node__content {
        width: 100%;
        .jpwise-tree-node {
          font-size: 14px;
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
上述代码使用的是 `html` 原生的悬浮文字功能，也可以使用 `el-ui` 的 `tooltip` 组件