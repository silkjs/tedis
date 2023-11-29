import { Base } from "../core/base";
export interface InterfaceList {
    blpop(timeout: number, ...keys: string[]): Promise<Array<string | null>>;
    brpop(timeout: number, ...keys: string[]): Promise<Array<string | null>>;
    brpoplpush(source: string, destination: string, timeout: number): Promise<any>;
    lindex(key: string, index: number): Promise<string | null>;
    linsert(key: string, type: "BEFORE" | "AFTER", pivot: string, value: string): Promise<number>;
    llen(key: string): Promise<number>;
    lpop(key: string): Promise<string | null>;
    lpush(key: string, value: string | number, ...values: Array<string | number>): Promise<number>;
    lpushx(key: string, value: string | number): Promise<number>;
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    lrem(key: string, count: number, value: string): Promise<number>;
    lset(key: string, index: number, value: string | number): Promise<any>;
    ltrim(key: string, start: number, stop: number): Promise<any>;
    rpop(key: string): Promise<string | null>;
    rpoplpush(source: string, destination: string): Promise<string | null>;
    rpush(key: string, value: string | number, ...values: Array<string | number>): Promise<number>;
    rpushx(key: string, value: string | number): Promise<number>;
}
export declare class RedisList extends Base implements InterfaceList {
    blpop(timeout: number, ...keys: string[]): Promise<Array<string | null>>;
    brpop(timeout: number, ...keys: string[]): Promise<Array<string | null>>;
    brpoplpush(source: string, destination: string, timeout: number): Promise<any>;
    lindex(key: string, index: number): Promise<any>;
    linsert(key: string, type: "BEFORE" | "AFTER", pivot: string, value: string): Promise<number>;
    llen(key: string): Promise<number>;
    lpop(key: string): Promise<string | null>;
    lpush(key: string, value: string | number, ...values: Array<string | number>): Promise<number>;
    lpushx(key: string, value: string | number): Promise<number>;
    lrange(key: string, start: number, stop: number): Promise<string[]>;
    lrem(key: string, count: number, value: string): Promise<number>;
    lset(key: string, index: number, value: string): Promise<any>;
    ltrim(key: string, start: number, stop: number): Promise<any>;
    rpop(key: string): Promise<string | null>;
    rpoplpush(source: string, destination: string): Promise<string | null>;
    rpush(key: string, value: string | number, ...values: Array<string | number>): Promise<number>;
    rpushx(key: string, value: string | number): Promise<number>;
}
