
# normalizr 数据转换
  `normalizr` 创立的初衷是处理深层，复杂的嵌套的对象。

- 使用命名导入：`import { normalize, denormalize, schema } from 'normalizr';`

# API

- [normalize](#normalizedata-schema)
- [denormalize](#denormalizeinput-schema-entities)
- [schema](#schema)
  - [Array](#arraydefinition-schemaattribute)
  - [Entity](#entitykey-definition---options--)
  - [Object](#objectdefinition)
  - [Union](#uniondefinition-schemaattribute)
  - [Values](#valuesdefinition-schemaattribute)

## `normalize(data, schema)`

根据输入的数据和模式进行归一化

- `data`: **required** 输入需要归一化的数据，支持 JSON 或者 JS 对象
- `schema`: **required** 模式定义

### Usage

```js
import { normalize, schema } from 'normalizr';

const myData = { users: [{ id: 1 }, { id: 2 }] };
const user = new schema.Entity('users');
const mySchema = { users: [user] };
const normalizedData = normalize(myData, mySchema);
```

### Output

```js
{
  result: { users: [ 1, 2 ] },
  entities: {
    users: {
      '1': { id: 1 },
      '2': { id: 2 }
    }
  }
}
```

## `denormalize(input, schema, entities)` 去归一化

基于模式和普通对象或不可变数据中提供的实体来去归一化，和 `normalize` 相反。

_特别注意:_ 小心使用去归一化， 过早地将数据恢复为大型嵌套对象可能会影响React（和其他）应用程序的性能

如果模式存在递归引用，则只会给出实体的第一个实例。后续引用将返回提供的`id`。

- `input`: **required** 归一化输出的结果可以被去归一化， 通常与 `normalize` 输出的 `result` 中对应的值相同
- `schema`: **required** 用于获取 `input` 值的*模式*定义。
- `entities`: **required**  一个对象，由可能出现在去归一化输出中的实体架构名称键控。也接受具有不可变数据的对象。常是归一化生成的实体

### Usage


```js
import { denormalize, schema } from 'normalizr';

const user = new schema.Entity('users');
const mySchema = { users: [user] };
const entities = { users: { '1': { id: 1 }, '2': { id: 2 } } };
const denormalizedData = denormalize({ users: [1, 2] }, mySchema, entities);
```

### Output

```js
{
  users: [{ id: 1 }, { id: 2 }];
}
```

## `schema`

### `Array(definition, schemaAttribute)`

创建一个架构以规范化架构数组。如果输入值是 `Object` 而不是 `Array` ，则归一化结果将是一个 `Object` 其值为 `Array`。 

_注意: 简写: `[ mySchema ]`_

- `definition`: **required** 此数组包含的单一模式或模式到属性值的映射 
- `schemaAttribute`: _optional_ (如果 `definition` 不是单一模式则该参数必须) 找到的每个实体上的属性，根据定义映射定义规范化时要使用的模式。
  可以是字符串或函数，如果定义为函数则拥有以下有序参数:  
  _ `value`: 输入的实体
  _ `parent`: 输入实体的父级
  _ `key`: 输入数组显示在父对象上的键

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Array` constructor. This method tends to be useful for creating circular references in schema.

#### Usage

定义一个单一实体类型的简单数组：

```js
const data = [{ id: '123', name: 'Jim' }, { id: '456', name: 'Jane' }];
const userSchema = new schema.Entity('users');

const userListSchema = new schema.Array(userSchema);
// 简写:
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

如果输入的数据是一个包含多个实体类型的数组，则需要定义一个模型映射。

_注意: 如果返回值中不存在实体，只包含原始对象，则代表提供的模型映射和输入的数据没有关联_

举个粒子:

```js
const data = [{ id: 1, type: 'admin' }, { id: 2, type: 'user' }];

const userSchema = new schema.Entity('users');
const adminSchema = new schema.Entity('admins');
const myArray = new schema.Array(
  {
    admins: adminSchema,
    users: userSchema
  },
  // `schemaAttribute` 是一个函数时，返回值就是 `schemaAttribute` 实体的键名
  // (input, parent, key) => `${input.type}s`
  (input, parent, key) => {
    console.log(
      '%c [ input, parent, key ]-444',
      'font-size:13px; background:#0b4f3b; color:#4f937f;',
      input,
      parent,
      key,
    );

    return `${input.type}s`;
  },
);

const normalizedData = normalize(data, myArray);
```

#### Output

```js
// [ input, parent, key ]-444
// input
{
  id: 1,
  type: 'admin'
}
// parent
[
  {
    id: 1,
    type: 'admin'
  },
  {
    id: 2,
    type: 'user'
  }
]
// key
null
// normalizedData
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

### `Values(definition, schemaAttribute)` 值类型

定义一个映射类型，其值遵循给定的模式。

- `definition`: **required** 此数组包含的单一模式或模式到属性值的映射
- `schemaAttribute`: _optional_ (如果 `definition` 不是单一模式则该参数必须) 找到的每个实体上的属性，根据定义映射定义规范化时要使用的模式。
  可以是字符串或函数，如果定义为函数则拥有以下有序参数:
  - `value`: 输入的实体
  - `parent`: 输入实体的父级
  - `key`: 输入数组显示在父对象上的键

#### Instance Methods

- `define(definition)`: When used, the `definition` passed in will be merged with the original definition passed to the `Values` constructor. This method tends to be useful for creating circular references in schema.

#### Usage

```js
const data = { firstThing: { id: 1 }, secondThing: { id: 2 } };

const item = new schema.Entity('items');
// 这里取的id键是库中默认指定的 如果需要修改，要针对这个实体定义options，在其中定义唯一键 idAttribute
// const item = new schema.Entity('items', {}, { idAttribute: 'idStr' });
const valuesSchema = new schema.Values(item);

const normalizedData = normalize(data, valuesSchema);
```

#### Output

```js
{
  entities: {
    items: { '1': { id: 1 }, '2': { id: 2 } }
  },
  result: { firstThing: 1, secondThing: 2 }
}
```

如果输入数据是一个具有多个实体类型值的对象，但它们的模式不便单纯使用键定义，则可以使用模式映射，如`schema.Union` 或 `schema.Array`

_注意: 如果返回值中不存在实体，只包含原始对象，则代表提供的模型映射和输入的数据没有关联_

举个栗子:

```js
const data = {
  '1': { id: 1, type: 'admin' },
  '2': { id: 2, type: 'user' }
};

const userSchema = new schema.Entity('users');
const adminSchema = new schema.Entity('admins');
const valuesSchema = new schema.Values(
  {
    admins: adminSchema,
    users: userSchema
  },
  (input, parent, key) => `${input.type}s`
);

const normalizedData = normalize(data, valuesSchema);
```

#### Output

```js
{
  entities: {
    admins: { '1': { id: 1, type: 'admin' } },
    users: { '2': { id: 2, type: 'user' } }
  },
  result: {
    '1': { id: 1, schema: 'admins' },
    '2': { id: 2, schema: 'users' }
  }
}
```

## 注意事项：

- 使用 `Entity` 创建实体时，需要指定 `idAttribute` 等属性时，需要完全定义 `Entity` 中的三个参数，它没有额外的参数处理。或许之后可以考虑优化，*添加参数重载*功能。
- 使用 `new schema.Object({key: String})` 这种类型定义是无效的 normalize是不会改变源数据 值数据类型的
- `Union` 可以拥有很多 `schema`，这些 `schema` 可以是任意类型的，这些 `schema` 会根据 `schemaAttribute` 属性来判断数据类型。如果 `schemaAttribute` 对应的值不存在，则使生成的数据不会创建实体，且会将原始数据直接返回。如果对应的值存在，则根据对应的 `schema` 生成数实体。


## 参考文章

- [使用 normalizr 进行复杂数据转换](https://segmentfault.com/a/1190000042216483)
- [normalizr Github 文档](https://github.com/paularmstrong/normalizr/blob/master/docs/api.md)
