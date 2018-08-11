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

export class RedisHash extends RedisBase implements InterfaceHash {
  public async hdel(key: string, field: string, ...fields: string[]) {
    return (await this.command(
      MethodHash.hdel,
      key,
      field,
      ...fields
    )) as number;
  }
  public async hexists(key: string, field: string) {
    return (await this.command(MethodHash.hexists, key, field)) as number;
  }
  public async hget(key: string, field: string) {
    return (await this.command(MethodHash.hget, key, field)) as string | null;
  }
  public async hgetall(key: string) {
    const res = (await this.command(MethodHash.hgetall, key)) as string[];
    const obj: { [propName: string]: string } = {};
    for (let i = 0, count = res.length; i < count; i++) {
      obj[res[i]] = res[++i];
    }
    return obj;
  }
  public async hincrby(key: string, field: string, increment: number) {
    return (await this.command(
      MethodHash.hincrby,
      key,
      field,
      increment
    )) as number;
  }
  public async hincrbyfloat(key: string, field: string, increment: number) {
    return (await this.command(
      MethodHash.hincrbyfloat,
      key,
      field,
      increment
    )) as string;
  }
  public async hkeys(key: string) {
    return (await this.command(MethodHash.hkeys, key)) as string[];
  }
  public async hlen(key: string) {
    return (await this.command(MethodHash.hlen, key)) as number;
  }
  public async hmget(key: string, field: string, ...fields: string[]) {
    return (await this.command(
      MethodHash.hmget,
      key,
      field,
      ...fields
    )) as Array<string | null>;
  }
  public async hmset(
    key: string,
    hash: {
      [propName: string]: string | number;
    }
  ) {
    const arrayFV = new Array();
    (Reflect.ownKeys(hash) as string[]).forEach((field) => {
      arrayFV.push(field, hash[field]);
    });
    return (await this.command(MethodHash.hmset, key, ...arrayFV)) as 0 | 1;
  }
  public async hset(key: string, field: string, value: string) {
    return (await this.command(MethodHash.hset, key, field, value)) as 0 | 1;
  }
  public hsetnx(key: string, field: string, value: string) {
    return this.command(MethodHash.hsetnx, key, field, value);
  }
  public hstrlen(key: string, field: string) {
    return this.command(MethodHash.hstrlen, key, field);
  }
  public hvals(key: string) {
    return this.command(MethodHash.hvals, key);
  }
}
