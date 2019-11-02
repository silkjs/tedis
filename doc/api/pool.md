---
prev: ./base
next: ./key
---

# pool

::: tip
This section of sample `tedisPool` as TedisPool instance object, demonstration part omitted async function of the external layer
:::

## getTedis

Get the Tedis instance from the connection pool

- interface

```ts
getTedis(): Promise<Tedis>;
```

- example

```ts
const tedis = await tedisPool.getTedis();
```

## putTedis

Return an instance to the connection pool

- interface

```ts
putTedis(conn: Tedis): void;
```

- example

```ts
tedisPool.putTedis(tedis);
```

## release

Release all instances

- interface

```ts
release(): void;
```

- example

```ts
tedisPool.release();
```
