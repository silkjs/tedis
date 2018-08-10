---
prev: ./hash
next: ./set
---

# list

::: tip 说明
本节示例中的 `Lsit` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## blpop

BLPOP 是阻塞式列表的弹出原语。它是命令 LPOP 的阻塞版本，这是因为当给定列表内没有任何元素可供弹出的时候，连接将被 BLPOP 命令阻塞。当给定多个 key 参数时，按参数 key 的先后顺序依次检查各个列表，弹出第一个非空列表的头元素。

#### _Redis_ [+](http://www.redis.cn/commands/blpop.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 当没有元素的时候会弹出一个 nil 的多批量值，并且 timeout 过期。
  - 当有元素弹出时会返回一个双元素的多批量值，其中第一个元素是弹出元素的 key，第二个元素是 value。
- 指令案例：

```bash
redis> DEL list1 list2
(integer) 0
redis> RPUSH list1 a b c
(integer) 3
redis> BLPOP list1 list2 0
1) "list1"
2) "a"
```

#### _Tedis_

- 接口：

```ts
blpop(
  timeout: number,
  ...keys: string[],
): Promise<Array<string | number | null>>;
```

- 示例：

```ts
await List.blpop(0, "list1", "list2");
// ["list1", "a"]
```

## brpop

BRPOP 是一个阻塞的列表弹出原语，它是 RPOP 的阻塞版本，因为这个命令会在给定 list 无法弹出任何元素的时候阻塞连接。该命令会按照给出的 key 顺序查看 list，并在找到的第一个非空 list 的尾部弹出一个元素。

#### _Redis_ [+](http://www.redis.cn/commands/brpop.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：
  - 当没有元素可以被弹出时返回一个 nil 的多批量值，并且 timeout 过期。
  - 当有元素弹出时会返回一个双元素的多批量值，其中第一个元素是弹出元素的 key，第二个元素是 value。
- 指令案例：

```bash
redis> DEL list1 list2
(integer) 0
redis> RPUSH list1 a b c
(integer) 3
redis> BRPOP list1 list2 0
1) "list1"
2) "c"
```

#### _Tedis_

- 接口：

```ts
brpop(keys: string[], timeout?: number): Promise<Array<string | number | null>>;
```

- 示例：

```ts
await List.brpop(["list1", "list2", 0]);
// ["list1", "c"]
```

## brpoplpush

BRPOPLPUSH 是 RPOPLPUSH 的阻塞版本。当 source 包含元素的时候，这个命令表现得跟 RPOPLPUSH 一模一样。当 source 是空的时候，Redis 将会阻塞这个连接，直到另一个客户端 push 元素进入或者达到 timeout 时限。timeout 为 0 能用于无限期阻塞客户端

#### _Redis_ [+](http://www.redis.cn/commands/brpoplpush.html)

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：元素从 source 中弹出来，并压入 destination 中。如果达到 timeout 时限，会返回一个空的多批量回复(nil-reply)。
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> BRPOPLPUSH mylist reciver 500
"three"
(3.38s)
```

#### _Tedis_

- 接口：

```ts
brpoplpush(
  source: string,
  destination: string,
  timeout: number,
): Promise<any>;
```

- 示例：

```ts
await List.brpoplpush("mylist", "reciver", 500);
```

## lindex

返回列表里的元素的索引 index 存储在 key 里面。下标是从 0 开始索引的，所以 0 是表示第一个元素， 1 表示第二个元素，并以此类推。负数索引用于指定从列表尾部开始索引的元素。在这种方法下，-1 表示最后一个元素，-2 表示倒数第二个元素，并以此往前推。当 key 位置的值不是一个列表的时候，会返回一个 error。

#### _Redis_ [+](http://www.redis.cn/commands/lindex.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：请求的对应元素，或者当 index 超过范围的时候返回 nil。
- 指令案例：

```bash
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LINDEX mylist 0
"Hello"
redis> LINDEX mylist -1
"World"
redis> LINDEX mylist 3
(nil)
```

#### _Tedis_

- 接口：

```ts
lindex(key: string, index: number): Promise<string | number | null>;
```

- 示例：

```ts
await List.lindex("mylist", 0);
// "Hello"
await List.lindex("mylist", -1);
// "World"
await List.lindex("mylist", 3);
// null
```

## linsert

把 value 插入存于 key 的列表中在基准值 pivot 的前面或后面。当 key 不存在时，这个 list 会被看作是空 list，任何操作都不会发生。当 key 存在，但保存的不是一个 list 的时候，会返回 error。

#### _Redis_ [+](http://www.redis.cn/commands/linsert.html)

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(N)`
- 返回值：经过插入操作后的 list 长度，或者当 pivot 值找不到的时候返回 -1。
- 指令案例：

```bash
redis> RPUSH mylist "Hello"
(integer) 1
redis> RPUSH mylist "World"
(integer) 2
redis> LINSERT mylist BEFORE "World" "There"
(integer) 3
redis> LRANGE mylist 0 -1
1) "Hello"
2) "There"
3) "World"
```

#### _Tedis_

- 接口：

```ts
linsert(
  key: string,
  type: "BEFORE" | "AFTER",
  pivot: string,
  value: string,
): Promise<number>;
```

- 示例：

```ts
await List.linsert("mylist", "BEFORE", "World", "There");
// 3
```

## llen

返回存储在 key 里的 list 的长度。如果 key 不存在，那么就被看作是空 list，并且返回长度为 0。当存储在 key 里的值不是一个 list 的话，会返回 error。

#### _Redis_ [+](http://www.redis.cn/commands/llen.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：key 对应的 list 的长度。
- 指令案例：

```bash
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LLEN mylist
(integer) 2
```

#### _Tedis_

- 接口：

```ts
llen(key: string): Promise<number>;
```

- 示例：

```ts
await List.llen("mylist");
// 2
```

## lpop

移除并且返回 key 对应的 list 的第一个元素。

#### _Redis_ [+](http://www.redis.cn/commands/lpop.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：返回第一个元素的值，或者当 key 不存在时返回 nil。
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LPOP mylist
"one"
redis> LRANGE mylist 0 -1
1) "two"
2) "three"
```

#### _Tedis_

- 接口：

```ts
lpop(key: string): Promise<string | number>;
```

- 示例：

```ts
await List.lpop("mylist");
// "one"
```

## lpush

将所有指定的值插入到存于 key 的列表的头部。如果 key 不存在，那么在进行 push 操作前会创建一个空列表。如果 key 对应的值不是一个 list 的话，那么会返回一个错误。

可以使用一个命令把多个元素 push 进入列表，只需在命令末尾加上多个指定的参数。元素是从最左端的到最右端的、一个接一个被插入到 list 的头部。所以对于这个命令例子 LPUSH mylist a b c，返回的列表是 c 为第一个元素，b 为第二个元素，a 为第三个元素。

历史

- `>= 2.4`: 接受多个 value 参数。版本老于 2.4 的 Redis 只能每条命令 push 一个值。

#### _Redis_ [+](http://www.redis.cn/commands/lpush.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：在 push 操作后的 list 长度。
- 指令案例：

```bash
redis> LPUSH mylist "world"
(integer) 1
redis> LPUSH mylist "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"
```

#### _Tedis_

- 接口：

```ts
lpush(key: string, ...values: Array<string | number>): Promise<number>;
```

- 示例：

```ts
await List.lpush("mylist", "world");
// 1
await List.lpush("mylist", "hello");
// 2
```

## lpushx

只有当 key 已经存在并且存着一个 list 的时候，在这个 key 下面的 list 的头部插入 value。与 LPUSH 相反，当 key 不存在的时候不会进行任何操作。

#### _Redis_ [+](http://www.redis.cn/commands/lpushx.html)

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：在 push 操作后的 list 长度。
- 指令案例：

```bash
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSHX mylist "Hello"
(integer) 2
redis> LPUSHX myotherlist "Hello"
(integer) 0
redis> LRANGE mylist 0 -1
1) "Hello"
2) "World"
redis> LRANGE myotherlist 0 -1
(empty list or set)
```

#### _Tedis_

- 接口：

```ts
lpushx(key: string, value: string): Promise<number>;
```

- 示例：

```ts
await List.lpushx("mylist", "Hello");
// 2
await List.lpushx("myotherlist", "Hello");
// 0
```

## lrange

返回存储在 key 的列表里指定范围内的元素。start 和 end 偏移量都是基于 0 的下标，即 list 的第一个元素下标是 0（list 的表头），第二个元素下标是 1，以此类推。

偏移量也可以是负数，表示偏移量是从 list 尾部开始计数。 例如， -1 表示列表的最后一个元素，-2 是倒数第二个，以此类推。

**在不同编程语言里，关于求范围函数的一致性**

需要注意的是，如果你有一个 list，里面的元素是从 0 到 100，那么 LRANGE list 0 10 这个命令会返回 11 个元素，即最右边的那个元素也会被包含在内。 在你所使用的编程语言里，这一点可能是也可能不是跟那些求范围有关的函数都是一致的（像 Ruby 的 Range.new，Array#slice 或者 Python 的 range() 函数）。

**超过范围的下标**

当下标超过 list 范围的时候不会产生 error。如果 start 比 list 的尾部下标大的时候，会返回一个空列表。如果 stop 比 list 的实际尾部大的时候，Redis 会当它是最后一个元素的下标。

#### _Redis_ [+](http://www.redis.cn/commands/lrange.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(S+N)`
- 返回值：指定范围里的列表元素。
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LRANGE mylist 0 0
1) "one"
redis> LRANGE mylist -3 2
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist -100 100
1) "one"
2) "two"
3) "three"
redis> LRANGE mylist 5 10
(empty list or set)
```

#### _Tedis_

- 接口：

```ts
lrange(key: string, start: number, stop: number): Promise<Array<string | number>>;
```

- 示例：

```ts
await List.lrange("mylist", 0, 0);
// ["one"]
await List.lrange("mylist", -3, 2);
// ["one", "two", "three"]
await List.lrange("mylist", -100, 100);
// ["one", "two", "three"]
await List.lrange("mylist", 5, 10);
// []
```

## lrem

从存于 key 的列表里移除前 count 次出现的值为 value 的元素。这个 count 参数通过下面几种方式影响这个操作：

- count > 0: 从头往尾移除值为 value 的元素。
- count < 0: 从尾往头移除值为 value 的元素。
- count = 0: 移除所有值为 value 的元素。

比如，`LREM list -2 “hello”` 会从存于 list 的列表里移除最后两个出现的 “hello”。需要注意的是，如果 list 里没有存在 key 就会被当作空 list 处理，所以当 key 不存在的时候，这个命令会返回 0。

#### _Redis_ [+](http://www.redis.cn/commands/lrem.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：被移除的元素个数。
- 指令案例：

```bash
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "hello"
(integer) 2
redis> RPUSH mylist "foo"
(integer) 3
redis> RPUSH mylist "hello"
(integer) 4
redis> LREM mylist -2 "hello"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "foo"
```

#### _Tedis_

- 接口：

```ts
lrem(key: string, count: number, value: string): Promise<number>;
```

- 示例：

```ts
await List.lrem("mylist", -2, "hello");
// 2
```

## lset

设置 index 位置的 list 元素的值为 value。更多关于 index 参数的信息，详见 LINDEX。当 index 超出范围时会返回一个 error。

#### _Redis_ [+](http://www.redis.cn/commands/lset.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值："OK"
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LSET mylist 0 "four"
"OK"
redis> LSET mylist -2 "five"
"OK"
redis> LRANGE mylist 0 -1
1) "four"
2) "five"
3) "three"
```

#### _Tedis_

- 接口：

```ts
lset(key: string, index: number, value: string): Promise<any>;
```

- 示例：

```ts
await List.lset("mylist", 0, "four");
// "OK"
await List.lset("mylist", -2, "five");
// "OK"
```

## ltrim

修剪(trim)一个已存在的 list，这样 list 就会只包含指定范围的指定元素。start 和 stop 都是由 0 开始计数的，这里的 0 是列表里的第一个元素（表头），1 是第二个元素，以此类推。

例如：`LTRIM foobar 0 2` 将会对存储在 foobar 的列表进行修剪，只保留列表里的前 3 个元素。

start 和 end 也可以用负数来表示与表尾的偏移量，比如 -1 表示列表里的最后一个元素，-2 表示倒数第二个，等等。

超过范围的下标并不会产生错误：如果 start 超过列表尾部，或者 start > end，结果会是列表变成空表（即该 key 会被移除）。如果 end 超过列表尾部，Redis 会将其当作列表的最后一个元素。

LTRIM 的一个常见用法是和 LPUSH / RPUSH 一起使用。例如：

```bash
LPUSH mylist someelement
LTRIM mylist 0 99
```

这一对命令会将一个新的元素 push 进列表里，并保证该列表不会增长到超过 100 个元素。这个是很有用的，比如当用 Redis 来存储日志。需要特别注意的是，当用这种方式来使用 LTRIM 的时候，操作的复杂度是 O(1) ，因为平均情况下，每次只有一个元素会被移除。

#### _Redis_ [+](http://www.redis.cn/commands/ltrim.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值："OK"
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> LTRIM mylist 1 -1
"OK"
redis> LRANGE mylist 0 -1
1) "two"
2) "three"
```

#### _Tedis_

- 接口：

```ts
ltrim(key: string, start: number, stop: number): Promise<any>;
```

- 示例：

```ts
await List.ltrim("mylist", 1, -1);
// "OK"
```

## rpop

移除并返回存于 key 的 list 的最后一个元素。

#### _Redis_ [+](http://www.redis.cn/commands/rpop.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：最后一个元素的值，或者当 key 不存在的时候返回 nil。
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> RPOP mylist
"three"
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
```

#### _Tedis_

- 接口：

```ts
rpop(key: string): Promise<string | number | null>;
```

- 示例：

```ts
await List.rpop("mylist");
// "three"
```

## rpoplpush

原子性地返回并移除存储在 source 的列表的最后一个元素（列表尾部元素），并把该元素放入存储在 destination 的列表的第一个元素位置（列表头部）。

例如：假设 source 存储着列表 a,b,c，destination 存储着列表 x,y,z。执行 RPOPLPUSH 得到的结果是 source 保存着列表 a,b ，而 destination 保存着列表 c,x,y,z。

如果 source 不存在，那么会返回 nil 值，并且不会执行任何操作。如果 source 和 destination 是同样的，那么这个操作等同于移除列表最后一个元素并且把该元素放在列表头部，所以这个命令也可以当作是一个旋转列表的命令。

#### _Redis_ [+](http://www.redis.cn/commands/rpoplpush.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(1)`
- 返回值：被移除和放入的元素
- 指令案例：

```bash
redis> RPUSH mylist "one"
(integer) 1
redis> RPUSH mylist "two"
(integer) 2
redis> RPUSH mylist "three"
(integer) 3
redis> RPOPLPUSH mylist myotherlist
"three"
redis> LRANGE mylist 0 -1
1) "one"
2) "two"
redis> LRANGE myotherlist 0 -1
1) "three"
```

#### _Tedis_

- 接口：

```ts
rpoplpush(source: string, destination: string): Promise<string | number>;
```

- 示例：

```ts
await List.rpoplpush("mylist", "myotherlist");
// "three"
```

## rpush

向存于 key 的列表的尾部插入所有指定的值。如果 key 不存在，那么会创建一个空的列表然后再进行 push 操作。当 key 保存的不是一个列表，那么会返回一个错误。

可以使用一个命令把多个元素打入队列，只需要在命令后面指定多个参数。元素是从左到右一个接一个从列表尾部插入。比如命令 RPUSH mylist a b c 会返回一个列表，其第一个元素是 a，第二个元素是 b，第三个元素是 c。

**历史**

`>=2.4`: 接受多个 value 参数。在老于 2.4 的 Redis 版本中，一条命令只能 push 单一个值。

#### _Redis_ [+](http://www.redis.cn/commands/rpush.html)

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：在 push 操作后的列表长度。
- 指令案例：

```bash
redis> RPUSH mylist "hello"
(integer) 1
redis> RPUSH mylist "world"
(integer) 2
redis> LRANGE mylist 0 -1
1) "hello"
2) "world"
```

#### _Tedis_

- 接口：

```ts
rpush(key: string, ...values: Array<string | number>): Promise<number>;
```

- 示例：

```ts
await List.rpush("mylist", "hello");
// 1
await List.rpush("mylist", "world");
// 2
```

## rpushx

将值 value 插入到列表 key 的表尾, 当且仅当 key 存在并且是一个列表。和 RPUSH 命令相反, 当 key 不存在时，RPUSHX 命令什么也不做。

#### _Redis_ [+](http://www.redis.cn/commands/rpushx.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：RPUSHX 命令执行之后，表的长度。
- 指令案例：

```bash
redis> RPUSH mylist "Hello"
(integer) 1
redis> RPUSHX mylist "World"
(integer) 2
redis> RPUSHX myotherlist "World"
(integer) 0
redis> LRANGE mylist 0 -1
1) "Hello"
2) "World"
redis> LRANGE myotherlist 0 -1
(empty list or set)
```

#### _Tedis_

- 接口：

```ts
rpushx(key: string, value: string): Promise<number>;
```

- 示例：

```ts
await List.rpushx("mylist", "World");
// 2
await List.rpushx("myotherlist", "World");
// 0
```
