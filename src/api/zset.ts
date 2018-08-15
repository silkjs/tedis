import { Base } from "../core/base";
import { Array2Object } from "../util/tools";

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
  zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
    }
  ): Promise<number>;
  zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    }
  ): Promise<string | null>;
  zadd(
    key: string,
    objMS: { [propName: string]: number },
    options?: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    }
  ): Promise<any>;
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
  zrange(key: string, start: number, stop: number): Promise<string[]>;
  zrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<{ [propName: string]: string }>;
  zrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES"
  ): any;
  zrangebylex(
    key: string,
    min: string,
    max: string,
    options?: {
      offset: number;
      count: number;
    }
  ): Promise<string[]>;
  zrangebyscore(
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
  zrangebyscore(
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
  zrangebyscore(
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
  zrank(key: string, member: string): Promise<number | null>;
  zrem(key: string, member: string, ...members: string[]): Promise<number>;
  zremrangebylex(key: string, min: string, max: string): Promise<number>;
  zremrangebyrank(key: string, start: number, stop: number): Promise<number>;
  zremrangebyscore(key: string, min: string, max: string): Promise<number>;
  zrevrange(key: string, start: number, stop: number): Promise<string[]>;
  zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<{ [propName: string]: string }>;
  zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES"
  ): Promise<any>;
  // zrevrangebylex
  zrevrangebyscore(
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
  zrevrangebyscore(
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
  zrevrangebyscore(
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
  zrevrank(key: string, member: string): Promise<number | null>;
  // zscan
  zscore(key: string, member: string): Promise<string | null>;
  zunionstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate?: "SUM" | "MIN" | "MAX"
  ): Promise<number>;
}

export class RedisZset extends Base implements InterfaceZset {
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
    options: {
      nxxx?: "NX" | "XX";
      ch?: "CH";
      incr?: "INCR";
    } = {}
  ) {
    const array = new Array();
    const { nxxx, ch, incr } = options;
    Reflect.ownKeys(objMS).forEach((member) => {
      array.push(objMS[member as string], member);
    });
    if ("undefined" !== typeof nxxx) {
      if ("undefined" !== typeof ch) {
        if ("undefined" !== typeof incr) {
          return this.command(MethodZset.zadd, key, nxxx, ch, incr, ...array);
        } else {
          return this.command(MethodZset.zadd, key, nxxx, ch, ...array);
        }
      } else if ("undefined" !== typeof incr) {
        return this.command(MethodZset.zadd, key, nxxx, incr, ...array);
      } else {
        return this.command(MethodZset.zadd, key, nxxx, ...array);
      }
    } else if ("undefined" !== typeof ch) {
      if ("undefined" !== typeof incr) {
        return this.command(MethodZset.zadd, key, ch, incr, ...array);
      } else {
        return this.command(MethodZset.zadd, key, ch, ...array);
      }
    } else if ("undefined" !== typeof incr) {
      return this.command(MethodZset.zadd, key, incr, ...array);
    } else {
      return this.command(MethodZset.zadd, key, ...array);
    }
  }
  public zcard(key: string): Promise<number> {
    return this.command(MethodZset.zcard, key);
  }
  public zcount(key: string, min: string, max: string): Promise<number> {
    return this.command(MethodZset.zcount, key, min, max);
  }
  public zincrby(
    key: string,
    increment: number,
    member: string
  ): Promise<string> {
    return this.command(MethodZset.zincrby, key, increment, member);
  }
  public zinterstore(
    destination: string,
    objectKW: { [PropName: string]: number },
    aggregate: "SUM" | "MIN" | "MAX" = "SUM"
  ): Promise<number> {
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
  public zlexcount(key: string, min: string, max: string): Promise<number> {
    return this.command(MethodZset.zlexcount, key, min, max);
  }
  public zrange(key: string, start: number, stop: number): Promise<string[]>;
  public zrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<{ [propName: string]: string }>;
  public async zrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES"
  ) {
    if ("WITHSCORES" === withscores) {
      return Array2Object(
        await this.command(MethodZset.zrange, key, start, stop, "WITHSCORES")
      );
    }
    return this.command(MethodZset.zrange, key, start, stop);
  }
  public zrangebylex(
    key: string,
    min: string,
    max: string,
    options?: {
      offset: number;
      count: number;
    }
  ): Promise<string[]> {
    if ("object" === typeof options) {
      return this.command(
        MethodZset.zrangebylex,
        key,
        min,
        max,
        "LIMIT",
        options.offset,
        options.count
      );
    }
    return this.command(MethodZset.zrangebylex, key, min, max);
  }
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
      limit?: {
        offset: number;
        count: number;
      };
      withscores: "WITHSCORES";
    }
  ): Promise<{ [propName: string]: string }>;
  public async zrangebyscore(
    key: string,
    min: string,
    max: string,
    options: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores?: "WITHSCORES";
    } = {}
  ) {
    if ("object" === typeof options.limit) {
      const { offset, count } = options.limit;
      if ("WITHSCORES" === options.withscores) {
        return Array2Object(
          await this.command(
            MethodZset.zrangebyscore,
            key,
            min,
            max,
            "WITHSCORES",
            "LIMIT",
            offset,
            count
          )
        );
      } else {
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
    } else if ("WITHSCORES" === options.withscores) {
      return Array2Object(
        await this.command(
          MethodZset.zrangebyscore,
          key,
          min,
          max,
          "WITHSCORES"
        )
      );
    } else {
      return this.command(MethodZset.zrangebyscore, key, min, max);
    }
  }
  public zrank(key: string, member: string): Promise<number | null> {
    return this.command(MethodZset.zrank, key, member);
  }
  public zrem(
    key: string,
    member: string,
    ...members: string[]
  ): Promise<number> {
    return this.command(MethodZset.zrem, key, member, ...members);
  }
  public zremrangebylex(
    key: string,
    min: string,
    max: string
  ): Promise<number> {
    return this.command(MethodZset.zremrangebylex, key, min, max);
  }
  public zremrangebyrank(key: string, start: number, stop: number) {
    return this.command(MethodZset.zremrangebyrank, key, start, stop);
  }
  public zremrangebyscore(key: string, min: string, max: string) {
    return this.command(MethodZset.zremrangebyscore, key, min, max);
  }
  public zrevrange(key: string, start: number, stop: number): Promise<string[]>;
  public zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores: "WITHSCORES"
  ): Promise<{ [propName: string]: string }>;
  public async zrevrange(
    key: string,
    start: number,
    stop: number,
    withscores?: "WITHSCORES"
  ) {
    if ("WITHSCORES" === withscores) {
      return Array2Object(
        await this.command(MethodZset.zrevrange, key, start, stop, "WITHSCORES")
      );
    } else {
      return this.command(MethodZset.zrevrange, key, start, stop);
    }
  }
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
      limit?: {
        offset: number;
        count: number;
      };
      withscores: "WITHSCORES";
    }
  ): Promise<{ [propName: string]: string }>;
  public async zrevrangebyscore(
    key: string,
    max: string,
    min: string,
    options: {
      limit?: {
        offset: number;
        count: number;
      };
      withscores?: "WITHSCORES";
    } = {}
  ) {
    if ("object" === typeof options.limit) {
      const { offset, count } = options.limit;
      if ("WITHSCORES" === options.withscores) {
        return Array2Object(
          await this.command(
            MethodZset.zrevrangebyscore,
            key,
            max,
            min,
            "WITHSCORES",
            "LIMIT",
            offset,
            count
          )
        );
      } else {
        return this.command(
          MethodZset.zrevrangebyscore,
          key,
          max,
          min,
          "LIMIT",
          offset,
          count
        );
      }
    } else if ("WITHSCORES" === options.withscores) {
      return Array2Object(
        await this.command(
          MethodZset.zrevrangebyscore,
          key,
          max,
          min,
          "WITHSCORES"
        )
      );
    } else {
      return this.command(MethodZset.zrevrangebyscore, key, max, min);
    }
  }
  public zrevrank(key: string, member: string): Promise<number | null> {
    return this.command(MethodZset.zrevrank, key, member);
  }
  public zscore(key: string, member: string): Promise<string | null> {
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
