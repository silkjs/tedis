import { Base } from "../core/base";
export interface InterfaceKey {
    del(key: string, ...keys: string[]): Promise<number>;
    exists(key: string, ...keys: string[]): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    expireat(key: string, timestamp: number): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    move(key: string, db: number): Promise<number>;
    persist(key: string): Promise<number>;
    pexpire(key: string, milliseconds: number): Promise<number>;
    pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
    pttl(key: string): Promise<number>;
    randomkey(): Promise<null | string>;
    rename(key: string, newKey: string): Promise<any>;
    renamenx(key: string, newKey: string): Promise<0 | 1>;
    ttl(key: string): Promise<number>;
    type(key: string): Promise<string>;
}
export declare class RedisKey extends Base implements InterfaceKey {
    del(key: string, ...keys: string[]): Promise<number>;
    exists(key: string, ...keys: string[]): Promise<number>;
    expire(key: string, seconds: number): Promise<number>;
    expireat(key: string, timestamp: number): Promise<number>;
    keys(pattern: string): Promise<string[]>;
    move(key: string, db: number): Promise<number>;
    persist(key: string): Promise<number>;
    pexpire(key: string, milliseconds: number): Promise<number>;
    pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;
    pttl(key: string): Promise<number>;
    randomkey(): Promise<string | null>;
    rename(key: string, newKey: string): Promise<string>;
    renamenx(key: string, newKey: string): Promise<0 | 1>;
    ttl(key: string): Promise<number>;
    type(key: string): Promise<string>;
}
