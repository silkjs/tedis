---
prev: ./
next: ./base
---

# key

::: tip
This section of sample `Key` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## del

Removes the specified keys. A key is ignored if it does not exist.

#### _Redis_ [+](https://redis.io/commands/del)

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: The number of keys that were removed.
- examples:

```bash
redis> SET key1 "Hello"
"OK"
redis> SET key2 "World"
"OK"
redis> DEL key1 key2 key3
(integer) 2
```

#### _Tedis_

- interface:

```ts
del(key: string, ...keys: string[]): Promise<number>;
```

- example:

```ts
await Key.del("key1", "key2", "key3");
// 2
```

<!-- ## dump

Serialize the value stored at key in a Redis-specific format and return it to the user. The returned value can be synthesized back into a Redis key using the RESTORE command.

#### _Redis_ [+](https://redis.io/commands/dump)

- available: `>= 2.6.0`
- complexity: `O(1)`
- return: the serialized value.
- examples:

```bash
redis> SET mykey 10
"OK"
redis> DUMP mykey
"\u0000\xC0\n\t\u0000\xBEm\u0006\x89Z(\u0000\n"
```

#### _Tedis_

- interface:

```ts
dump(key: string): Promise<null | string>;
```

- example:

```ts
await Key.dump("mykey");
// "\u0000\xC0\n\t\u0000\xBEm\u0006\x89Z(\u0000\n"
``` -->

## exists

Returns if key exists.

Since Redis 3.0.3 it is possible to specify multiple keys instead of a single one. In such a case, it returns the total number of keys existing. Note that returning 1 or 0 for a single key is just a special case of the variadic usage, so the command is completely backward compatible.

The user should be aware that if the same existing key is mentioned in the arguments multiple times, it will be counted multiple times. So if somekey exists, EXISTS somekey somekey will return 2.

#### _Redis_ [+](https://redis.io/commands/exists)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if the key exists.
  - 0 if the key does not exist.。
- examples:

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

- interface:

```ts
exists(key: string, ...keys: string[]): Promise<number>;
```

- example:

```ts
await Key.exists("key1");
// 1
await Key.exists("nosuchkey");
// 0
await Key.exists("key1", "key2", "nosuchkey");
// 2
```

## expire

Set a timeout on key. After the timeout has expired, the key will automatically be deleted. A key with an associated timeout is often said to be volatile in Redis terminology.

#### _Redis_ [+](https://redis.io/commands/expire)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if the timeout was set.
  - 0 if key does not exist.
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
```

#### _Tedis_

- interface:

```ts
expire(key: string, seconds: number): Promise<number>;
```

- example:

```ts
await Key.expire("mykey", 10);
// 1
```

## expireat

EXPIREAT has the same effect and semantic as EXPIRE, but instead of specifying the number of seconds representing the TTL (time to live), it takes an absolute Unix timestamp (seconds since January 1, 1970). A timestamp in the past will delete the key immediately.

Please for the specific semantics of the command refer to the documentation of EXPIRE.

#### _Redis_ [+](https://redis.io/commands/expireat)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if the timeout was set.
  - 0 if key does not exist.
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIREAT mykey 1293840000
(integer) 1
```

#### _Tedis_

- interface:

```ts
expireat(key: string, timestamp: number): Promise<number>;
```

- example:

```ts
await Key.expireat("mykey", 1293840000);
// 1
```

## keys

Returns all keys matching pattern.

#### _Redis_ [+](https://redis.io/commands/keys)

- available: `>= 1.0.0`
- complexity: `O(N)`
- return: list of keys matching pattern.
- examples:

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

- interface:

```ts
keys(pattern: string): Promise<string[]>;
```

- example:

```ts
await Key.keys("*name*");
// ["firstname", "lastname"];
await Key.keys("a??");
// ["age"];
await Key.keys("*");
// ["firstname", "lastname", "age"];
```

## move

Move key from the currently selected database (see SELECT) to the specified destination database. When key already exists in the destination database, or it does not exist in the source database, it does nothing. It is possible to use MOVE as a locking primitive because of this.

#### _Redis_ [+](https://redis.io/commands/move)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if key was moved.
  - 0 if key was not moved.
- examples:

```bash
redis> SELECT 0
"OK"
redis> SET mykey "secret base - Zone"
"OK"
redis> MOVE mykey 1
(integer) 1
```

#### _Tedis_

- interface:

```ts
move(key: string, db: number): Promise<number>;
```

- example:

```ts
Key.move("mykey", 1);
// 1
```

## persist

Remove the existing timeout on key, turning the key from volatile (a key with an expire set) to persistent (a key that will never expire as no timeout is associated).

#### _Redis_ [+](https://redis.io/commands/persist)

- available: `>= 2.2.0`
- complexity: `O(1)`
- return:
  - 1 if the timeout was removed.
  - 0 if key does not exist or does not have an associated timeout.
- examples:

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

- interface:

```ts
persist(key: string): Promise<number>;
```

- example:

```ts
await Key.persist("mykey");
// 1
```

## pexpire

This command works exactly like EXPIRE but the time to live of the key is specified in milliseconds instead of seconds.

#### _Redis_ [+](https://redis.io/commands/pexpire)

- available: `>= 2.6.0`
- complexity: `O(1)`
- return:
  - 1 if the timeout was set.
  - 0 if key does not exist.
- examples:

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

- interface:

```ts
pexpire(key: string, milliseconds: number): Promise<number>;
```

- example:

```ts
await Key.pexpire("mykey", 1500);
// 1
```

## pexpireat

PEXPIREAT has the same effect and semantic as EXPIREAT, but the Unix time at which the key will expire is specified in milliseconds instead of seconds.

#### _Redis_ [+](https://redis.io/commands/pexpireat)

- available: `>= 2.6.0`
- complexity: `O(1)`
- return:
  - 1 if the timeout was set.
  - 0 if key does not exist.
- examples:

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

- interface:

```ts
pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
```

- example:

```ts
await Key.pexpireat("mykey", 1555555555005);
// 1
```

## pttl

Like TTL this command returns the remaining time to live of a key that has an expire set, with the sole difference that TTL returns the amount of remaining time in seconds while PTTL returns it in milliseconds.

In Redis 2.6 or older the command returns -1 if the key does not exist or if the key exist but has no associated expire.

Starting with Redis 2.8 the return value in case of error changed:

- The command returns -2 if the key does not exist.
- The command returns -1 if the key exists but has no associated expire.

#### _Redis_ [+](https://redis.io/commands/pttl)

- available: `>= 2.6.0`
- complexity: `O(1)`
- return: TTL in milliseconds, or a negative value in order to signal an error (see the description above).
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 1
(integer) 1
redis> PTTL mykey
(integer) 999
```

#### _Tedis_

- interface:

```ts
pttl(key: string): Promise<number>;
```

- example:

```ts
await Key.pttl("mykey");
// 999
```

## randomkey

Return a random key from the currently selected database.

#### _Redis_ [+](https://redis.io/commands/randomkey)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: the random key, or nil when the database is empty.
- examples:

```bash
redis> MSET fruit "apple" drink "beer" food "cookies"
"OK"
redis> RANDOMKEY
"fruit"
```

#### _Tedis_

- interface:

```ts
randomkey(): Promise<null | string>;
```

- example:

```ts
await Key.randomkey();
// fruit
```

## rename

Renames key to newkey. It returns an error when key does not exist. If newkey already exists it is overwritten, when this happens RENAME executes an implicit DEL operation, so if the deleted key contains a very big value it may cause high latency even if RENAME itself is usually a constant-time operation.

Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.

#### _Redis_ [+](https://redis.io/commands/rename)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: "OK"
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> RENAME mykey myotherkey
"OK"
redis> GET myotherkey
"Hello"
```

#### _Tedis_

- interface:

```ts
rename(key: string, newKey: string): Promise<any>;
```

- example:

```ts
await Key.rename("mykey", "myotherkey");
// "OK"
```

## renamenx

Renames key to newkey if newkey does not yet exist. It returns an error when key does not exist.

Note: Before Redis 3.2.0, an error is returned if source and destination names are the same.

#### _Redis_ [+](https://redis.io/commands/renamenx)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return:
  - 1 if key was renamed to newkey.
  - 0 if newkey already exists.
- examples:

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

- interface:

```ts
renamenx(key: string, newKey: string): Promise<0 | 1>;
```

- example:

```ts
await Key.renamenx("mykey", "myotherkey");
// 0
```

## ttl

Returns the remaining time to live of a key that has a timeout. This introspection capability allows a Redis client to check how many seconds a given key will continue to be part of the dataset.

In Redis 2.6 or older the command returns -1 if the key does not exist or if the key exist but has no associated expire.

Starting with Redis 2.8 the return value in case of error changed:

- The command returns -2 if the key does not exist.
- The command returns -1 if the key exists but has no associated expire.

See also the PTTL command that returns the same information with milliseconds resolution (Only available in Redis 2.6 or greater).

#### _Redis_ [+](https://redis.io/commands/ttl)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: TTL in seconds, or a negative value in order to signal an error (see the description above).
- examples:

```bash
redis> SET mykey "Hello"
"OK"
redis> EXPIRE mykey 10
(integer) 1
redis> TTL mykey
(integer) 10
```

#### _Tedis_

- interface:

```ts
ttl(key: string): Promise<number>;
```

- example:

```ts
await Key.ttl("mykey");
// 10
```

## type

Returns the string representation of the type of the value stored at key. The different types that can be returned are: string, list, set, zset and hash.

#### _Redis_ [+](https://redis.io/commands/type)

- available: `>= 1.0.0`
- complexity: `O(1)`
- return: type of key, or none when key does not exist.
- examples:

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

- interface:

```ts
type(key: string): Promise<string>;
```

- example:

```ts
await Key.type("key1");
// string
await Key.type("key2");
// list
await Key.type("key3");
// set
```
