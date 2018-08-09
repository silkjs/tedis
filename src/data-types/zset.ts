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
  zadd(key: string, arraySM: Array<[number, string]>): Promise<any>;
  zcard(key: string): Promise<any>;
  zcount(key: string, min: number, max: number): Promise<any>;
  zincrby(key: string, increment: number, member: string): Promise<any>;
  zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX"
  ): Promise<any>;
  zlexcount(
    key: string,
    min: string | number,
    max: string | number
  ): Promise<any>;
  // zpopmax
  // zpopmin
  zrange(
    key: string,
    start: number,
    stop: number,
    withscores?: boolean
  ): Promise<any>;
  zrangebylex(
    key: string,
    min: string,
    max: string,
    limit?: boolean,
    offset?: number,
    count?: number
  ): Promise<any>;
  zrangebyscore(
    key: string,
    min: string,
    max: string,
    withscores?: boolean,
    limit?: boolean,
    offset?: number,
    count?: number
  ): Promise<any>;
  zrank(key: string, member: string): Promise<any>;
  zrem(key: string, members: string[]): Promise<any>;
  zremrangebylex(key: string, min: string, max: string): Promise<any>;
  zremrangebyrank(key: string, start: number, stop: number): Promise<any>;
  zremrangebyscore(key: string, min: string, max: string): Promise<any>;
  zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: boolean
  ): Promise<any>;
  // zrevrangebylex
  zrevrangebyscore(key: string, min: string, max: string): Promise<any>;
  zrevrank(key: string, member: string): Promise<any>;
  // zscan
  zscore(key: string, member: string): Promise<any>;
  zunionstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX"
  ): Promise<any>;
}

export class RedisZset extends RedisBase implements InterfaceZset {
  public zadd(key: string, arraySM: Array<[number, string]>) {
    const array = new Array();
    arraySM.forEach(([score, member]) => {
      array.push(score, member);
    });
    return this.command(MethodZset.zadd, key, ...array);
  }
  public zcard(key: string) {
    return this.command(MethodZset.zcard, key);
  }
  public zcount(key: string, min: string | number, max: string | number) {
    return this.command(MethodZset.zcount, key, min, max);
  }
  public zincrby(key: string, increment: number, member: string) {
    return this.command(MethodZset.zincrby, key, increment, member);
  }
  public zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX"
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
  public zrem(key: string, members: string[]) {
    return this.command(MethodZset.zrem, key, ...members);
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
    aggregate: "SUM" | "MIN" | "MAX"
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
