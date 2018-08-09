---
prev: ./string
next: ./list
---

# hash

::: tip
This section of sample `Hash` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## hdel

Removes the specified fields from the hash stored at key. Specified fields that do not exist within this hash are ignored. If key does not exist, it is treated as an empty hash and this command returns 0.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(N)`
- return: the number of fields that were removed from the hash, not including specified but non existing fields.
- examples:

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HDEL myhash field1
(integer) 1
redis> HDEL myhash field2
(integer) 0
```

#### _Tedis_

- interface:

```ts
hdel(key: string, field: string, ...fields: string[]): Promise<number>;
```

- example:

```ts
await Hash.hdel("myhash", "field1");
// 1
await Hash.hdel("myhash", "field2");
// 0
```

## hexists

Returns if field is an existing field in the hash stored at key.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return:
  - 1 if the hash contains field.
  - 0 if the hash does not contain field, or key does not exist.
- examples:

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HEXISTS myhash field1
(integer) 1
redis> HEXISTS myhash field2
(integer) 0
```

#### _Tedis_

- interface:

```ts
hexists(key: string, field: string): Promise<number>;
```

- example:

```ts
await Hash.hexists("myhash", "field1");
// 1
await Hash.hexists("myhash", "field2");
// 0
```

## hexists

Returns the value associated with field in the hash stored at key.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: the value associated with field, or nil when field is not present in the hash or key does not exist.
- examples:

```bash
redis> HSET myhash field1 "foo"
(integer) 1
redis> HGET myhash field1
"foo"
redis> HGET myhash field2
(nil)
```

#### _Tedis_

- interface:

```ts
hexists(key: string, field: string): Promise<string | null>;
```

- example:

```ts
await Hash.hexists("myhash", "field1");
// "foo"
await Hash.hexists("myhash", "field2");
// null
```

## hgetall

Returns all fields and values of the hash stored at key. In the returned value, every field name is followed by its value, so the length of the reply is twice the size of the hash.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(N)`
- return: list of fields and their values stored in the hash, or an empty list when key does not exist.
- examples:

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

- interface:

```ts
hgetall(key: string): Promise<{ [propName: string]: string | number }>;
```

- example:

```ts
await Hash.hgetall("myhash");
// {
//   field1: "Hello",
//   field2: "World"
// }
```

## hincrby

Increments the number stored at field in the hash stored at key by increment. If key does not exist, a new key holding a hash is created. If field does not exist the value is set to 0 before the operation is performed.

The range of values supported by HINCRBY is limited to 64 bit signed integers.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: the value at field after the increment operation.
- examples:

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

- interface:

```ts
hincrby(key: string, field: string, increment: number): Promise<number>;
```

- example:

```ts
await Hash.hincrby("myhash", "field", 1);
// 6
await Hash.hincrby("myhash", "field", -1);
// 5
await Hash.hincrby("myhash", "field", -10);
// -5
```

## hincrbyfloat

Increment the specified field of a hash stored at key, and representing a floating point number, by the specified increment. If the increment value is negative, the result is to have the hash field value decremented instead of incremented. If the field does not exist, it is set to 0 before performing the operation. An error is returned if one of the following conditions occur:

- The field contains a value of the wrong type (not a string).
- The current field content or the specified increment are not parsable as a double precision floating point number.

#### _Redis_

- available: `>= 2.6.0`
- complexity: `O(1)`
- return: the value of field after the increment.
- examples:

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

- interface:

```ts
hincrbyfloat(key: string, field: string, increment: string): Promise<string>;
```

- example:

```ts
await Hash.hincrbyfloat("mykey", "field", "0.1");
// "10.6"
await Hash.hincrbyfloat("mykey", "field", "-5");
// "5.6"
await Hash.hincrbyfloat("mykey", "field", "2.0e2");
// "5200"
```

## hkeys

Returns all field names in the hash stored at key.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(N)`
- return: list of fields in the hash, or an empty list when key does not exist.
- examples:

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

- interface:

```ts
hkeys(key: string): Promise<string[]>;
```

- example:

```ts
await Hash.hkeys("myhash");
// ["field1", "field2"];
```

## hlen

Returns the number of fields contained in the hash stored at key.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: number of fields in the hash, or 0 when key does not exist.
- examples:

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HSET myhash field2 "World"
(integer) 1
redis> HLEN myhash
(integer) 2
```

#### _Tedis_

- interface:

```ts
hlen(key: string): Promise<number>;
```

- example:

```ts
await Hash.hlen("myhash");
// 2
```

## hmget

Returns the values associated with the specified fields in the hash stored at key.

For every field that does not exist in the hash, a nil value is returned. Because non-existing keys are treated as empty hashes, running HMGET against a non-existing key will return a list of nil values.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return: list of values associated with the given fields, in the same order as they are requested.
- examples:

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

- interface:

```ts
hmget(key: string, field: string, ...fields: string[]): Promise<Array<string | number | null>>;
```

- example:

```ts
await Hash.hmget("myhash", "field1", "field2", "nofield");
// ["Hello", "World", null]
```

## hmset

Sets the specified fields to their respective values in the hash stored at key. This command overwrites any specified fields already existing in the hash. If key does not exist, a new key holding a hash is created.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(N)`
- return: "OK"
- examples:

```bash
redis> HMSET myhash field1 "Hello" field2 "World"
"OK"
redis> HGET myhash field1
"Hello"
redis> HGET myhash field2
"World"
```

#### _Tedis_

- interface:

```ts
hmset(
  key: string,
  hash: {
    [propName: string]: string | number;
  },
): Promise<any>;
```

- example:

```ts
await Hash.hmset("myhash", {
  field1: "Hello",
  field2: "World"
});
// "OK"
```

## hset

Sets field in the hash stored at key to value. If key does not exist, a new key holding a hash is created. If field already exists in the hash, it is overwritten.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return:
  - 1 if field is a new field in the hash and value was set.
  - 0 if field already exists in the hash and the value was updated.
- examples:

```bash
redis> HSET myhash field1 "Hello"
(integer) 1
redis> HGET myhash field1
"Hello"
```

#### _Tedis_

- interface:

```ts
hset(key: string, field: string, value: string | number): Promise<number>;
```

- example:

```ts
await Hash.hset("myhash", "field1", "Hello");
// 1
```

## hsetnx

Sets field in the hash stored at key to value, only if field does not yet exist. If key does not exist, a new key holding a hash is created. If field already exists, this operation has no effect.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(1)`
- return:
  - 1 if field is a new field in the hash and value was set.
  - 0 if field already exists in the hash and no operation was performed.
- examples:

```bash
redis> HSETNX myhash field "Hello"
(integer) 1
redis> HSETNX myhash field "World"
(integer) 0
redis> HGET myhash field
"Hello"
```

#### _Tedis_

- interface:

```ts
hsetnx(key: string, field: string, value: string): Promise<number>;
```

- example:

```ts
await Hash.hsetnx("myhash", "field", "Hello");
// 1
await Hash.hsetnx("myhash", "field", "World");
// 0
```

## hstrlen

Returns the string length of the value associated with field in the hash stored at key. If the key or the field do not exist, 0 is returned.

#### _Redis_

- available: `>= 3.2.0`
- complexity: `O(1)`
- return: the string length of the value associated with field, or zero when field is not present in the hash or key does not exist at all.
- examples:

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

- interface:

```ts
hstrlen(key: string, field: string): Promise<number>;
```

- example:

```ts
await Hash.hstrlen("myhash", "f1");
// 10
await Hash.hstrlen("myhash", "f2");
// 2
await Hash.hstrlen("myhash", "f3");
// 4
```

## hvals

Returns all values in the hash stored at key.

#### _Redis_

- available: `>= 2.0.0`
- complexity: `O(N)`
- return: list of values in the hash, or an empty list when key does not exist.
- examples:

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

- interface:

```ts
hvals(key: string): Promise<Array<string | number>>;
```

- example:

```ts
await Hash.hvals("myhash");
// ["Hello", "World"]
```
