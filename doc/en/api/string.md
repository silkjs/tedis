---
prev: ./key
next: ./hash
---

# string

::: tip
This section of sample `String` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## append

If key already exists and is a string, this command appends the value at the end of the string. If key does not exist it is created and set as an empty string, so APPEND will be similar to SET in this special case.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: the length of the string after the append operation.
- examples:

```bash
redis> EXISTS mykey
(integer) 0
redis> APPEND mykey "Hello"
(integer) 5
redis> APPEND mykey " World"
(integer) 11
redis> GET mykey
"Hello World"
```

#### _Tedis_

- interface:

```ts
append(key: string, value: string): Promise<number>;
```

- example:

```ts
await String.append("mykey", "Hello");
// 5
await String.append("mykey", " World");
// 11
```

## decr

Decrements the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of key after the decrement
- examples:

```bash
redis> SET key1 "10"
"OK"
redis> DECR key1
(integer) 9
redis> SET key2 "234293482390480948029348230948"
"OK"
redis> DECR key2
ERR ERR value is not an integer or out of range
```

#### _Tedis_

- interface:

```ts
decr(key: string): Promise<number>;
```

- example:

```ts
await String.decr("key1");
// 9
await String.decr("key2");
// ERR ERR value is not an integer or out of range
```

## decrby

Decrements the number stored at key by decrement. If the key does not exist, it is set to 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of key after the decrement
- examples:

```bash
redis> SET mykey "10"
"OK"
redis> DECRBY mykey 3
(integer) 7
```

#### _Tedis_

- interface:

```ts
decrby(key: string, decrement: number): Promise<number>;
```

- example:

```ts
await String.decrby("mykey", 3);
// 7
```

## get

Get the value of key. If the key does not exist the special value nil is returned. An error is returned if the value stored at key is not a string, because GET only handles string values.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of key, or nil when key does not exist.
- examples:

```bash
redis> GET nonexisting
(nil)
redis> SET mykey "Hello"
"OK"
redis> GET mykey
"Hello"
```

#### _Tedis_

- interface:

```ts
get(key: string): Promise<null | string>;
```

- example:

```ts
await String.get("nonexisting");
// null
await String.get("mykey");
// "Hello"
```

## getbit

Returns the bit value at offset in the string value stored at key.

When offset is beyond the string length, the string is assumed to be a contiguous space with 0 bits. When key does not exist it is assumed to be an empty string, so offset is always out of range and the value is also assumed to be a contiguous space with 0 bits.

#### _Redis_

- available: `>= 2.2.0`
- complexity: `O(1)`
- return: the bit value stored at offset.
- examples:

```bash
redis> SETBIT mykey 7 1
(integer) 0
redis> GETBIT mykey 0
(integer) 0
redis> GETBIT mykey 7
(integer) 1
redis> GETBIT mykey 100
(integer) 0
```

#### _Tedis_

- interface:

```ts
getbit(key: string, offset: number): Promise<0 | 1>;
```

- example:

```ts
await String.getbit("mykey", 0);
// 0
await String.getbit("mykey", 7);
// 1
await String.getbit("mykey", 100);
// 0
```

## getrange

::: warning
this command was renamed to GETRANGE, it is called SUBSTR in Redis versions <= 2.0.
:::

Returns the substring of the string value stored at key, determined by the offsets start and end (both are inclusive). Negative offsets can be used in order to provide an offset starting from the end of the string. So -1 means the last character, -2 the penultimate and so forth.

The function handles out of range requests by limiting the resulting range to the actual length of the string.

#### _Redis_

- available: `>= 2.4.0`
- complexity: `O(N)`
- return: substring
- examples:

```bash
redis> SET mykey "This is a string"
"OK"
redis> GETRANGE mykey 0 3
"This"
redis> GETRANGE mykey -3 -1
"ing"
redis> GETRANGE mykey 0 -1
"This is a string"
redis> GETRANGE mykey 10 100
"string"
```

#### _Tedis_

- interface:

```ts
getrange(key: string, [start, end]?: [number, number]): Promise<string>;
```

- example:

```ts
await String.getrange("mykey", [0, 3]);
// "This"
await String.getrange("mykey", [-3, -1]);
// "ing"
await String.getrange("mykey"); // Equal await String.getrange("mykey", [0, -1]);
// "This is a string"
await String.getrange("mykey", [10, 100]);
// "string"
```

## getset

Atomically sets key to value and returns the old value stored at key. Returns an error when key exists but does not hold a string value.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the old value stored at key, or nil when key did not exist.
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> GETSET mykey "World"
"Hello"
redis> GET mykey
"World"
```

#### _Tedis_

- interface:

```ts
getset(key: string, value: string): Promise<null | string>;
```

- example:

```ts
await String.getset("mykey", "World");
// "Hello"
```

## incr

Increments the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

Note: this is a string operation because Redis does not have a dedicated integer type. The string stored at the key is interpreted as a base-10 64 bit signed integer to execute the operation.

Redis stores integers in their integer representation, so for string values that actually hold an integer, there is no overhead for storing the string representation of the integer.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of key after the increment
- examples:

```bash
redis> SET mykey "10"
"OK"
redis> INCR mykey
(integer) 11
redis> GET mykey
"11"
```

#### _Tedis_

- interface:

```ts
incr(key: string): Promise<number>;
```

- example:

```ts
await String.incr("mykey");
// 11
```

## incrby

Increments the number stored at key by increment. If the key does not exist, it is set to 0 before performing the operation. An error is returned if the key contains a value of the wrong type or contains a string that can not be represented as integer. This operation is limited to 64 bit signed integers.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the value of key after the increment
- examples:

```bash
redis> SET mykey "10"
"OK"
redis> INCRBY mykey 5
(integer) 15
```

#### _Tedis_

- interface:

```ts
incrby(key: string, increment: number): Promise<number>;
```

- example:

```ts
await String.incrby("mykey", 5);
// 15
```

## incrbyfloat

Increment the string representing a floating point number stored at key by the specified increment. By using a negative increment value, the result is that the value stored at the key is decremented (by the obvious properties of addition). If the key does not exist, it is set to 0 before performing the operation. An error is returned if one of the following conditions occur:

- The key contains a value of the wrong type (not a string).
- The current key content or the specified increment are not parsable as a double precision floating point number.

If the command is successful the new incremented value is stored as the new value of the key (replacing the old one), and returned to the caller as a string.

#### _Redis_

- available: `>= 2.6.0`
- complexity: `O(1)`
- return: the value of key after the increment.
- examples:

```bash
redis> SET key1 10.50
"OK"
redis> INCRBYFLOAT key1 0.1
"10.6"
redis> INCRBYFLOAT key1 -5
"5.6"
redis> SET key2 5.0e3
"OK"
redis> INCRBYFLOAT key2 2.0e2
"5200"
```

#### _Tedis_

- interface:

```ts
incrbyfloat(key: string, increment: string): Promise<string>;
```

- example:

```ts
await String.incrbyfloat("key1", "0.1");
// "10.6"
await String.incrbyfloat("key1", "-5");
// "5.6"
await String.incrbyfloat("key2", "2.0e2");
// "5200"
```

## mget

Returns the values of all specified keys. For every key that does not hold a string value or does not exist, the special value nil is returned. Because of this, the operation never fails.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: list of values at the specified keys.
- examples:

```bash
redis> SET key1 "Hello"
"OK"
redis> SET key2 "World"
"OK"
redis> MGET key1 key2 nonexisting
1) "Hello"
2) "World"
3) (nil)
```

#### _Tedis_

- interface:

```ts
mget(key: string, ...keys: string[]): Promise<Array<string | number | null>>;
```

- example:

```ts
await String.mget("key1", "key2", "nonexisting");
// ["Hello", "World", null];
```

## mset

Sets the given keys to their respective values. MSET replaces existing values with new values, just as regular SET. See MSETNX if you don't want to overwrite existing values.

MSET is atomic, so all given keys are set at once. It is not possible for clients to see that some of the keys were updated while others are unchanged.

#### _Redis_

- available: `>= 1.0.1`
- complexity: `O(N)`
- return: always OK since MSET can't fail.
- examples:

```bash
redis> MSET key1 "Hello" key2 "World"
"OK"
redis> GET key1
"Hello"
redis> GET key2
"World"
```

#### _Tedis_

- interface:

```ts
mset(objKV: { [propName: string]: string }): Promise<string>;
```

- example:

```ts
await String.mset({
  key1: "Hello",
  key2: "World"
});
// "OK"
await String.mget("key1", "key2");
// ["Hello", "World"]
```

## msetnx

Sets the given keys to their respective values. MSETNX will not perform any operation at all even if just a single key already exists.

Because of this semantic MSETNX can be used in order to set different keys representing different fields of an unique logic object in a way that ensures that either all the fields or none at all are set.

MSETNX is atomic, so all given keys are set at once. It is not possible for clients to see that some of the keys were updated while others are unchanged.

#### _Redis_

- available: `>= 1.0.1`
- complexity: `O(N)`
- return:
  - 1 if the all the keys were set.
  - 0 if no key was set (at least one key already existed).
- examples:

```bash
redis> MSETNX key1 "Hello" key2 "there"
(integer) 1
redis> MSETNX key2 "there" key3 "world"
(integer) 0
redis> MGET key1 key2 key3
1) "Hello"
2) "there"
3) (nil)
```

#### _Tedis_

- interface:

```ts
msetnx(objKv: { [propName: string]: string }): Promise<number>;
```

- example:

```ts
await String.msetnx({
  key1: "Hello",
  key2: "World"
});
// 1
await String.msetnx({
  key2: "there",
  key3: "world"
});
// 0
await String.mget("key1", "key2", "key3");
// ["Hello", "World", null]
```

## psetex

PSETEX works exactly like SETEX with the sole difference that the expire time is specified in milliseconds instead of seconds.

#### _Redis_

- available: `>= 2.6.0`
- complexity: `O(1)`
- return: OK
- examples:

```bash
redis> PSETEX mykey 1000 "Hello"
"OK"
redis> PTTL mykey
(integer) 999
redis> GET mykey
"Hello"
```

#### _Tedis_

- interface:

```ts
psetex(key: string, milliseconds: number, value: string): Promise<any>;
```

- example:

```ts
await String.psetex("mykey", 1000, "Hello");
// "OK"
```

## set

Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type. Any previous time to live associated with the key is discarded on successful SET operation.

Options
Starting with Redis 2.6.12 SET supports a set of options that modify its behavior:

- EX seconds -- Set the specified expire time, in seconds.
- PX milliseconds -- Set the specified expire time, in milliseconds.
- NX -- Only set the key if it does not already exist.
- XX -- Only set the key if it already exist.

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: OK if SET was executed correctly. Null reply: a Null Bulk Reply is returned if the SET operation was not performed because the user specified the NX or XX option but the condition was not met.
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> GET mykey
"Hello"
```

#### _Tedis_

- interface:

```ts
set(key: string, value: string): Promise<any>;
```

- example:

```ts
await String.set("mykey", "hello");
// "OK"
```

## setbit

Sets or clears the bit at offset in the string value stored at key.

The bit is either set or cleared depending on value, which can be either 0 or 1. When key does not exist, a new string value is created. The string is grown to make sure it can hold a bit at offset. The offset argument is required to be greater than or equal to 0, and smaller than 2-32 (this limits bitmaps to 512MB). When the string at key is grown, added bits are set to 0.

#### _Redis_

- available: `>= 2.2.0`
- complexity: `O(1)`
- return: the original bit value stored at offset.
- examples:

```bash
redis> SETBIT mykey 7 1
(integer) 0
redis> SETBIT mykey 7 0
(integer) 1
redis> GET mykey
"\u0000"
```

#### _Tedis_

- interface:

```ts
setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
```

- example:

```ts
await String.setbit("mykey", 7, 1);
// 0
await String.setbit("mykey", 7, 0);
// 1
```

## setex

Set key to hold the string value and set key to timeout after a given number of seconds.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: "OK"
- examples:

```bash
redis> SETEX mykey 10 "Hello"
"OK"
redis> TTL mykey
(integer) 10
redis> GET mykey
"Hello"
```

#### _Tedis_

- interface:

```ts
setex(key: string, seconds: number, value: string): Promise<any>;
```

- example:

```ts
await String.setex("mykey", 10, "Hello");
// "OK"
```

## setnx

Set key to hold string value if key does not exist. In that case, it is equal to SET. When key already holds a value, no operation is performed. SETNX is short for "SET if Not eXists".

#### _Redis_

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if the key was set
  - 0 if the key was not set
- examples:

```bash
redis> SETNX mykey "Hello"
(integer) 1
redis> SETNX mykey "World"
(integer) 0
redis> GET mykey
"Hello"
```

#### _Tedis_

- interface:

```ts
setnx(key: string, value: string): Promise<number>;
```

- example:

```ts
await String.setnx("mykey", "hello");
// 1
await String.setnx("mykey", "world");
// 0
```

## setrange

Overwrites part of the string stored at key, starting at the specified offset, for the entire length of value. If the offset is larger than the current length of the string at key, the string is padded with zero-bytes to make offset fit. Non-existing keys are considered as empty strings, so this command will make sure it holds a string large enough to be able to set value at offset.

#### _Redis_

- available: `>= 2.2.0`
- complexity: `O(1)`
- return:th e length of the string after it was modified by the command.
- examples:

```bash
redis> SET key1 "Hello World"
"OK"
redis> SETRANGE key1 6 "Redis"
(integer) 11
redis> GET key1
"Hello Redis"
redis> SETRANGE key2 6 "Redis"
(integer) 11
redis> GET key2
"\u0000\u0000\u0000\u0000\u0000\u0000Redis"
```

#### _Tedis_

- interface:

```ts
setrange(key: string, offset: number, value: string): Promise<number>;
```

- example:

```ts
await String.setrange("key1", 6, "Redis");
// 11
await String.setrange("key2", 6, "Redis");
// 11
```

## strlen

Returns the length of the string value stored at key. An error is returned when key holds a non-string value.

#### _Redis_

- available: `>= 2.2.0`
- complexity: `O(1)`
- return: the length of the string at key, or 0 when key does not exist.
- examples:

```bash
redis> SET mykey "Hello world"
"OK"
redis> STRLEN mykey
(integer) 11
redis> STRLEN nonexisting
(integer) 0
```

#### _Tedis_

- interface:

```ts
strlen(key: string): Promise<number>;
```

- example:

```ts
await String.strlen("mykey");
// 11
await String.strlen("nonexisting");
// 0
```
