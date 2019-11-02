---
prev: false
next: ./base
---

# Type interface

## base

- [command](/zh/api/base.md#command)
- [on](/zh/api/base.md#on)
- [close](/zh/api/base.md#close)

## pool

- [getTedis](/zh/api/pool.md#getTedis)
- [putTedis](/zh/api/pool.md#putTedis)
- [release](/zh/api/pool.md#release)

## key

- [del](/zh/api/key.md#del)
- dump
- [exists](/zh/api/key.md#exists)
- [expire](/zh/api/key.md#expire)
- [expireat](/zh/api/key.md#expireat)
- [keys](/zh/api/key.md#keys)
- migrate
- [move](/zh/api/key.md#move)
- object
- [persist](/zh/api/key.md#persist)
- [pexpire](/zh/api/key.md#pexpire)
- [pexpireat](/zh/api/key.md#pexpireat)
- [pttl](/zh/api/key.md#pttl)
- [randomkey](/zh/api/key.md#randomkey)
- [rename](/zh/api/key.md#rename)
- [renamenx](/zh/api/key.md#renamenx)
- restore
- scan
- sort
- touch
- [ttl](/zh/api/key.md#ttl)
- [type](/zh/api/key.md#type)
- unlink
- wait

## string

- [append](/zh/api/string.md#append)
- bitcount
- bitfield
- bitop
- bitpos
- [decr](/zh/api/string.md#decr)
- [decrby](/zh/api/string.md#decrby)
- [get](/zh/api/string.md#get)
- [getbit](/zh/api/string.md#getbit)
- [getrange](/zh/api/string.md#getrange)
- [getset](/zh/api/string.md#getset)
- [incr](/zh/api/string.md#incr)
- [incrby](/zh/api/string.md#incrby)
- [incrbyfloat](/zh/api/string.md#incrbyfloat)
- [mget](/zh/api/string.md#mget)
- [mset](/zh/api/string.md#mset)
- [msetnx](/zh/api/string.md#msetnx)
- [psetex](/zh/api/string.md#psetex)
- [set](/zh/api/string.md#set)
- [setbit](/zh/api/string.md#setbit)
- [setex](/zh/api/string.md#setex)
- [setnx](/zh/api/string.md#setnx)
- [setrange](/zh/api/string.md#setrange)
- [strlen](/zh/api/string.md#strlen)

## hash

- [hdel](/zh/api/hash.md#hdel)
- [hexists](/zh/api/hash.md#hexists)
- [hget](/zh/api/hash.md#hget)
- [hgetall](/zh/api/hash.md#hgetall)
- [hincrby](/zh/api/hash.md#hincrby)
- [hincrbyfloat](/zh/api/hash.md#hincrbyfloat)
- [hkeys](/zh/api/hash.md#hkeys)
- [hlen](/zh/api/hash.md#hlen)
- [hmget](/zh/api/hash.md#hmget)
- [hmset](/zh/api/hash.md#hmset)
- hscan
- [hset](/zh/api/hash.md#hset)
- [hsetnx](/zh/api/hash.md#hsetnx)
- [hstrlen](/zh/api/hash.md#hstrlen)
- [hvals](/zh/api/hash.md#hvals)

## list

- [blpop](/zh/api/list.md#blpop)
- [brpop](/zh/api/list.md#brpop)
- [brpoplpush](/zh/api/list.md#brpoplpush)
- [lindex](/zh/api/list.md#lindex)
- [linsert](/zh/api/list.md#linsert)
- [llen](/zh/api/list.md#llen)
- [lpop](/zh/api/list.md#lpop)
- [lpush](/zh/api/list.md#lpush)
- [lpushx](/zh/api/list.md#lpushx)
- [lrange](/zh/api/list.md#lrange)
- [lrem](/zh/api/list.md#lrem)
- [lset](/zh/api/list.md#lset)
- [ltrim](/zh/api/list.md#ltrim)
- [rpop](/zh/api/list.md#rpop)
- [rpoplpush](/zh/api/list.md#rpoplpush)
- [rpush](/zh/api/list.md#rpush)
- [rpushx](/zh/api/list.md#rpushx)

## set

- [sadd](/zh/api/set.md#sadd)
- [scard](/zh/api/set.md#scard)
- [sdiff](/zh/api/set.md#sdiff)
- [sdiffstore](/zh/api/set.md#sdiffstore)
- [sinter](/zh/api/set.md#sinter)
- [sinterstore](/zh/api/set.md#sinterstore)
- [sismember](/zh/api/set.md#sismember)
- [smembers](/zh/api/set.md#smembers)
- [smove](/zh/api/set.md#smove)
- [spop](/zh/api/set.md#spop)
- [srandmember](/zh/api/set.md#srandmember)
- [srem](/zh/api/set.md#srem)
- sscan
- [sunion](/zh/api/set.md#sunion)
- [sunionstore](/zh/api/set.md#sunionstore)

## zset

- bzpopmax
- bzpopmin
- [zadd](/zh/api/zset.md#zadd)
- [zcard](/zh/api/zset.md#zcard)
- [zcount](/zh/api/zset.md#zcount)
- [zincrby](/zh/api/zset.md#zincrby)
- [zinterstore](/zh/api/zset.md#zinterstore)
- [zlexcount](/zh/api/zset.md#zlexcount)
- zpopmax
- zpopmin
- [zrange](/zh/api/zset.md#zrange)
- [zrangebylex](/zh/api/zset.md#zrangebylex)
- [zrangebyscore](/zh/api/zset.md#zrangebyscore)
- [zrank](/zh/api/zset.md#zrank)
- [zrem](/zh/api/zset.md#zrem)
- [zremrangebylex](/zh/api/zset.md#zremrangebylex)
- [zremrangebyrank](/zh/api/zset.md#zremrangebyrank)
- [zremrangebyscore](/zh/api/zset.md#zremrangebyscore)
- [zrevrange](/zh/api/zset.md#zrevrange)
- zrevrangebylex
- [zrevrangebyscore](/zh/api/zset.md#zrevrangebyscore)
- [zrevrank](/zh/api/zset.md#zrevrank)
- zscan
- [zscore](/zh/api/zset.md#zscore)
- [zunionstore](/zh/api/zset.md#zunionstore)
