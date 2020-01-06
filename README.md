<p align="center">
  <a href="https://tedis.silkjs.org/" target="_blank" rel="noopener noreferrer"><img src="./doc/.vuepress/public/icons/android-chrome-192x192.png" alt="tedis logo"></a>
</p>

<p align="center">
  <a href="https://travis-ci.org/silkjs/tedis"><img src="https://img.shields.io/travis/silkjs/tedis.svg" alt="travis"></a>
  <a href="https://github.com/silkjs/tedis/issues"><img src="https://img.shields.io/github/issues-raw/silkjs/tedis.svg" alt="issues"></a>
  <a href="https://github.com/silkjs/tedis"><img src="https://img.shields.io/github/license/silkjs/tedis.svg" alt="license"></a>
  <a href="https://www.npmjs.com/package/tedis"><img src="https://img.shields.io/npm/v/tedis.svg" alt="package"></a>
  <a href='https://codecov.io/gh/silkjs/tedis'><img src='https://img.shields.io/codecov/c/github/silkjs/tedis.svg' alt='Coverage Status' /></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/tag/silkjs/tedis.svg" alt="tag"></a>
  <br>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/issues-pr/silkjs/tedis.svg" alt="pr"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/release/silkjs/tedis.svg" alt="release"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/languages/top/silkjs/tedis.svg" alt="languages"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/languages/code-size/silkjs/tedis.svg" alt="size"></a>
  <a href="javascript:void(0)" ><img src="https://img.shields.io/github/last-commit/silkjs/tedis.svg" alt="commit"></a>
</p>

<h2 align="center">Supporting Tedis</h2>

## Introduction

### What is tedis

Tedis write with typescript, it's the client of redis for nodejs, support async with ts and commonjs

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

_tls_

```ts
const tedis = new Tedis({
  port: 6379,
  host: "127.0.0.1",
  tls: {
    key: fs.readFileSync(__dirname + "/client_server/client_key.pem"),
    cert: fs.readFileSync(__dirname + "/client_server/client_cert.pem")
  }
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
pool.putTedis(tedis);
```

_tls_

```ts
const tedis = new TedisPool({
  port: 6379,
  host: "127.0.0.1",
  tls: {
    key: fs.readFileSync(__dirname + "/client_server/client_key.pem"),
    cert: fs.readFileSync(__dirname + "/client_server/client_cert.pem")
  }
});
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

## base

- [command](https://tedis.silkjs.org/api/base.html#command)
- [on](https://tedis.silkjs.org/api/base.html#on)
- [close](https://tedis.silkjs.org/api/base.html#close)

## pool

- [getTedis](https://tedis.silkjs.org/api/pool.html#getTedis)
- [putTedis](https://tedis.silkjs.org/api/pool.html#putTedis)
- [release](https://tedis.silkjs.org/api/pool.html#release)

### key

- [del](https://tedis.silkjs.org/api/key.html#del)
- dump
- [exists](https://tedis.silkjs.org/api/key.html#exists)
- [expire](https://tedis.silkjs.org/api/key.html#expire)
- [expireat](https://tedis.silkjs.org/api/key.html#expireat)
- [keys](https://tedis.silkjs.org/api/key.html#keys)
- migrate
- [move](https://tedis.silkjs.org/api/key.html#move)
- object
- [persist](https://tedis.silkjs.org/api/key.html#persist)
- [pexpire](https://tedis.silkjs.org/api/key.html#pexpire)
- [pexpireat](https://tedis.silkjs.org/api/key.html#pexpireat)
- [pttl](https://tedis.silkjs.org/api/key.html#pttl)
- [randomkey](https://tedis.silkjs.org/api/key.html#randomkey)
- [rename](https://tedis.silkjs.org/api/key.html#rename)
- [renamenx](https://tedis.silkjs.org/api/key.html#renamenx)
- restore
- scan
- sort
- touch
- [ttl](https://tedis.silkjs.org/api/key.html#ttl)
- [type](https://tedis.silkjs.org/api/key.html#type)
- unlink
- wait

### string

- [append](https://tedis.silkjs.org/api/string.html#append)
- bitcount
- bitfield
- bitop
- bitpos
- [decr](https://tedis.silkjs.org/api/string.html#decr)
- [decrby](https://tedis.silkjs.org/api/string.html#decrby)
- [get](https://tedis.silkjs.org/api/string.html#get)
- [getbit](https://tedis.silkjs.org/api/string.html#getbit)
- [getrange](https://tedis.silkjs.org/api/string.html#getrange)
- [getset](https://tedis.silkjs.org/api/string.html#getset)
- [incr](https://tedis.silkjs.org/api/string.html#incr)
- [incrby](https://tedis.silkjs.org/api/string.html#incrby)
- [incrbyfloat](https://tedis.silkjs.org/api/string.html#incrbyfloat)
- [mget](https://tedis.silkjs.org/api/string.html#mget)
- [mset](https://tedis.silkjs.org/api/string.html#mset)
- [msetnx](https://tedis.silkjs.org/api/string.html#msetnx)
- [psetex](https://tedis.silkjs.org/api/string.html#psetex)
- [set](https://tedis.silkjs.org/api/string.html#set)
- [setbit](https://tedis.silkjs.org/api/string.html#setbit)
- [setex](https://tedis.silkjs.org/api/string.html#setex)
- [setnx](https://tedis.silkjs.org/api/string.html#setnx)
- [setrange](https://tedis.silkjs.org/api/string.html#setrange)
- [strlen](https://tedis.silkjs.org/api/string.html#strlen)

### hash

- [hdel](https://tedis.silkjs.org/api/hash.html#hdel)
- [hexists](https://tedis.silkjs.org/api/hash.html#hexists)
- [hget](https://tedis.silkjs.org/api/hash.html#hget)
- [hgetall](https://tedis.silkjs.org/api/hash.html#hgetall)
- [hincrby](https://tedis.silkjs.org/api/hash.html#hincrby)
- [hincrbyfloat](https://tedis.silkjs.org/api/hash.html#hincrbyfloat)
- [hkeys](https://tedis.silkjs.org/api/hash.html#hkeys)
- [hlen](https://tedis.silkjs.org/api/hash.html#hlen)
- [hmget](https://tedis.silkjs.org/api/hash.html#hmget)
- [hmset](https://tedis.silkjs.org/api/hash.html#hmset)
- hscan
- [hset](https://tedis.silkjs.org/api/hash.html#hset)
- [hsetnx](https://tedis.silkjs.org/api/hash.html#hsetnx)
- [hstrlen](https://tedis.silkjs.org/api/hash.html#hstrlen)
- [hvals](https://tedis.silkjs.org/api/hash.html#hvals)

### list

- [blpop](https://tedis.silkjs.org/api/list.html#blpop)
- [brpop](https://tedis.silkjs.org/api/list.html#brpop)
- [brpoplpush](https://tedis.silkjs.org/api/list.html#brpoplpush)
- [lindex](https://tedis.silkjs.org/api/list.html#lindex)
- [linsert](https://tedis.silkjs.org/api/list.html#linsert)
- [llen](https://tedis.silkjs.org/api/list.html#llen)
- [lpop](https://tedis.silkjs.org/api/list.html#lpop)
- [lpush](https://tedis.silkjs.org/api/list.html#lpush)
- [lpushx](https://tedis.silkjs.org/api/list.html#lpushx)
- [lrange](https://tedis.silkjs.org/api/list.html#lrange)
- [lrem](https://tedis.silkjs.org/api/list.html#lrem)
- [lset](https://tedis.silkjs.org/api/list.html#lset)
- [ltrim](https://tedis.silkjs.org/api/list.html#ltrim)
- [rpop](https://tedis.silkjs.org/api/list.html#rpop)
- [rpoplpush](https://tedis.silkjs.org/api/list.html#rpoplpush)
- [rpush](https://tedis.silkjs.org/api/list.html#rpush)
- [rpushx](https://tedis.silkjs.org/api/list.html#rpushx)

### set

- [sadd](https://tedis.silkjs.org/api/set.html#sadd)
- [scard](https://tedis.silkjs.org/api/set.html#scard)
- [sdiff](https://tedis.silkjs.org/api/set.html#sdiff)
- [sdiffstore](https://tedis.silkjs.org/api/set.html#sdiffstore)
- [sinter](https://tedis.silkjs.org/api/set.html#sinter)
- [sinterstore](https://tedis.silkjs.org/api/set.html#sinterstore)
- [sismember](https://tedis.silkjs.org/api/set.html#sismember)
- [smembers](https://tedis.silkjs.org/api/set.html#smembers)
- [smove](https://tedis.silkjs.org/api/set.html#smove)
- [spop](https://tedis.silkjs.org/api/set.html#spop)
- [srandmember](https://tedis.silkjs.org/api/set.html#srandmember)
- [srem](https://tedis.silkjs.org/api/set.html#srem)
- sscan
- [sunion](https://tedis.silkjs.org/api/set.html#sunion)
- [sunionstore](https://tedis.silkjs.org/api/set.html#sunionstore)

### zset

- bzpopmax
- bzpopmin
- [zadd](https://tedis.silkjs.org/api/zset.html#zadd)
- [zcard](https://tedis.silkjs.org/api/zset.html#zcard)
- [zcount](https://tedis.silkjs.org/api/zset.html#zcount)
- [zincrby](https://tedis.silkjs.org/api/zset.html#zincrby)
- [zinterstore](https://tedis.silkjs.org/api/zset.html#zinterstore)
- [zlexcount](https://tedis.silkjs.org/api/zset.html#zlexcount)
- zpopmax
- zpopmin
- [zrange](https://tedis.silkjs.org/api/zset.html#zrange)
- [zrangebylex](https://tedis.silkjs.org/api/zset.html#zrangebylex)
- [zrangebyscore](https://tedis.silkjs.org/api/zset.html#zrangebyscore)
- [zrank](https://tedis.silkjs.org/api/zset.html#zrank)
- [zrem](https://tedis.silkjs.org/api/zset.html#zrem)
- [zremrangebylex](https://tedis.silkjs.org/api/zset.html#zremrangebylex)
- [zremrangebyrank](https://tedis.silkjs.org/api/zset.html#zremrangebyrank)
- [zremrangebyscore](https://tedis.silkjs.org/api/zset.html#zremrangebyscore)
- [zrevrange](https://tedis.silkjs.org/api/zset.html#zrevrange)
- zrevrangebylex
- [zrevrangebyscore](https://tedis.silkjs.org/api/zset.html#zrevrangebyscore)
- [zrevrank](https://tedis.silkjs.org/api/zset.html#zrevrank)
- zscan
- [zscore](https://tedis.silkjs.org/api/zset.html#zscore)
- [zunionstore](https://tedis.silkjs.org/api/zset.html#zunionstore)
