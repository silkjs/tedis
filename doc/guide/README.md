---
meta:
  - name: description
    content: tedis for nodejs
  - name: keywords
    content: tedis redis typescript async
prev: false
next: false
---

# 文档

## 简介

Tedis 所有功能都由 typescript 编写实现，最后生成原生 javascript 代码，支持 javascript（commonjs）和 typescript 调用。项目采用 typescript 有诸多好处，不仅便于源码的开发维护，同时提供的类型文件，让用户在编辑器提示下拥有更友好的开发体验和更高的开发效率。

## 特性

- _类型支持_：本项目使用 typescript 编写实现，提供类型检查的同时享受编辑器的代码提示。
- _异步编程_：使用 promise、async，让你远离回调地狱，逻辑书写更直观。
- _连接池_：复用 TCP 连接，充分利用 redis 性能，提高程序健壮性。

## 名称由来

Tedis 是为 nodejs 平台开发的 redis 客户端，名称由来受 java 平台 jedis 的启发，加上开发语言为 typescript，故取 Tedis 一名，也由此希望 Tedis 能够在今后发展中一切向好，成为 nodejs 平台中 redis 客户端的翘楚。

## 为什么不是

- _node_redis_

`node_redis` 起步较早，已经经受过时间的考验，功能覆盖面全，运行稳定。但代码大部分由古老版本的 javascript 构成，并且首选流程为回调函数。虽然可以通过 `promise` 和 `bluebird` 改造来支持异步调用，但是 API 语法会相对丑陋。因为其作者并不喜欢 typescript，在 issues 中也明确表示过项目没有支持 typescript 的打算，社区因此维护了一套 `@types/redis` 类型文件,但是由于 `node_redis` 并没有原生支持异步调用，加上其功能实现太过 geek，社区版的类型文件只是实现了原始接口，结合异步改造后代码提示与类型检查效果并不理想。

- _co-redis_

`co-redis` 是在 `node_redis` 基础上通过 `generators` 特性封装的 redis 客户端，其算然在`node_redis`回调基础上调用流程更清晰，但是此项目太久没有维护，相对于`async`、`await`，`generators`还是要稍逊一些，外加缺乏 typescript 支持，代码提示方面并不友好。

- _node-redlock_

`node-redlock`新特性支持不及时，虽然有单元测试，但是不够全面，类型文件暂不支持。

## 快速开始

```bash
yarn add tedis
# 或者 npm install tedis --save
```

```ts
// commonjs
const { Tedis, TedisPool } = require("tedis");

// es
import { Tedis, TedisPool } from "tedis";

// TypeScript
import { Tedis, TedisPool } from "tedis";
```

实例化

_Tedis_

| 参数      | 类型   | 默认值    |
| --------- | ------ | --------- |
| host?     | string | 127.0.0.1 |
| port?     | number | 6379      |
| password? | string |           |
| timeour?  | number |           |

```ts
const tedis = new Tedis({
  host: "127.0.0.1",
  port: 6379,
  password: "password"
});
```

_TedisPool_

| 参数      | 类型   | 默认值    |
| --------- | ------ | --------- |
| host?     | string | 127.0.0.1 |
| port?     | number | 6379      |
| password? | string |           |
| min_conn? | number | 1         |
| max_conn? | number | 10        |
| timeour?  | number |           |

```ts
const tedispool = new TedisPool({
  host: "127.0.0.1",
  port: 6379
});

const tedis = await tedispool.getTedis();
// do task ...
tedispool.putTedis(tedis);
```

## API 案例

```ts
// key
await tedis.keys("*");
await tedis.exists("a");

// string
await tedis.set("string1", "abcdefg");
await tedis.get("string1");

// hash
await tedis.hmset("hash1", {
  name: "tom",
  age: 23
});
await tedis.hgetall("hash1");

// list
await tedis.lpush("list1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]);
await tedis.llen("list1");

// set
await tedis.sadd("set1", ["a", "b", "c", "d", 1, 2, 3, 4, 5]);
await tedis.scard("set1");

// zset
await tedis.zadd("zset1", [
  [1, "a"],
  [10, "a"],
  [2, "adg"],
  [3, "aertet"],
  [4, "afg"]
]);
await tedis.zcard("zset1");

// base
tedis.close();
```

## 连接池

使用`Tedis`初始化 client 使用的是单个 tcp 连接，在服务并发没有上规模的时候单实例足以应付。当并发足够大的时候，单实例的 tcp 连接并没有发挥出 redis 真正的能力，这个时候你可能就需要使用`TedisPool`来提升服务能力了

::: danger 警告
当使用`TedisPool`时，记得取出的实例使用完后调用`putTedis`归还释放，以保证下一次正常使用
:::
