/// <reference types="node" />
export declare class Protocol {
    data: {
        state: boolean;
        res: {
            error: boolean;
            data: any;
        };
    };
    private _result;
    private _end;
    constructor();
    write(data: Buffer): void;
    parse(): void;
    encode(...parameters: Array<string | number>): string;
}
