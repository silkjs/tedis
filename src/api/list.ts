import { Base } from "../core/base";
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
  blpop(timeout: number, ...keys: string[]): Promise<Array<string | null>>;
  brpop(timeout: number, ...keys: string[]): Promise<Array<string | null>>;
  brpoplpush(
    source: string,
    destination: string,
    timeout: number
  ): Promise<any>;
  lindex(key: string, index: number): Promise<string | null>;
  linsert(
    key: string,
    type: "BEFORE" | "AFTER",
    pivot: string,
    value: string
  ): Promise<number>;
  llen(key: string): Promise<number>;
  lpop(key: string): Promise<string | null>;
  lpush(
    key: string,
    value: string | number,
    ...values: Array<string | number>
  ): Promise<number>;
  lpushx(key: string, value: string | number): Promise<number>;
  lrange(key: string, start: number, stop: number): Promise<string[]>;
  lrem(key: string, count: number, value: string): Promise<number>;
  lset(key: string, index: number, value: string | number): Promise<any>;
  ltrim(key: string, start: number, stop: number): Promise<any>;
  rpop(key: string): Promise<string | null>;
  rpoplpush(source: string, destination: string): Promise<string | null>;
  rpush(
    key: string,
    value: string | number,
    ...values: Array<string | number>
  ): Promise<number>;
  rpushx(key: string, value: string | number): Promise<number>;
}

export class RedisList extends Base implements InterfaceList {
  public blpop(
    timeout: number,
    ...keys: string[]
  ): Promise<Array<string | null>> {
    return this.command(MethodList.blpop, ...keys, timeout);
  }
  public brpop(
    timeout: number,
    ...keys: string[]
  ): Promise<Array<string | null>> {
    return this.command(MethodList.brpop, ...keys, timeout);
  }
  public brpoplpush(source: string, destination: string, timeout: number) {
    return this.command(MethodList.brpoplpush, source, destination, timeout);
  }
  public lindex(key: string, index: number) {
    return this.command(MethodList.lindex, key, index);
  }
  public linsert(
    key: string,
    type: "BEFORE" | "AFTER",
    pivot: string,
    value: string
  ): Promise<number> {
    return this.command(MethodList.linsert, key, type, pivot, value);
  }
  public llen(key: string): Promise<number> {
    return this.command(MethodList.llen, key);
  }
  public lpop(key: string): Promise<string | null> {
    return this.command(MethodList.lpop, key);
  }
  public lpush(
    key: string,
    value: string | number,
    ...values: Array<string | number>
  ): Promise<number> {
    return this.command(MethodList.lpush, key, value, ...values);
  }
  public lpushx(key: string, value: string | number): Promise<number> {
    return this.command(MethodList.lpushx, key, value);
  }
  public lrange(key: string, start: number, stop: number): Promise<string[]> {
    return this.command(MethodList.lrange, key, start, stop);
  }
  public lrem(key: string, count: number, value: string): Promise<number> {
    return this.command(MethodList.lrem, key, count, value);
  }
  public lset(key: string, index: number, value: string) {
    return this.command(MethodList.lset, key, index, value);
  }
  public ltrim(key: string, start: number, stop: number) {
    return this.command(MethodList.ltrim, key, start, stop);
  }
  public rpop(key: string): Promise<string | null> {
    return this.command(MethodList.rpop, key);
  }
  public rpoplpush(
    source: string,
    destination: string
  ): Promise<string | null> {
    return this.command(MethodList.rpoplpush, source, destination);
  }
  public rpush(
    key: string,
    value: string | number,
    ...values: Array<string | number>
  ): Promise<number> {
    return this.command(MethodList.rpush, key, value, ...values);
  }
  public rpushx(key: string, value: string | number): Promise<number> {
    return this.command(MethodList.rpushx, key, value);
  }
}
