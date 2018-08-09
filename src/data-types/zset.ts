import { RedisBase } from "../common/base";

enum MethodZset {
  // bzpopmax
  // bzpopmin
  zadd = "ZADD",
  zcard = "ZCARD",
  zcount = "ZCOUNT",
  zincrby = "ZINCRBY",
  zinterstore = "ZINTERSTORE",
  zlexcount = "ZLEXCOUNT",
  // zpopmax
  // zpopmin
  zrange = "ZRANGE",
  zrangebylex = "ZRANGEBYLEX",
  zrangebyscore = "ZRANGEBYSCORE",
  zrank = "ZRANK",
  zrem = "ZREM",
  zremrangebylex = "ZREMRANGEBYLEX",
  zremrangebyrank = "ZREMRANGEBYRANK",
  zremrangebyscore = "ZREMRANGEBYSCORE",
  zrevrange = "ZREVRANGE",
  // zrevrangebylex
  zrevrangebyscore = "ZREVRANGEBYSCORE",
  zrevrank = "ZREVRANK",
  // zscan
  zscore = "ZSCORE",
  zunionstore = "ZUNIONSTORE",
}

export interface InterfaceZset {
  // bzpopmax
  // bzpopmin
  zadd(key: string, objMS: { [propName: string]: number }): Promise<number>;
  zcard(key: string): Promise<number>;
  zcount(key: string, min: string, max: string): Promise<number>;
  zincrby(key: string, increment: number, member: string): Promise<string>;
  zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate?: "SUM" | "MIN" | "MAX"
  ): Promise<number>;
  zlexcount(key: string, min: string, max: string): Promise<number>;
  // zpopmax
  // zpopmin
  zrange(
    key: string,
    start: number,
    stop: number,
    withscores?: boolean
  ): Promise<string[]>;
  zrangebylex(
    key: string,
    min: string,
    max: string,
    limit?: boolean,
    offset?: number,
    count?: number
  ): Promise<string[]>;
  zrangebyscore(
    key: string,
    min: string,
    max: string,
    withscores?: boolean,
    limit?: boolean,
    offset?: number,
    count?: number
  ): Promise<string[]>;
  zrank(key: string, member: string): Promise<number | null>;
  zrem(key: string, member: string, ...members: string[]): Promise<number>;
  zremrangebylex(key: string, min: string, max: string): Promise<number>;
  zremrangebyrank(key: string, start: number, stop: number): Promise<number>;
  zremrangebyscore(key: string, min: string, max: string): Promise<number>;
  zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: boolean
  ): Promise<string[] | { [propName: string]: number }>;
  // zrevrangebylex
  zrevrangebyscore(
    key: string,
    min: string,
    max: string
  ): Promise<string[] | { [propName: string]: number }>;
  zrevrank(key: string, member: string): Promise<number | null>;
  // zscan
  zscore(key: string, member: string): Promise<string>;
  zunionstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate?: "SUM" | "MIN" | "MAX"
  ): Promise<number>;
}

export class RedisZset extends RedisBase implements InterfaceZset {
  public zadd(key: string, objMS: { [propName: string]: number }) {
    const array = new Array();
    Reflect.ownKeys(objMS).forEach((member) => {
      array.push(objMS[member as string], member);
    });

    return this.command(MethodZset.zadd, key, ...array);
  }
  public zcard(key: string) {
    return this.command(MethodZset.zcard, key);
  }
  public zcount(key: string, min: string, max: string) {
    return this.command(MethodZset.zcount, key, min, max);
  }
  public zincrby(key: string, increment: number, member: string) {
    return this.command(MethodZset.zincrby, key, increment, member);
  }
  public zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX" = "SUM"
  ) {
    const keys = new Array();
    const weights = new Array();
    Reflect.ownKeys(objectKW).forEach((key) => {
      keys.push(key);
      weights.push(objectKW[key as string]);
    });
    return this.command(
      MethodZset.zinterstore,
      destination,
      keys.length,
      ...keys,
      "WEIGHTS",
      ...weights,
      "AGGREGATE",
      aggregate
    );
  }
  public zlexcount(key: string, min: string, max: string) {
    return this.command(MethodZset.zlexcount, key, min, max);
  }
  public zrange(
    key: string,
    start: number,
    stop: number,
    withscores: boolean = false
  ) {
    if (withscores) {
      return this.command(MethodZset.zrange, key, start, stop, "WITHSCORES");
    }
    return this.command(MethodZset.zrange, key, start, stop);
  }
  public zrangebylex(
    key: string,
    min: string,
    max: string,
    limit: boolean = false,
    offset?: number,
    count?: number
  ) {
    if (limit && "number" === typeof offset && "number" === typeof count) {
      return this.command(
        MethodZset.zrangebylex,
        key,
        min,
        max,
        "LIMIT",
        offset,
        count
      );
    }
    return this.command(MethodZset.zrangebylex, key, min, max);
  }
  public zrangebyscore(
    key: string,
    min: string,
    max: string,
    withscores?: boolean,
    limit?: boolean,
    offset?: number,
    count?: number
  ) {
    if (withscores) {
      if (limit && "number" === typeof offset && "number" === typeof count) {
        return this.command(
          MethodZset.zrangebyscore,
          key,
          min,
          max,
          "WITHSCORES",
          "LIMIT",
          offset,
          count
        );
      }
      return this.command(
        MethodZset.zrangebyscore,
        key,
        min,
        max,
        "WITHSCORES"
      );
    } else {
      if (limit && "number" === typeof offset && "number" === typeof count) {
        return this.command(
          MethodZset.zrangebyscore,
          key,
          min,
          max,
          "LIMIT",
          offset,
          count
        );
      }
      return this.command(MethodZset.zrangebyscore, key, min, max);
    }
  }
  public zrank(key: string, member: string) {
    return this.command(MethodZset.zrank, key, member);
  }
  public zrem(key: string, member: string, ...members: string[]) {
    return this.command(MethodZset.zrem, key, member, ...members);
  }
  public zremrangebylex(key: string, min: string, max: string) {
    return this.command(MethodZset.zremrangebylex, key, min, max);
  }
  public zremrangebyrank(key: string, start: number, stop: number) {
    return this.command(MethodZset.zremrangebyrank, key, start, stop);
  }
  public zremrangebyscore(key: string, min: string, max: string) {
    return this.command(MethodZset.zremrangebyscore, key, min, max);
  }
  public zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: boolean
  ) {
    if (withscores) {
      return this.command(MethodZset.zrevrange, key, start, stop, "WITHSCORES");
    }
    return this.command(MethodZset.zrevrange, key, start, stop);
  }
  public zrevrangebyscore(key: string, min: string, max: string) {
    return this.command(MethodZset.zrevrangebyscore, key, min, max);
  }
  public zrevrank(key: string, member: string) {
    return this.command(MethodZset.zrevrank, key, member);
  }
  public zscore(key: string, member: string) {
    return this.command(MethodZset.zscore, key, member);
  }
  public zunionstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX" = "SUM"
  ) {
    const keys = new Array();
    const weights = new Array();
    Reflect.ownKeys(objectKW).forEach((key) => {
      keys.push(key);
      weights.push(objectKW[key as string]);
    });
    return this.command(
      MethodZset.zunionstore,
      destination,
      keys.length,
      ...keys,
      "WEIGHTS",
      ...weights,
      "AGGREGATE",
      aggregate
    );
  }
}
