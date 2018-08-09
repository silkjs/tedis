---
prev: ./set
next: false
---

# zset

::: tip
This section of sample `Zset` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## zadd

Adds all the specified members with the specified scores to the sorted set stored at key. It is possible to specify multiple score / member pairs. If a specified member is already a member of the sorted set, the score is updated and the element reinserted at the right position to ensure the correct ordering.

If key does not exist, a new sorted set with the specified members as sole members is created, like if the sorted set was empty. If the key exists but does not hold a sorted set, an error is returned.

The score values should be the string representation of a double precision floating point number. +inf and -inf values are valid values as well.

**ZADD options (Redis 3.0.2 or greater)**

ZADD supports a list of options, specified after the name of the key and before the first score argument. Options are:

- XX: Only update elements that already exist. Never add elements.
- NX: Don't update already existing elements. Always add new elements.
- CH: Modify the return value from the number of new elements added, to the total number of elements changed (CH is an abbreviation of changed). Changed elements are new elements added and elements already existing for which the score was updated. So elements specified in the command line having the same score as they had in the past are not counted. Note: normally the return value of ZADD only counts the number of new elements added.
- INCR: When this option is specified ZADD acts like ZINCRBY. Only one score-element pair can be specified in this mode.

**Range of integer scores that can be expressed precisely**

Redis sorted sets use a double 64-bit floating point number to represent the score. In all the architectures we support, this is represented as an IEEE 754 floating point number, that is able to represent precisely integer numbers between -(2^53) and +(2^53) included. In more practical terms, all the integers between -9007199254740992 and 9007199254740992 are perfectly representable. Larger integers, or fractions, are internally represented in exponential form, so it is possible that you get only an approximation of the decimal number, or of the very big integer, that you set as score.

**Sorted sets 101**

Sorted sets are sorted by their score in an ascending way. The same element only exists a single time, no repeated elements are permitted. The score can be modified both by ZADD that will update the element score, and as a side effect, its position on the sorted set, and by ZINCRBY that can be used in order to update the score relatively to its previous value.

The current score of an element can be retrieved using the ZSCORE command, that can also be used to verify if an element already exists or not.

For an introduction to sorted sets, see the data types page on sorted sets.

**Elements with the same score**

While the same element can't be repeated in a sorted set since every element is unique, it is possible to add multiple different elements having the same score. When multiple elements have the same score, they are ordered lexicographically (they are still ordered by score as a first key, however, locally, all the elements with the same score are relatively ordered lexicographically).

The lexicographic ordering used is binary, it compares strings as array of bytes.

If the user inserts all the elements in a sorted set with the same score (for example 0), all the elements of the sorted set are sorted lexicographically, and range queries on elements are possible using the command ZRANGEBYLEX (Note: it is also possible to query sorted sets by range of scores using ZRANGEBYSCORE).

**History**

`>= 2.4`: Accepts multiple elements. In Redis versions older than 2.4 it was possible to add or update a single member per call.

#### _Redis_ [+](https://redis.io/commands/zadd)

- available: `>= 1.2.0`
- complexity: `O(log(N))`
- return:
  - The number of elements added to the sorted sets, not including elements already existing for which the score was updated.
    If the INCR option is specified, the return value will be Bulk string reply:
  - the new score of member (a double precision floating point number), represented as string.
- examples:

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

- interface:

```ts
zadd(key: string, objMS: { [propName: string]: number }): Promise<number>;
```

- example:

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

Returns the sorted set cardinality (number of elements) of the sorted set stored at key.

#### _Redis_ [+](https://redis.io/commands/zcard)

- available: `>= 1.2.0`
- complexity: `O(1)`
- return: the cardinality (number of elements) of the sorted set, or 0 if key does not exist.
- examples:

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZADD myzset 2 "two"
(integer) 1
redis> ZCARD myzset
(integer) 2
```

#### _Tedis_

- interface:

```ts
zcard(key: string): Promise<number>;
```

- example:

```ts
await Zset.zcard("myzset");
// 2
```

## zcount

Returns the number of elements in the sorted set at key with a score between min and max.

#### _Redis_ [+](https://redis.io/commands/zcount)

- available: `>= 2.0.0`
- complexity: `O(log(N))`
- return: the number of elements in the specified score range.
- examples:

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

- interface:

```ts
zcount(key: string, min: string, max: string): Promise<number>;
```

- example:

```ts
await Zset.zcount("myzset", "-inf", "+inf");
// 3
await Zset.zcount("myzset", "(1", "3");
// 2
```

## zincrby

Increments the score of member in the sorted set stored at key by increment. If member does not exist in the sorted set, it is added with increment as its score (as if its previous score was 0.0). If key does not exist, a new sorted set with the specified member as its sole member is created.

An error is returned when key exists but does not hold a sorted set.

The score value should be the string representation of a numeric value, and accepts double precision floating point numbers. It is possible to provide a negative value to decrement the score.

#### _Redis_ [+](https://redis.io/commands/zincrby)

- available: `>= 1.2.0`
- complexity: `O(log(N))`
- return: the new score of member (a double precision floating point number), represented as string.
- examples:

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

- interface:

```ts
zincrby(key: string, increment: number, member: string): Promise<string>;
```

- example:

```ts
await Zset.zincrby("myzset", 2, "one");
// 3
```

## zinterstore

Computes the intersection of numkeys sorted sets given by the specified keys, and stores the result in destination. It is mandatory to provide the number of input keys (numkeys) before passing the input keys and the other (optional) arguments.

By default, the resulting score of an element is the sum of its scores in the sorted sets where it exists. Because intersection requires an element to be a member of every given sorted set, this results in the score of every element in the resulting sorted set to be equal to the number of input sorted sets.

If destination already exists, it is overwritten.

#### _Redis_ [+](https://redis.io/commands/zinterstore)

- available: `>= 2.0.0`
- complexity: `O(N*K)+O(M*log(M))`
- return: the number of elements in the resulting sorted set at destination.
- examples:

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

- interface:

```ts
zinterstore(destination: string, objectKW: { [PropName: string]: number }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
```

- example:

```ts
await Zset.zinterstore("out", {
  zset1: 2,
  zset3: 3
});
// 2
```

## zlexcount

this command returns the number of elements in the sorted set at key with a value between min and max.

#### _Redis_ [+](https://redis.io/commands/zlexcount)

- available: `>= 2.8.9`
- complexity: `O(log(N))`
- return: the number of elements in the specified score range.
- examples:

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

- interface:

```ts
zlexcount(key: string, min: string, max: string): Promise<number>;
```

- example:

```ts
await Zset.zlexcount("myzset", "-", "+");
// 7
await Zset.zlexcount("myzset", "[b", "[f");
// 5
```

## zrange

Returns the specified range of elements in the sorted set stored at key. The elements are considered to be ordered from the lowest to the highest score. Lexicographical order is used for elements with equal score.

#### _Redis_ [+](https://redis.io/commands/zrange)

- available: `>= 1.2.0`
- complexity: `O(log(N)+M)`
- return: list of elements in the specified range (optionally with their scores, in case the WITHSCORES option is given).
- examples:

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

- interface:

```ts
zrange(key: string, start: number, stop: number, withscores?: boolean): Promise<string[]>;
```

- example:

```ts
await Zset.zrange("myzset", 0, -1);
// ["one", "two", "three"];
await Zset.zrange("myzset", 2, 3);
// ["three"];
await Zset.zrange("myzset", -2, -1);
// ["two", "three"];
```

## zrangebylex

When all the elements in a sorted set are inserted with the same score, in order to force lexicographical ordering, this command returns all the elements in the sorted set at key with a value between min and max.

If the elements in the sorted set have different scores, the returned elements are unspecified.

#### _Redis_ [+](https://redis.io/commands/zrangebylex)

- available: `>= 2.8.9`
- complexity: `O(log(N)+M)`
- return: list of elements in the specified score range.
- examples:

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

- interface:

```ts
zrangebylex(key: string, min: string, max: string, limit?: boolean, offset?: number, count?: number): Promise<string[]>;
```

- example:

```ts
await Zset.zrangebylex("myzset", "-", "[c");
// ["a", "b", "c"];
await Zset.zrangebylex("myzset", "-", "(c");
// ["a", "b", "c"];
await Zset.zrangebylex("myzset", "[aaa", "(g)");
// ["b", "c", "d", "e", "f"];
```

## zrangebyscore

Returns all the elements in the sorted set at key with a score between min and max (including elements with score equal to min or max). The elements are considered to be ordered from low to high scores.

The elements having the same score are returned in lexicographical order (this follows from a property of the sorted set implementation in Redis and does not involve further computation).

#### _Redis_ [+](https://redis.io/commands/zrangebyscore)

- available: `>= 1.0.5`
- complexity: `O(log(N)+M)`
- return: list of elements in the specified score range (optionally with their scores).
- examples:

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

- interface:

```ts
zrangebyscore(
  key: string,
  min: string,
  max: string,
  withscores?: boolean,
  limit?: boolean,
  offset?: number,
  count?: number
): Promise<string[]>;
```

- example:

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

Returns the rank of member in the sorted set stored at key, with the scores ordered from low to high. The rank (or index) is 0-based, which means that the member with the lowest score has rank 0.

#### _Redis_ [+](https://redis.io/commands/zrank)

- available: `>= 2.2.0`
- complexity: `O(log(N)`
- return:
  - If member exists in the sorted set, Integer reply: the rank of member.
  - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
- examples:

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

- interface:

```ts
zrank(key: string, member: string): Promise<number | null>;
```

- example:

```ts
await Zset.zrank("myzset", "three");
// 2
await Zset.zrank("myzset", "four");
// null
```

## zrem

Removes the specified members from the sorted set stored at key. Non existing members are ignored.

An error is returned when key exists and does not hold a sorted set.

**History**

`>= 2.4`: Accepts multiple elements. In Redis versions older than 2.4 it was possible to remove a single member per call.

#### _Redis_ [+](https://redis.io/commands/zrem)

- available: `>= 1.2.0`
- complexity: `O(M*log(N))`
- return: The number of members removed from the sorted set, not including non existing members.
- examples:

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

- interface:

```ts
zrem(key: string, member: string, ...members: string[]): Promise<number>;
```

- example:

```ts
await Zset.zrem("myzset", "two");
// 1
```

## zremrangebylex

this command removes all elements in the sorted set stored at key between the lexicographical range specified by min and max.

#### _Redis_ [+](https://redis.io/commands/zremrangebylex)

- available: `>= 2.8.9`
- complexity: `O(log(N)+M)`
- return: the number of elements removed.
- examples:

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

- interface:

```ts
zremrangebylex(key: string, min: string, max: string): Promise<number>;
```

- example:

```ts
await Zset.zremrangebylex("myzset", "[alpha", "[omega");
// 6
```

## zremrangebyrank

Removes all elements in the sorted set stored at key with rank between start and stop. Both start and stop are 0 -based indexes with 0 being the element with the lowest score. These indexes can be negative numbers, where they indicate offsets starting at the element with the highest score. For example: -1 is the element with the highest score, -2 the element with the second highest score and so forth.

#### _Redis_ [+](https://redis.io/commands/zremrangebyrank)

- available: `>= 2.0.0`
- complexity: `O(log(N)+M)`
- return: the number of elements removed.
- examples:

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

- interface:

```ts
zremrangebyrank(key: string, start: number, stop: number): Promise<number>;
```

- example:

```ts
await Zset.zremrangebyrank("myzset", 0, 1);
// 2
```

## zremrangebyscore

Removes all elements in the sorted set stored at key with a score between min and max (inclusive).

Since version 2.1.6, min and max can be exclusive

#### _Redis_ [+](https://redis.io/commands/zremrangebyscore)

- available: `>= 1.2.0`
- complexity: `O(log(N)+M)`
- return: the number of elements removed.
- examples:

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

- interface:

```ts
zremrangebyscore(key: string, min: string, max: string): Promise<number>;
```

- example:

```ts
await Zset.zremrangebyscore("myzset", "-inf", "(2");
// 1
```

## zrevrange

Returns the specified range of elements in the sorted set stored at key. The elements are considered to be ordered from the highest to the lowest score. Descending lexicographical order is used for elements with equal score.

#### _Redis_ [+](https://redis.io/commands/zrevrange)

- available: `>= 1.2.0`
- complexity: `O(log(N)+M)`
- return: list of elements in the specified range (optionally with their scores).
- examples:

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

- interface:

```ts
zrevrange(
  key: string,
  start: number,
  stop: number,
  withscores?: boolean
): Promise<string[]|{[propName: string]: number}>;
```

- example:

```ts
await Zset.zrevrange("myzset", 0, -1);
// ["three", "two", "one"];
await Zset.zrevrange("myzset", 2, 3);
// ["one"];
await Zset.zrevrange("myzset", -2, -1);
// ["two", "one"];
```

## zrevrangebyscore

Returns all the elements in the sorted set at key with a score between max and min (including elements with score equal to max or min). In contrary to the default ordering of sorted sets, for this command the elements are considered to be ordered from high to low scores.

The elements having the same score are returned in reverse lexicographical order.

#### _Redis_ [+](https://redis.io/commands/zrevrangebyscore)

- available: `>= 2.2.0`
- complexity: `O(log(N)+M)`
- return: list of elements in the specified score range (optionally with their scores).
- examples:

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

- interface:

```ts
zrevrangebyscore(key: string, min: string, max: string): Promise<string[]|{[propName: string]: number}>;
```

- example:

```ts
await Zset.zrevrangebyscore("myzset", "+inf", "-inf");
// ["three", "two", "one"];
await Zset.zrevrangebyscore("myzset", "2", "(1");
// ["two"];
await Zset.zrevrangebyscore("myzset", "(2", "(1");
// [];
```

## zrevrank

Returns the rank of member in the sorted set stored at key, with the scores ordered from high to low. The rank (or index) is 0-based, which means that the member with the highest score has rank 0.

#### _Redis_ [+](https://redis.io/commands/zrevrank)

- available: `>= 2.0.0`
- complexity: `O(log(N))`
- return:
  - If member exists in the sorted set, Integer reply: the rank of member.
  - If member does not exist in the sorted set or key does not exist, Bulk string reply: nil.
- examples:

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

- interface:

```ts
zrevrank(key: string, member: string): Promise<number | null>;
```

- example:

```ts
await Zset.zrevrank("myzset", "one");
// 2
await Zset.zrevrank("myzset", "four");
// null
```

## zscore

Returns the score of member in the sorted set at key.

If member does not exist in the sorted set, or key does not exist, nil is returned.

#### _Redis_ [+](https://redis.io/commands/zscore)

- available: `>= 1.2.0`
- complexity: `O(1)`
- return: the score of member (a double precision floating point number), represented as string.
- examples:

```bash
redis> ZADD myzset 1 "one"
(integer) 1
redis> ZSCORE myzset "one"
"1"
```

#### _Tedis_

- interface:

```ts
zscore(key: string, member: string): Promise<string>;
```

- example:

```ts
await Zset.zscore("myzset", "one");
// "1"
```

## zunionstore

Computes the union of numkeys sorted sets given by the specified keys, and stores the result in destination. It is mandatory to provide the number of input keys (numkeys) before passing the input keys and the other (optional) arguments.

By default, the resulting score of an element is the sum of its scores in the sorted sets where it exists.

#### _Redis_ [+](https://redis.io/commands/zunionstore)

- available: `>= 2.0.0`
- complexity: `O(N)+O(M log(M))`
- return: the number of elements in the resulting sorted set at destination.
- examples:

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

- interface:

```ts
zunionstore(
  destination: string,
  objectKW: { [PropName: string]: number },
  aggregate: "SUM" | "MIN" | "MAX"
): Promise<number>;
```

- example:

```ts
await Zset.zunionstore("out", {
  zset1: 2,
  zset2: 3
});
// 3
```
