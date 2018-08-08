<p align="center">
  <a href="https://tedis.myour.tech" target="_blank" rel="noopener noreferrer"><img src="./doc/.vuepress/public/icons/android-chrome-192x192.png" alt="tedis logo"></a>
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

### what is tedis

`Tedis` write with typescript, it's the client of redis for nodejs, support asycn with ts and commonjs

### Installation

```sh
yarn add tedis
```

### Getting started

> commonjs

```js
const { Redis } = require("tedis");
```

> typescript

```ts
import { Redis } from "tedis";
```

```ts
const client = new Redis({
  port: 6379,
  host: "127.0.0.1"
});
```

### example

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
