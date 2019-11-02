---
prev: ./string
next: ./list
---

# hash

::: tip 说明
本节示例中的 `Hash` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## hdel

从 key 指定的哈希集中移除指定的域。在哈希集中不存在的域将被忽略。如果 key 指定的哈希集不存在，它将被认为是一个空的哈希集，该命令将返回 0。

#### _Redis_ [+](http://www.redis.cn/commands/hdel.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(N)`
- 返回值：返回从哈希集中成功移除的域的数量，不包括指出但不存在的那些域
- 指令案例：

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HDEL myhash field1
(integer) 1
redis> HDEL myhash field2
(integer) 0
```

#### _Tedis_

- 接口：

```ts
hdel(key: string, field: string, ...fields: string[]): Promise<number>;
```

- 示例：

```ts
await Hash.hdel("myhash", "field1");
// 1
await Hash.hdel("myhash", "field2");
// 0
```

## hexists

desc

#### _Redis_ [+](http://www.redis.cn/commands/hexists.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 1 hash 里面包含该 field。
  - 0 hash 里面不包含该 field 或者 key 不存在。
- 指令案例：

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HEXISTS myhash field1
(integer) 1
redis> HEXISTS myhash field2
(integer) 0
```

#### _Tedis_

- 接口：

```ts
hexists(key: string, field: string): Promise<number>;
```

- 示例：

```ts
await Hash.hexists("myhash", "field1");
// 1
await Hash.hexists("myhash", "field2");
// 0
```

## hget

返回 key 指定的哈希集中该字段所关联的值

#### _Redis_ [+](http://www.redis.cn/commands/hget.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：该字段所关联的值。当字段不存在或者 key 不存在时返回 nil。
- 指令案例：

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HGET myhash field1
"foo"
redis> HGET myhash field2
(nil)
```

#### _Tedis_

- 接口：

```ts
hget(key: string, field: string): Promise<string | null>;
```

- 示例：

```ts
await Hash.hget("myhash", "field1");
// "foo"
await Hash.hget("myhash", "field2");
// null
```

## hgetall

返回 key 指定的哈希集中所有的字段和值。返回值中，每个字段名的下一个是它的值，所以返回值的长度是哈希集大小的两倍

#### _Redis_ [+](http://www.redis.cn/commands/hgetall.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：哈希集中字段和值的列表，当 key 指定的哈希集不存在时返回空列表。
- 指令案例：

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HGETALL myhash
1) "field1"
2) "Hello"
3) "field2"
4) "World"
```

#### _Tedis_

- 接口：

```ts
hgetall(key: string): Promise<{ [propName: string]: string }>;
```

- 示例：

```ts
await Hash.hgetall("myhash");
// {
//   field1: "Hello",
//   field2: "World"
// }
```

## hincrby

增加 key 指定的哈希集中指定字段的数值。如果 key 不存在，会创建一个新的哈希集并与 key 关联。如果字段不存在，则字段的值在该操作执行前被设置为 0。HINCRBY 支持的值的范围限定在 64 位 有符号整数

#### _Redis_ [+](http://www.redis.cn/commands/hincrby.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：增值操作执行后的该字段的值。
- 指令案例：

```bash
redis> HSET myhash field 5
(integer) 1
redis> HINCRBY myhash field 1
(integer) 6
redis> HINCRBY myhash field -1
(integer) 5
redis> HINCRBY myhash field -10
(integer) -5
```

#### _Tedis_

- 接口：

```ts
hincrby(key: string, field: string, increment: number): Promise<number>;
```

- 示例：

```ts
await Hash.hincrby("myhash", "field", 1);
// 6
await Hash.hincrby("myhash", "field", -1);
// 5
await Hash.hincrby("myhash", "field", -10);
// -5
```

## hincrbyfloat

为指定 key 的 hash 的 field 字段值执行 float 类型的 increment 加。如果 field 不存在，则在执行该操作前设置为 0。如果出现下列情况之一，则返回错误：

- field 的值包含的类型错误(不是字符串)。
- 当前 field 或者 increment 不能解析为一个 float 类型。

#### _Redis_ [+](http://www.redis.cn/commands/hincrbyfloat.html)

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值：field 执行 increment 加后的值
- 指令案例：

```bash
redis> HSET mykey field 10.50
(integer) 1
redis> HINCRBYFLOAT mykey field 0.1
"10.6"
redis> HINCRBYFLOAT mykey field -5
"5.6"
redis> HSET mykey field 5.0e3
(integer) 0
redis> HINCRBYFLOAT mykey field 2.0e2
"5200"
```

#### _Tedis_

- 接口：

```ts
hincrbyfloat(key: string, field: string, increment: number): Promise<string>;
```

- 示例：

```ts
await Hash.hincrbyfloat("mykey", "field", 0.1);
// "10.6"
await Hash.hincrbyfloat("mykey", "field", -5);
// "5.6"
await Hash.hincrbyfloat("mykey", "field", 2.0e2);
// "5200"
```

## hkeys

返回 key 指定的哈希集中所有字段的名字。

#### _Redis_ [+](http://www.redis.cn/commands/hkeys.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(N)`
- 返回值：哈希集中的字段列表，当 key 指定的哈希集不存在时返回空列表。
- 指令案例：

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HKEYS myhash
1) "field1"
2) "field2"
```

#### _Tedis_

- 接口：

```ts
hkeys(key: string): Promise<string[]>;
```

- 示例：

```ts
await Hash.hkeys("myhash");
// ["field1", "field2"];
```

## hlen

返回 key 指定的哈希集包含的字段的数量。

#### _Redis_ [+](http://www.redis.cn/commands/hlen.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：哈希集中字段的数量，当 key 指定的哈希集不存在时返回 0
- 指令案例：

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HLEN myhash
(integer) 2
```

#### _Tedis_

- 接口：

```ts
hlen(key: string): Promise<number>;
```

- 示例：

```ts
await Hash.hlen("myhash");
// 2
```

## hmget

返回 key 指定的哈希集中指定字段的值。对于哈希集中不存在的每个字段，返回 nil 值。因为不存在的 keys 被认为是一个空的哈希集，对一个不存在的 key 执行 HMGET 将返回一个只含有 nil 值的列表

#### _Redis_ [+](http://www.redis.cn/commands/hmget.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：含有给定字段及其值的列表，并保持与请求相同的顺序。
- 指令案例：

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HMGET myhash field1 field2 nofield
1) "Hello"
2) "World"
3) (nil)
```

#### _Tedis_

- 接口：

```ts
hmget(key: string, field: string, ...fields: string[]): Promise<Array<string | null>>;
```

- 示例：

```ts
await Hash.hmget("myhash", "field1", "field2", "nofield");
// ["Hello", "World", null]
```

## hmset

设置 key 指定的哈希集中指定字段的值。该命令将重写所有在哈希集中存在的字段。如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联

#### _Redis_ [+](http://www.redis.cn/commands/hmset.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(N)`
- 返回值："OK"
- 指令案例：

```bash
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"
```

#### _Tedis_

- 接口：

```ts
hmset(
  key: string,
  hash: {
    [propName: string]: string | number;
  },
): Promise<any>;
```

- 示例：

```ts
await Hash.hmset("myhash", {
  field1: "Hello",
  field2: "World"
});
// "OK"
```

## hset

设置 key 指定的哈希集中指定字段的值。如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联。如果字段在哈希集中存在，它将被重写。

#### _Redis_ [+](http://www.redis.cn/commands/hset.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 1 如果 field 是一个新的字段
  - 0 如果 field 原来在 map 里面已经存在
- 指令案例：

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HGET myhash field1
"Hello"
```

#### _Tedis_

- 接口：

```ts
hset(key: string, field: string, value: string | number): Promise<0 | 1>;
```

- 示例：

```ts
await Hash.hset("myhash", "field1", "Hello");
// 1
```

## hsetnx

只在 key 指定的哈希集中不存在指定的字段时，设置字段的值。如果 key 指定的哈希集不存在，会创建一个新的哈希集并与 key 关联。如果字段已存在，该操作无效果。

#### _Redis_ [+](http://www.redis.cn/commands/hsetnx.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 1：如果字段是个新的字段，并成功赋值
  - 0：如果哈希集中已存在该字段，没有操作被执行
- 指令案例：

```bash
redis> HSETNX myhash field "Hello"
(integer) 1
redis> HSETNX myhash field "World"
(integer) 0
redis> HGET myhash field
"Hello"
```

#### _Tedis_

- 接口：

```ts
hsetnx(key: string, field: string, value: string): Promise<0 | 1>;
```

- 示例：

```ts
await Hash.hsetnx("myhash", "field", "Hello");
// 1
await Hash.hsetnx("myhash", "field", "World");
// 0
```

## hstrlen

返回 hash 指定 field 的 value 的字符串长度，如果 hash 或者 field 不存在，返回 0

#### _Redis_ [+](http://www.redis.cn/commands/hstrlen.html)

- 可用版本：`>= 3.2.0`
- 算法复杂度：`O(1)`
- 返回值：返回 hash 指定 field 的 value 的字符串长度，如果 hash 或者 field 不存在，返回 0
- 指令案例：

```bash
redis> HMSET myhash f1 HelloWorld f2 99 f3 -256
"OK"
redis> HSTRLEN myhash f1
(integer) 10
redis> HSTRLEN myhash f2
(integer) 2
redis> HSTRLEN myhash f3
(integer) 4
```

#### _Tedis_

- 接口：

```ts
hstrlen(key: string, field: string): Promise<number>;
```

- 示例：

```ts
await Hash.hstrlen("myhash", "f1");
// 10
await Hash.hstrlen("myhash", "f2");
// 2
await Hash.hstrlen("myhash", "f3");
// 4
```

## hvals

返回 key 指定的哈希集中所有字段的值。

#### _Redis_ [+](http://www.redis.cn/commands/hvals.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(N)`
- 返回值：
- 指令案例：

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HVALS myhash
1) "Hello"
2) "World"
```

#### _Tedis_

- 接口：

```ts
hvals(key: string): Promise<string[]>;
```

- 示例：

```ts
await Hash.hvals("myhash");
// ["Hello", "World"]
```
