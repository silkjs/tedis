---
meta:
  - name: description
    content: tedis for nodejs
  - name: keywords
    content: tedis redis typescript async promise
prev: false
next: false
---

# Guide

## Introduction

All the functions of Tedis are written and implemented by typescript. Finally, native javascript code is generated, supporting javascript (commonjs) and typescript calls. The project's adoption of typescript has many benefits, not only facilitating the development and maintenance of source code, but also providing type files, enabling users to have a more friendly development experience and higher development efficiency under editor prompts.

## feature

- _types_: with typescript, providing both type checking and editor code hints.
- _async_: Use promise, async to keep you out of the hell of pullbacks and make logical writing more intuitive.
- _pool_: Reuse TCP connection to take advantage of redis performance and improve program robustness.

## What is Tedis

Tedis is a redis client developed for nodejs platform. Its name was inspired by the Java platform jedis and the development language was typescript. Therefore, Tedis is named as Tedis.

## Why not

_node_redis_

`node_redis` started earlier, has withstood the test of time, functional coverage, all running stability. But much of the code is made up of older versions of javascript, and the process is preferred to be a callback function. Although can through `promise` and `bluebird` transformation to support asynchronous calls, but it would be relatively ugly API syntax. Because of its author, does not like typescript, also made it clear in the free program does not intend to support the typescript, community thus maintain a set of `@types/redis` type file, but the `node_redis` no native support for asynchronous calls, combined with its function implementation too geek, community edition of the type of the file is the original interface, combined with asynchronous code tips and altered type checking effect is not ideal.

_co-redis_

`co-redis` in `node_redis` basis through `generators` features encapsulated redis client, is it in `node_redis` callback call process on the basis of more clear, but the project for a long time without maintenance, relative to the `async`, `await`, `generators` or less some, plus the lack of typescript support, code hinting aspects are not friendly.

_node-redlock_

`node-redlock` new features support not in time, although there are unit tests, but not comprehensive, type files do not support.

## Getting Started

```bash
yarn add tedis
# OR npm install tedis --save
```

```ts
// commonjs
const { Tedis, TedisPool } = require("tedis");

// es
import { Tedis, TedisPool } from "tedis";

// TypeScript
import { Tedis, TedisPool } from "tedis";
```

_Tedis_

| param     | type   | default   |
| --------- | ------ | --------- |
| host?     | string | 127.0.0.1 |
| port?     | number | 6379      |
| password? | string |           |
| timeout?  | number |           |

```ts
const tedis = new Tedis({
  host: "127.0.0.1",
  port: 6379,
  password: "password"
});
```

_TedisPool_

| param     | type   | default   |
| --------- | ------ | --------- |
| host?     | string | 127.0.0.1 |
| port?     | number | 6379      |
| password? | string |           |
| min_conn? | number | 1         |
| max_conn? | number | 10        |
| timeout?  | number |           |

```ts
const tedispool = new TedisPool({
  host: "127.0.0.1",
  port: 6379
});

const tedis = await tedispool.getTedis();
// do task ...
tedispool.putTedis(tedis);
```

## Example

```ts
// key
await client.keys("*");
await client.exists("a");

// string
await client.set("string1", "abcdefg");
await client.get("string1");

// hash
await client.hmset("hash1", {
  name: "tom",
  age: 23
});
await client.hgetall("hash1");

// list
await client.lpush("list1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]);
await client.llen("list1");

// set
await client.sadd("set1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]);
await client.scard("set1");

// zset
await client.zadd("zset1", [
  [1, "a"],
  [10, "a"],
  [2, "adg"],
  [3, "aertet"],
  [4, "afg"]
]);
await client.zcard("zset1");

// base
client.close();
```

## pool

Using `Tedis` initializes the client is using a single TCP connection, when the size of the single instance on the service concurrently without enough to cope with. When complicated with large enough, a single instance of a TCP connection and did not play out redis real ability, you may need to use this time `TedisPool` to improve service capability

::: danger
When using a `TedisPool`, remember to take out after the instance of using call `putTedis` return release, in order to ensure the normal use of the next
:::
