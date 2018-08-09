---
prev: ./hash
next: ./set
---

# list

::: tip
This section of sample `List` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## blpop

BLPOP is a blocking list pop primitive. It is the blocking version of LPOP because it blocks the connection when there are no elements to pop from any of the given lists. An element is popped from the head of the first list that is non-empty, with the given keys being checked in the order that they are given.

#### _Redis_ [+](https://redis.io/commands/blpop)

- available: `>= 2.0.0`
- complexity: `O(1)`
- return:
  - A nil multi-bulk when no element could be popped and the timeout expired.
  - A two-element multi-bulk with the first element being the name of the key where an element was popped and the second element being the value of the popped element.
- examples:

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

- interface:

```ts
blpop(
  keys: string[],
  timeout?: number,
): Promise<Array<string | number | null>>;
```

- example:

```ts
await List.blpop(["list1", "list2"], 0);
// ["list1", "a"]
```

## brpop

BRPOP is a blocking list pop primitive. It is the blocking version of RPOP because it blocks the connection when there are no elements to pop from any of the given lists. An element is popped from the tail of the first list that is non-empty, with the given keys being checked in the order that they are given.

#### _Redis_ [+](https://redis.io/commands/brpop)

- available: `>= 2.0.0`
- complexity: `O(1)`
- return:
  - A nil multi-bulk when no element could be popped and the timeout expired.
  - A two-element multi-bulk with the first element being the name of the key where an element was popped and the second element being the value of the popped element.
- examples:

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

- interface:

```ts
brpop(keys: string[], timeout?: number): Promise<Array<string | number | null>>;
```

- example:

```ts
await List.brpop(["list1", "list2", 0]);
// ["list1", "c"]
```

## brpoplpush

BRPOPLPUSH is the blocking variant of RPOPLPUSH. When source contains elements, this command behaves exactly like RPOPLPUSH. When used inside a MULTI/EXEC block, this command behaves exactly like RPOPLPUSH. When source is empty, Redis will block the connection until another client pushes to it or until timeout is reached. A timeout of zero can be used to block indefinitely.

#### _Redis_ [+](https://redis.io/commands/brpoplpush)

- available: `>= 2.2.0`
- complexity: `O(1)`
- return: the element being popped from source and pushed to destination. If timeout is reached, a Null reply is returned.
- examples:

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

- interface:

```ts
brpoplpush(
  source: string,
  destination: string,
  timeout: number,
): Promise<any>;
```

- example:

```ts
await List.brpoplpush("mylist", "reciver", 500);
```

## lindex

Returns the element at index index in the list stored at key. The index is zero-based, so 0 means the first element, 1 the second element and so on. Negative indices can be used to designate elements starting at the tail of the list. Here, -1 means the last element, -2 means the penultimate and so forth.

When the value at key is not a list, an error is returned.

#### _Redis_ [+](https://redis.io/commands/lindex)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the requested element, or nil when index is out of range.
- examples:

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

- interface:

```ts
lindex(key: string, index: number): Promise<string | number | null>;
```

- example:

```ts
await List.lindex("mylist", 0);
// "Hello"
await List.lindex("mylist", -1);
// "World"
await List.lindex("mylist", 3);
// null
```

## linsert

Inserts value in the list stored at key either before or after the reference value pivot.

When key does not exist, it is considered an empty list and no operation is performed.

An error is returned when key exists but does not hold a list value.

#### _Redis_ [+](https://redis.io/commands/linsert)

- available: `>= 2.2.0`
- complexity: `O(N)`
- return: the length of the list after the insert operation, or -1 when the value pivot was not found.
- examples:

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

- interface:

```ts
linsert(
  key: string,
  type: "BEFORE" | "AFTER",
  pivot: string,
  value: string,
): Promise<number>;
```

- example:

```ts
await List.linsert("mylist", "BEFORE", "World", "There");
// 3
```

## llen

Returns the length of the list stored at key. If key does not exist, it is interpreted as an empty list and 0 is returned. An error is returned when the value stored at key is not a list.

#### _Redis_ [+](https://redis.io/commands/llen)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the length of the list at key.
- examples:

```bash
redis> LPUSH mylist "World"
(integer) 1
redis> LPUSH mylist "Hello"
(integer) 2
redis> LLEN mylist
(integer) 2
```

#### _Tedis_

- interface:

```ts
llen(key: string): Promise<number>;
```

- example:

```ts
await List.llen("mylist");
// 2
```

## lpop

Removes and returns the first element of the list stored at key.

#### _Redis_ [+](https://redis.io/commands/lpop)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of the first element, or nil when key does not exist.
- examples:

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

- interface:

```ts
lpop(key: string): Promise<string | number>;
```

- example:

```ts
await List.lpop("mylist");
// "one"
```

## lpush

Insert all the specified values at the head of the list stored at key. If key does not exist, it is created as empty list before performing the push operations. When key holds a value that is not a list, an error is returned.

It is possible to push multiple elements using a single command call just specifying multiple arguments at the end of the command. Elements are inserted one after the other to the head of the list, from the leftmost element to the rightmost element. So for instance the command LPUSH mylist a b c will result into a list containing c as first element, b as second element and a as third element.

History

- `>= 2.4`: Accepts multiple value arguments. In Redis versions older than 2.4 it was possible to push a single value per command.

#### _Redis_ [+](https://redis.io/commands/lpush)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the length of the list after the push operations.
- examples:

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

- interface:

```ts
lpush(key: string, ...values: Array<string | number>): Promise<number>;
```

- example:

```ts
await List.lpush("mylist", "world");
// 1
await List.lpush("mylist", "hello");
// 2
```

## lpushx

Inserts value at the head of the list stored at key, only if key already exists and holds a list. In contrary to LPUSH, no operation will be performed when key does not yet exist.

#### _Redis_ [+](https://redis.io/commands/lpushx)

- available: `>= 2.2.0`
- complexity: `O(1)`
- return: the length of the list after the push operation.
- examples:

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

- interface:

```ts
lpushx(key: string, value: string): Promise<number>;
```

- example:

```ts
await List.lpushx("mylist", "Hello");
// 2
await List.lpushx("myotherlist", "Hello");
// 0
```

## lrange

Returns the specified elements of the list stored at key. The offsets start and stop are zero-based indexes, with 0 being the first element of the list (the head of the list), 1 being the next element and so on.

These offsets can also be negative numbers indicating offsets starting at the end of the list. For example, -1 is the last element of the list, -2 the penultimate, and so on.

**Consistency with range functions in various programming languages**

Note that if you have a list of numbers from 0 to 100, LRANGE list 0 10 will return 11 elements, that is, the rightmost item is included. This may or may not be consistent with behavior of range-related functions in your programming language of choice (think Ruby's Range.new, Array#slice or Python's range() function).

**Out-of-range indexes**

Out of range indexes will not produce an error. If start is larger than the end of the list, an empty list is returned. If stop is larger than the actual end of the list, Redis will treat it like the last element of the list.

#### _Redis_ [+](https://redis.io/commands/lrange)

- available: `>= 1.0.0`
- complexity: `O(S+N)`
- return: list of elements in the specified range.
- examples:

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

- interface:

```ts
lrange(key: string, start: number, stop: number): Promise<Array<string | number>>;
```

- example:

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

Removes the first count occurrences of elements equal to value from the list stored at key. The count argument influences the operation in the following ways:

- count > 0: Remove elements equal to value moving from head to tail.
- count < 0: Remove elements equal to value moving from tail to head.
- count = 0: Remove all elements equal to value.

For example, LREM list -2 "hello" will remove the last two occurrences of "hello" in the list stored at list.

Note that non-existing keys are treated like empty lists, so when key does not exist, the command will always return 0.

#### _Redis_ [+](https://redis.io/commands/lrem)

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: the number of removed elements.
- examples:

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

- interface:

```ts
lrem(key: string, count: number, value: string): Promise<number>;
```

- example:

```ts
await List.lrem("mylist", -2, "hello");
// 2
```

## lset

Sets the list element at index to value. For more information on the index argument, see LINDEX.

An error is returned for out of range indexes.

#### _Redis_ [+](https://redis.io/commands/lset)

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: "OK"
- examples:

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

- interface:

```ts
lset(key: string, index: number, value: string): Promise<any>;
```

- example:

```ts
await List.lset("mylist", 0, "four");
// "OK"
await List.lset("mylist", -2, "five");
// "OK"
```

## ltrim

Trim an existing list so that it will contain only the specified range of elements specified. Both start and stop are zero-based indexes, where 0 is the first element of the list (the head), 1 the next element and so on.

For example: LTRIM foobar 0 2 will modify the list stored at foobar so that only the first three elements of the list will remain.

start and end can also be negative numbers indicating offsets from the end of the list, where -1 is the last element of the list, -2 the penultimate element and so on.

Out of range indexes will not produce an error: if start is larger than the end of the list, or start > end, the result will be an empty list (which causes key to be removed). If end is larger than the end of the list, Redis will treat it like the last element of the list.

A common use of LTRIM is together with LPUSH / RPUSH. For example:

```bash
LPUSH mylist someelement
LTRIM mylist 0 99
```

This pair of commands will push a new element on the list, while making sure that the list will not grow larger than 100 elements. This is very useful when using Redis to store logs for example. It is important to note that when used in this way LTRIM is an O(1) operation because in the average case just one element is removed from the tail of the list.

#### _Redis_ [+](https://redis.io/commands/ltrim)

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: "OK"
- examples:

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

- interface:

```ts
ltrim(key: string, start: number, stop: number): Promise<any>;
```

- example:

```ts
await List.ltrim("mylist", 1, -1);
// "OK"
```

## rpop

Removes and returns the last element of the list stored at key.

#### _Redis_ [+](https://redis.io/commands/rpop)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of the last element, or nil when key does not exist.
- examples:

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

- interface:

```ts
rpop(key: string): Promise<string | number | null>;
```

- example:

```ts
await List.rpop("mylist");
// "three"
```

## rpoplpush

Atomically returns and removes the last element (tail) of the list stored at source, and pushes the element at the first element (head) of the list stored at destination.

For example: consider source holding the list a,b,c, and destination holding the list x,y,z. Executing RPOPLPUSH results in source holding a,b and destination holding c,x,y,z.

If source does not exist, the value nil is returned and no operation is performed. If source and destination are the same, the operation is equivalent to removing the last element from the list and pushing it as first element of the list, so it can be considered as a list rotation command.

#### _Redis_ [+](https://redis.io/commands/rpoplpush)

- available: `>= 1.2.0`
- complexity: `O(1)`
- return: the element being popped and pushed.
- examples:

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

- interface:

```ts
rpoplpush(source: string, destination: string): Promise<string | number>;
```

- example:

```ts
await List.rpoplpush("mylist", "myotherlist");
// "three"
```

## rpush

Insert all the specified values at the tail of the list stored at key. If key does not exist, it is created as empty list before performing the push operation. When key holds a value that is not a list, an error is returned.

It is possible to push multiple elements using a single command call just specifying multiple arguments at the end of the command. Elements are inserted one after the other to the tail of the list, from the leftmost element to the rightmost element. So for instance the command RPUSH mylist a b c will result into a list containing a as first element, b as second element and c as third element.

**History**

`>= 2.4`: Accepts multiple value arguments. In Redis versions older than 2.4 it was possible to push a single value per command.

#### _Redis_ [+](https://redis.io/commands/rpush)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the length of the list after the push operation.
- examples:

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

- interface:

```ts
rpush(key: string, ...values: Array<string | number>): Promise<number>;
```

- example:

```ts
await List.rpush("mylist", "hello");
// 1
await List.rpush("mylist", "world");
// 2
```

## rpushx

Inserts value at the tail of the list stored at key, only if key already exists and holds a list. In contrary to RPUSH, no operation will be performed when key does not yet exist.

#### _Redis_ [+](https://redis.io/commands/rpushx)

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: the length of the list after the push operation.
- examples:

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

- interface:

```ts
rpushx(key: string, value: string): Promise<number>;
```

- example:

```ts
await List.rpushx("mylist", "World");
// 2
await List.rpushx("myotherlist", "World");
// 0
```
