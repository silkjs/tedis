import { RedisBase } from "../common/base";

enum MethodSet {
  sadd = "SADD",
  scard = "SCARD",
  sdiff = "SDIFF",
  sdiffstore = "SDIFFSTORE",
  sinter = "SINTER",
  sinterstore = "SINTERSTORE",
  sismember = "SISMEMBER",
  smembers = "SMEMBERS",
  smove = "SMOVE",
  spop = "SPOP",
  srandmember = "SRANDMEMBER",
  srem = "SREM",
  sscan = "SSCAN",
  sunion = "SUNION",
  sunionstore = "SUNIONSTORE",
}

export interface InterfaceSet {
  sadd(key: string, ...members: Array<string | number>): Promise<number>;
  scard(key: string): Promise<number>;
  sdiff(key: string, ...keys: string[]): Promise<Array<string | number>>;
  sdiffstore(destination: string, key: string, ...keys: string[]): Promise<number>;
  sinter(key: string, ...keys: string[]): Promise<Array<string | number>>;
  sinterstore(destination: string, key: string, ...keys: string[]): Promise<number>;
  sismember(key: string, member: string): Promise<number>;
  smembers(key: string): Promise<Array<string|number>>;
  smove(source: string, destination: string, member: string): Promise<number>;
  spop(key: string, count?: number): Promise<string|number|null|Array<string|number>>;
  srandmember(key: string, count?: number): Promise<string|number|null|Array<string|number>>;
  srem(key: string, member: string, ...members: string[]): Promise<number>;
  // sscan(): Promise<any>;
  sunion(key: string, keys: string[]): Promise<Array<string|number>>;
  sunionstore(destination: string, key: string, keys: string[]): Promise<number>;
}

export class RedisSet extends RedisBase implements InterfaceSet {
  public sadd(key: string, ...members: string[]) {
    return this.command(MethodSet.sadd, key,  ...members);
  }
  public scard(key: string) {
    return this.command(MethodSet.scard, key);
  }
  public sdiff(key: string, ...keys: string[]) {
    return this.command(MethodSet.sdiff, key, ...keys);
  }
  public sdiffstore(destination: string, key: string, ...keys: string[]) {
    return this.command(MethodSet.sdiffstore, destination, key, ...keys);
  }
  public sinter(key: string, ...keys: string[]) {
    return this.command(MethodSet.sinter, key, ...keys);
  }
  public sinterstore(destination: string, key: string, ...keys: string[]) {
    return this.command(MethodSet.sinterstore, destination, ...keys);
  }
  public sismember(key: string, member: string) {
    return this.command(MethodSet.sismember, key, member);
  }
  public smembers(key: string) {
    return this.command(MethodSet.smembers, key);
  }
  public smove(source: string, destination: string, member: string) {
    return this.command(MethodSet.smove, source, destination, member);
  }
  public spop(key: string, count?: number) {
    if (typeof count === "number") {
      return this.command(MethodSet.spop, key, count);
    } else {
      return this.command(MethodSet.spop, key);
    }
  }
  public srandmember(key: string, count?: number) {
    if (typeof count === "number") {
      return this.command(MethodSet.srandmember, key, count);
    } else {
      return this.command(MethodSet.srandmember, key);
    }
  }
  public srem(key: string, member: string, ...members: string[]) {
    return this.command(MethodSet.srem, key, member, ...members);
  }
  public sunion(key: string, keys: string[]) {
    return this.command(MethodSet.sunion, key, ...keys);
  }
  public sunionstore(destination: string, key: string, keys: string[]) {
    return this.command(MethodSet.sunionstore, destination, key, ...keys);
  }
}
