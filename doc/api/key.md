---
prev: ./
next: ./string
---

# key

## del

::: tip 1.0.0
时间复杂度：O(N) 将要被删除的 key 的数量，当删除的 key 是字符串以外的复杂数据类型时比如 List,Set,Hash 删除这个 key 的时间复杂度是 O(1)。返回值为被删除的 keys 的数量
:::

案例

```bash
redis> SET key1 "Hello"
OK
redis> SET key2 "World"
OK
redis> DEL key1 key2 key3
(integer) 2
redis>
```

## dump

::: tip 2.6.0
时间复杂度：O(1) to access the key and additional O(N*M) to serialized it, where N is the number of Redis objects composing the value and M their average size. For small string values the time complexity is thus O(1)+O(1*M) where M is small, so simply O(1).
:::

案例

```bash
redis> SET mykey 10
OK
redis> DUMP mykey
"\u0000\xC0\n\u0006\u0000\xF8r?\xC5\xFB\xFB_("
redis>
```

## exists

::: tip 1.0.0
时间复杂度：O(1),如下的整数结果

1 如果 key 存在
0 如果 key 不存在
:::

案例

```bash
redis> SET key1 "Hello"
OK
redis> EXISTS key1
(integer) 1
redis> EXISTS key2
(integer) 0
redis>
```

## expire

::: tip 1.0.0
时间复杂度：O(1),设置 key 的过期时间，超过时间后，将会自动删除该 key。1 如果成功设置过期时间。
0 如果 key 不存在或者不能设置过期时间。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> SET mykey "Hello World"
OK
redis> TTL mykey
(integer) -1
redis>
```

## expireat

::: tip 2.6.0
时间复杂度：O(1),PEXPIREAT 这个命令和 EXPIREAT 命令类似，但它以毫秒为单位设置 key 的过期 unix 时间戳，而不是像 EXPIREAT 那样，以秒为单位。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> PEXPIREAT mykey 1555555555005
(integer) 1
redis> TTL mykey
(integer) 192569170
redis> PTTL mykey
(integer) 192569169649
redis>
```

## pexpire

::: tip ：2.6.0
时间复杂度：O(1),这个命令和 EXPIRE 命令的作用类似，但是它以毫秒为单位设置 key 的生存时间，而不像 EXPIRE 命令那样，以秒为单位。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> PEXPIRE mykey 1500
(integer) 1
redis> TTL mykey
(integer) 1
redis> PTTL mykey
(integer) 1499
redis>
```

## pexpireat

::: tip 2.6.0

时间复杂度：O(1),PEXPIREAT 这个命令和 EXPIREAT 命令类似，但它以毫秒为单位设置 key 的过期 unix 时间戳，而不是像 EXPIREAT 那样，以秒为单位。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> PEXPIREAT mykey 1555555555005
(integer) 1
redis> TTL mykey
(integer) 192569170
redis> PTTL mykey
(integer) 192569169649
redis>
```

## keys

::: tip 1.0.0

时间复杂度：O(N) with N being the number of keys in the database, under the assumption that the key names in the database and the given pattern have limited length.
:::

案例

```bash
redis> MSET one 1 two 2 three 3 four 4
OK
redis> KEYS *o*
1) "four"
2) "one"
3) "two"
redis> KEYS t??
1) "two"
redis> KEYS *
1) "four"
2) "three"
3) "one"
4) "two"
redis>
```

## move

::: tip 1.0.0

时间复杂度：O(1)
:::

## persist

::: tip 2.2.0

时间复杂度：O(1),移除给定 key 的生存时间，将这个 key 从『易失的』(带生存时间 key )转换成『持久的』(一个不带生存时间、永不过期的 key )。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
redis> PERSIST mykey
(integer) 1
redis> TTL mykey
(integer) -1
redis>
```

## pttl

::: tip 2.6.0

时间复杂度：O(1),这个命令类似于 TTL 命令，但它以毫秒为单位返回 key 的剩余生存时间，而不是像 TTL 命令那样，以秒为单位。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> EXPIRE mykey 1
(integer) 1
redis> PTTL mykey
(integer) 999
redis>
```

## ttl

::: tip 1.0.0

时间复杂度：O(1),返回 key 剩余的过期时间。 这种反射能力允许 Redis 客户端检查指定 key 在数据集里面剩余的有效期。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> EXPIRE mykey 10 # 设置mykey 10秒后过期
(integer) 1
redis> TTL mykey # 查看mykey剩余的过期时间
(integer) 10
redis>
```

## randomkey

::: tip 1.0.0

时间复杂度：O(1),从当前数据库返回一个随机的 key。
:::

## rename

::: tip 1.0.0

时间复杂度：O(1)

将 key 重命名为 newkey，如果 key 与 newkey 相同，将返回一个错误。如果 newkey 已经存在，则值将被覆盖。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> RENAME mykey myotherkey
OK
redis> GET myotherkey
"Hello"
redis>
```

## renamenx

::: tip 1.0.0

时间复杂度：O(1)

当且仅当 newkey 不存在时，将 key 改名为 newkey 。

当 key 不存在时，返回一个错误。
:::

案例

```bash
redis> SET mykey "Hello"
OK
redis> SET myotherkey "World"
OK
redis> RENAMENX mykey myotherkey
(integer) 0
redis> GET myotherkey
"World"
redis>
```

## type

::: tip 1.0.0

时间复杂度：O(1)

返回 key 所存储的 value 的数据结构类型，它可以返回 string, list, set, zset 和 hash 等不同的类型。
:::

案例

```bash
redis> SET key1 "value"
OK
redis> LPUSH key2 "value"
(integer) 1
redis> SADD key3 "value"
(integer) 1
redis> TYPE key1
string
redis> TYPE key2
list
redis> TYPE key3
set
redis>
```
