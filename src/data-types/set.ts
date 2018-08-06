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
  sunion = "SUNION",
  sunionstore = "SUNIONSTORE",
  sscan = "SSCAN",
}

export interface InterfaceSet {
  sadd(key: string, members: Array<string | number>): Promise<any>;
  scard(key: string): Promise<any>;
  sdiff(keys: string[]): Promise<any>;
  sdiffstore(destination: string, keys: string[]): Promise<any>;
  sinter(keys: string[]): Promise<any>;
  sinterstore(destination: string, keys: string[]): Promise<any>;
  sismember(key: string, member: string): Promise<any>;
  smembers(key: string): Promise<any>;
  smove(source: string, destination: string, member: string): Promise<any>;
  spop(key: string, count?: number): Promise<any>;
  srandmember(key: string, count?: number): Promise<any>;
  srem(key: string, members: string[]): Promise<any>;
  sunion(keys: string[]): Promise<any>;
  sunionstore(destination: string, keys: string[]): Promise<any>;
  // sscan(): Promise<any>;
}

export class RedisSet extends RedisBase implements InterfaceSet {
  public sadd(key: string, members: string[]) {
    return this.command(MethodSet.sadd, key, ...members);
  }
  public scard(key: string) {
    return this.command(MethodSet.scard, key);
  }
  public sdiff(keys: string[]) {
    return this.command(MethodSet.sdiff, ...keys);
  }
  public sdiffstore(destination: string, keys: string[]) {
    return this.command(MethodSet.sdiffstore, destination, ...keys);
  }
  public sinter(keys: string[]) {
    return this.command(MethodSet.sinter, ...keys);
  }
  public sinterstore(destination: string, keys: string[]) {
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
  public srem(key: string, members: string[]) {
    return this.command(MethodSet.srem, key, ...members);
  }
  public sunion(keys: string[]) {
    return this.command(MethodSet.sunion, ...keys);
  }
  public sunionstore(destination: string, keys: string[]) {
    return this.command(MethodSet.sunionstore, destination, ...keys);
  }
}
