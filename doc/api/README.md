---
prev: false
next: ./key
---

# 类型总揽

## keys

- del(key: string)
- dump(key: string)
- exists(key: string)
- expire(key: string, seconds: number)
- expireat(key: string, timestamp: string)
- pexpire(key: string, milliseconds: number)
- pexpireat(key: string, millisecondsTimestamp: string)
- keys(pattern: string)
- move(key: string, db: number)
- persist(key: string)
- pttl(key: string)
- ttl(key: string)
- randomkey()
- rename(key: string, newKey: string)
- renamenx(key: string, newKey: string)
- type(key: string)

## string

- set(key: string, value: string)
- get(key: string)
- getrange(key: string, [start, end]?: [number, number]
- getset(key: string, value: string)
- getbit(key: string, offset: number)
- mget(key: string, ...keys: string[])
- setbit(key: string, offset: number, value: 0 | 1)
- setex(key: string, seconds: number, value: string)
- setnx(key: string, value: string)
- setrange(key: string, offset: number, value: string)
- strlen(key: string)
- mset(jsonKV: { [propName: string]: string }
- msetnx(jsonKV: { [propName: string]: string })
- psetex(key: string, milliseconds: number, value: string)
- incr(key: string)
- incrby(key: string, increment: number)
- incrbyfloat(key: string, increment: number)
- decr(key: string)
- decrby(key: string, decrement: number)
- append(key: string, value: string)

## hash

- hdel(key: string, field: string, ...fields: string[])
- hexists(key: string, field: string)
- hget(key: string, field: string)
- hgetall(key: string)
- hincrby(key: string, field: string, increment: number)
- hincrbyfloat(key: string, field: string, increment: number)
- hkeys(key: string)
- hlen(key: string)
- hmget(key: string, field: string, ...fields: string[])
- hmset(key: string,hash: {[propName: string]: string | number})
- hset(key: string, field: string, value: string)
- hsetnx(key: string, field: string, value: string)
- hvals(key: string)

## list

- blpop(keys: string[], timeout?: number)
- brpop(keys: string[], timeout?: number)
- brpoplpush(source: string,destination: string,timeout: number)
- lindex(key: string, index: number)
- linsert(key: string,type: "BEFORE" | "AFTER",pivot: string,value: string)
- llen(key: string)
- lpop(key: string)
- lpush(key: string, values: Array<string | number>)
- lpushx(key: string, value: string)
- lrange(key: string, start: number, stop: number)
- lrem(key: string, count: number, value: string)
- lset(key: string, index: number, value: string)
- ltrim(key: string, start: number, stop: number)
- rpop(key: string)
- rpoplpush(source: string, destination: string)
- rpush(key: string, values: Array<string | number>)
- rpushx(key: string, value: string)

## set

- sadd(key: string, members: Array<string | number>)
- scard(key: string)
- sdiff(keys: string[])
- sdiffstore(destination: string, keys: string[])
- sinter(keys: string[])
- sinterstore(destination: string, keys: string[])
- sismember(key: string, member: string)
- smembers(key: string)
- smove(source: string, destination: string, member: string)
- spop(key: string, count?: number)
- srandmember(key: string, count?: number)
- srem(key: string, members: string[])
- sunion(keys: string[])
- sunionstore(destination: string, keys: string[])

## zset

- zadd(key: string, arraySM: Array<[number, string]>)
- zcard(key: string)
- zcount(key: string, min: number, max: number)
- zincrby(key: string, increment: number, member: string)
- zinterstore(destination: string,objectKW: { [PropName: string]: number },aggregate: "SUM" | "MIN" | "MAX",)
- zlexcount(key: string,min: string | number,max: string | number,)
- zrange(key: string,start: number,stop: number,withscores?: boolean,)
- zrangebylex(key: string,min: string,max: string,limit?: boolean,offset?: number,count?: number,)
- zrangebyscore(key: string,min: string,max: string,withscores?: boolean,limit?: boolean,offset?: number,count?: number,)
- zrank(key: string, member: string)
- zrem(key: string, members: string[])
- zremrangebylex(key: string, min: string, max: string)
- zremrangebyrank(key: string, start: number, stop: number)
- zremrangebyscore(key: string, min: string, max: string)
- zrevrange(key: string,start: number,stop: number,withscores?: boolean,)
- zrevrangebyscore(key: string, min: string, max: string)
- zrevrank(key: string, member: string)
- zscore(key: string, member: string)
- zunionstore(destination: string,objectKW: { [PropName: string]: number },aggregate: "SUM" | "MIN" | "MAX",)
