---
prev: ./list
next: ./zset
---

# set

::: tip
This section of sample `Set` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## sadd

Add the specified members to the set stored at key. Specified members that are already a member of this set are ignored. If key does not exist, a new set is created before adding the specified members.

An error is returned when the value stored at key is not a set.

**History**

`>= 2.4`: Accepts multiple member arguments. Redis versions before 2.4 are only able to add a single member per call.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the number of elements that were added to the set, not including all the elements already present into the set.
- examples:

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

- interface:

```ts
sadd(key: string, member: string, ...members: Array<string | number>): Promise<number>;
```

- example:

```ts
await Set.sadd("myset", "Hello");
// 1
await Set.sadd("myset", "World");
// 1
await Set.sadd("myset", "World");
// 0
```

## scard

Returns the set cardinality (number of elements) of the set stored at key.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the cardinality (number of elements) of the set, or 0 if key does not exist.
- examples:

```bash
redis> SADD myset "Hello"
(integer) 1
redis> SADD myset "World"
(integer) 1
redis> SCARD myset
(integer) 2
```

#### _Tedis_

- interface:

```ts
scard(key: string): Promise<number>;
```

- example:

```ts
await Set.scard("myset");
// 2
```

## sdiff

Returns the members of the set resulting from the difference between the first set and all the successive sets. Keys that do not exist are considered to be empty sets.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: list with members of the resulting set.
- examples:

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

- interface:

```ts
sdiff(key: string, ...keys: string[]): Promise<Array<string | number>>;
```

- example:

```ts
await Set.sdiff("key1", "key2");
// ["b", "a"]
```

## sdiffstore

This command is equal to SDIFF, but instead of returning the resulting set, it is stored in destination.

If destination already exists, it is overwritten.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: the number of elements in the resulting set.
- examples:

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

- interface:

```ts
sdiffstore(destination: string, key: string, ...keys: string[]): Promise<number>;
```

- example:

```ts
await Set.sdiffstore("key", "key1", "key2");
// ["b", "a"]
```

## sinter

Returns the members of the set resulting from the intersection of all the given sets.

Keys that do not exist are considered to be empty sets. With one of the keys being an empty set, the resulting set is also empty (since set intersection with an empty set always results in an empty set).

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N*M)`
- return: list with members of the resulting set.
- examples:

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

- interface:

```ts
sinter(key: string, ...keys: string[]): Promise<Array<string | number>>;
```

- example:

```ts
await Set.sinter("key1", "key2");
// ["c"]
```

## sinterstore

This command is equal to SINTER, but instead of returning the resulting set, it is stored in destination.

If destination already exists, it is overwritten.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N*M)`
- return: the number of elements in the resulting set.
- examples:

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

- interface:

```ts
sinterstore(destination: string, key: string, ...keys: string[]): Promise<number>;
```

- example:

```ts
await Set.sinterstore("key", "key1", "key2");
// 1
```

## sismember

Returns if member is a member of the set stored at key.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if the element is a member of the set.
  - 0 if the element is not a member of the set, or if key does not exist.
- examples:

```bash
redis> SADD myset "one"
(integer) 1
redis> SISMEMBER myset "one"
(integer) 1
redis> SISMEMBER myset "two"
(integer) 0
```

#### _Tedis_

- interface:

```ts
sismember(key: string, member: string): Promise<number>;
```

- example:

```ts
await Set.sismember("myset", "one");
// 1
await Set.sismember("myset", "two");
// 0
```

## smembers

Returns all the members of the set value stored at key.

This has the same effect as running SINTER with one argument key.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: all elements of the set.
- examples:

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

- interface:

```ts
smembers(key: string): Promise<Array<string|number>>;
```

- example:

```ts
await Set.smembers("myset");
// ["Hello", "World"]
```

## smove

Move member from the set at source to the set at destination. This operation is atomic. In every given moment the element will appear to be a member of source or destination for other clients.

If the source set does not exist or does not contain the specified element, no operation is performed and 0 is returned. Otherwise, the element is removed from the source set and added to the destination set. When the specified element already exists in the destination set, it is only removed from the source set.

An error is returned if source or destination does not hold a set value.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if the element is moved.
  - 0 if the element is not a member of source and no operation was performed.
- examples:

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

- interface:

```ts
smove(source: string, destination: string, member: string): Promise<number>;
```

- example:

```ts
await Set.smove("myset", "myotherset", "two");
// 1
```

## spop

Removes and returns one or more random elements from the set value store at key.

This operation is similar to SRANDMEMBER, that returns one or more random elements from a set but does not remove it.

The count argument is available since version 3.2.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the removed element, or nil when key does not exist.
- examples:

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

- interface:

```ts
spop(key: string, count?: number): Promise<string|number|null|Array<string|number>>;
```

- example:

```ts
await Set.spop("myset");
// "one"
await Set.spop("myset", 3);
// ["two", "four", "five"]
```

## srandmember

When called with just the key argument, return a random element from the set value stored at key.

Starting from Redis version 2.6, when called with the additional count argument, return an array of count distinct elements if count is positive. If called with a negative count the behavior changes and the command is allowed to return the same element multiple times. In this case the number of returned elements is the absolute value of the specified count.

When called with just the key argument, the operation is similar to SPOP, however while SPOP also removes the randomly selected element from the set, SRANDMEMBER will just return a random element without altering the original set in any way.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)|O(N)`
- return: without the additional count argument the command returns a Bulk Reply with the randomly selected element, or nil when key does not exist. Array reply: when the additional count argument is passed the command returns an array of elements, or an empty array when key does not exist.
- examples:

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

- interface:

```ts
srandmember(key: string, count?: number): Promise<string|number|null|Array<string|number>>;
```

- example:

```ts
await Set.srandmember("myset");
// "two"
await Set.srandmember("myset", 2);
// ["one", "three"]
await Set.srandmember("myset", -5);
// ["one", "three", "two", "one", "one"]
```

## srem

Remove the specified members from the set stored at key. Specified members that are not a member of this set are ignored. If key does not exist, it is treated as an empty set and this command returns 0.

An error is returned when the value stored at key is not a set.

**History**

`>= 2.4`: Accepts multiple member arguments. Redis versions older than 2.4 can only remove a set member per call.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: the number of members that were removed from the set, not including non existing members.
- examples:

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

- interface:

```ts
srem(key: string, member: string, ...members: string[]): Promise<number>;
```

- example:

```ts
await Set.srem("myset", "one");
// 1
await Set.srem("myset", "four");
// 0
```

## sunion

Returns the members of the set resulting from the union of all the given sets. Keys that do not exist are considered to be empty sets.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: list with members of the resulting set.
- examples:

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

- interface:

```ts
sunion(key: string, keys: string[]): Promise<Array<string|number>>;
```

- example:

```ts
await Set.sunion("key1", "key2");
// ["a","b","c","e","d"]
```

## sunionstore

This command is equal to SUNION, but instead of returning the resulting set, it is stored in destination.

If destination already exists, it is overwritten.



#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: the number of elements in the resulting set.
- examples:

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

- interface:

```ts
sunionstore(destination: string, key: string, keys: string[]): Promise<number>;
```

- example:

```ts
await Set.sunionstore("key", "key1", "key2");
// 5
```
