import { Tedis } from "./tedis";
export interface InterfacePool {
    getTedis(): Promise<Tedis>;
    putTedis(conn: Tedis): void;
    release(): void;
}
export declare class TedisPool implements InterfacePool {
    private connection_pool;
    private cushion_list;
    private min_conn;
    private max_conn;
    private act_conn;
    private host;
    private port;
    private password?;
    private timeout?;
    constructor(options?: {
        host?: string;
        port?: number;
        password?: string;
        min_conn?: number;
        max_conn?: number;
        timeout?: number;
    });
    release(): void;
    getTedis(): Promise<Tedis>;
    putTedis(conn: Tedis): void;
    private newConnection;
    private closeConnection;
    private miniConnection;
}
