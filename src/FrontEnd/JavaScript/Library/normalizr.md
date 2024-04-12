
# normalizr 数据转换
  `normalizr` 创立的初衷是处理深层，复杂的嵌套的对象。


### 基础理解

- 使用命名导入：`import { normalize, schema } from 'normalizr';`


  - `normalize`：功能-将数据格式化成 `normalized` 格式
    - 类型：[function]
    - 参数：源数据，schema(实体/模型)
  - `schema`：生成实体(模型)的函数集
    - 类型：[object]
    - 属性：Array, Entity, Object, Union, Values


### schema对象属性

- `Array`：数组类型，用于处理数组类型的数据，通常与其它schema类型（如Entity、Object等）结合使用，表示数组中每个元素的结构。Array接受一个子schema作为参数，用于解析数组中的每个元素。
- `Entity`：实体类型，用于处理对象类型的数据，用于描述具有唯一标识符的实体类型。接三个参数：
  - `entityName`：实体的名称，用于标识数据中的特定类型。
  - `definition`（可选）：一个对象，定义实体内部的属性及其对应的子schema。用于描述实体间的关联关系。
  - `options`（可选）：一个对象，包含如 `idAttribute` 等配置选项。

- `Object`：对象类型，用于处理对象类型的数据，通常用于描述非实体对象，即不需要进行唯一标识和关联处理的简单对象。Object接受一个对象作为参数，该对象的每个键值对表示对象的一个属性及其对应的子schema。
- `Union`：联合类型，用于处理数组或对象中包含多种不同类型的实体，这些实体通过某个属性（通过schemaAttribute指定）来区分类型。Union接受一个对象作为参数，该对象的每个键值对表示一个可能的类型及其对应的子schema。
- `Values`：值类型，用于处理对象类型的数据

#### 注意事项：

- 使用 `Entity` 创建实体时，需要指定 `idAttribute` 等属性时，需要完全定义 `Entity` 中的三个参数，它没有额外的参数处理。或许之后可以考虑优化，*添加参数重载*功能。
- 使用 `new schema.Object({key: String})` 这种类型定义是无效的 normalize是不会改变源数据 值数据类型的






# 参考文章

- [使用 normalizr 进行复杂数据转换](https://segmentfault.com/a/1190000042216483)
- [normalizr Github 文档](https://github.com/paularmstrong/normalizr/blob/master/docs/api.md)
