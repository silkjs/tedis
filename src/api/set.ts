import { Base } from "../core/base";
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
  sadd(
    key: string,
    member: string | number,
    ...members: Array<string | number>
  ): Promise<number>;
  scard(key: string): Promise<number>;
  sdiff(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
  sdiffstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number>;
  sinter(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
  sinterstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number>;
  sismember(key: string, member: string | number): Promise<number>;
  smembers(key: string): Promise<string[]>;
  smove(
    source: string,
    destination: string,
    member: string | number
  ): Promise<number>;
  spop(key: string, count: number): Promise<string[]>;
  spop(key: string): Promise<string | null>;
  spop(key: string, count?: number): any;
  srandmember(key: string, count: number): Promise<string[]>;
  srandmember(key: string): Promise<string | null>;
  srandmember(key: string, count?: number): any;
  srem(
    key: string,
    member: string | number,
    ...members: Array<string | number>
  ): Promise<number>;
  // sscan(): Promise<any>;
  sunion(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
  sunionstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number>;
}

export class RedisSet extends Base implements InterfaceSet {
  public sadd(
    key: string,
    member: string | number,
    ...members: Array<string | number>
  ): Promise<number> {
    return this.command(MethodSet.sadd, key, member, ...members);
  }
  public scard(key: string): Promise<number> {
    return this.command(MethodSet.scard, key);
  }
  public sdiff(
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<string[]> {
    return this.command(MethodSet.sdiff, key, anotherkey, ...keys);
  }
  public sdiffstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number> {
    return this.command(
      MethodSet.sdiffstore,
      destination,
      key,
      anotherkey,
      ...keys
    );
  }
  public sinter(
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<string[]> {
    return this.command(MethodSet.sinter, key, anotherkey, ...keys);
  }
  public sinterstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number> {
    return this.command(
      MethodSet.sinterstore,
      destination,
      key,
      anotherkey,
      ...keys
    );
  }
  public sismember(key: string, member: string | number): Promise<number> {
    return this.command(MethodSet.sismember, key, member);
  }
  public smembers(key: string): Promise<string[]> {
    return this.command(MethodSet.smembers, key);
  }
  public smove(
    source: string,
    destination: string,
    member: string
  ): Promise<number> {
    return this.command(MethodSet.smove, source, destination, member);
  }
  public spop(key: string, count: number): Promise<string[]>;
  public spop(key: string): Promise<string | null>;
  public spop(key: string, count?: number) {
    if (typeof count === "number") {
      return this.command(MethodSet.spop, key, count);
    } else {
      return this.command(MethodSet.spop, key);
    }
  }
  public srandmember(key: string, count: number): Promise<string[]>;
  public srandmember(key: string): Promise<string | null>;
  public srandmember(key: string, count?: number) {
    if (typeof count === "number") {
      return this.command(MethodSet.srandmember, key, count);
    } else {
      return this.command(MethodSet.srandmember, key);
    }
  }
  public srem(
    key: string,
    member: string | number,
    ...members: Array<string | number>
  ): Promise<number> {
    return this.command(MethodSet.srem, key, member, ...members);
  }
  public sunion(
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<string[]> {
    return this.command(MethodSet.sunion, key, anotherkey, ...keys);
  }
  public sunionstore(
    destination: string,
    key: string,
    anotherkey: string,
    ...keys: string[]
  ): Promise<number> {
    return this.command(MethodSet.sunionstore, destination, key, anotherkey, ...keys);
  }
}
