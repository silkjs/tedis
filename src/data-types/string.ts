import { RedisBase } from "../common/base";

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
  set(key: string, value: string): Promise<any>;
  get(key: string): Promise<any>;
  getrange(key: string, [start, end]?: [number, number]): Promise<any>;
  getset(key: string, value: string): Promise<any>;
  getbit(key: string, offset: number): Promise<any>;
  mget(key: string, ...keys: string[]): Promise<any>;
  setbit(key: string, offset: number, value: 0 | 1): Promise<any>;
  setex(key: string, seconds: number, value: string): Promise<any>;
  setnx(key: string, value: string): Promise<any>;
  setrange(key: string, offset: number, value: string): Promise<any>;
  strlen(key: string): Promise<any>;
  mset(jsonKV: { [propName: string]: string }): Promise<any>;
  msetnx(jsonKV: { [propName: string]: string }): Promise<any>;
  psetex(key: string, milliseconds: number, value: string): Promise<any>;
  incr(key: string): Promise<any>;
  incrby(key: string, increment: number): Promise<any>;
  incrbyfloat(key: string, increment: number): Promise<any>;
  decr(key: string): Promise<any>;
  decrby(key: string, decrement: number): Promise<any>;
  append(key: string, value: string): Promise<any>;
}

export class RedisString extends RedisBase implements InterfaceString {
  public set(key: string, value: string) {
    return this.command(MethodString.set, key, value);
  }
  public get(key: string) {
    return this.command(MethodString.get, key);
  }
  public getrange(key: string, [start, end]: [number, number] = [0, -1]) {
    return this.command(MethodString.getrange, key, start, end);
  }
  public getset(key: string, value: string) {
    return this.command(MethodString.getset, key, value);
  }
  public getbit(key: string, offset: number) {
    return this.command(MethodString.getbit, key, offset);
  }
  public mget(key: string, ...keys: string[]) {
    return this.command(MethodString.mget, key, ...keys);
  }
  public setbit(key: string, offset: number, value: 0 | 1) {
    return this.command(MethodString.setbit, key, offset, value);
  }
  public setex(key: string, seconds: number, value: string) {
    return this.command(MethodString.setex, key, seconds, value);
  }
  public setnx(key: string, ...keys: string[]) {
    return this.command(MethodString.setnx, key, ...keys);
  }
  public setrange(key: string, offset: number, value: string) {
    return this.command(MethodString.setrange, key, offset, value);
  }
  public strlen(key: string) {
    return this.command(MethodString.strlen, key);
  }
  public mset(jsonKV: { [propName: string]: string }) {
    const arrayKV = new Array();
    (Reflect.ownKeys(jsonKV) as string[]).forEach((key) => {
      arrayKV.push(key, jsonKV[key]);
    });
    return this.command(MethodString.mset, ...arrayKV);
  }
  public msetnx(jsonKV: { [propName: string]: string }) {
    const arrayKV = new Array();
    (Reflect.ownKeys(jsonKV) as string[]).forEach((key) => {
      arrayKV.push(key, jsonKV[key]);
    });
    return this.command(MethodString.msetnx, ...arrayKV);
  }
  public psetex(key: string, milliseconds: number, value: string) {
    return this.command(MethodString.psetex, key, milliseconds, value);
  }
  public incr(key: string) {
    return this.command(MethodString.incr, key);
  }
  public incrby(key: string, increment: number) {
    return this.command(MethodString.incrby, key, increment);
  }
  public incrbyfloat(key: string, increment: number) {
    return this.command(MethodString.incrbyfloat, key, increment);
  }
  public decr(key: string) {
    return this.command(MethodString.decr, key);
  }
  public decrby(key: string, increment: number) {
    return this.command(MethodString.decrby, key, increment);
  }
  public append(key: string, value: string) {
    return this.command(MethodString.append, key, value);
  }
}
