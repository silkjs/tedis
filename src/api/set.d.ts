import { Base } from "../core/base";
export interface InterfaceSet {
    sadd(key: string, member: string | number, ...members: Array<string | number>): Promise<number>;
    scard(key: string): Promise<number>;
    sdiff(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    sdiffstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    sinter(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    sinterstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    sismember(key: string, member: string | number): Promise<number>;
    smembers(key: string): Promise<string[]>;
    smove(source: string, destination: string, member: string | number): Promise<number>;
    spop(key: string, count: number): Promise<string[]>;
    spop(key: string): Promise<string | null>;
    spop(key: string, count?: number): any;
    srandmember(key: string, count: number): Promise<string[]>;
    srandmember(key: string): Promise<string | null>;
    srandmember(key: string, count?: number): any;
    srem(key: string, member: string | number, ...members: Array<string | number>): Promise<number>;
    sunion(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    sunionstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
}
export declare class RedisSet extends Base implements InterfaceSet {
    sadd(key: string, member: string | number, ...members: Array<string | number>): Promise<number>;
    scard(key: string): Promise<number>;
    sdiff(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    sdiffstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    sinter(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    sinterstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
    sismember(key: string, member: string | number): Promise<number>;
    smembers(key: string): Promise<string[]>;
    smove(source: string, destination: string, member: string): Promise<number>;
    spop(key: string, count: number): Promise<string[]>;
    spop(key: string): Promise<string | null>;
    srandmember(key: string, count: number): Promise<string[]>;
    srandmember(key: string): Promise<string | null>;
    srem(key: string, member: string | number, ...members: Array<string | number>): Promise<number>;
    sunion(key: string, anotherkey: string, ...keys: string[]): Promise<string[]>;
    sunionstore(destination: string, key: string, anotherkey: string, ...keys: string[]): Promise<number>;
}
