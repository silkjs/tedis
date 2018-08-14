---
meta:
  - name: description
    content: tedis for nodejs
  - name: keywords
    content: tedis redis typescript async
prev: false
next: false
---

# 介绍

Tedis 所有功能都由 typescript 编写实现，最后生成原生 javascript 代码，支持 javascript（commonjs）和 typescript 调用。项目采用 typescript 有诸多好处，不仅便于源码的开发维护，同时提供的类型文件，让用户在编辑器提示下拥有更友好的开发体验和更高的开发效率。

## 名称由来

Tedis 是为 nodejs 平台开发的 redis 客户端，名称由来受 java 平台 jedis 的启发，加上开发语言为 typescript，故取 Tedis 一名，也由此希望 Tedis 能够在今后发展中一切向好，成为 nodejs 平台中 redis 客户端的翘楚。

## 为什么不是

### node_redis

`node_redis` 起步较早，已经经受过时间的考验，功能覆盖面全，运行稳定。但代码大部分由古老版本的 javascript 构成，并且首选流程为回调函数。虽然可以通过 `promise` 和 `bluebird` 改造来支持异步调用，但是 API 语法会相对丑陋。因为其作者并不喜欢 typescript，在 issues 中也明确表示过项目没有支持 typescript 的打算，社区因此维护了一套 `@types/redis` 类型文件,但是由于 `node_redis` 并没有原生支持异步调用，加上其功能实现太过 geek，社区版的类型文件只是实现了原始接口，结合异步改造后代码提示与类型检查效果并不理想。

### co-redis

`co-redis` 是在 `node_redis` 基础上通过 `generators` 特性封装的 redis 客户端，其算然在`node_redis`回调基础上调用流程更清晰，但是此项目太久没有维护，相对于`async`、`await`，`generators`还是要稍逊一些，外加缺乏 typescript 支持，代码提示方面并不友好。

### node-redlock

`node-redlock`新特性支持不及时，虽然有单元测试，但是不够全面，类型文件暂不支持。

# 指南

## 安装

```bash
yarn add tedis
# 或者 npm install tedis --save
```

## 导入

```ts
// JavaScript（commonjs）
const { Redis } = require("tedis");

// TypeScript
import { Redis } from "tedis";
```

## 使用

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
