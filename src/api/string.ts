import { Base } from "../core/base";

enum MethodString {
  set = "SET",
  get = "GET",
  getrange = "GETRANGE",
  getset = "GETSET",
  getbit = "GETBIT",
  mget = "MGET",
  setbit = "SETBIT",
  setex = "SETEX",
  setnx = "SETNX",
  setrange = "SETRANGE",
  strlen = "STRLEN",
  mset = "MSET",
  msetnx = "MSETNX",
  psetex = "PSETEX",
  incr = "INCR",
  incrby = "INCRBY",
  incrbyfloat = "INCRBYFLOAT",
  decr = "DECR",
  decrby = "DECRBY",
  append = "APPEND",
}

export interface InterfaceString {
  append(key: string, value: string): Promise<number>;
  // BITCOUNT
  // BITFIELD
  // BITOP
  // BITPOS
  decr(key: string): Promise<number>;
  decrby(key: string, decrement: number): Promise<number>;
  get(key: string): Promise<string | number | null>;
  getbit(key: string, offset: number): Promise<0 | 1>;
  getrange(key: string, [start, end]?: [number, number]): Promise<string>;
  getset(key: string, value: string): Promise<string | null>;
  incr(key: string): Promise<number>;
  incrby(key: string, increment: number): Promise<number>;
  incrbyfloat(key: string, increment: number): Promise<string>;
  mget(key: string, ...keys: string[]): Promise<Array<string | number | null>>;
  mset(objKv: { [propName: string]: string }): Promise<string>;
  msetnx(objKv: { [propName: string]: string }): Promise<number>;
  psetex(key: string, milliseconds: number, value: string): Promise<any>;
  set(key: string, value: string): Promise<any>;
  setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
  setex(key: string, seconds: number, value: string): Promise<any>;
  setnx(key: string, value: string): Promise<0 | 1>;
  setrange(key: string, offset: number, value: string): Promise<number>;
  strlen(key: string): Promise<number>;
}

export class RedisString extends Base implements InterfaceString {
  public async append(key: string, value: string) {
    return (await this.command(MethodString.append, key, value)) as number;
  }
  public async decr(key: string) {
    return (await this.command(MethodString.decr, key)) as number;
  }
  public async decrby(key: string, increment: number) {
    return (await this.command(MethodString.decrby, key, increment)) as number;
  }
  public async get(key: string) {
    return (await this.command(MethodString.get, key)) as
      | string
      | number
      | null;
  }
  public async getbit(key: string, offset: number) {
    return (await this.command(MethodString.getbit, key, offset)) as 0 | 1;
  }
  public async getrange(key: string, [start, end]: [number, number] = [0, -1]) {
    return (await this.command(
      MethodString.getrange,
      key,
      start,
      end
    )) as string;
  }
  public async getset(key: string, value: string) {
    return (await this.command(MethodString.getset, key, value)) as
      | string
      | null;
  }
  public async incr(key: string) {
    return (await this.command(MethodString.incr, key)) as number;
  }
  public async incrby(key: string, increment: number) {
    return (await this.command(MethodString.incrby, key, increment)) as number;
  }
  public async incrbyfloat(key: string, increment: number) {
    return (await this.command(
      MethodString.incrbyfloat,
      key,
      increment
    )) as string;
  }
  public async mget(key: string, ...keys: string[]) {
    return (await this.command(MethodString.mget, key, ...keys)) as Array<
      string | number | null
    >;
  }
  public async mset(objKV: { [propName: string]: string }) {
    const arrayKV = new Array();
    (Reflect.ownKeys(objKV) as string[]).forEach((key) => {
      arrayKV.push(key, objKV[key]);
    });
    return (await this.command(MethodString.mset, ...arrayKV)) as string;
  }
  public async msetnx(objKv: { [propName: string]: string }) {
    const arrayKV = new Array();
    (Reflect.ownKeys(objKv) as string[]).forEach((key) => {
      arrayKV.push(key, objKv[key]);
    });
    return (await this.command(MethodString.msetnx, ...arrayKV)) as number;
  }
  public async psetex(key: string, milliseconds: number, value: string) {
    return (await this.command(
      MethodString.psetex,
      key,
      milliseconds,
      value
    )) as string;
  }
  public async set(key: string, value: string) {
    return (await this.command(MethodString.set, key, value)) as string;
  }
  public async setbit(key: string, offset: number, value: 0 | 1) {
    return (await this.command(MethodString.setbit, key, offset, value)) as
      | 0
      | 1;
  }
  public async setex(key: string, seconds: number, value: string) {
    return (await this.command(
      MethodString.setex,
      key,
      seconds,
      value
    )) as string;
  }
  public async setnx(key: string, ...keys: string[]) {
    return (await this.command(MethodString.setnx, key, ...keys)) as 0 | 1;
  }
  public async setrange(key: string, offset: number, value: string) {
    return (await this.command(
      MethodString.setrange,
      key,
      offset,
      value
    )) as number;
  }
  public async strlen(key: string) {
    return (await this.command(MethodString.strlen, key)) as number;
  }
}
