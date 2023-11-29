import { Base } from "../core/base";
export interface InterfaceZset {
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
    }): Promise<number>;
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
        incr?: "INCR";
    }): Promise<string | null>;
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
        incr?: "INCR";
    }): Promise<any>;
    zcard(key: string): Promise<number>;
    zcount(key: string, min: string, max: string): Promise<number>;
    zincrby(key: string, increment: number, member: string): Promise<string>;
    zinterstore(destination: string, objectKW: {
        [PropName: string]: number;
    }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
    zlexcount(key: string, min: string, max: string): Promise<number>;
    zrange(key: string, start: number, stop: number): Promise<string[]>;
    zrange(key: string, start: number, stop: number, withscores: "WITHSCORES"): Promise<{
        [propName: string]: string;
    }>;
    zrange(key: string, start: number, stop: number, withscores?: "WITHSCORES"): any;
    zrangebylex(key: string, min: string, max: string, options?: {
        offset: number;
        count: number;
    }): Promise<string[]>;
    zrangebyscore(key: string, min: string, max: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    zrangebyscore(key: string, min: string, max: string, options?: {
        withscores: "WITHSCORES";
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<{
        [propName: string]: string;
    }>;
    zrangebyscore(key: string, min: string, max: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
        withscores?: "WITHSCORES";
    }): Promise<any>;
    zrank(key: string, member: string): Promise<number | null>;
    zrem(key: string, member: string, ...members: string[]): Promise<number>;
    zremrangebylex(key: string, min: string, max: string): Promise<number>;
    zremrangebyrank(key: string, start: number, stop: number): Promise<number>;
    zremrangebyscore(key: string, min: string, max: string): Promise<number>;
    zrevrange(key: string, start: number, stop: number): Promise<string[]>;
    zrevrange(key: string, start: number, stop: number, withscores: "WITHSCORES"): Promise<{
        [propName: string]: string;
    }>;
    zrevrange(key: string, start: number, stop: number, withscores?: "WITHSCORES"): Promise<any>;
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        withscores: "WITHSCORES";
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<{
        [propName: string]: string;
    }>;
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
        withscores?: "WITHSCORES";
    }): Promise<any>;
    zrevrank(key: string, member: string): Promise<number | null>;
    zscore(key: string, member: string): Promise<string | null>;
    zunionstore(destination: string, objectKW: {
        [PropName: string]: number;
    }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
}
export declare class RedisZset extends Base implements InterfaceZset {
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
    }): Promise<number>;
    zadd(key: string, objMS: {
        [propName: string]: number;
    }, options?: {
        nxxx?: "NX" | "XX";
        ch?: "CH";
        incr?: "INCR";
    }): Promise<string | null>;
    zcard(key: string): Promise<number>;
    zcount(key: string, min: string, max: string): Promise<number>;
    zincrby(key: string, increment: number, member: string): Promise<string>;
    zinterstore(destination: string, objectKW: {
        [PropName: string]: number;
    }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<number>;
    zlexcount(key: string, min: string, max: string): Promise<number>;
    zrange(key: string, start: number, stop: number): Promise<string[]>;
    zrange(key: string, start: number, stop: number, withscores: "WITHSCORES"): Promise<{
        [propName: string]: string;
    }>;
    zrangebylex(key: string, min: string, max: string, options?: {
        offset: number;
        count: number;
    }): Promise<string[]>;
    zrangebyscore(key: string, min: string, max: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    zrangebyscore(key: string, min: string, max: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
        withscores: "WITHSCORES";
    }): Promise<{
        [propName: string]: string;
    }>;
    zrank(key: string, member: string): Promise<number | null>;
    zrem(key: string, member: string, ...members: string[]): Promise<number>;
    zremrangebylex(key: string, min: string, max: string): Promise<number>;
    zremrangebyrank(key: string, start: number, stop: number): Promise<any>;
    zremrangebyscore(key: string, min: string, max: string): Promise<any>;
    zrevrange(key: string, start: number, stop: number): Promise<string[]>;
    zrevrange(key: string, start: number, stop: number, withscores: "WITHSCORES"): Promise<{
        [propName: string]: string;
    }>;
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
    }): Promise<string[]>;
    zrevrangebyscore(key: string, max: string, min: string, options?: {
        limit?: {
            offset: number;
            count: number;
        };
        withscores: "WITHSCORES";
    }): Promise<{
        [propName: string]: string;
    }>;
    zrevrank(key: string, member: string): Promise<number | null>;
    zscore(key: string, member: string): Promise<string | null>;
    zunionstore(destination: string, objectKW: {
        [PropName: string]: number;
    }, aggregate?: "SUM" | "MIN" | "MAX"): Promise<any>;
}
