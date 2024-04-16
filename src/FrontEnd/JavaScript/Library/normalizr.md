
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


- `Values`：值类型，用于处理对象类型的数据



## `schema`

### `Array(definition, schemaAttribute)`

创建一个架构以规范化架构数组。如果输入值是“Object”而不是“Array”，则归一化结果将是一个 `Object` 其值为 `Array`。 

_注意: 简写: `[ mySchema ]`_

- `definition`: **required** 此数组包含的单一模式或模式到属性值的映射 
- `schemaAttribute`: _optional_ (如果 `definition` 不是单一模式则该参数必须) 找到的每个实体上的属性，根据定义映射定义规范化时要使用的模式。
  可以是字符串或函数，如果定义为函数则拥有以下参数:  
  _ `value`: 输入的实体
  _ `parent`: The parent object of the input array. \* `key`: The key at which the input array appears on the parent object.

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Array` constructor. This method tends to be useful for creating circular references in schema.

#### Usage

To describe a simple array of a singular entity type:

```js
const data = [{ id: '123', name: 'Jim' }, { id: '456', name: 'Jane' }];
const userSchema = new schema.Entity('users');

const userListSchema = new schema.Array(userSchema);
// or use shorthand syntax:
const userListSchema = [userSchema];

const normalizedData = normalize(data, userListSchema);
```

#### Output

```js
{
  entities: {
    users: {
      '123': { id: '123', name: 'Jim' },
      '456': { id: '456', name: 'Jane' }
    }
  },
  result: [ '123', '456' ]
}
```

If your input data is an array of more than one type of entity, it is necessary to define a schema mapping.

_Note: If your data returns an object that you did not provide a mapping for, the original object will be returned in the result and an entity will not be created._

For example:

```js
const data = [{ id: 1, type: 'admin' }, { id: 2, type: 'user' }];

const userSchema = new schema.Entity('users');
const adminSchema = new schema.Entity('admins');
const myArray = new schema.Array(
  {
    admins: adminSchema,
    users: userSchema
  },
  (input, parent, key) => `${input.type}s`
);

const normalizedData = normalize(data, myArray);
```

#### Output

```js
{
  entities: {
    admins: { '1': { id: 1, type: 'admin' } },
    users: { '2': { id: 2, type: 'user' } }
  },
  result: [
    { id: 1, schema: 'admins' },
    { id: 2, schema: 'users' }
  ]
}
```


### `Entity(key, definition = {}, options = {})` 实体类型

- `key`: **required** 此类型定义的实体会在归一化后默认保留所有的键值。 必须是字符串类型.
- `definition`: 默认值为空对象  
  除了其他实体的键，无需定义任何键，所有值都默认保留
- `options`:
  - `idAttribute`: 每个实体类型的唯一标识属性
    接受字符串类型 或 返回唯一标识的函数类型，_注意: 函数可多次运行，但每次运行生成的ID都是相同的，使用随机数会导致错误。_
    如果定义为函数, 该函数参数依次为:
    - `value`: 输入的实体
    - `parent`: 输入数组的父对象
    - `key`: 输入数组显示在父对象上的键
  - `mergeStrategy(entityA, entityB)`: 合并具有相同id值的两个实体时使用的函数。默认情况下，将最近找到的实体合并到上一个实体上。
  - `processStrategy(value, parent, key)`: 预处理实体时使用的函数。使用此方法可以添加额外的数据、默认值和/或在规范化完成之前完全更改实体。默认为返回输入实体的浅复制。  
    _注意: 建议始终返回输入的副本，而不要修改原始输入。_  
    该函数的参数依次为:
    - `value`: 输入的实体
    - `parent`: 输入数组的父对象
    - `key`: 输入数组显示在父对象上的键
  - `fallbackStrategy(key, schema)`: 在对id引用为缺失实体的数据结构进行反规范化时使用的策略。Strategy to use when denormalizing data structures with id references to missing entities.
    - `key`: 父对象的键，对应的值是输入的实体数据
    - `schema`: 没有实体的模式

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Entity` constructor. This method tends to be useful for creating circular references in schema.

#### Instance Attributes

- `key`: 提供给构造函数的键 
- `idAttribute`: 在选项中提供给构造函数的 `idAttribute` 。

#### Usage

```js
const data = { id_str: '123', url: 'https://twitter.com', user: { id_str: '456', name: 'Jimmy' } };

const user = new schema.Entity('users', {}, { idAttribute: 'id_str' });
const tweet = new schema.Entity(
  'tweets',
  { user: user },
  {
    idAttribute: 'id_str',
    // 合并策略 实体A和实体B的所有内容都保留，特殊字段 如两者共有的数据则在下面单独定义，就是解构赋值语法
    mergeStrategy: (entityA, entityB) => ({
      ...entityA,
      ...entityB,
      favorites: entityA.favorites
    }),
    // 从实体上移除 URL 字段
    processStrategy: (entity) => omit(entity, 'url')
  }
);

function omit(entity, key) {
  delete entity[key];
  return entity;
}

const normalizedData = normalize(data, tweet);
```

#### Output

```js
{
  entities: {
    tweets: { '123': { id_str: '123', user: '456' } },
    users: { '456': { id_str: '456', name: 'Jimmy' } }
  },
  result: '123'
}
```

#### `idAttribute` Usage

当传递 `idAttribute` 是一个函数，它应该返回ID的值。

举个栗子:

```js
const data = [{ id: '1', guest_id: null, name: 'Esther' }, { id: '1', guest_id: '22', name: 'Tom' }];

const patronsSchema = new schema.Entity('patrons', undefined, {
  // idAttribute 是函数时，必须返回ID的值，而不是key
  idAttribute: (value) => (value.guest_id ? `${value.id}-${value.guest_id}` : value.id)
});

normalize(data, [patronsSchema]);
```

#### Output

```js
{
  entities: {
    patrons: {
      '1': { id: '1', guest_id: null, name: 'Esther' },
      '1-22': { id: '1', guest_id: '22', name: 'Tom' },
    }
  },
  result: ['1', '1-22']
}
```

#### `fallbackStrategy` 示例
```js
const users = {
  '1': { id: '1', name: "Emily", requestState: 'SUCCEEDED' },
  '2': { id: '2', name: "Douglas", requestState: 'SUCCEEDED' }
};
const books = {
  '1': {id: '1', name: "Book 1", author: 1 },
  '2': {id: '2', name: "Book 2", author: 2 },
  '3': {id: '3', name: "Book 3", author: 3 }
};

const authorSchema = new schema.Entity('authors', {}, {
  // 去规范化时，缺失实体时使用此策略构建实体
  fallbackStrategy: (key, schema) => {
    return {
      [schema.idAttribute]: key,
      name: 'Unknown',
      requestState: 'NONE'
    };
  }
});
const bookSchema = new schema.Entity('books', {
  author: authorSchema
});

denormalize([1, 2, 3], [bookSchema], {
  books,
  authors: users
})

```


#### Output
```js
[
  {
    id: '1', 
    name: "Book 1", 
    author: { id: '1', name: "Emily", requestState: 'SUCCEEDED' }
  },
  {
    id: '2', 
    name: "Book 2", 
    author: { id: '2', name: "Douglas", requestState: 'SUCCEEDED' },
  },
  {
    id: '3', 
    name: "Book 3", 
    author: { id: '3', name: "Unknown", requestState: 'NONE' },
  }
]

```

### `Object(definition)` 对象类型

将 *对象类型* 定义为实体的值 . _注意: 简写形式: `{ ... }`_

- `definition`: **required** 此对象可嵌套实体模式定义. 默认值为空对象.  
  除了其他实体的键，无需定义任何键，所有值都将保留

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Object` constructor. This method tends to be useful for creating circular references in schema.

#### 示例

```js
// 数据示例
const sampleData = { users: [{ id: '123', name: 'Beth' }] };

const user = new schema.Entity('users');
const userSchema = new schema.Object({ users: new schema.Array(user) });
// 或 简写为
const userSchema = { users: new schema.Array(user) };

const normalizedData = normalize(sampleData, userSchema);
```

#### Output

```js
{
  entities: {
    users: { '123': { id: '123', name: 'Beth' } }
  },
  result: { users: [ '123' ] }
}
```

### `Union(definition, schemaAttribute)` 联合类型

将多个模式集合为一个整体(一个模式)。 一个数据集中存在不同的模式(或者说一个数据集需要不同的模式去处理)，根据不同的模式进行不同的处理。

- `definition`: **required** key为实体中 `schemaAttribute` 属性的值，value为该实体的模式
- `schemaAttribute`: **required** 每个实体定义的模式都存在该属性, 根据不同的属性值，使用不同的模式
  可以是 `String` 或 `Function`。 如果定义为函数, 该函数参数依次为:
  - `value`: 输入的实体
  - `parent`: 输入数组的父对象
  - `key`: 输入数组显示在父对象上的键

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Union` constructor. This method tends to be useful for creating circular references in schema.

#### 示例

_注意: 如果 `schemaAttribute` 对应的值一个都不存在，则原始对象将在结果中返回，并且不会创建实体_

```js
// 数据示例
const sampleData = {
  media: [
    {
      mediaType: 'book',
      bookId: '1',
      title: "The Hitchhiker's Guide to the Galaxy",
      author: {
        authorId: 'a1',
        name: 'Douglas Adams',
      },
    },
    {
      mediaType: 'movie',
      movieId: 'm1',
      title: 'Blade Runner',
      director: {
        directorId: 'd1',
        name: 'Ridley Scott',
      },
    },
  ],
};

// 定义书籍和电影对象模式
const bookSchema = new schema.Entity(
  'books',
  {
    author: authorSchema,
  },
  { idAttribute: 'bookId' },
);

const movieSchema = new schema.Entity(
  'movies',
  {
    director: directorSchema,
  },
  { idAttribute: 'movieId' },
);
// 定义联合类型
const mediaSchema = new schema.Union(
  {
    book: bookSchema,
    movie: movieSchema,
  },
  'mediaType',
);

// 进行规范化处理
const normalizedData = normalize(sampleData, {
  media: [mediaSchema],
});
```

#### Output

```json
{
  "entities": {
    "authors": {
      "a1": {
        "authorId": "a1",
        "name": "Douglas Adams"
      }
    },
    "books": {
      "1": {
        "mediaType": "book",
        "bookId": "1",
        "title": "The Hitchhiker's Guide to the Galaxy",
        "author": "a1"
      }
    },
    "directors": {
      "d1": {
        "directorId": "d1",
        "name": "Ridley Scott"
      }
    },
    "movies": {
        "m1": {
          "mediaType": "movie",
          "movieId": "m1",
          "title": "Blade Runner",
          "director": "d1"
        }
    }
  },
  "result": {
    "media": [
      {
        "id": "1",
        "schema": "book"
      },
      {
        "id": "m1",
        "schema": "movie"
      }
    ]
  }
}
```







## 注意事项：

- 使用 `Entity` 创建实体时，需要指定 `idAttribute` 等属性时，需要完全定义 `Entity` 中的三个参数，它没有额外的参数处理。或许之后可以考虑优化，*添加参数重载*功能。
- 使用 `new schema.Object({key: String})` 这种类型定义是无效的 normalize是不会改变源数据 值数据类型的
- `Union` 可以拥有很多 `schema`，这些 `schema` 可以是任意类型的，这些 `schema` 会根据 `schemaAttribute` 属性来判断数据类型。如果 `schemaAttribute` 对应的值不存在，则使生成的数据不会创建实体，且会将原始数据直接返回。如果对应的值存在，则根据对应的 `schema` 生成数实体。


# 参考文章

- [使用 normalizr 进行复杂数据转换](https://segmentfault.com/a/1190000042216483)
- [normalizr Github 文档](https://github.com/paularmstrong/normalizr/blob/master/docs/api.md)
