---
prev: ./
next: ./pool
---

# base

::: tip 说明
本节示例中的 `tedis` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## command

与 redis 交互的基础接口。当你需要使用 redis 中某个方法，但是这个方法暂时没有被 Tedis 实现时，你可以使用`command`代替

- 接口

```ts
command(...parameters: Array<string | number>): Promise<any>;
```

- 示例

```ts
await tedis.command("SET", "mykey", "hello tedis");
// "OK"
await tedis.command("GET", "mykey");
// "hello tedis"
```

## on

Tedis 实例的状态监听钩子

- 接口

```ts
on(event: "connect" | "timeout", listener: () => void): void;
on(event: "error", listener: (err: Error) => void): void;
on(event: "close", listener: (had_error: boolean) => void): void;
```

- 示例

```ts
tedis.on("connect", () => {
  console.log("connect");
});
tedis.on("timeout", () => {
  console.log("timeout");
});
tedis.on("error", err => {
  console.log(err);
});
tedis.on("close", had_error => {
  console.log("close with err: ", had_error);
});
```

## close

关闭 Tedis 实例

- 接口

```ts
close(): void;
```

- 示例

```ts
tedis.close()
```
