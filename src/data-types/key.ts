import { RedisBase } from "../common/base";

enum MethodKey {
  del = "DEL",
  dump = "DUMP",
  exists = "EXISTS",
  expire = "EXPIRE",
  expireat = "EXPIREAT",
  pexpire = "PEXPIRE",
  pexpireat = "PEXPIREAT",
  keys = "KEYS",
  move = "MOVE",
  persist = "PERSIST",
  pttl = "PTTL",
  ttl = "TTL",
  randomkey = "RANDOMKEY",
  rename = "RENAME",
  renamenx = "RENAMENX",
  type = "TYPE",
}

export interface InterfaceKey {
  del(key: string, ...keys: string[]): Promise<number>;
  dump(key: string): Promise<null | string>;
  exists(key: string, ...keys: string[]): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  expireat(key: string, timestamp: string): Promise<number>;
  keys(pattern: string): Promise<string[]>;
  // MIGRATE
  move(key: string, db: number): Promise<number>;
  // object
  persist(key: string): Promise<number>;
  pexpire(key: string, milliseconds: number): Promise<number>;
  pexpireat(key: string, millisecondsTimestamp: string): Promise<number>;
  pttl(key: string): Promise<number>;
  randomkey(): Promise<null | string>;
  rename(key: string, newKey: string): Promise<any>;
  renamenx(key: string, newKey: string): Promise<0 | 1>;
  // RESTORE
  // scan
  // sort
  // touch
  ttl(key: string): Promise<number>;
  type(key: string): Promise<string>;
  // unlink
  // wait
}

export class RedisKey extends RedisBase implements InterfaceKey {
  public del(key: string, ...keys: string[]) {
    return this.command(MethodKey.del, key, ...keys);
  }
  public dump(key: string) {
    return this.command(MethodKey.dump, key);
  }
  public exists(key: string, ...keys: string[]) {
    return this.command(MethodKey.exists, key, ...keys);
  }
  public expire(key: string, seconds: number) {
    return this.command(MethodKey.expire, key, seconds);
  }
  public expireat(key: string, timestamp: string) {
    return this.command(MethodKey.expireat, key, timestamp);
  }
  public pexpire(key: string, milliseconds: number) {
    return this.command(MethodKey.pexpire, key, milliseconds);
  }
  public pexpireat(key: string, millisecondsTimestamp: string) {
    return this.command(MethodKey.pexpireat, key, millisecondsTimestamp);
  }
  public keys(pattern: string) {
    return this.command(MethodKey.keys, pattern);
  }
  public move(key: string, db: number) {
    return this.command(MethodKey.move, key, db);
  }
  public persist(key: string) {
    return this.command(MethodKey.persist, key);
  }
  public pttl(key: string) {
    return this.command(MethodKey.pttl, key);
  }
  public ttl(key: string) {
    return this.command(MethodKey.ttl, key);
  }
  public randomkey() {
    return this.command(MethodKey.randomkey);
  }
  public rename(key: string, newKey: string) {
    return this.command(MethodKey.rename, key, newKey);
  }
  public renamenx(key: string, newKey: string) {
    return this.command(MethodKey.renamenx, key, newKey);
  }
  public type(key: string) {
    return this.command(MethodKey.type, key);
  }
}
