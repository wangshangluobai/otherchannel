## el-table 树状数据展示，无法显示子节点

1. `el-table` 需要添加属性 `row-key` 对应数据的唯一键。
2. `el-table` 需要添加属性 `tree-props` ，该属性是一个对象，对象中可存在两个属性

   - `children` 该属性对应的值应是渲染数据**子项的键名**，在渲染树状数据时，该键值必填
   - `hasChildren` 该属性是为了判断是否拥有子节点，该属性只有在懒加载时才需要(**非懒加载时不可填**)

     该属性在懒加载时，为折线 icon 存在与否的依据

参考链接

- [el-table 树形数据 tree-props 多层级使用避坑](https://www.jb51.net/javascript/29674074i.htm)
