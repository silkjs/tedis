export interface InterfaceBase {
    id: string;
    command(...parameters: Array<string | number>): Promise<any>;
    close(): void;
    on(event: "connect" | "timeout", listener: () => void): void;
    on(event: "error", listener: (err: Error) => void): void;
    on(event: "close", listener: (had_error: boolean) => void): void;
    on(event: string, listener: (...args: any[]) => void): void;
}
export declare class Base implements InterfaceBase {
    id: string;
    private socket;
    private protocol;
    private callbacks;
    private handle_connect?;
    private handle_timeout?;
    private handle_error?;
    private handle_close?;
    constructor(options?: {
        host?: string;
        port?: number;
        password?: string;
        timeout?: number;
    });
    command(...parameters: Array<string | number>): Promise<any>;
    close(): void;
    on(event: "connect" | "timeout", listener: () => void): void;
    on(event: "close", listener: (had_error: boolean) => void): void;
    on(event: "error", listener: (err: Error) => void): void;
    private auth;
    private init;
}
