<p align="center">
  <a href="https://tedis.myour.tech/en" target="_blank" rel="noopener noreferrer"><img src="./doc/.vuepress/public/icons/android-chrome-192x192.png" alt="tedis logo"></a>
</p>

<p align="center">
  <a href="https://travis-ci.org/myour-cc/tedis"><img src="https://img.shields.io/travis/myour-cc/tedis.svg" alt="travis"></a>
  <a href="https://github.com/myour-cc/tedis/issues"><img src="https://img.shields.io/github/issues-raw/myour-cc/tedis.svg" alt="issues"></a>
  <a href="https://github.com/myour-cc/tedis"><img src="https://img.shields.io/github/license/myour-cc/tedis.svg" alt="license"></a>
  <a href="https://www.npmjs.com/package/tedis"><img src="https://img.shields.io/npm/v/tedis.svg" alt="package"></a>
  <a href='https://codecov.io/gh/myour-cc/tedis'><img src='https://img.shields.io/codecov/c/github/myour-cc/tedis.svg' alt='Coverage Status' /></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/tag/myour-cc/tedis.svg" alt="tag"></a>
  <br>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/issues-pr/myour-cc/tedis.svg" alt="pr"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/release/myour-cc/tedis.svg" alt="release"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/languages/top/myour-cc/tedis.svg" alt="languages"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/languages/code-size/myour-cc/tedis.svg" alt="size"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/last-commit/myour-cc/tedis.svg" alt="commit"></a>
</p>

<h2 align="center">Supporting Tedis</h2>

## Introduction

### What is tedis

Tedis write with typescript, it's the client of redis for nodejs, support asycn with ts and commonjs

### Installation

```sh
yarn add tedis
```

### Getting started

> commonjs

```js
const { Tedis, TedisPool } = require("tedis");
```

> typescript

```ts
import { Tedis, TedisPool } from "tedis";
```

```ts
// no auth
const tedis = new Tedis({
  port: 6379,
  host: "127.0.0.1"
});

// auth
const tedis = new Tedis({
  port: 6379,
  host: "127.0.0.1",
  password: "your_password"
});
```

### TedisPool

```ts
// no auth
const pool = new TedisPool({
  port: 6379,
  host: "127.0.0.1"
});

// auth
const pool = new TedisPool({
  port: 6379,
  host: "127.0.0.1",
  password: "your_password"
});
```

```ts
const tedis = await pool.getTedis();
// ... do some commands
pool.putTedis(tedis)
```

### Example

```ts
/**
 * core
 */
await tedis.command("SET", "key1", "Hello");
// "OK"
await tedis.command("SET", "key2", "World");
// "OK"

/**
 * key
 */
await tedis.keys("*");
// []
await tedis.exists("a");
// 0

/**
 * string
 */
await tedis.set("mystring", "hello");
// "OK"
await tedis.get("mystring");
// "hello"

/**
 * hash
 */
await tedis.hmset("myhash", {
  name: "tedis",
  age: 18
});
// "OK"
await tedis.hgetall("myhash");
// {
//   "name": "tedis",
//   "age": "18"
// }

/**
 * list
 */
await tedis.lpush("mylist", "hello", "a", "b", "c", "d", 1, 2, 3, 4);
// 9
await tedis.llen("mylist");
// 9
```

## Type interface

### key

- [del](https://tedis.myour.tech/en/api/key.html#del)
- dump
- [exists](https://tedis.myour.tech/en/api/key.html#exists)
- [expire](https://tedis.myour.tech/en/api/key.html#expire)
- [expireat](https://tedis.myour.tech/en/api/key.html#expireat)
- [keys](https://tedis.myour.tech/en/api/key.html#keys)
- migrate
- [move](https://tedis.myour.tech/en/api/key.html#move)
- object
- [persist](https://tedis.myour.tech/en/api/key.html#persist)
- [pexpire](https://tedis.myour.tech/en/api/key.html#pexpire)
- [pexpireat](https://tedis.myour.tech/en/api/key.html#pexpireat)
- [pttl](https://tedis.myour.tech/en/api/key.html#pttl)
- [randomkey](https://tedis.myour.tech/en/api/key.html#randomkey)
- [rename](https://tedis.myour.tech/en/api/key.html#rename)
- [renamenx](https://tedis.myour.tech/en/api/key.html#renamenx)
- restore
- scan
- sort
- touch
- [ttl](https://tedis.myour.tech/en/api/key.html#ttl)
- [type](https://tedis.myour.tech/en/api/key.html#type)
- unlink
- wait

### string

- [append](https://tedis.myour.tech/en/api/string.html#append)
- bitcount
- bitfield
- bitop
- bitpos
- [decr](https://tedis.myour.tech/en/api/string.html#decr)
- [decrby](https://tedis.myour.tech/en/api/string.html#decrby)
- [get](https://tedis.myour.tech/en/api/string.html#get)
- [getbit](https://tedis.myour.tech/en/api/string.html#getbit)
- [getrange](https://tedis.myour.tech/en/api/string.html#getrange)
- [getset](https://tedis.myour.tech/en/api/string.html#getset)
- [incr](https://tedis.myour.tech/en/api/string.html#incr)
- [incrby](https://tedis.myour.tech/en/api/string.html#incrby)
- [incrbyfloat](https://tedis.myour.tech/en/api/string.html#incrbyfloat)
- [mget](https://tedis.myour.tech/en/api/string.html#mget)
- [mset](https://tedis.myour.tech/en/api/string.html#mset)
- [msetnx](https://tedis.myour.tech/en/api/string.html#msetnx)
- [psetex](https://tedis.myour.tech/en/api/string.html#psetex)
- [set](https://tedis.myour.tech/en/api/string.html#set)
- [setbit](https://tedis.myour.tech/en/api/string.html#setbit)
- [setex](https://tedis.myour.tech/en/api/string.html#setex)
- [setnx](https://tedis.myour.tech/en/api/string.html#setnx)
- [setrange](https://tedis.myour.tech/en/api/string.html#setrange)
- [strlen](https://tedis.myour.tech/en/api/string.html#strlen)

### hash

- [hdel](https://tedis.myour.tech/en/api/hash.html#hdel)
- [hexists](https://tedis.myour.tech/en/api/hash.html#hexists)
- [hget](https://tedis.myour.tech/en/api/hash.html#hget)
- [hgetall](https://tedis.myour.tech/en/api/hash.html#hgetall)
- [hincrby](https://tedis.myour.tech/en/api/hash.html#hincrby)
- [hincrbyfloat](https://tedis.myour.tech/en/api/hash.html#hincrbyfloat)
- [hkeys](https://tedis.myour.tech/en/api/hash.html#hkeys)
- [hlen](https://tedis.myour.tech/en/api/hash.html#hlen)
- [hmget](https://tedis.myour.tech/en/api/hash.html#hmget)
- [hmset](https://tedis.myour.tech/en/api/hash.html#hmset)
- hscan
- [hset](https://tedis.myour.tech/en/api/hash.html#hset)
- [hsetnx](https://tedis.myour.tech/en/api/hash.html#hsetnx)
- [hstrlen](https://tedis.myour.tech/en/api/hash.html#hstrlen)
- [hvals](https://tedis.myour.tech/en/api/hash.html#hvals)

### list

- [blpop](https://tedis.myour.tech/en/api/list.html#blpop)
- [brpop](https://tedis.myour.tech/en/api/list.html#brpop)
- [brpoplpush](https://tedis.myour.tech/en/api/list.html#brpoplpush)
- [lindex](https://tedis.myour.tech/en/api/list.html#lindex)
- [linsert](https://tedis.myour.tech/en/api/list.html#linsert)
- [llen](https://tedis.myour.tech/en/api/list.html#llen)
- [lpop](https://tedis.myour.tech/en/api/list.html#lpop)
- [lpush](https://tedis.myour.tech/en/api/list.html#lpush)
- [lpushx](https://tedis.myour.tech/en/api/list.html#lpushx)
- [lrange](https://tedis.myour.tech/en/api/list.html#lrange)
- [lrem](https://tedis.myour.tech/en/api/list.html#lrem)
- [lset](https://tedis.myour.tech/en/api/list.html#lset)
- [ltrim](https://tedis.myour.tech/en/api/list.html#ltrim)
- [rpop](https://tedis.myour.tech/en/api/list.html#rpop)
- [rpoplpush](https://tedis.myour.tech/en/api/list.html#rpoplpush)
- [rpush](https://tedis.myour.tech/en/api/list.html#rpush)
- [rpushx](https://tedis.myour.tech/en/api/list.html#rpushx)

### set

- [sadd](https://tedis.myour.tech/en/api/set.html#sadd)
- [scard](https://tedis.myour.tech/en/api/set.html#scard)
- [sdiff](https://tedis.myour.tech/en/api/set.html#sdiff)
- [sdiffstore](https://tedis.myour.tech/en/api/set.html#sdiffstore)
- [sinter](https://tedis.myour.tech/en/api/set.html#sinter)
- [sinterstore](https://tedis.myour.tech/en/api/set.html#sinterstore)
- [sismember](https://tedis.myour.tech/en/api/set.html#sismember)
- [smembers](https://tedis.myour.tech/en/api/set.html#smembers)
- [smove](https://tedis.myour.tech/en/api/set.html#smove)
- [spop](https://tedis.myour.tech/en/api/set.html#spop)
- [srandmember](https://tedis.myour.tech/en/api/set.html#srandmember)
- [srem](https://tedis.myour.tech/en/api/set.html#srem)
- sscan
- [sunion](https://tedis.myour.tech/en/api/set.html#sunion)
- [sunionstore](https://tedis.myour.tech/en/api/set.html#sunionstore)

### zset

- bzpopmax
- bzpopmin
- [zadd](https://tedis.myour.tech/en/api/zset.html#zadd)
- [zcard](https://tedis.myour.tech/en/api/zset.html#zcard)
- [zcount](https://tedis.myour.tech/en/api/zset.html#zcount)
- [zincrby](https://tedis.myour.tech/en/api/zset.html#zincrby)
- [zinterstore](https://tedis.myour.tech/en/api/zset.html#zinterstore)
- [zlexcount](https://tedis.myour.tech/en/api/zset.html#zlexcount)
- zpopmax
- zpopmin
- [zrange](https://tedis.myour.tech/en/api/zset.html#zrange)
- [zrangebylex](https://tedis.myour.tech/en/api/zset.html#zrangebylex)
- [zrangebyscore](https://tedis.myour.tech/en/api/zset.html#zrangebyscore)
- [zrank](https://tedis.myour.tech/en/api/zset.html#zrank)
- [zrem](https://tedis.myour.tech/en/api/zset.html#zrem)
- [zremrangebylex](https://tedis.myour.tech/en/api/zset.html#zremrangebylex)
- [zremrangebyrank](https://tedis.myour.tech/en/api/zset.html#zremrangebyrank)
- [zremrangebyscore](https://tedis.myour.tech/en/api/zset.html#zremrangebyscore)
- [zrevrange](https://tedis.myour.tech/en/api/zset.html#zrevrange)
- zrevrangebylex
- [zrevrangebyscore](https://tedis.myour.tech/en/api/zset.html#zrevrangebyscore)
- [zrevrank](https://tedis.myour.tech/en/api/zset.html#zrevrank)
- zscan
- [zscore](https://tedis.myour.tech/en/api/zset.html#zscore)
- [zunionstore](https://tedis.myour.tech/en/api/zset.html#zunionstore)
