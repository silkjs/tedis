import { Base } from "../core/base";
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
  // dump(key: string): Promise<null | string>;
  exists(key: string, ...keys: string[]): Promise<number>;
  expire(key: string, seconds: number): Promise<number>;
  expireat(key: string, timestamp: number): Promise<number>;
  keys(pattern: string): Promise<string[]>;
  // MIGRATE
  move(key: string, db: number): Promise<number>;
  // object
  persist(key: string): Promise<number>;
  pexpire(key: string, milliseconds: number): Promise<number>;
  pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
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

export class RedisKey extends Base implements InterfaceKey {
  public async del(key: string, ...keys: string[]) {
    return (await this.command(MethodKey.del, key, ...keys)) as number;
  }
  // public async dump(key: string) {
  //   return (await this.command(MethodKey.dump, key)) as string | null;
  // }
  public async exists(key: string, ...keys: string[]) {
    return (await this.command(MethodKey.exists, key, ...keys)) as number;
  }
  public async expire(key: string, seconds: number) {
    return (await this.command(MethodKey.expire, key, seconds)) as number;
  }
  public async expireat(key: string, timestamp: number) {
    return (await this.command(MethodKey.expireat, key, timestamp)) as number;
  }
  public async keys(pattern: string) {
    return (await this.command(MethodKey.keys, pattern)) as string[];
  }
  public async move(key: string, db: number) {
    return (await this.command(MethodKey.move, key, db)) as number;
  }
  public async persist(key: string) {
    return (await this.command(MethodKey.persist, key)) as number;
  }
  public async pexpire(key: string, milliseconds: number) {
    return (await this.command(MethodKey.pexpire, key, milliseconds)) as number;
  }
  public async pexpireat(key: string, millisecondsTimestamp: number) {
    return (await this.command(
      MethodKey.pexpireat,
      key,
      millisecondsTimestamp
    )) as number;
  }
  public async pttl(key: string) {
    return (await this.command(MethodKey.pttl, key)) as number;
  }
  public async randomkey() {
    return (await this.command(MethodKey.randomkey)) as string | null;
  }
  public async rename(key: string, newKey: string) {
    return (await this.command(MethodKey.rename, key, newKey)) as string;
  }
  public async renamenx(key: string, newKey: string) {
    return (await this.command(MethodKey.renamenx, key, newKey)) as 0 | 1;
  }
  public async ttl(key: string) {
    return (await this.command(MethodKey.ttl, key)) as number;
  }
  public async type(key: string) {
    return (await this.command(MethodKey.type, key)) as string;
  }
}
