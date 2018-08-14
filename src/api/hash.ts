import { Base } from "../core/base";
import { Array2Object } from "../util/tools";

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
  hscan = "HSCAN",
  hset = "HSET",
  hsetnx = "HSETNX",
  hstrlen = "HSTRLEN",
  hvals = "HVALS",
}

export interface InterfaceHash {
  hdel(key: string, field: string, ...fields: string[]): Promise<number>;
  hexists(key: string, field: string): Promise<number>;
  hget(key: string, field: string): Promise<string | null>;
  hgetall(key: string): Promise<{ [propName: string]: string }>;
  hincrby(key: string, field: string, increment: number): Promise<number>;
  hincrbyfloat(key: string, field: string, increment: number): Promise<string>;
  hkeys(key: string): Promise<string[]>;
  hlen(key: string): Promise<number>;
  hmget(
    key: string,
    field: string,
    ...fields: string[]
  ): Promise<Array<string | null>>;
  hmset(
    key: string,
    hash: {
      [propName: string]: string | number;
    }
  ): Promise<any>;
  // hscan
  hset(key: string, field: string, value: string | number): Promise<0 | 1>;
  hsetnx(key: string, field: string, value: string): Promise<0 | 1>;
  hstrlen(key: string, field: string): Promise<number>;
  hvals(key: string): Promise<string[]>;
}

export class RedisHash extends Base implements InterfaceHash {
  public hdel(
    key: string,
    field: string,
    ...fields: string[]
  ): Promise<number> {
    return this.command(MethodHash.hdel, key, field, ...fields);
  }
  public hexists(key: string, field: string): Promise<number> {
    return this.command(MethodHash.hexists, key, field);
  }
  public hget(key: string, field: string): Promise<string | null> {
    return this.command(MethodHash.hget, key, field);
  }
  public async hgetall(key: string): Promise<{ [propName: string]: string }> {
    return Array2Object(await this.command(MethodHash.hgetall, key));
  }
  public hincrby(
    key: string,
    field: string,
    increment: number
  ): Promise<number> {
    return this.command(MethodHash.hincrby, key, field, increment);
  }
  public hincrbyfloat(
    key: string,
    field: string,
    increment: number
  ): Promise<string> {
    return this.command(MethodHash.hincrbyfloat, key, field, increment);
  }
  public hkeys(key: string): Promise<string[]> {
    return this.command(MethodHash.hkeys, key);
  }
  public hlen(key: string): Promise<number> {
    return this.command(MethodHash.hlen, key);
  }
  public hmget(
    key: string,
    field: string,
    ...fields: string[]
  ): Promise<Array<string | null>> {
    return this.command(MethodHash.hmget, key, field, ...fields);
  }
  public hmset(
    key: string,
    hash: {
      [propName: string]: string | number;
    }
  ): Promise<any> {
    const arrayFV = new Array();
    (Reflect.ownKeys(hash) as string[]).forEach((field) => {
      arrayFV.push(field, hash[field]);
    });
    return this.command(MethodHash.hmset, key, ...arrayFV);
  }
  public hset(key: string, field: string, value: string): Promise<0 | 1> {
    return this.command(MethodHash.hset, key, field, value);
  }
  public hsetnx(key: string, field: string, value: string): Promise<0 | 1> {
    return this.command(MethodHash.hsetnx, key, field, value);
  }
  public hstrlen(key: string, field: string): Promise<number> {
    return this.command(MethodHash.hstrlen, key, field);
  }
  public hvals(key: string): Promise<string[]> {
    return this.command(MethodHash.hvals, key);
  }
}
