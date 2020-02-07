export class Tedis {
  ////////////////////////////////////////////////////////////////////////////////////////////  base
  public id: string;
  constructor(options?: {
    host?: string;
    port?: number;
    password?: string;
    timeout?: number;
    tls?: {
      key: Buffer;
      cert: Buffer;
    };
  });
  public command(...parameters: Array<string | number>): Promise<any>;
  public close(): void;
  public on(event: "connect" | "timeout", listener: () => void): void;
  public on(event: "close", listener: (had_error: boolean) => void): void;
  public on(event: "error", listener: (err: Error) => void): void;
  public on(event: string, listener: (...args: any[]) => void): void;

  ////////////////////////////////////////////////////////////////////////////////////////////  key
  public del(key: string, ...keys: string[]): Promise<number>;
  // dump(key: string): Promise<null | string>;
  public exists(key: string, ...keys: string[]): Promise<number>;
  public expire(key: string, seconds: number): Promise<number>;
  public expireat(key: string, timestamp: number): Promise<number>;
  public keys(pattern: string): Promise<string[]>;
  // MIGRATE
  public move(key: string, db: number): Promise<number>;
  // object
  public persist(key: string): Promise<number>;
  public pexpire(key: string, milliseconds: number): Promise<number>;
  public pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
  public pttl(key: string): Promise<number>;
  public randomkey(): Promise<null | string>;
  public rename(key: string, newKey: string): Promise<any>;
  public renamenx(key: string, newKey: string): Promise<0 | 1>;
  // RESTORE
  // scan
  // sort
  // touch
  public ttl(key: string): Promise<number>;
  public type(key: string): Promise<string>;
  // unlink
  // wait

  ////////////////////////////////////////////////////////////////////////////////////////////  string
  public append(key: string, value: string): Promise<number>;
  // BITCOUNT
  // BITFIELD
  // BITOP
  // BITPOS
  public decr(key: string): Promise<number>;
  public decrby(key: string, decrement: number): Promise<number>;
  public get(key: string): Promise<string | number | null>;
  public getbit(key: string, offset: number): Promise<0 | 1>;
  public getrange(
    key: string,
    [start, end]?: [number, number]
  ): Promise<string>;
  public getset(key: string, value: string): Promise<string | null>;
  public incr(key: string): Promise<number>;
  public incrby(key: string, increment: number): Promise<number>;
  public incrbyfloat(key: string, increment: number): Promise<string>;
  public mget(
    key: string,
    ...keys: string[]
  ): Promise<Array<string | number | null>>;
  public mset(objKv: { [propName: string]: string }): Promise<string>;
  public msetnx(objKv: { [propName: string]: string }): Promise<number>;
  public psetex(key: string, milliseconds: number, value: string): Promise<any>;
  public set(key: string, value: string): Promise<any>;
  public setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
  public setex(key: string, seconds: number, value: string): Promise<any>;
  public setnx(key: string, value: string): Promise<0 | 1>;
  public setrange(key: string, offset: number, value: string): Promise<number>;
  public strlen(key: string): Promise<number>;

  ////////////////////////////////////////////////////////////////////////////////////////////  hash
  public hdel(key: string, field: string, ...fields: string[]): Promise<number>;
  public hexists(key: string, field: string): Promise<number>;
  public hget(key: string, field: string): Promise<string | null>;
  public hgetall(key: string): Promise<{ [propName: string]: string }>;
  public hincrby(
    key: string,
    field: string,
    increment: number
  ): Promise<number>;
  public hincrbyfloat(
    key: string,
    field: string,
    increment: number
  ): Promise<string>;
  public hkeys(key: string): Promise<string[]>;
  public hlen(key: string): Promise<number>;
  public hmget(
    key: string,
    field: string,
    ...fields: string[]
  ): Promise<Array<string | null>>;
  public hmset(
    key: string,
    hash: {
      [propName: string]: string | number;
    }
  ): Promise<any>;
  // hscan
  public hset(
    key: string,
    field: string,
    value: string | number
  ): Promise<0 | 1>;
  public hsetnx(key: string, field: string, value: string): Promise<0 | 1>;
  public hstrlen(key: string, field: string): Promise<number>;
  public hvals(key: string): Promise<string[]>;

  ////////////////////////////////////////////////////////////////////////////////////////////  list
  public blpop(
    timeout: number,
    ...keys: string[]
  ): Promise<Array<string | null>>;
  public brpop(
    timeout: number,
    ...keys: string[]
  ): Promise<Array<string | null>>;
  public brpoplpush(
    source: string,
    destination: string,
    timeout: number
  ): Promise<any>;
  public lindex(key: string, index: number): Promise<string | null>;
  public linsert(
    key: string,
    type: "BEFORE" | "AFTER",
    pivot: string,
    value: string
  ): Promise<number>;
  public llen(key: string): Promise<number>;
  public lpop(key: string): Promise<string | null>;
  public lpush(
    key: string,
    value: string | number,
    ...values: Array<string | number>
  ): Promise<number>;
  public lpushx(key: string, value: string | number): Promise<number>;
  public lrange(key: string, start: number, stop: number): Promise<string[]>;
  public lrem(key: string, count: number, value: string): Promise<number>;
  public lset(key: string, index: number, value: string | number): Promise<any>;
  public ltrim(key: string, start: number, stop: number): Promise<any>;
  public rpop(key: string): Promise<string | null>;
  public rpoplpush(source: string, destination: string): Promise<string | null>;
  public rpush(
    key: string,
    value: string | number,
    ...values: Array<string | number>
  ): Promise<number>;
  public rpushx(key: string, value: string | number): Promise<number>;

  ////////////////////////////////////////////////////////////////////////////////////////////  set
  public sadd(
    key: string,
    member: string | number,
    ...members: Array<string | number>
  ): Promise<number>;
  public scard(key: string): Promise<number>;
  public sdiff(
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<string[]>;
  public sdiffstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number>;
  public sinter(
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<string[]>;
  public sinterstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number>;
  public sismember(key: string, member: string | number): Promise<number>;
  public smembers(key: string): Promise<string[]>;
  public smove(
    source: string,
    destination: string,
    member: string | number
  ): Promise<number>;
  public spop(key: string, count: number): Promise<string[]>;
  public spop(key: string): Promise<string | null>;
  public spop(key: string, count?: number): any;
  public srandmember(key: string, count: number): Promise<string[]>;
  public srandmember(key: string): Promise<string | null>;
  public srandmember(key: string, count?: number): any;
  public srem(
    key: string,
    member: string | number,
    ...members: Array<string | number>
  ): Promise<number>;
  // sscan(): Promise<any>;
  public sunion(
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<string[]>;
  public sunionstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number>;

  ////////////////////////////////////////////////////////////////////////////////////////////  zset
  // bzpopmax
  // bzpopmin
  public zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
    }
  ): Promise<number>;
  public zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    }
  ): Promise<string | null>;
  public zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    }
  ): any;
  public zcard(key: string): Promise<number>;
  public zcount(key: string, min: string, max: string): Promise<number>;
  public zincrby(
    key: string,
    increment: number,
    member: string
  ): Promise<string>;
  public zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate?: "SUM" | "MIN" | "MAX"
  ): Promise<number>;
  public zlexcount(key: string, min: string, max: string): Promise<number>;
  // zpopmax
  // zpopmin
  public zrange(key: string, start: number, stop: number): Promise<string[]>;
  public zrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<{ [propName: string]: string }>;
  public zrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES"
  ): any;
  public zrangebylex(
    key: string,
    min: string,
    max: string,
    options?: {
      offset: number;
      count: number;
    }
  ): Promise<string[]>;
  public zrangebyscore(
    key: string,
    min: string,
    max: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
    }
  ): Promise<string[]>;
  public zrangebyscore(
    key: string,
    min: string,
    max: string,
    options?: {
      withscores: "WITHSCORES";
      limit?: {
        offset: number;
        count: number;
      };
    }
  ): Promise<{ [propName: string]: string }>;
  public zrangebyscore(
    key: string,
    min: string,
    max: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores?: "WITHSCORES";
    }
  ): Promise<any>;
  public zrank(key: string, member: string): Promise<number | null>;
  public zrem(
    key: string,
    member: string,
    ...members: string[]
  ): Promise<number>;
  public zremrangebylex(key: string, min: string, max: string): Promise<number>;
  public zremrangebyrank(
    key: string,
    start: number,
    stop: number
  ): Promise<number>;
  public zremrangebyscore(
    key: string,
    min: string,
    max: string
  ): Promise<number>;
  public zrevrange(key: string, start: number, stop: number): Promise<string[]>;
  public zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<{ [propName: string]: string }>;
  public zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES"
  ): Promise<any>;
  // zrevrangebylex
  public zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
    }
  ): Promise<string[]>;
  public zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options?: {
      withscores: "WITHSCORES";
      limit?: {
        offset: number;
        count: number;
      };
    }
  ): Promise<{ [propName: string]: string }>;
  public zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options?: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores?: "WITHSCORES";
    }
  ): Promise<any>;
  public zrevrank(key: string, member: string): Promise<number | null>;
  // zscan
  public zscore(key: string, member: string): Promise<string | null>;
  public zunionstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate?: "SUM" | "MIN" | "MAX"
  ): Promise<number>;
}
export class TedisPool {
  constructor(options?: {
    host?: string;
    port?: number;
    password?: string;
    min_conn?: number;
    max_conn?: number;
    timeout?: number;
    tls?: {
      key: Buffer;
      cert: Buffer;
    };
  });
  public getTedis(): Promise<Tedis>;
  public putTedis(tedis: Tedis): void;
  public release(): void;
}
