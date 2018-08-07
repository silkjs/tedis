---
prev: ./key
next: ./hash
---

# string

::: tip 说明
本节示例中的 `String` 为 Tedis 实例对象，演示部分省略了外部的 async 函数层
:::

## append

如果 key 已经存在，并且值为字符串，那么这个命令会把 value 追加到原来值（value）的结尾。 如果 key 不存在，那么它将首先创建一个空字符串的 key，再执行追加操作

#### _Redis_

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值：返回 append 后字符串值（value）的长度。
- 指令案例：

```bash
redis> EXISTS mykey
(integer) 0
redis> APPEND mykey "Hello"
(integer) 5
redis> APPEND mykey " World"
(integer) 11
redis> GET mykey
"Hello World"
```

#### _Tedis_

- 接口：

```ts
append(key: string, value: string): Promise<number>;
```

- 示例：

```ts
await String.append("mykey", "Hello");
// 5
await String.append("mykey", " World");
// 11
```

## decr

对 key 对应的数字做减 1 操作。如果 key 不存在，那么在操作之前，这个 key 对应的值会被置为 0。如果 key 有一个错误类型的 value 或者是一个不能表示成数字的字符串，就返回错误。这个操作最大支持在 64 位有符号的整型数字。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：减小之后的 value
- 指令案例：

```bash
redis> SET key1 "10"
"OK"
redis> DECR key1
(integer) 9
redis> SET key2 "234293482390480948029348230948"
"OK"
redis> DECR key2
ERR ERR value is not an integer or out of range
```

#### _Tedis_

- 接口：

```ts
decr(key: string): Promise<number>;
```

- 示例：

```ts
await String.decr("key1");
// 9
await String.decr("key2");
// ERR ERR value is not an integer or out of range
```

## decrby

将 key 对应的数字减 decrement。如果 key 不存在，操作之前，key 就会被置为 0。如果 key 的 value 类型错误或者是个不能表示成数字的字符串，就返回错误。这个操作最多支持 64 位有符号的正型数字。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：减小之后的 value
- 指令案例：

```bash
redis> SET mykey "10"
"OK"
redis> DECRBY mykey 3
(integer) 7
```

#### _Tedis_

- 接口：

```ts
decrby(key: string, decrement: number): Promise<number>;
```

- 示例：

```ts
await String.decrby("mykey", 3);
// 7
```

## get

返回 key 的 value。如果 key 不存在，返回特殊值 nil。如果 key 的 value 不是 string，就返回错误，因为 GET 只处理 string 类型的 values。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：key 对应的 value，不存在的时候返回 nil
- 指令案例：

```bash
redis> GET nonexisting
(nil)
redis> SET mykey "Hello"
"OK"
redis> GET mykey
"Hello"
```

#### _Tedis_

- 接口：

```ts
get(key: string): Promise<null | string>;
```

- 示例：

```ts
await String.get("nonexisting");
// null
await String.get("mykey");
// "Hello"
```

## getbit

返回 key 对应的 string 在 offset 处的 bit 值 当 offset 超出了字符串长度的时候，这个字符串就被假定为由 0 比特填充的连续空间。当 key 不存在的时候，它就认为是一个空字符串，所以 offset 总是超出范围，然后 value 也被认为是由 0 比特填充的连续空间。到内存分配。

#### _Redis_

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：在 offset 处的 bit 值
- 指令案例：

```bash
redis> SETBIT mykey 7 1
(integer) 0
redis> GETBIT mykey 0
(integer) 0
redis> GETBIT mykey 7
(integer) 1
redis> GETBIT mykey 100
(integer) 0
```

#### _Tedis_

- 接口：

```ts
getbit(key: string, offset: number): Promise<0 | 1>;
```

- 示例：

```ts
await String.getbit("mykey", 0);
// 0
await String.getbit("mykey", 7);
// 1
await String.getbit("mykey", 100);
// 0
```

## getrange

::: warning 警告
这个命令是被改成 GETRANGE 的，在小于 2.0 的 Redis 版本中叫 SUBSTR。
:::

返回 key 对应的字符串 value 的子串，这个子串是由 start 和 end 位移决定的（两者都在 string 内）。可以用负的位移来表示从 string 尾部开始数的下标。所以-1 就是最后一个字符，-2 就是倒数第二个，以此类推。这个函数处理超出范围的请求时，都把结果限制在 string 内。

#### _Redis_

- 可用版本：`>= 2.4.0`
- 算法复杂度：`O(N)`
- 返回值：被截取的字串
- 指令案例：

```bash
redis> SET mykey "This is a string"
"OK"
redis> GETRANGE mykey 0 3
"This"
redis> GETRANGE mykey -3 -1
"ing"
redis> GETRANGE mykey 0 -1
"This is a string"
redis> GETRANGE mykey 10 100
"string"
```

#### _Tedis_

- 接口：

```ts
getrange(key: string, [start, end]?: [number, number]): Promise<string>;
```

- 示例：

```ts
await String.getrange("mykey", [0, 3]);
// "This"
await String.getrange("mykey", [-3, -1]);
// "ing"
await String.getrange("mykey"); // 相当于 await String.getrange("mykey", [0, -1]);
// "This is a string"
await String.getrange("mykey", [10, 100]);
// "string"
```

## getset

自动将 key 对应到 value 并且返回原来 key 对应的 value。如果 key 存在但是对应的 value 不是字符串，就返回错误。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：对应 key 的旧 value，key 不存在时返回 nil
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> GETSET mykey "World"
"Hello"
redis> GET mykey
"World"
```

#### _Tedis_

- 接口：

```ts
getset(key: string, value: string): Promise<null | string>;
```

- 示例：

```ts
await String.getset("mykey", "World");
// "Hello"
```

## incr

对存储在指定 key 的数值执行原子的加 1 操作。如果指定的 key 不存在，那么在执行 incr 操作之前，会先将它的值设定为 0。如果指定的 key 中存储的值不是字符串类型或者存储的字符串类型不能表示为一个整数，那么执行这个命令时服务器会返回一个错误。这个操作仅限于 64 位的有符号整型数据。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：执行操作后 key 对应的 value。
- 指令案例：

```bash
redis> SET mykey "10"
"OK"
redis> INCR mykey
(integer) 11
redis> GET mykey
"11"
```

#### _Tedis_

- 接口：

```ts
incr(key: string): Promise<number>;
```

- 示例：

```ts
await String.incr("mykey");
// 11
```

## incrby

将 key 对应的数字加 decrement。如果 key 不存在，操作之前，key 就会被置为 0。如果 key 的 value 类型错误或者是个不能表示成数字的字符串，就返回错误。这个操作最多支持 64 位有符号的正型数字。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：执行操作后 key 对应的 value。
- 指令案例：

```bash
redis> SET mykey "10"
"OK"
redis> INCRBY mykey 5
(integer) 15
```

#### _Tedis_

- 接口：

```ts
incrby(key: string, increment: number): Promise<number>;
```

- 示例：

```ts
await String.incrby("mykey", 5);
// 15
```

## incrbyfloat

通过指定浮点数来增长对应 key 的 value，当 key 不存在时，先将其值设为 0 再操作，下面任一情况都会返回错误：

- key 包含非法值(不是一个 string)
- 当前的 key 或者相加后的值不能解析为一个双精度的浮点值(超出精度范围了)

如果操作命令成功，相加后的值将替换原值存储在对应的键值上，并以 string 的类型返回。string 中已存的值或者相加参数可以任意选用指数符号，但相加计算的结果会以科学计数法的格式存储。无论各计算的内部精度如何，输出精度都固定为小数点后 17 位。

#### _Redis_

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值：当前 key 增加 increment 后的值
- 指令案例：

```bash
redis> SET key1 10.50
"OK"
redis> INCRBYFLOAT key1 0.1
"10.6"
redis> INCRBYFLOAT key1 -5
"5.6"
redis> SET key2 5.0e3
"OK"
redis> INCRBYFLOAT key2 2.0e2
"5200"
```

#### _Tedis_

- 接口：

```ts
incrbyfloat(key: string, increment: string): Promise<string>;
```

- 示例：

```ts
await String.incrbyfloat("key1", "0.1");
// "10.6"
await String.incrbyfloat("key1", "-5");
// "5.6"
await String.incrbyfloat("key2", "2.0e2");
// "5200"
```

## mget

返回所有指定的 key 的 value。对于每个不对应 string 或者不存在的 key，都返回特殊值 nil。正因为此，这个操作从来不会失败。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(N)`
- 返回值：指定的 key 对应的 values 的 list
- 指令案例：

```bash
redis> SET key1 "Hello"
"OK"
redis> SET key2 "World"
"OK"
redis> MGET key1 key2 nonexisting
1) "Hello"
2) "World"
3) (nil)
```

#### _Tedis_

- 接口：

```ts
mget(key: string, ...keys: string[]): Promise<Array<string | number | null>>;
```

- 示例：

```ts
await String.mget("key1", "key2", "nonexisting");
// ["Hello", "World", null];
```

## mset

批量设置 key-value 数据。MSET 会用新的 value 替换已经存在的 value，就像普通的 SET 命令一样。如果你不想覆盖已经存在的 values，请参看命令 MSETNX。

MSET 是原子的，所以所有给定的 keys 是一次性 set 的。客户端不可能看到这种一部分 keys 被更新而另外的没有改变的情况。

#### _Redis_

- 可用版本：`>= 1.0.1`
- 算法复杂度：`O(N)`
- 返回值：总是 OK，因为 MSET 不会失败。
- 指令案例：

```bash
redis> MSET key1 "Hello" key2 "World"
"OK"
redis> GET key1
"Hello"
redis> GET key2
"World"
```

#### _Tedis_

- 接口：

```ts
mset(objKV: { [propName: string]: string }): Promise<string>;
```

- 示例：

```ts
await String.mset({
  key1: "Hello",
  key2: "World"
});
// "OK"
await String.mget("key1", "key2");
// ["Hello", "World"]
```

## msetnx

批量设置 key-value 数据。只要有一个 key 已经存在，MSETNX 一个操作都不会执行。 由于这种特性，MSETNX 可以实现要么所有的操作都成功，要么一个都不执行，这样可以用来设置不同的 key，来表示一个唯一的对象的不同字段。

MSETNX 是原子的，所以所有给定的 keys 是一次性 set 的。客户端不可能看到这种一部分 keys 被更新而另外的没有改变的情况。

#### _Redis_

- 可用版本：`>= 1.0.1`
- 算法复杂度：`O(N)`
- 返回值：如果所有的 key 被 set 则返回`1`，如果没有 key 被 set(至少其中有一个 key 是存在的)则返回`0`
- 指令案例：

```bash
redis> MSETNX key1 "Hello" key2 "there"
(integer) 1
redis> MSETNX key2 "there" key3 "world"
(integer) 0
redis> MGET key1 key2 key3
1) "Hello"
2) "there"
3) (nil)
```

#### _Tedis_

- 接口：

```ts
msetnx(objKv: { [propName: string]: string }): Promise<number>;
```

- 示例：

```ts
await String.msetnx({
  key1: "Hello",
  key2: "World"
});
// 1
await String.msetnx({
  key2: "there",
  key3: "world"
});
// 0
await String.mget("key1", "key2", "key3");
// ["Hello", "World", null]
```

## psetex

设置 key-value 的同时以毫秒为单位设置 key 的生存时间。

#### _Redis_

- 可用版本：`>= 2.6.0`
- 算法复杂度：`O(1)`
- 返回值：设置成功时返回 OK 。
- 指令案例：

```bash
redis> PSETEX mykey 1000 "Hello"
"OK"
redis> PTTL mykey
(integer) 999
redis> GET mykey
"Hello"
```

#### _Tedis_

- 接口：

```ts
psetex(key: string, milliseconds: number, value: string): Promise<any>;
```

- 示例：

```ts
await String.psetex("mykey", 1000, "Hello");
// "OK"
```

## set

将键 key 设定为指定的“字符串”值。如果 key 已经保存了一个值，那么这个操作会直接覆盖原来的值，并且忽略原始类型。当 set 命令执行成功之后，之前设置的过期时间都将失效

从 2.6.12 版本开始，redis 为 SET 命令增加了一系列选项:

- EX seconds – 设置键 key 的过期时间，单位时秒
- PX milliseconds – 设置键 key 的过期时间，单位时毫秒
- NX – 只有键 key 不存在的时候才会设置 key 的值
- XX – 只有键 key 存在的时候才会设置 key 的值

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：如果 SET 命令正常执行那么回返回 OK
- 指令案例：

```bash
redis> SET mykey "Hello"
"OK"
redis> GET mykey
"Hello"
```

#### _Tedis_

- 接口：

```ts
set(key: string, value: string): Promise<any>;
```

- 示例：

```ts
await String.set("mykey", "hello");
// "OK"
```

## setbit

设置或者清空 key 的 value(字符串)在 offset 处的 bit 值。那个位置的 bit 要么被设置，要么被清空，这个由 value（只能是 0 或者 1）来决定。当 key 不存在的时候，就创建一个新的字符串 value。要确保这个字符串大到在 offset 处有 bit 值。参数 offset 需要大于等于 0，并且小于 2-32(限制 bitmap 大小为 512MB)。当 key 对应的字符串增大的时候，新增的部分 bit 值都是设置为 0。

#### _Redis_

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：在 offset 处原来的 bit 值
- 指令案例：

```bash
redis> SETBIT mykey 7 1
(integer) 0
redis> SETBIT mykey 7 0
(integer) 1
redis> GET mykey
"\u0000"
```

#### _Tedis_

- 接口：

```ts
setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
```

- 示例：

```ts
await String.setbit("mykey", 7, 1);
// 0
await String.setbit("mykey", 7, 0);
// 1
```

## setex

设置 key 对应字符串 value，并且设置 key 在给定的 seconds 时间之后超时过期。

#### _Redis_

- 可用版本：`>= 2.0.0`
- 算法复杂度：`O(1)`
- 返回值："OK"
- 指令案例：

```bash
redis> SETEX mykey 10 "Hello"
"OK"
redis> TTL mykey
(integer) 10
redis> GET mykey
"Hello"
```

#### _Tedis_

- 接口：

```ts
setex(key: string, seconds: number, value: string): Promise<any>;
```

- 示例：

```ts
await String.setex("mykey", 10, "Hello");
// "OK"
```

## setnx

将 key 设置值为 value，如果 key 不存在，这种情况下等同 SET 命令。 当 key 存在时，什么也不做。

#### _Redis_

- 可用版本：`>= 1.0.0`
- 算法复杂度：`O(1)`
- 返回值：设置成功返回 1，失败返回 0
- 指令案例：

```bash
redis> SETNX mykey "Hello"
(integer) 1
redis> SETNX mykey "World"
(integer) 0
redis> GET mykey
"Hello"
```

#### _Tedis_

- 接口：

```ts
setnx(key: string, value: string): Promise<number>;
```

- 示例：

```ts
await String.setnx("mykey", "hello");
// 1
await String.setnx("mykey", "world");
// 0
```

## setrange

这个命令的作用是覆盖 key 对应的 string 的一部分，从指定的 offset 处开始，覆盖 value 的长度。如果 offset 比当前 key 对应 string 还要长，那这个 string 后面就补 0 以达到 offset。不存在的 keys 被认为是空字符串，所以这个命令可以确保 key 有一个足够大的字符串，能在 offset 处设置 value。

#### _Redis_

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：执行操作后 value 的长度
- 指令案例：

```bash
redis> SET key1 "Hello World"
"OK"
redis> SETRANGE key1 6 "Redis"
(integer) 11
redis> GET key1
"Hello Redis"
redis> SETRANGE key2 6 "Redis"
(integer) 11
redis> GET key2
"\u0000\u0000\u0000\u0000\u0000\u0000Redis"
```

#### _Tedis_

- 接口：

```ts
setrange(key: string, offset: number, value: string): Promise<number>;
```

- 示例：

```ts
await String.setrange("key1", 6, "Redis");
// 11
await String.setrange("key2", 6, "Redis");
// 11
```

## strlen

返回 key 的 string 类型 value 的长度。如果 key 对应的非 string 类型，就返回错误。

#### _Redis_

- 可用版本：`>= 2.2.0`
- 算法复杂度：`O(1)`
- 返回值：key 对应的字符串 value 的长度，或者 0（key 不存在）
- 指令案例：

```bash
redis> SET mykey "Hello world"
"OK"
redis> STRLEN mykey
(integer) 11
redis> STRLEN nonexisting
(integer) 0
```

#### _Tedis_

- 接口：

```ts
strlen(key: string): Promise<number>;
```

- 示例：

```ts
await String.strlen("mykey");
// 11
await String.strlen("nonexisting");
// 0
```
