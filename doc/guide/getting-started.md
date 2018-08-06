---
prev: ./
next: false
---

# 指南

::: warning 提示
Tedis 目标宏大，但在初始阶段许多方面还不完善，比如文档和测试。而且没有经过大量的实践检验，所以强烈建议开发者暂时不要把 Tedis 用在正式项目上。另外如果你有开源热情，欢迎为 Tedis 提供测试、文档帮助以及 API 建议等，这将加速 Tedis 的发展使其更稳健，以便早日在生产环境中使用她的各种优秀特性。
:::

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
