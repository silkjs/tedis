import { RedisBase } from "../common/base";

enum MethodHash {
  hdel = "HDEL",
  hexists = "HEXISTS",
  hget = "HGET",
  hgetall = "HGETALL",
  hincrby = "HINCRBY",
  hincrbyfloat = "HINCRBYFLOAT",
  hkeys = "HKEYS",
  hlen = "HLEN",
  hmget = "HMGET",
  hmset = "HMSET",
  hset = "HSET",
  hsetnx = "HSETNX",
  hvals = "HVALS",
  hscan = "HSCAN",
}

export interface InterfaceHash {
  hdel(key: string, field: string, ...fields: string[]): Promise<any>;
  hexists(key: string, field: string): Promise<any>;
  hget(key: string, field: string): Promise<any>;
  hgetall(key: string): Promise<any>;
  hincrby(key: string, field: string, increment: number): Promise<any>;
  hincrbyfloat(key: string, field: string, increment: number): Promise<any>;
  hkeys(key: string): Promise<any>;
  hlen(key: string): Promise<any>;
  hmget(key: string, field: string, ...fields: string[]): Promise<any>;
  hmset(
    key: string,
    hash: {
      [propName: string]: string | number;
    },
  ): Promise<any>;
  hset(key: string, field: string, value: string): Promise<any>;
  hsetnx(key: string, field: string, value: string): Promise<any>;
  hvals(key: string): Promise<any>;
  // hscan(key: string, cursor: number, pattern: string, count: string): Promise<any>;
}

export class RedisHash extends RedisBase implements InterfaceHash {
  public hdel(key: string, field: string, ...fields: string[]) {
    return this.command(MethodHash.hdel, key, field, ...fields);
  }
  public hexists(key: string, field: string) {
    return this.command(MethodHash.hexists, key, field);
  }
  public hget(key: string, field: string) {
    return this.command(MethodHash.hget, key, field);
  }
  public hgetall(key: string) {
    return this.command(MethodHash.hgetall, key);
  }
  public hincrby(key: string, field: string, increment: number) {
    return this.command(MethodHash.hincrby, key, field, increment);
  }
  public hincrbyfloat(key: string, field: string, increment: number) {
    return this.command(MethodHash.hincrbyfloat, key, field, increment);
  }
  public hkeys(key: string) {
    return this.command(MethodHash.hkeys, key);
  }
  public hlen(key: string) {
    return this.command(MethodHash.hlen, key);
  }
  public hmget(key: string, field: string, ...fields: string[]) {
    return this.command(MethodHash.hmget, key, field, ...fields);
  }
  public hmset(
    key: string,
    hash: {
      [propName: string]: string;
    },
  ) {
    const arrayFV = new Array();
    (Reflect.ownKeys(hash) as string[]).forEach((field) => {
      arrayFV.push(field, hash[field]);
    });
    return this.command(MethodHash.hmset, key, ...arrayFV);
  }
  public hset(key: string, field: string, value: string) {
    return this.command(MethodHash.hset, key, field, value);
  }
  public hsetnx(key: string, field: string, value: string) {
    return this.command(MethodHash.hsetnx, key, field, value);
  }
  public hvals(key: string) {
    return this.command(MethodHash.hvals, key);
  }
}
