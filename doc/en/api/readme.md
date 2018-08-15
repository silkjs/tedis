---
prev: false
next: ./base
---

# Type interface

## base

- [command](/en/api/base.md#command)
- [on](/en/api/base.md#on)
- [close](/en/api/base.md#close)

## pool

- [getTedis](/en/api/pool.md#getTedis)
- [putTedis](/en/api/pool.md#putTedis)
- [release](/en/api/pool.md#release)

## key

- [del](/en/api/key.md#del)
- dump
- [exists](/en/api/key.md#exists)
- [expire](/en/api/key.md#expire)
- [expireat](/en/api/key.md#expireat)
- [keys](/en/api/key.md#keys)
- migrate
- [move](/en/api/key.md#move)
- object
- [persist](/en/api/key.md#persist)
- [pexpire](/en/api/key.md#pexpire)
- [pexpireat](/en/api/key.md#pexpireat)
- [pttl](/en/api/key.md#pttl)
- [randomkey](/en/api/key.md#randomkey)
- [rename](/en/api/key.md#rename)
- [renamenx](/en/api/key.md#renamenx)
- restore
- scan
- sort
- touch
- [ttl](/en/api/key.md#ttl)
- [type](/en/api/key.md#type)
- unlink
- wait

## string

- [append](/en/api/string.md#append)
- bitcount
- bitfield
- bitop
- bitpos
- [decr](/en/api/string.md#decr)
- [decrby](/en/api/string.md#decrby)
- [get](/en/api/string.md#get)
- [getbit](/en/api/string.md#getbit)
- [getrange](/en/api/string.md#getrange)
- [getset](/en/api/string.md#getset)
- [incr](/en/api/string.md#incr)
- [incrby](/en/api/string.md#incrby)
- [incrbyfloat](/en/api/string.md#incrbyfloat)
- [mget](/en/api/string.md#mget)
- [mset](/en/api/string.md#mset)
- [msetnx](/en/api/string.md#msetnx)
- [psetex](/en/api/string.md#psetex)
- [set](/en/api/string.md#set)
- [setbit](/en/api/string.md#setbit)
- [setex](/en/api/string.md#setex)
- [setnx](/en/api/string.md#setnx)
- [setrange](/en/api/string.md#setrange)
- [strlen](/en/api/string.md#strlen)

## hash

- [hdel](/en/api/hash.md#hdel)
- [hexists](/en/api/hash.md#hexists)
- [hget](/en/api/hash.md#hget)
- [hgetall](/en/api/hash.md#hgetall)
- [hincrby](/en/api/hash.md#hincrby)
- [hincrbyfloat](/en/api/hash.md#hincrbyfloat)
- [hkeys](/en/api/hash.md#hkeys)
- [hlen](/en/api/hash.md#hlen)
- [hmget](/en/api/hash.md#hmget)
- [hmset](/en/api/hash.md#hmset)
- hscan
- [hset](/en/api/hash.md#hset)
- [hsetnx](/en/api/hash.md#hsetnx)
- [hstrlen](/en/api/hash.md#hstrlen)
- [hvals](/en/api/hash.md#hvals)

## list

- [blpop](/en/api/list.md#blpop)
- [brpop](/en/api/list.md#brpop)
- [brpoplpush](/en/api/list.md#brpoplpush)
- [lindex](/en/api/list.md#lindex)
- [linsert](/en/api/list.md#linsert)
- [llen](/en/api/list.md#llen)
- [lpop](/en/api/list.md#lpop)
- [lpush](/en/api/list.md#lpush)
- [lpushx](/en/api/list.md#lpushx)
- [lrange](/en/api/list.md#lrange)
- [lrem](/en/api/list.md#lrem)
- [lset](/en/api/list.md#lset)
- [ltrim](/en/api/list.md#ltrim)
- [rpop](/en/api/list.md#rpop)
- [rpoplpush](/en/api/list.md#rpoplpush)
- [rpush](/en/api/list.md#rpush)
- [rpushx](/en/api/list.md#rpushx)

## set

- [sadd](/en/api/set.md#sadd)
- [scard](/en/api/set.md#scard)
- [sdiff](/en/api/set.md#sdiff)
- [sdiffstore](/en/api/set.md#sdiffstore)
- [sinter](/en/api/set.md#sinter)
- [sinterstore](/en/api/set.md#sinterstore)
- [sismember](/en/api/set.md#sismember)
- [smembers](/en/api/set.md#smembers)
- [smove](/en/api/set.md#smove)
- [spop](/en/api/set.md#spop)
- [srandmember](/en/api/set.md#srandmember)
- [srem](/en/api/set.md#srem)
- sscan
- [sunion](/en/api/set.md#sunion)
- [sunionstore](/en/api/set.md#sunionstore)

## zset

- bzpopmax
- bzpopmin
- [zadd](/en/api/zset.md#zadd)
- [zcard](/en/api/zset.md#zcard)
- [zcount](/en/api/zset.md#zcount)
- [zincrby](/en/api/zset.md#zincrby)
- [zinterstore](/en/api/zset.md#zinterstore)
- [zlexcount](/en/api/zset.md#zlexcount)
- zpopmax
- zpopmin
- [zrange](/en/api/zset.md#zrange)
- [zrangebylex](/en/api/zset.md#zrangebylex)
- [zrangebyscore](/en/api/zset.md#zrangebyscore)
- [zrank](/en/api/zset.md#zrank)
- [zrem](/en/api/zset.md#zrem)
- [zremrangebylex](/en/api/zset.md#zremrangebylex)
- [zremrangebyrank](/en/api/zset.md#zremrangebyrank)
- [zremrangebyscore](/en/api/zset.md#zremrangebyscore)
- [zrevrange](/en/api/zset.md#zrevrange)
- zrevrangebylex
- [zrevrangebyscore](/en/api/zset.md#zrevrangebyscore)
- [zrevrank](/en/api/zset.md#zrevrank)
- zscan
- [zscore](/en/api/zset.md#zscore)
- [zunionstore](/en/api/zset.md#zunionstore)
