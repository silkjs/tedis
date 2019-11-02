---
prev: ./set
next: false
---

# zset

::: tip 说明
本节示例中的 `Zset` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## zadd

将所有指定成员添加到键为 key 有序集合（sorted set）里面。 添加时可以指定多个分数/成员（score/member）对。 如果指定添加的成员已经是有序集合里面的成员，则会更新改成员的分数（scrore）并更新到正确的排序位置。

如果 key 不存在，将会创建一个新的有序集合（sorted set）并将分数/成员（score/member）对添加到有序集合，就像原来存在一个空的有序集合一样。如果 key 存在，但是类型不是有序集合，将会返回一个错误应答。

分数值是一个双精度的浮点型数字字符串。+inf 和-inf 都是有效值。

**ZADD 参数（options） `>= 3.0.2`**

ZADD 命令在 key 后面分数/成员（score/member）对前面支持一些参数，他们是：

- XX: 仅仅更新存在的成员，不添加新成员。
- NX: 不更新存在的成员。只添加新成员。
- CH: 修改返回值为发生变化的成员总数，原始是返回新添加成员的总数 (CH 是 changed 的意思)。更改的元素是新添加的成员，已经存在的成员更新分数。 所以在命令中指定的成员有相同的分数将不被计算在内。注：在通常情况下，ZADD 返回值只计算新添加成员的数量。
- INCR: 当 ZADD 指定这个选项时，成员的操作就等同 ZINCRBY 命令，对成员的分数进行递增操作。

**分数可以精确的表示的整数的范围**

Redis 有序集合的分数使用双精度 64 位浮点数。我们支持所有的架构，这表示为一个 IEEE 754 floating point number，它能包括的整数范围是-(2^53) 到 +(2^53)。或者说是-9007199254740992 到 9007199254740992。更大的整数在内部用指数形式表示，所以，如果为分数设置一个非常大的整数，你得到的是一个近似的十进制数。

**Sorted sets 101**

有序集合按照分数以递增的方式进行排序。相同的成员（member）只存在一次，有序集合不允许存在重复的成员。 分数可以通过 ZADD 命令进行更新或者也可以通过 ZINCRBY 命令递增来修改之前的值，相应的他们的排序位置也会随着分数变化而改变。

获取一个成员当前的分数可以使用 ZSCORE 命令，也可以用它来验证成员是否存在。

**相同分数的成员**

有序集合里面的成员是不能重复的都是唯一的，但是，不同成员间有可能有相同的分数。当多个成员有相同的分数时，他们将是有序的字典（ordered lexicographically）（仍由分数作为第一排序条件，然后，相同分数的成员按照字典规则相对排序）。

字典顺序排序用的是二进制，它比较的是字符串的字节数组。
如果用户将所有元素设置相同分数（例如 0），有序集合里面的所有元素将按照字典顺序进行排序，范围查询元素可以使用 ZRANGEBYLEX 命令（注：范围查询分数可以使用 ZRANGEBYSCORE 命令）。

**历史**

`>= 2.4`: 接受多个成员。 在 Redis 2.4 以前，命令只能添加或者更新一个成员。

#### _Redis_ [+](http://www.redis.cn/commands/zadd.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(log(N))`
- 返回值：
  - 添加到有序集合的成员数量，不包括已经存在更新分数的成员。如果指定 INCR 参数, 返回将会变成一个字符串参数
  - 成员的新分数（双精度的浮点型数字）字符串。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 1 "uno"
(integer) 1
redis> ZADD myzset 2 "two" 3 "three"
(integer) 2
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "one"
2) "1"
3) "uno"
4) "1"
5) "two"
6) "2"
7) "three"
8) "3"
```

#### _Tedis_

- 接口：

```ts
zadd(
  key: string,
  objMS: { [propName: string]: number },
  options?: {
    nxxx?: "NX" | "XX";
    ch?: "CH";
  }
): Promise<number>;
zadd(
  key: string,
  objMS: { [propName: string]: number },
  options?: {
    nxxx?: "NX" | "XX";
    ch?: "CH";
    incr?: "INCR";
  }
): Promise<string | null>;
zadd(
  key: string,
  objMS: { [propName: string]: number },
  options?: {
    nxxx?: "NX" | "XX";
    ch?: "CH";
    incr?: "INCR";
  }
): Promise<any>;
```

- 示例：

```ts
await Zset.zadd("myzset", {
  one: 1
});
// 1
await Zset.zadd("myzset", {
  uno: 1
});
// 1
await Zset.zadd("myzset", {
  two: 2,
  three: 3
});
// 2
```

## zcard

返回 key 的有序集元素个数。

#### _Redis_ [+](http://www.redis.cn/commands/zcard.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(1)`
- 返回值：key 存在的时候，返回有序集的元素个数，否则返回 0。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZCARD myzset
(integer) 2
```

#### _Tedis_

- 接口：

```ts
zcard(key: string): Promise<number>;
```

- 示例：

```ts
await Zset.zcard("myzset");
// 2
```

## zcount

返回有序集 key 中，score 值在 min 和 max 之间(默认包括 score 值等于 min 或 max)的成员个数。

#### _Redis_ [+](http://www.redis.cn/commands/zcount.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(log(N))`
- 返回值：指定分数范围的元素个数。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZCOUNT myzset -inf +inf
(integer) 3
redis> ZCOUNT myzset (1 3
(integer) 2
```

#### _Tedis_

- 接口：

```ts
zcount(key: string, min: string, max: string): Promise<number>;
```

- 示例：

```ts
await Zset.zcount("myzset", "-inf", "+inf");
// 3
await Zset.zcount("myzset", "(1", "3");
// 2
```

## zincrby

为有序集 key 的成员 member 的 score 值加上增量 increment。如果 key 中不存在 member，就在 key 中添加一个 member，score 是 increment（就好像它之前的 score 是 0.0）。如果 key 不存在，就创建一个只含有指定 member 成员的有序集合。

当 key 不是有序集类型时，返回一个错误。

score 值必须是字符串表示的整数值或双精度浮点数，并且能接受 double 精度的浮点数。也有可能给一个负数来减少 score 的值。

#### _Redis_ [+](http://www.redis.cn/commands/zincrby.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(log(N))`
- 返回值：member 成员的新 score 值，以字符串形式表示。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZINCRBY myzset 2 "one"
"3"
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "two"
2) "2"
3) "one"
4) "3"
```

#### _Tedis_

- 接口：

```ts
zincrby(key: string, increment: number, member: string): Promise<string>;
```

- 示例：

```ts
await Zset.zincrby("myzset", 2, "one");
// 3
```

## zinterstore

计算给定的 numkeys 个有序集合的交集，并且把结果放到 destination 中。 在给定要计算的 key 和其它参数之前，必须先给定 key 个数(numberkeys)。

默认情况下，结果中一个元素的分数是有序集合中该元素分数之和，前提是该元素在这些有序集合中都存在。因为交集要求其成员必须是给定的每个有序集合中的成员，结果集中的每个元素的分数和输入的有序集合个数相等。

如果 destination 存在，就把它覆盖。

#### _Redis_ [+](http://www.redis.cn/commands/zinterstore.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(N*K)+O(M*log(M))`
- 返回值：结果有序集合 destination 中元素个数。
- 指令案例：

```bash
redis> ZADD zset1 1 "one"
(integer) 1
redis> ZADD zset1 2 "two"
(integer) 1
redis> ZADD zset2 1 "one"
(integer) 1
redis> ZADD zset2 2 "two"
(integer) 1
redis> ZADD zset2 3 "three"
(integer) 1
redis> ZINTERSTORE out 2 zset1 zset2 WEIGHTS 2 3
(integer) 2
redis> ZRANGE out 0 -1 WITHSCORES
1) "one"
2) "5"
3) "two"
4) "10"
```

#### _Tedis_

- 接口：

```ts
zinterstore(destination: string, objectKW: { [PropName: string]: number }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
```

- 示例：

```ts
await Zset.zinterstore("out", {
  zset1: 2,
  zset3: 3
});
// 2
```

## zlexcount

此命令用于计算有序集合中指定成员之间的成员数量。

#### _Redis_ [+](http://www.redis.cn/commands/zlexcount.html)

- 可用版本：`>= 2.8.9`
- 算法复杂度：`O(log(N))`
- 返回值：有序集合中成员名称 min 和 max 之间的成员数量
- 指令案例：

```bash
redis> ZADD myzset 0 a 0 b 0 c 0 d 0 e
(integer) 5
redis> ZADD myzset 0 f 0 g
(integer) 2
redis> ZLEXCOUNT myzset - +
(integer) 7
redis> ZLEXCOUNT myzset [b [f
(integer) 5
```

#### _Tedis_

- 接口：

```ts
zlexcount(key: string, min: string, max: string): Promise<number>;
```

- 示例：

```ts
await Zset.zlexcount("myzset", "-", "+");
// 7
await Zset.zlexcount("myzset", "[b", "[f");
// 5
```

## zrange

返回有序集中，指定区间内的成员。其中成员的位置按分数值递增(从小到大)来排序。具有相同分数值的成员按字典序(lexicographical order )来排列。

#### _Redis_ [+](http://www.redis.cn/commands/zrange.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(log(N)+M)`
- 返回值：指定区间内，带有分数值(可选)的有序集成员的列表。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZRANGE myzset 0 -1
1) "one"
2) "two"
3) "three"
redis> ZRANGE myzset 2 3
1) "three"
redis> ZRANGE myzset -2 -1
1) "two"
2) "three"
```

#### _Tedis_

- 接口：

```ts
zrange(key: string, start: number, stop: number): Promise<string[]>;
zrange(
  key: string,
  start: number,
  stop: number,
  withscores: "WITHSCORES"
): Promise<{ [propName: string]: string }>;
zrange(
  key: string,
  start: number,
  stop: number,
  withscores?: "WITHSCORES"
): Promise<any>;
```

- 示例：

```ts
await Zset.zrange("myzset", 0, -1);
// ["one", "two", "three"];
await Zset.zrange("myzset", 2, 3);
// ["three"];
await Zset.zrange("myzset", -2, -1);
// ["two", "three"];
```

## zrangebylex

ZRANGEBYLEX 返回指定成员区间内的成员，按成员字典正序排序, 分数必须相同。 在某些业务场景中,需要对一个字符串数组按名称的字典顺序进行排序时,可以使用 Redis 中 SortSet 这种数据结构来处理。

#### _Redis_ [+](http://www.redis.cn/commands/zrangebylex.html)

- 可用版本：`>= 2.8.9`
- 算法复杂度：`O(log(N)+M)`
- 返回值：指定区间内的元素列表。
- 指令案例：

```bash
redis> ZADD myzset 0 a 0 b 0 c 0 d 0 e 0 f 0 g
(integer) 7
redis> ZRANGEBYLEX myzset - [c
1) "a"
2) "b"
3) "c"
redis> ZRANGEBYLEX myzset - (c
1) "a"
2) "b"
redis> ZRANGEBYLEX myzset [aaa (g
1) "b"
2) "c"
3) "d"
4) "e"
5) "f"
```

#### _Tedis_

- 接口：

```ts
zrangebylex(
  key: string,
  min: string,
  max: string,
  options?: {
    offset: number;
    count: number;
  }
): Promise<string[]>;
```

- 示例：

```ts
await Zset.zrangebylex("myzset", "-", "[c");
// ["a", "b", "c"];
await Zset.zrangebylex("myzset", "-", "(c");
// ["a", "b", "c"];
await Zset.zrangebylex("myzset", "[aaa", "(g)");
// ["b", "c", "d", "e", "f"];
```

## zrangebyscore

返回有序集合中指定分数区间的成员列表。有序集成员按分数值递增(从小到大)次序排列。具有相同分数值的成员按字典序来排列(该属性是有序集提供的，不需要额外的计算)。默认情况下，区间的取值使用闭区间 (小于等于或大于等于)，你也可以通过给参数前增加 ( 符号来使用可选的开区间 (小于或大于)。

#### _Redis_ [+](http://www.redis.cn/commands/zrangebyscore.html)

- 可用版本：`>= 1.0.5`
- 算法复杂度：`O(log(N)+M)`
- 返回值：指定区间内，带有分数值(可选)的有序集成员的列表。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZRANGEBYSCORE myzset -inf +inf
1) "one"
2) "two"
3) "three"
redis> ZRANGEBYSCORE myzset 1 2
1) "one"
2) "two"
redis> ZRANGEBYSCORE myzset (1 2
1) "two"
redis> ZRANGEBYSCORE myzset (1 (2
(empty list or set)
```

#### _Tedis_

- 接口：

```ts
zrangebyscore(
  key: string,
  min: string,
  max: string,
  withscores: false,
  options?: {
    offset: number;
    count: number;
  }
): Promise<string[]>;
zrangebyscore(
  key: string,
  min: string,
  max: string,
  withscores: true,
  options?: {
    offset: number;
    count: number;
  }
): Promise<{ [propName: string]: string }>;
zrangebyscore(
  key: string,
  min: string,
  max: string,
  withscores: boolean,
  options?: {
    offset: number;
    count: number;
  }
): Promise<any>;
```

- 示例：

```ts
await Zset.zrangebyscore("myzset", "-inf", "+inf");
// ["one", "two", "three"];
await Zset.zrangebyscore("myzset", "1", "2");
// ["one", "two"];
await Zset.zrangebyscore("myzset", "(1", "2");
// ["two"];
await Zset.zrangebyscore("myzset", "(1", "(2");
// [];
```

## zrank

返回有序集 key 中成员 member 的排名。其中有序集成员按 score 值递增(从小到大)顺序排列。排名以 0 为底，也就是说，score 值最小的成员排名为 0。

#### _Redis_ [+](http://www.redis.cn/commands/zrank.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(log(N)`
- 返回值：
  - 如果 member 是有序集 key 的成员，返回 member 的排名。
  - 如果 member 不是有序集 key 的成员，返回 nil。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZRANK myzset "three"
(integer) 2
redis> ZRANK myzset "four"
(nil)
```

#### _Tedis_

- 接口：

```ts
zrank(key: string, member: string): Promise<number | null>;
```

- 示例：

```ts
await Zset.zrank("myzset", "three");
// 2
await Zset.zrank("myzset", "four");
// null
```

## zrem

用于移除有序集中的一个或多个成员，不存在的成员将被忽略。当 key 存在但不是有序集类型时，返回一个错误。

**历史**

`>= 2.4`: 接受多个元素。在 2.4 之前的版本中，每次只能删除一个成员。

#### _Redis_ [+](http://www.redis.cn/commands/zrem.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(M*log(N))`
- 返回值：返回的是从有序集合中删除的成员个数，不包括不存在的成员。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREM myzset "two"
(integer) 1
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "one"
2) "1"
3) "three"
4) "3"
```

#### _Tedis_

- 接口：

```ts
zrem(key: string, member: string, ...members: string[]): Promise<number>;
```

- 示例：

```ts
await Zset.zrem("myzset", "two");
// 1
```

## zremrangebylex

移除有序集合中给定的字典区间的所有成员。

#### _Redis_ [+](http://www.redis.cn/commands/zremrangebylex.html)

- 可用版本：`>= 2.8.9`
- 算法复杂度：`O(log(N)+M)`
- 返回值：被成功移除的成员的数量，不包括被忽略的成员。
- 指令案例：

```bash
redis> ZADD myzset 0 aaaa 0 b 0 c 0 d 0 e
(integer) 5
redis> ZADD myzset 0 foo 0 zap 0 zip 0 ALPHA 0 alpha
(integer) 5
redis> ZRANGE myzset 0 -1
1) "ALPHA"
 2) "aaaa"
 3) "alpha"
 4) "b"
 5) "c"
 6) "d"
 7) "e"
 8) "foo"
 9) "zap"
10) "zip"
redis> ZREMRANGEBYLEX myzset [alpha [omega
(integer) 6
redis> ZRANGE myzset 0 -1
1) "ALPHA"
2) "aaaa"
3) "zap"
4) "zip"
```

#### _Tedis_

- 接口：

```ts
zremrangebylex(key: string, min: string, max: string): Promise<number>;
```

- 示例：

```ts
await Zset.zremrangebylex("myzset", "[alpha", "[omega");
// 6
```

## zremrangebyrank

移除有序集 key 中，指定排名(rank)区间内的所有成员。下标参数 start 和 stop 都以 0 为底，0 处是分数最小的那个元素。这些索引也可是负数，表示位移从最高分处开始数。例如，-1 是分数最高的元素，-2 是分数第二高的，依次类推。

#### _Redis_ [+](http://www.redis.cn/commands/zremrangebyrank.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(log(N)+M)`
- 返回值：the number of elements removed.
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREMRANGEBYRANK myzset 0 1
(integer) 2
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "three"
2) "3"
```

#### _Tedis_

- 接口：

```ts
zremrangebyrank(key: string, start: number, stop: number): Promise<number>;
```

- 示例：

```ts
await Zset.zremrangebyrank("myzset", 0, 1);
// 2
```

## zremrangebyscore

移除有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max)的成员。 自版本 2.1.6 开始，score 值等于 min 或 max 的成员也可以不包括在内

#### _Redis_ [+](http://www.redis.cn/commands/zremrangebyscore.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(log(N)+M)`
- 返回值：删除元素的个数。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREMRANGEBYSCORE myzset -inf (2
(integer) 1
redis> ZRANGE myzset 0 -1 WITHSCORES
1) "two"
2) "2"
3) "three"
4) "3"
```

#### _Tedis_

- 接口：

```ts
zremrangebyscore(key: string, min: string, max: string): Promise<number>;
```

- 示例：

```ts
await Zset.zremrangebyscore("myzset", "-inf", "(2");
// 1
```

## zrevrange

返回有序集 key 中，指定区间内的成员。其中成员的位置按 score 值递减(从大到小)来排列。具有相同 score 值的成员按字典序的反序排列。

#### _Redis_ [+](http://www.redis.cn/commands/zrevrange.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(log(N)+M)`
- 返回值：指定范围的元素列表(可选是否含有分数)。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANGE myzset 0 -1
1) "three"
2) "two"
3) "one"
redis> ZREVRANGE myzset 2 3
1) "one"
redis> ZREVRANGE myzset -2 -1
1) "two"
2) "one"
```

#### _Tedis_

- 接口：

```ts
zrevrange(key: string, start: number, stop: number): Promise<string[]>;
zrevrange(
  key: string,
  start: number,
  stop: number,
  withscores: "WITHSCORES"
): Promise<{ [propName: string]: string }>;
zrevrange(
  key: string,
  start: number,
  stop: number,
  withscores?: "WITHSCORES"
): Promise<any>;
```

- 示例：

```ts
await Zset.zrevrange("myzset", 0, -1);
// ["three", "two", "one"];
await Zset.zrevrange("myzset", 2, 3);
// ["one"];
await Zset.zrevrange("myzset", -2, -1);
// ["two", "one"];
```

## zrevrangebyscore

返回有序集中指定分数区间内的所有的成员。有序集成员按分数值递减(从大到小)的次序排列。具有相同分数值的成员按字典序的逆序(reverse lexicographical order )排列。

#### _Redis_ [+](http://www.redis.cn/commands/zrevrangebyscore.html)

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(log(N)+M)`
- 返回值：指定区间内，带有分数值(可选)的有序集成员的列表。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANGEBYSCORE myzset +inf -inf
1) "three"
2) "two"
3) "one"
redis> ZREVRANGEBYSCORE myzset 2 1
1) "two"
2) "one"
redis> ZREVRANGEBYSCORE myzset 2 (1
1) "two"
redis> ZREVRANGEBYSCORE myzset (2 (1
(empty list or set)
```

#### _Tedis_

- 接口：

```ts
zrevrangebyscore(
  key: string,
  max: string,
  min: string,
  options?: {
    limit?: {
      offset: number;
      count: number;
    };
  }
): Promise<string[]>;
zrevrangebyscore(
  key: string,
  max: string,
  min: string,
  options?: {
    withscores: "WITHSCORES";
    limit?: {
      offset: number;
      count: number;
    };
  }
): Promise<{ [propName: string]: string }>;
zrevrangebyscore(
  key: string,
  max: string,
  min: string,
  options?: {
    limit?: {
      offset: number;
      count: number;
    };
    withscores?: "WITHSCORES";
  }
): Promise<any>;
```

- 示例：

```ts
await Zset.zrevrangebyscore("myzset", "+inf", "-inf");
// ["three", "two", "one"];
await Zset.zrevrangebyscore("myzset", "2", "(1");
// ["two"];
await Zset.zrevrangebyscore("myzset", "(2", "(1");
// [];
```

## zrevrank

返回有序集 key 中成员 member 的排名，其中有序集成员按 score 值从大到小排列。排名以 0 为底，也就是说，score 值最大的成员排名为 0。

#### _Redis_ [+](http://www.redis.cn/commands/zrevrank.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(log(N))`
- 返回值：
  - 如果 member 是有序集 key 的成员，返回 member 的排名。
  - 如果 member 不是有序集 key 的成员，返回 nil。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZADD myzset 3 "three"
(integer) 1
redis> ZREVRANK myzset "one"
(integer) 2
redis> ZREVRANK myzset "four"
(nil)
```

#### _Tedis_

- 接口：

```ts
zrevrank(key: string, member: string): Promise<number | null>;
```

- 示例：

```ts
await Zset.zrevrank("myzset", "one");
// 2
await Zset.zrevrank("myzset", "four");
// null
```

## zscore

返回有序集 key 中，成员 member 的 score 值。如果 member 元素不是有序集 key 的成员，或 key 不存在，返回 nil。

#### _Redis_ [+](http://www.redis.cn/commands/zscore.html)

- 可用版本：`>= 1.2.0`
- 算法复杂度：`O(1)`
- 返回值：member 成员的 score 值（double 型浮点数），以字符串形式表示。
- 指令案例：

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZSCORE myzset "one"
"1"
```

#### _Tedis_

- 接口：

```ts
zscore(key: string, member: string): Promise<string | null>;
```

- 示例：

```ts
await Zset.zscore("myzset", "one");
// "1"
```

## zunionstore

计算给定的一个或多个有序集的并集，其中给定 key 的数量必须以 numkeys 参数指定，并将该并集(结果集)储存到 destination 。
默认情况下，结果集中某个成员的分数值是所有给定集下该成员分数值之和 。

#### _Redis_ [+](http://www.redis.cn/commands/zunionstore.html)

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(N)+O(M log(M))`
- 返回值：结果有序集合 destination 中元素个数。
- 指令案例：

```bash
redis> ZADD zset1 1 "one"
(integer) 1
redis> ZADD zset1 2 "two"
(integer) 1
redis> ZADD zset2 1 "one"
(integer) 1
redis> ZADD zset2 2 "two"
(integer) 1
redis> ZADD zset2 3 "three"
(integer) 1
redis> ZUNIONSTORE out 2 zset1 zset2 WEIGHTS 2 3
(integer) 3
redis> ZRANGE out 0 -1 WITHSCORES
1) "one"
2) "5"
3) "three"
4) "9"
5) "two"
6) "10"
```

#### _Tedis_

- 接口：

```ts
zunionstore(
  destination: string,
  objectKW: { [PropName: string]: number },
  aggregate?: "SUM" | "MIN" | "MAX"
): Promise<number>;
```

- 示例：

```ts
await Zset.zunionstore("out", {
  zset1: 2,
  zset2: 3
});
// 3
```
