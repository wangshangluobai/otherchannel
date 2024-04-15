
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


- `Values`：值类型，用于处理对象类型的数据

#### 注意事项：

- 使用 `Entity` 创建实体时，需要指定 `idAttribute` 等属性时，需要完全定义 `Entity` 中的三个参数，它没有额外的参数处理。或许之后可以考虑优化，*添加参数重载*功能。
- 使用 `new schema.Object({key: String})` 这种类型定义是无效的 normalize是不会改变源数据 值数据类型的
- `Union` 可以拥有很多 `schema`，这些 `schema` 可以是任意类型的，这些 `schema` 会根据 `schemaAttribute` 属性来判断数据类型。如果 `schemaAttribute` 对应的值不存在，则使生成的数据不会创建实体，且会将原始数据直接返回。如果对应的值存在，则根据对应的 `schema` 生成数实体。


### `Entity(key, definition = {}, options = {})` 实体类型

- `key`: **required** 此类型定义的实体会在归一化后默认保留所有的键值。 必须是字符串类型.
- `definition`: 默认值为空对象  
  除了其他实体的键，无需定义任何键，所有值都默认保留
- `options`:
  - `idAttribute`: 每个实体类型的唯一标识属性
    接受字符串类型 或 返回唯一标识的函数类型，_注意: 函数可多次运行，但每次运行生成的ID都是相同的，使用随机数会导致错误。_
    如果是函数,则*有序*接受以下参数 :
    - `value`: 输入的实体
    - `parent`: 输入数组的父对象
    - `key`: 输入数组显示在父对象上的键
  - `mergeStrategy(entityA, entityB)`: Strategy to use when merging two entities with the same `id` value. Defaults to merge the more recently found entity onto the previous.
  - `processStrategy(value, parent, key)`: Strategy to use when pre-processing the entity. Use this method to add extra data, defaults, and/or completely change the entity before normalization is complete. Defaults to returning a shallow copy of the input entity.  
    _Note: It is recommended to always return a copy of your input and not modify the original._  
    The function accepts the following arguments, in order:
    - `value`: The input value of the entity.
    - `parent`: The parent object of the input array.
    - `key`: The key at which the input array appears on the parent object.
  - `fallbackStrategy(key, schema)`: Strategy to use when denormalizing data structures with id references to missing entities.
    - `key`: The key at which the input array appears on the parent object.
    - `schema`: The schema of the missing entity

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Entity` constructor. This method tends to be useful for creating circular references in schema.

#### Instance Attributes

- `key`: Returns the key provided to the constructor.
- `idAttribute`: Returns the idAttribute provided to the constructor in options.

#### Usage

```js
const data = { id_str: '123', url: 'https://twitter.com', user: { id_str: '456', name: 'Jimmy' } };

const user = new schema.Entity('users', {}, { idAttribute: 'id_str' });
const tweet = new schema.Entity(
  'tweets',
  { user: user },
  {
    idAttribute: 'id_str',
    // Apply everything from entityB over entityA, except for "favorites"
    mergeStrategy: (entityA, entityB) => ({
      ...entityA,
      ...entityB,
      favorites: entityA.favorites
    }),
    // Remove the URL field from the entity
    processStrategy: (entity) => omit(entity, 'url')
  }
);

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

When passing the `idAttribute` a function, it should return the IDs value.

For Example:

```js
const data = [{ id: '1', guest_id: null, name: 'Esther' }, { id: '1', guest_id: '22', name: 'Tom' }];

const patronsSchema = new schema.Entity('patrons', undefined, {
  // idAttribute *functions* must return the ids **value** (not key)
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

#### `fallbackStrategy` Usage
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
  可以是 `String` 或 `Function`。 如果定义为函数, 该函数有三个参数:
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






# 参考文章

- [使用 normalizr 进行复杂数据转换](https://segmentfault.com/a/1190000042216483)
- [normalizr Github 文档](https://github.com/paularmstrong/normalizr/blob/master/docs/api.md)
