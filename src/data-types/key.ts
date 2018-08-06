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
  del(key: string): Promise<any>;
  dump(key: string): Promise<any>;
  exists(key: string): Promise<any>;
  expire(key: string, seconds: number): Promise<any>;
  expireat(key: string, timestamp: string): Promise<any>;
  pexpire(key: string, milliseconds: number): Promise<any>;
  pexpireat(key: string, millisecondsTimestamp: string): Promise<any>;
  keys(pattern: string): Promise<any>;
  move(key: string, db: number): Promise<any>;
  persist(key: string): Promise<any>;
  pttl(key: string): Promise<any>;
  ttl(key: string): Promise<any>;
  randomkey(): Promise<any>;
  rename(key: string, newKey: string): Promise<any>;
  renamenx(key: string, newKey: string): Promise<any>;
  type(key: string): Promise<any>;
}

export class RedisKey extends RedisBase implements InterfaceKey {
  public del(key: string) {
    return this.command(MethodKey.del, key);
  }
  public dump(key: string) {
    return this.command(MethodKey.dump, key);
  }
  public exists(key: string) {
    return this.command(MethodKey.exists, key);
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
