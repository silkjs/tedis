---
prev: ./list
next: ./zset
---

# set

::: tip 说明
本节示例中的 `Set` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## sadd

添加一个或多个指定的 member 元素到集合的 key 中.指定的一个或者多个元素 member 如果已经在集合 key 中存在则忽略。如果集合 key 不存在，则新建集合 key，并添加 member 元素到集合 key 中。

如果 key 的类型不是集合则返回错误。

**历史**

`>= 2.4`：接受多个 member 参数。Redis 2.4 以前的版本每次只能添加一个 member 元素。

#### _Redis_ [+](http://www.redis.cn/commands/sadd.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：返回新成功添加到集合里元素的数量，不包括已经存在于集合中的元素。
- 指令案例：

```bash
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SADD myset "World"
(integer) 0
redis> SMEMBERS myset
1) "Hello"
2) "World"
```

#### _Tedis_

- 接口：

```ts
sadd(key: string, ...members: Array<string | number>): Promise<number>;
```

- 示例：

```ts
await Set.sadd("myset", "Hello");
// 1
await Set.sadd("myset", "World");
// 1
await Set.sadd("myset", "World");
// 0
```

## scard

返回集合存储的 key 的基数 (集合元素的数量)。

#### _Redis_ [+](http://www.redis.cn/commands/scard.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：集合的基数（元素的数量），如果 key 不存在则返回 0。
- 指令案例：

```bash
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SCARD myset
(integer) 2
```

#### _Tedis_

- 接口：

```ts
scard(key: string): Promise<number>;
```

- 示例：

```ts
await Set.scard("myset");
// 2
```

## sdiff

返回一个集合与给定集合的差集的元素。不存在的 key 认为是空集。

#### _Redis_ [+](http://www.redis.cn/commands/sdiff.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：结果集的元素
- 指令案例：

```bash
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SDIFF key1 key2
1) "b"
2) "a"
```

#### _Tedis_

- 接口：

```ts
sdiff(key: string, ...keys: string[]): Promise<Array<string | number>>;
```

- 示例：

```ts
await Set.sdiff("key1", "key2");
// ["b", "a"]
```

## sdiffstore

该命令类似于 SDIFF，不同之处在于该命令不返回结果集，而是将结果存放在 destination 集合中

如果 destination 已经存在，则将其覆盖重写

#### _Redis_ [+](http://www.redis.cn/commands/sdiffstore.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：结果集元素的个数
- 指令案例：

```bash
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SDIFFSTORE key key1 key2
(integer) 2
redis> SMEMBERS key
1) "b"
2) "a"
```

#### _Tedis_

- 接口：

```ts
sdiffstore(destination: string, key: string, ...keys: string[]): Promise<number>;
```

- 示例：

```ts
await Set.sdiffstore("key", "key1", "key2");
// ["b", "a"]
```

## sinter

返回指定所有的集合的成员的交集。如果 key 不存在则被认为是一个空的集合，当给定的集合为空的时候，结果也为空（一个集合为空，结果一直为空）

#### _Redis_ [+](http://www.redis.cn/commands/sinter.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N*M)`
- 返回值：结果集成员的列表
- 指令案例：

```bash
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SINTER key1 key2
1) "c"
```

#### _Tedis_

- 接口：

```ts
sinter(key: string, ...keys: string[]): Promise<Array<string | number>>;
```

- 示例：

```ts
await Set.sinter("key1", "key2");
// ["c"]
```

## sinterstore

这个命令与 SINTER 命令类似，但是它并不是直接返回结果集，而是将结果保存在 destination 集合中。
如果 destination 集合存在，则会被重写。

#### _Redis_ [+](http://www.redis.cn/commands/sinterstore.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N*M)`
- 返回值：结果集中成员的个数
- 指令案例：

```bash
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SINTERSTORE key key1 key2
(integer) 1
redis> SMEMBERS key
1) "c"
```

#### _Tedis_

- 接口：

```ts
sinterstore(destination: string, key: string, ...keys: string[]): Promise<number>;
```

- 示例：

```ts
await Set.sinterstore("key", "key1", "key2");
// 1
```

## sismember

返回成员 member 是否是存储的集合 key 的成员

#### _Redis_ [+](http://www.redis.cn/commands/sismember.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 如果 member 元素是集合 key 的成员，则返回 1
  - 如果 member 元素不是 key 的成员，或者集合 key 不存在，则返回 0
- 指令案例：

```bash
redis> SADD myset "one"
(integer) 1
redis> SISMEMBER myset "one"
(integer) 1
redis> SISMEMBER myset "two"
(integer) 0
```

#### _Tedis_

- 接口：

```ts
sismember(key: string, member: string): Promise<number>;
```

- 示例：

```ts
await Set.sismember("myset", "one");
// 1
await Set.sismember("myset", "two");
// 0
```

## smembers

返回 key 集合所有的元素，该命令的作用与使用一个参数的 SINTER 命令作用相同。

#### _Redis_ [+](http://www.redis.cn/commands/smembers.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：集合中的所有元素.
- 指令案例：

```bash
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SMEMBERS myset
1) "Hello"
2) "World"
```

#### _Tedis_

- 接口：

```ts
smembers(key: string): Promise<Array<string|number>>;
```

- 示例：

```ts
await Set.smembers("myset");
// ["Hello", "World"]
```

## smove

将 member 从 source 集合移动到 destination 集合中。对于其他的客户端,在特定的时间元素将会作为 source 或者 destination 集合的成员出现。

如果 source 集合不存在或者不包含指定的元素，这 smove 命令不执行任何操作并且返回 0，否则对象将会从 source 集合中移除，并添加到 destination 集合中去。如果 destination 集合已经存在该元素，则 smove 命令仅将该元素充 source 集合中移除。

如果 source 和 destination 不是集合类型，则返回错误。

#### _Redis_ [+](http://www.redis.cn/commands/smove.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 如果该元素成功移除，返回 1
  - 如果该元素不是 source 集合成员，无任何操作，则返回 0
- 指令案例：

```bash
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myotherset "three"
(integer) 1
redis> SMOVE myset myotherset "two"
(integer) 1
redis> SMEMBERS myset
1) "one"
redis> SMEMBERS myotherset
1) "two"
2) "three"
```

#### _Tedis_

- 接口：

```ts
smove(source: string, destination: string, member: string): Promise<number>;
```

- 示例：

```ts
await Set.smove("myset", "myotherset", "two");
// 1
```

## spop

移除并返回集合中的一个随机元素。

`>= 3.2` 可以使用 count 参数

#### _Redis_ [+](http://www.redis.cn/commands/spop.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：被移除的随机元素。 当集合不存在或是空集时，返回 nil 。
- 指令案例：

```bash
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SPOP myset
"one"
redis> SMEMBERS myset
1) "two"
2) "three"
redis> SADD myset "four"
(integer) 1
redis> SADD myset "five"
(integer) 1
redis> SPOP myset 3
1) "two"
2) "four"
3) "five"
redis> SMEMBERS myset
1) "three"
```

#### _Tedis_

- 接口：

```ts
spop(key: string, count?: number): Promise<string|number|null|Array<string|number>>;
```

- 示例：

```ts
await Set.spop("myset");
// "one"
await Set.spop("myset", 3);
// ["two", "four", "five"]
```

## srandmember

仅提供 key 参数，那么随机返回 key 集合中的一个元素。

Redis 2.6 开始，可以接受 count 参数，如果 count 是整数且小于元素的个数，返回含有 count 个不同的元素的数组，如果 count 是个整数且大于集合中元素的个数时，仅返回整个集合的所有元素，当 count 是负数，则会返回一个包含 count 的绝对值的个数元素的数组，如果 count 的绝对值大于元素的个数，则返回的结果集里会出现一个元素出现多次的情况。

仅提供 key 参数时，该命令作用类似于 SPOP 命令，不同的是 SPOP 命令会将被选择的随机元素从集合中移除，而 SRANDMEMBER 仅仅是返回该随记元素，而不做任何操作。

#### _Redis_ [+](http://www.redis.cn/commands/srandmember.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)|O(N)`
- 返回值：不使用 count 参数的情况下该命令返回随机的元素，如果 key 不存在则返回 nil。使用 count 参数，则返回一个随机的元素数组，如果 key 不存在则返回一个空的数组。
- 指令案例：

```bash
redis> SADD myset one two three
(integer) 3
redis> SRANDMEMBER myset
"two"
redis> SRANDMEMBER myset 2
1) "one"
2) "three"
redis> SRANDMEMBER myset -5
1) "one"
2) "three"
3) "two"
4) "one"
5) "one"
```

#### _Tedis_

- 接口：

```ts
srandmember(key: string, count?: number): Promise<string|number|null|Array<string|number>>;
```

- 示例：

```ts
await Set.srandmember("myset");
// "two"
await Set.srandmember("myset", 2);
// ["one", "three"]
await Set.srandmember("myset", -5);
// ["one", "three", "two", "one", "one"]
```

## srem

在 key 集合中移除指定的元素。如果指定的元素不是 key 集合中的元素则忽略 如果 key 集合不存在则被视为一个空的集合，该命令返回 0。
如果 key 的类型不是一个集合，则返回错误。

**历史**

`>= 2.4`: 接受多个 member 元素参数。Redis 2.4 之前的版本每次只能移除一个元素

#### _Redis_ [+](http://www.redis.cn/commands/srem.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：从集合中移除元素的个数，不包括不存在的成员
- 指令案例：

```bash
redis> SADD myset "one"
(integer) 1
redis> SADD myset "two"
(integer) 1
redis> SADD myset "three"
(integer) 1
redis> SREM myset "one"
(integer) 1
redis> SREM myset "four"
(integer) 0
redis> SMEMBERS myset
1) "two"
2) "three"
```

#### _Tedis_

- 接口：

```ts
srem(key: string, member: string, ...members: string[]): Promise<number>;
```

- 示例：

```ts
await Set.srem("myset", "one");
// 1
await Set.srem("myset", "four");
// 0
```

## sunion

返回给定的多个集合的并集中的所有成员，不存在的 key 可以认为是空的集合

#### _Redis_ [+](http://www.redis.cn/commands/sunion.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：并集的成员列表
- 指令案例：

```bash
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SUNION key1 key2
1) "a"
2) "c"
3) "b"
4) "e"
5) "d"
```

#### _Tedis_

- 接口：

```ts
sunion(key: string, keys: string[]): Promise<Array<string|number>>;
```

- 示例：

```ts
await Set.sunion("key1", "key2");
// ["a","b","c","e","d"]
```

## sunionstore

该命令作用类似于 SUNION 命令，不同的是它并不返回结果集，而是将结果存储在 destination 集合中。
如果 destination 已经存在，则将其覆盖。

#### _Redis_ [+](http://www.redis.cn/commands/sunionstore.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：结果集中元素的个数
- 指令案例：

```bash
redis> SADD key1 "a"
(integer) 1
redis> SADD key1 "b"
(integer) 1
redis> SADD key1 "c"
(integer) 1
redis> SADD key2 "c"
(integer) 1
redis> SADD key2 "d"
(integer) 1
redis> SADD key2 "e"
(integer) 1
redis> SUNIONSTORE key key1 key2
(integer) 5
redis> SMEMBERS key
1) "a"
2) "c"
3) "b"
4) "e"
5) "d"
```

#### _Tedis_

- 接口：

```ts
sunionstore(destination: string, key: string, keys: string[]): Promise<number>;
```

- 示例：

```ts
await Set.sunionstore("key", "key1", "key2");
// 5
```
