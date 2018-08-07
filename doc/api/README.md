---
prev: false
next: ./key
---

# 接口总揽

## keys

- del(key: string, ...keys: string[])
- dump(key: string)
- exists(key: string, ...keys: string[])
- expire(key: string, seconds: number)
- expireat(key: string, timestamp: string)
- keys(pattern: string)
- // MIGRATE
- move(key: string, db: number)
- // object
- persist(key: string)
- pexpire(key: string, milliseconds: number)
- pexpireat(key: string, millisecondsTimestamp: string)
- pttl(key: string)
- randomkey()
- rename(key: string, newKey: string)
- renamenx(key: string, newKey: string)
- // RESTORE
- // scan
- // sort
- // touch
- ttl(key: string)
- type(key: string):
- // unlink
- // wait

## string

- append(key: string, value: string)
- // BITCOUNT
- // BITFIELD
- // BITOP
- // BITPOS
- decr(key: string)
- decrby(key: string, decrement: number)
- get(key: string)
- getbit(key: string, offset: number)
- getrange(key: string, [start, end]?: [number, number])
- getset(key: string, value: string)
- incr(key: string)
- incrby(key: string, increment: number)
- incrbyfloat(key: string, increment: string)
- mget(key: string, ...keys: string[])
- mset(objKv: { [propName: string]: string })
- msetnx(objKv: { [propName: string]: string })
- psetex(key: string, milliseconds: number, value: string)
- set(key: string, value: string)
- setbit(key: string, offset: number, value: 0 | 1)
- setex(key: string, seconds: number, value: string)
- setnx(key: string, value: string)
- setrange(key: string, offset: number, value: string)
- strlen(key: string)

## hash

## list

## set

## zset
