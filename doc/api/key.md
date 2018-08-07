---
prev: ./
next: ./string
---

# key

::: tip 说明
本节示例中的 `Key` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## del

用于删除已存在的键。不存在的 key 会被忽略。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：被删除键的数量
- 指令案例：

```bash
redis> SET key1 "Hello"
"OK"
redis> SET key2 "World"
"OK"
redis> DEL key1 key2 key3
(integer) 2
```

#### _Tedis_

- 接口：

```ts
del(key: string, ...keys: string[]): Promise<number>;
```

- 示例：

```ts
await Key.del("key1", "key2", "key3");
// 2
```

## dump

用于序列化给定 key ，并返回被序列化的值。

#### _Redis_

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值：如果 key 不存在，那么返回`nil`。 否则，返回序列化之后的值。
- 指令案例：

```bash
redis> SET mykey 10
"OK"
redis> DUMP mykey
"\u0000\xC0\n\t\u0000\xBEm\u0006\x89Z(\u0000\n"
```

#### _Tedis_

- 接口：

```ts
dump(key: string): Promise<null | string>;
```

- 示例：

```ts
await Key.dump("mykey");
// "\u0000\xC0\n\t\u0000\xBEm\u0006\x89Z(\u0000\n"
```

## exists

命令用于检查给定 key 是否存在。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：若 key 存在返回`1`，否则返回`0` 。
- 指令案例：

```bash
redis> SET key1 "Hello"
"OK"
redis> EXISTS key1
(integer) 1
redis> EXISTS nosuchkey
(integer) 0
redis> SET key2 "World"
"OK"
redis> EXISTS key1 key2 nosuchkey
(integer) 2
```

#### _Tedis_

- 接口：

```ts
exists(key: string, ...keys: string[]): Promise<number>;
```

- 示例：

```ts
await Key.exists("key1");
// 1
await Key.exists("nosuchkey");
// 0
await Key.exists("key1", "key2", "nosuchkey");
// 2
```

## expire

用于设置 key 的过期时间，以秒为单位。key 过期后将不再可用。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：设置成功返回`1`。 当 key 不存在或者不能为 key 设置过期时间时返回`0`。
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
```

#### _Tedis_

- 接口：

```ts
expire(key: string, seconds: number): Promise<number>;
```

- 示例：

```ts
await Key.expire("mykey", 10);
// 1
```

## expireat

以 UNIX 时间戳(unix timestamp)格式设置 key 的过期时间。key 过期后将不再可用。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：设置成功返回`1`。 当 key 不存在或者不能为 key 设置过期时间时返回`0`。
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIREAT mykey 1293840000
(integer) 1
```

#### _Tedis_

- 接口：

```ts
expireat(key: string, timestamp: string): Promise<number>;
```

- 示例：

```ts
await Key.expireat("mykey", "1293840000");
// 1
```

## keys

查找所有符合给定模式 pattern（正则表达式）的 key 。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：所有符合条件的 key。
- 指令案例：

```bash
redis> MSET firstname Jack lastname Stuntman age 35
"OK"
redis> KEYS *name*
1) "firstname"
2) "lastname"
redis> KEYS a??
1) "age"
redis> KEYS *
1) "firstname"
2) "lastname"
3) "age"
```

#### _Tedis_

- 接口：

```ts
keys(pattern: string): Promise<string[]>;
```

- 示例：

```ts
await Key.keys("mykey", "*name*");
// ["firstname", "lastname"];
await Key.keys("mykey", "a??");
// ["age"];
await Key.keys("mykey", "*");
// ["firstname", "lastname", "age"];
```

## move

将当前数据库的 key 移动到给定的数据库 db 当中。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：移动成功返回`1`，失败则返回`0`。
- 指令案例：

```bash
redis> SELECT 0
"OK"
redis> SET mykey "secret base - Zone"
"OK"
redis> MOVE mykey 1
(integer) 1
```

#### _Tedis_

- 接口：

```ts
move(key: string, db: number): Promise<number>;
```

- 示例：

```ts
Key.move("mykey", 1);
// 1
```

## persist

移除给定 key 的生存时间。

#### _Redis_

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：当生存时间移除成功时，返回 1 ，如果 key 不存在或 key 没有设置生存时间，返回 0 。
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> PERSIST mykey
(integer) 1
redis> TTL mykey
(integer) -1
```

#### _Tedis_

- 接口：

```ts
persist(key: string): Promise<number>;
```

- 示例：

```ts
await Key.persist("mykey");
// 1
```

## pexpire

这个命令和 EXPIRE 命令的作用类似，但是它以毫秒为单位设置 key 的生存时间，而不像 EXPIRE 命令那样，以秒为单位。

#### _Redis_

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值：设置成功，返回 1，key 不存在或设置失败，返回 0
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> PEXPIRE mykey 1500
(integer) 1
redis> TTL mykey
(integer) 1
redis> PTTL mykey
(integer) 1499
```

#### _Tedis_

- 接口：

```ts
pexpire(key: string, milliseconds: number): Promise<number>;
```

- 示例：

```ts
await Key.pexpire("mykey", 1500);
// 1
```

## pexpireat

PEXPIREAT 这个命令和 EXPIREAT 命令类似，但它以毫秒为单位设置 key 的过期 unix 时间戳，而不是像 EXPIREAT 那样，以秒为单位。

#### _Redis_

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值：设置成功，返回 1，key 不存在或设置失败，返回 0
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> PEXPIREAT mykey 1555555555005
(integer) 1
redis> TTL mykey
(integer) 21889460
redis> PTTL mykey
(integer) 21889460097
```

#### _Tedis_

- 接口：

```ts
pexpireat(key: string, millisecondsTimestamp: string): Promise<number>;
```

- 示例：

```ts
await Key.pexpireat("mykey", "1555555555005");
// 1
```

## pttl

以毫秒为单位返回 key 的剩余生存时间。在 Redis 2.6 和之前版本，如果 key 不存在或者 key 存在且无过期时间将返回-1。从 Redis 2.8 开始，错误返回值发送了如下变化：

- 如果 key 不存在返回-2
- 如果 key 存在且无过期时间返回-1

#### _Redis_

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值： key 有效的毫秒数（TTL in milliseconds）,或者一个负值的错误 (参考上文)
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 1
(integer) 1
redis> PTTL mykey
(integer) 999
```

#### _Tedis_

- 接口：

```ts
pttl(key: string): Promise<number>;
```

- 示例：

```ts
await Key.pttl("mykey");
// 999
```

## randomkey

从当前数据库返回一个随机的 key。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：如果数据库没有任何 key，返回 nil，否则返回一个随机的 key。
- 指令案例：

```bash
redis> MSET fruit "apple" drink "beer" food "cookies"
"OK"
redis> RANDOMKEY
"fruit"
```

#### _Tedis_

- 接口：

```ts
randomkey(): Promise<null | string>;
```

- 示例：

```ts
await Key.randomkey();
// fruit
```

## rename

将 key 重命名为 newkey，如果 key 与 newkey 相同，将返回一个错误。如果 newkey 已经存在，则值将被覆盖。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：如果设置成功返回"OK"
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> RENAME mykey myotherkey
"OK"
redis> GET myotherkey
"Hello"
```

#### _Tedis_

- 接口：

```ts
rename(key: string, newKey: string): Promise<any>;
```

- 示例：

```ts
await Key.rename("mykey", "myotherkey");
// "OK"
```

## renamenx

当且仅当 newkey 不存在时，将 key 改名为 newkey 。当 key 不存在时，返回一个错误。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：修改成功时，返回 1 ，如果 newkey 已经存在，返回 0 。
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> SET myotherkey "World"
"OK"
redis> RENAMENX mykey myotherkey
(integer) 0
redis> GET myotherkey
"World"
```

#### _Tedis_

- 接口：

```ts
renamenx(key: string, newKey: string): Promise<0 | 1>;
```

- 示例：

```ts
await Key.renamenx("mykey", "myotherkey");
// 0
```

## ttl

返回 key 剩余的过期时间。 这种反射能力允许 Redis 客户端检查指定 key 在数据集里面剩余的有效期。在 Redis 2.6 和之前版本，如果 key 不存在或者已过期时返回-1。从 Redis2.8 开始，错误返回值的结果有如下改变：

- 如果 key 不存在或者已过期，返回 -2
- 如果 key 存在并且没有设置过期时间（永久有效），返回 -1 。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值： key 有效的秒数（TTL in seconds）,或者一个负值的错误 (参考上文)
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
```

#### _Tedis_

- 接口：

```ts
ttl(key: string): Promise<number>;
```

- 示例：

```ts
await Key.ttl("mykey");
// 10
```

## type

返回 key 所存储的 value 的数据结构类型，它可以返回 string, list, set, zset 和 hash 等不同的类型。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：返回当前 key 的数据类型，如果 key 不存在时返回 none。
- 指令案例：

```bash
redis> SET key1 "value"
"OK"
redis> LPUSH key2 "value"
(integer) 1
redis> SADD key3 "value"
(integer) 1
redis> TYPE key1
"string"
redis> TYPE key2
"list"
redis> TYPE key3
"set"
```

#### _Tedis_

- 接口：

```ts
type(key: string): Promise<string>;
```

- 示例：

```ts
await Key.type("key1");
// string
await Key.type("key2");
// list
await Key.type("key3");
// set
```
