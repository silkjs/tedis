import { Base } from "../core/base";
export interface InterfaceString {
    append(key: string, value: string): Promise<number>;
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
    mset(objKv: {
        [propName: string]: string;
    }): Promise<string>;
    msetnx(objKv: {
        [propName: string]: string;
    }): Promise<number>;
    psetex(key: string, milliseconds: number, value: string): Promise<any>;
    set(key: string, value: string): Promise<any>;
    setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
    setex(key: string, seconds: number, value: string): Promise<any>;
    setnx(key: string, value: string): Promise<0 | 1>;
    setrange(key: string, offset: number, value: string): Promise<number>;
    strlen(key: string): Promise<number>;
}
export declare class RedisString extends Base implements InterfaceString {
    append(key: string, value: string): Promise<number>;
    decr(key: string): Promise<number>;
    decrby(key: string, increment: number): Promise<number>;
    get(key: string): Promise<string | number | null>;
    getbit(key: string, offset: number): Promise<0 | 1>;
    getrange(key: string, [start, end]?: [number, number]): Promise<string>;
    getset(key: string, value: string): Promise<string | null>;
    incr(key: string): Promise<number>;
    incrby(key: string, increment: number): Promise<number>;
    incrbyfloat(key: string, increment: number): Promise<string>;
    mget(key: string, ...keys: string[]): Promise<(string | number | null)[]>;
    mset(objKV: {
        [propName: string]: string;
    }): Promise<string>;
    msetnx(objKv: {
        [propName: string]: string;
    }): Promise<number>;
    psetex(key: string, milliseconds: number, value: string): Promise<string>;
    set(key: string, value: string): Promise<string>;
    setbit(key: string, offset: number, value: 0 | 1): Promise<0 | 1>;
    setex(key: string, seconds: number, value: string): Promise<string>;
    setnx(key: string, ...keys: string[]): Promise<0 | 1>;
    setrange(key: string, offset: number, value: string): Promise<number>;
    strlen(key: string): Promise<number>;
}
