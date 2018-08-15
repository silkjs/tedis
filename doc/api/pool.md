---
prev: ./base
next: ./key
---

# pool

::: tip 说明
本节示例中的 `tedisPool` 为 TedisPool 实例对象，演示部分省略了外部的 async 函数层
:::

## getTedis

从连接池中获取 Tedis 实例

- 接口

```ts
getTedis(): Promise<Tedis>;
```

- 示例

```ts
const tedis = await tedisPool.getTedis();
```

## putTedis

归还实例到连接池

- 接口

```ts
putTedis(conn: Tedis): void;
```

- 示例

```ts
tedisPool.putTedis(tedis);
```

## release

释放所有实例

- 接口

```ts
release(): void;
```

- 示例

```ts
tedisPool.release();
```
