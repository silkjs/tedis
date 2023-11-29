import { Base } from "../core/base";
export interface InterfaceHash {
    hdel(key: string, field: string, ...fields: string[]): Promise<number>;
    hexists(key: string, field: string): Promise<number>;
    hget(key: string, field: string): Promise<string | null>;
    hgetall(key: string): Promise<{
        [propName: string]: string;
    }>;
    hincrby(key: string, field: string, increment: number): Promise<number>;
    hincrbyfloat(key: string, field: string, increment: number): Promise<string>;
    hkeys(key: string): Promise<string[]>;
    hlen(key: string): Promise<number>;
    hmget(key: string, field: string, ...fields: string[]): Promise<Array<string | null>>;
    hmset(key: string, hash: {
        [propName: string]: string | number;
    }): Promise<any>;
    hset(key: string, field: string, value: string | number): Promise<0 | 1>;
    hsetnx(key: string, field: string, value: string): Promise<0 | 1>;
    hstrlen(key: string, field: string): Promise<number>;
    hvals(key: string): Promise<string[]>;
}
export declare class RedisHash extends Base implements InterfaceHash {
    hdel(key: string, field: string, ...fields: string[]): Promise<number>;
    hexists(key: string, field: string): Promise<number>;
    hget(key: string, field: string): Promise<string | null>;
    hgetall(key: string): Promise<{
        [propName: string]: string;
    }>;
    hincrby(key: string, field: string, increment: number): Promise<number>;
    hincrbyfloat(key: string, field: string, increment: number): Promise<string>;
    hkeys(key: string): Promise<string[]>;
    hlen(key: string): Promise<number>;
    hmget(key: string, field: string, ...fields: string[]): Promise<Array<string | null>>;
    hmset(key: string, hash: {
        [propName: string]: string | number;
    }): Promise<any>;
    hset(key: string, field: string, value: string): Promise<0 | 1>;
    hsetnx(key: string, field: string, value: string): Promise<0 | 1>;
    hstrlen(key: string, field: string): Promise<number>;
    hvals(key: string): Promise<string[]>;
}
