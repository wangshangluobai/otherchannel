import { normalize, schema, denormalize } from 'normalizr';

/** 初步尝试
const originInfo = {
  id: '1',
  title: 'JavaScript 从入门到放弃',
  // 作者
  author: {
    id: '1',
    name: 'chc',
  },
  // 评论
  comments: [
    {
      id: '1',
      content: '作者写的太好了',
      commenter: {
        id: '1',
        name: 'chc',
      },
    },
    {
      id: '2',
      content: '楼上造假数据哈',
      commenter: {
        id: '2',
        name: 'dcd',
      },
    },
  ],
};
// 构造第一个实体 用户信息
const user = new schema.Entity('users');

// 构造第二个实体 评论
const comment = new schema.Entity('comments', {
  // 评价者是用户
  commenter: user,
});

// 构造第三个实体 书籍
const book = new schema.Entity('books', {
  // 作者
  author: user,
  // 评论
  comments: [comment],
});

// 传入数据以及当前最大的 schema 信息
const normalizedData = normalize(originInfo, book);
console.info(
  '%c [ normalizedData ]-52',
  'font-size:13px; background:#490466; color:#8d48aa;',
  normalizedData,
  schema,
); */

/** 使用自定义唯一键属性

const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: 'userId',
  },
);
const userListSchema = new schema.Array(userSchema);

const response = {
  users: [
    {
      userId: 'user-1',
      name: 'John Doe',
    },
    {
      userId: 'user-2',
      name: 'Jane Smith',
    },
  ],
};

const normalizedData = normalize(response, {
  users: userListSchema,
});
console.log(
  '%c [ normalizedData ]-77',
  'font-size:13px; background:#23f016; color:#67ff5a;',
  normalizedData,
); */

/** 处理数组类型

const postsSchema = new schema.Entity(
  'posts',
  {},
  {
    idAttribute: 'postId',
  },
);
const userSchema = new schema.Entity(
  'users',
  {
    // 这两种写法 效果上是一致的
    // posts: new schema.Array(postsSchema),
    posts: [postsSchema],
  },
  { idAttribute: 'userId' },
);

const response = {
  user: {
    userId: 'user-1',
    name: 'John Doe',
    posts: [
      {
        postId: 'post-1',
        title: 'My First Post',
      },
      {
        postId: 'post-2',
        title: 'My Second Post',
      },
    ],
  },
};

const normalizedData = normalize(response, {
  user: userSchema,
});
console.log(
  '%c [ normalizedData ]-116',
  'font-size:13px; background:#43ea9f; color:#87ffe3;',
  normalizedData,
); */

/* 定义对象类型实体，尝试改变 源数据类型
// 这种类型定义是无效的 normalize是不会改变源数据 值数据类型的
const addressSchema = new schema.Object({
  street: String,
  city: String,
  country: String,
  code: String,
  // code: Number,
});

const userSchema = new schema.Entity(
  'users',
  {
    address: addressSchema,
  },
  {
    idAttribute: 'userId',
  },
);

const response = {
  user: {
    userId: 'user-1',
    name: 'John Doe',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      country: 'USA',
      code: 12,
    },
  },
};

const normalizedData = normalize(response, {
  user: userSchema,
});
console.log(
  '%c [ normalizedData ]-159',
  'font-size:13px; background:#4f7367; color:#93b7ab;',
  normalizedData,
); */

/* const bookSchema = new schema.Entity('books', {
  mediaType: String,
  title: String,
  author: String,
});
const movieSchema = new schema.Entity('movies', {});

const mediaSchema = new schema.Union(
  {
    books: bookSchema,
    movies: movieSchema,
  },
  'mediaType',
);

const response = {
  media: [
    {
      mediaType: 'book',
      title: "The Hitchhiker's Guide to the Galaxy",
      author: 'Douglas Adams',
    },
    {
      mediaType: 'movie',
      title: 'Blade Runner',
      director: 'Ridley Scott',
    },
    {
      mediaType: 'movie',
      title: 'Blade Runner12',
      director: 'Ridley Scott3',
    },
  ],
};

const normalizedData = normalize(response, {
  media: [mediaSchema],
});
console.log(
  '%c [ normalizedData ]-205',
  'font-size:13px; background:#387350; color:#7cb794;',
  normalizedData,
); */

/* 

您提到的现象——输出的normalizedData对象中的entities没有值——理论上不应该出现，因为按照正常运作，normalizr在规范化过程中会把数据拆分为entities（存储具体实体对象）和result（存储实体间关系）两部分。然而，您提供的代码片段存在一处可能引发此问题的关键错误：schema.Object并非normalizr库中的构造器。

*/

/** 尝试使用联合模式
// 定义子实体模式
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'authorId' });
const directorSchema = new schema.Entity('directors', {}, { idAttribute: 'directorId' });

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

// 定义联合模式
// const mediaSchema = new schema.Union(
//   {
//     books: bookSchema,
//     movies: movieSchema,
//   },
//   'mediaType',
// );
const mediaSchema = new schema.Union(
  {
    book: bookSchema,
    movie: movieSchema,
  },
  'mediaType',
);
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

// 进行规范化处理
const normalizedData = normalize(sampleData, {
  media: [mediaSchema],
});

// 打印规范化后的数据
console.log(normalizedData);

*/

/* 
const data = {
  owner: { id: 1, type: 'nothingness', name: 'Anne' },
};

const user = new schema.Entity('users');
const group = new schema.Entity('groups');
// const nothingness = new schema.Entity('nothingness');
const unionSchema = new schema.Union(
  {
    user: user,
    group: group,
  },
  'type',
);

const normalizedData = normalize(data, { owner: unionSchema });
console.log(
  '%c [ normalizedData ]-312',
  'font-size:13px; background:#9a9ff0; color:#dee3ff;',
  normalizedData,
); */

/* 
描述一个模式，它是多个模式的并集。如果您需要模式提供的多态行为，这将非常有用。数组或架构。值，但不适用于非集合字段。
  definition:必需映射输入数组中嵌套实体定义的对象
  schemaAttribute：必需找到的每个实体上的属性，根据定义映射定义规范化时要使用的架构。

    可以是字符串或函数。如果给定函数，则接受以下参数：
    value：实体的输入值。
    parent:输入数组的父对象。
    key：输入数组显示在父对象上的键。
    
实例方法
define（definition）：使用时，传入的定义将与传递给Union构造函数的原始定义合并。这种方法对于在模式中创建循环引用非常有用。

注意：如果您的数据返回了一个未提供映射的对象，则原始对象将在结果中返回，并且不会创建实体。

*/

/**
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
      favorites: entityA.favorites,
    }),
    // Remove the URL field from the entity
    processStrategy: (entity) => omit(entity, 'url'),
  },
);
function omit(entity, key) {
  delete entity[key];
  return entity;
}

const normalizedData = normalize(data, tweet);
console.log(
  '%c [ normalizedData ]-360',
  'font-size:13px; background:#b092be; color:#f4d6ff;',
  normalizedData,
);
*/

/*
const data = [
  { id: '1', guest_id: null, name: 'Esther' },
  { id: '1', guest_id: '22', name: 'Tom' },
];

const patronsSchema = new schema.Entity('patrons', undefined, {
  // idAttribute *functions* must return the ids **value** (not key)
  idAttribute: (value) => (value.guest_id ? `${value.id}-${value.guest_id}` : value.id),
});

const resoult = normalize(data, [patronsSchema]);
console.log('%c [ resoult ]-378', 'font-size:13px; background:#3abbe0; color:#7effff;', resoult);
*/

/*
const users = {
  1: { id: '1', name: 'Emily', requestState: 'SUCCEEDED' },
  2: { id: '2', name: 'Douglas', requestState: 'SUCCEEDED' },
};
const books = {
  1: { id: '1', name: 'Book 1', author: 1 },
  2: { id: '2', name: 'Book 2', author: 2 },
  3: { id: '3', name: 'Book 3', author: 3 },
};

const authorSchema = new schema.Entity(
  'authors',
  {},
  {
    fallbackStrategy: (key, schema) => {
      return {
        [schema.idAttribute]: key,
        name: 'Unknown',
        requestState: 'NONE',
      };
    },
  },
);
const bookSchema = new schema.Entity('books', {
  author: authorSchema,
});
console.log(
  '%c [ bookSchema ]-410',
  'font-size:13px; background:#9b52ef; color:#df96ff;',
  bookSchema,
);

const denormalizedData = denormalize([1, 2, 3], [bookSchema], {
  books,
  authors: users,
});
console.log(
  '%c [ denormalizedData ]-414',
  'font-size:13px; background:#096de6; color:#4db1ff;',
  denormalizedData,
);
*/

/*
const data = [
  { id: 1, type: 'admin' },
  { id: 2, type: 'user' },
];

const userSchema = new schema.Entity('users');
const adminSchema = new schema.Entity('admins');
const myArray = new schema.Array(
  {
    admins: adminSchema,
    users: userSchema,
  },
  // `schemaAttribute` 是一个函数是，
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
console.log(
  '%c [ normalizedData ]-446',
  'font-size:13px; background:#8131c5; color:#c575ff;',
  normalizedData,
);
*/

/*
// 值类型测试
const data = { firstThing: { idStr: 1 }, secondThing: { idStr: 2 } };

const item = new schema.Entity('items', {}, { idAttribute: 'idStr' });
const valuesSchema = new schema.Values(item);

const normalizedData = normalize(data, valuesSchema);
console.log(
  '%c [ normalizedData ]-471',
  'font-size:13px; background:#d6697b; color:#ffadbf;',
  normalizedData,
);
*/

/*
// 去归一化
const data = { firstThing: { idStr: 1 }, secondThing: { idStr: 2 } };

const item = new schema.Entity('items', {}, { idAttribute: 'idStr' });
const valuesSchema = new schema.Values(item);

const normalizedData = normalize(data, valuesSchema);
console.log(
  '%c [ normalizedData ]-471',
  'font-size:13px; background:#d6697b; color:#ffadbf;',
  normalizedData,
);
const denormalizedData = denormalize(normalizedData.result, valuesSchema, normalizedData.entities);
console.log(
  '%c [ denormalizedData ]-492',
  'font-size:13px; background:#042cae; color:#4870f2;',
  denormalizedData,
);
*/
