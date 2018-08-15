---
prev: ./
next: ./pool
---

# base

::: tip
This section of sample ` tedis ` as Tedis instance object, demonstration part omitted async function of the external layer
:::

## command

The underlying interface for interacting with redis. When you need to use some methods in redis, but this method has not been temporarily Tedis implementation, you can use a ` command ` instead

- interface

```ts
command(...parameters: Array<string | number>): Promise<any>;
```

- example

```ts
await tedis.command("SET", "mykey", "hello tedis");
// "OK"
await tedis.command("GET", "mykey");
// "hello tedis"
```

## on

The status of the Tedis instance listening hook

- interface

```ts
on(event: "connect" | "timeout", listener: () => void): void;
on(event: "error", listener: (err: Error) => void): void;
on(event: "close", listener: (had_error: boolean) => void): void;
```

- example

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

Close the Tedis instance

- interface

```ts
close(): void;
```

- example

```ts
tedis.close()
```
