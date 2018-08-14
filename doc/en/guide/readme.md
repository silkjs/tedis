---
meta:
  - name: description
    content: tedis for nodejs
  - name: keywords
    content: tedis redis typescript async
prev: false
next: false
---

# Introduction

All the functions of Tedis are written and implemented by typescript. Finally, native javascript code is generated, supporting javascript (commonjs) and typescript calls. The project's adoption of typescript has many benefits, not only facilitating the development and maintenance of source code, but also providing type files, enabling users to have a more friendly development experience and higher development efficiency under editor prompts.

## What is Tedis

Tedis is a redis client developed for nodejs platform. Its name was inspired by the Java platform jedis and the development language was typescript. Therefore, Tedis is named as Tedis.

## Why

### node_redis

`node_redis` started earlier, has withstood the test of time, functional coverage, all running stability. But much of the code is made up of older versions of javascript, and the process is preferred to be a callback function. Although can through `promise` and `bluebird` transformation to support asynchronous calls, but it would be relatively ugly API syntax. Because of its author, does not like typescript, also made it clear in the free program does not intend to support the typescript, community thus maintain a set of `@types/redis` type file, but the `node_redis` no native support for asynchronous calls, combined with its function implementation too geek, community edition of the type of the file is the original interface, combined with asynchronous code tips and altered type checking effect is not ideal.

### co-redis

`co-redis` in `node_redis` basis through `generators` features encapsulated redis client, is it in `node_redis` callback call process on the basis of more clear, but the project for a long time without maintenance, relative to the `async`, `await`, `generators` or less some, plus the lack of typescript support, code hinting aspects are not friendly.

### node-redlock

`node-redlock` new features support not in time, although there are unit tests, but not comprehensive, type files do not support.

## Getting Started

### Installation

```bash
yarn add tedis
# OR npm install tedis --save
```

### Import

```ts
// JavaScript（commonjs）
const { Redis } = require("tedis");

// TypeScript
import { Redis } from "tedis";
```

### Example

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
