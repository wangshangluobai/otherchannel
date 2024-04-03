MyBatis-Plus 中的 QueryWrapper 类提供了丰富的条件构造方法，用于构建复杂的 SQL 查询语句。
以下是一些常见的方法及其含义：

```text
eq(String column, Object value)
等于操作符，设置 column 列等于给定的 value。

ne(String column, Object value)
不等于操作符，设置 column 列不等于给定的 value。

gt(String column, Object value)
大于操作符，设置 column 列大于给定的 value。

ge(String column, Object value)
大于或等于操作符，设置 column 列大于等于给定的 value。

lt(String column, Object value)
小于操作符，设置 column 列小于给定的 value。

le(String column, Object value)
小于或等于操作符，设置 column 列小于等于给定的 value。

between(String column, Object val1, Object val2)
区间查询，设置 column 列的值在 val1 和 val2 之间。

notBetween(String column, Object val1, Object val2)
非区间查询，设置 column 列的值不在 val1 和 val2 之间。

like(String column, String value)
模糊查询，设置 column 列的值包含 value。

notLike(String column, String value)
非模糊查询，设置 column 列的值不包含 value。

in(String column, Collection<?> values)
IN 操作符，设置 column 列的值在指定集合 values 内。

notIn(String column, Collection<?> values)
NOT IN 操作符，设置 column 列的值不在指定集合 values 内。

isNull(String column)
空值判断，设置 column 列的值为 NULL。

isNotNull(String column)
非空值判断，设置 column 列的值不为 NULL。

orderByAsc(String column)
升序排序，按 column 列进行升序排列。

orderByDesc(String column)
降序排序，按 column 列进行降序排列。

groupBy(String columns)
GROUP BY 子句，按照指定的 columns 列进行分组。

having(String sqlHaving, Object... params)
HAVING 子句，添加自定义的 HAVING 条件。

setSqlSelect(String... columns)
设置 SELECT 查询字段，只查询指定的列。
```
