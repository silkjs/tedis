import { RedisBase } from "../common/base";

enum MethodList {
  blpop = "BLPOP",
  brpop = "BRPOP",
  brpoplpush = "BRPOPLPUSH",
  lindex = "LINDEX",
  linsert = "LINSERT",
  llen = "LLEN",
  lpop = "LPOP",
  lpush = "LPUSH",
  lpushx = "LPUSHX",
  lrange = "LRANGE",
  lrem = "LREM",
  lset = "LSET",
  ltrim = "LTRIM",
  rpop = "RPOP",
  rpoplpush = "RPOPLPUSH",
  rpush = "RPUSH",
  rpushx = "RPUSHX",
}

export interface InterfaceList {
  blpop(keys: string[], timeout?: number): Promise<any>;
  brpop(keys: string[], timeout?: number): Promise<any>;
  brpoplpush(
    source: string,
    destination: string,
    timeout: number,
  ): Promise<any>;
  lindex(key: string, index: number): Promise<any>;
  linsert(
    key: string,
    type: "BEFORE" | "AFTER",
    pivot: string,
    value: string,
  ): Promise<any>;
  llen(key: string): Promise<any>;
  lpop(key: string): Promise<any>;
  lpush(key: string, values: Array<string | number>): Promise<any>;
  lpushx(key: string, value: string): Promise<any>;
  lrange(key: string, start: number, stop: number): Promise<any>;
  lrem(key: string, count: number, value: string): Promise<any>;
  lset(key: string, index: number, value: string): Promise<any>;
  ltrim(key: string, start: number, stop: number): Promise<any>;
  rpop(key: string): Promise<any>;
  rpoplpush(source: string, destination: string): Promise<any>;
  rpush(key: string, values: Array<string | number>): Promise<any>;
  rpushx(key: string, value: string): Promise<any>;
}

export class RedisList extends RedisBase implements InterfaceList {
  public blpop(keys: string[], timeout?: number) {
    if ("number" === typeof timeout) {
      return this.command(MethodList.blpop, ...keys, timeout);
    }
    return this.command(MethodList.blpop, ...keys);
  }
  public brpop(keys: string[], timeout?: number) {
    if ("number" === typeof timeout) {
      return this.command(MethodList.brpop, ...keys, timeout);
    }
    return this.command(MethodList.brpop, ...keys);
  }
  public brpoplpush(source: string, destination: string, timeout: number) {
    return this.command(
      MethodList.brpoplpush,
      source,
      destination,
      timeout,
    );
  }
  public lindex(key: string, index: number) {
    return this.command(MethodList.lindex, key, index);
  }
  public linsert(
    key: string,
    type: "BEFORE" | "AFTER",
    pivot: string,
    value: string,
  ) {
    return this.command(MethodList.linsert, key, type, pivot, value);
  }
  public llen(key: string) {
    return this.command(MethodList.llen, key);
  }
  public lpop(key: string) {
    return this.command(MethodList.lpop, key);
  }
  public lpush(key: string, values: string[]) {
    return this.command(MethodList.lpush, key, ...values);
  }
  public lpushx(key: string, value: string) {
    return this.command(MethodList.lpushx, key, value);
  }
  public lrange(key: string, start: number, stop: number) {
    return this.command(
      MethodList.lrange,
      key,
      start,
      stop,
    );
  }
  public lrem(key: string, count: number, value: string) {
    return this.command(MethodList.lrem, key, count, value);
  }
  public lset(key: string, index: number, value: string) {
    return this.command(MethodList.lset, key, index, value);
  }
  public ltrim(key: string, start: number, stop: number) {
    return this.command(
      MethodList.ltrim,
      key,
      start,
      stop,
    );
  }
  public rpop(key: string) {
    return this.command(MethodList.rpop, key);
  }
  public rpoplpush(source: string, destination: string) {
    return this.command(MethodList.rpoplpush, source, destination);
  }
  public rpush(key: string, values: string[]) {
    return this.command(MethodList.rpush, ...values);
  }
  public rpushx(key: string, value: string) {
    return this.command(MethodList.rpushx, key, value);
  }
}
